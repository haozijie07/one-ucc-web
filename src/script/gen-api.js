import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import url from 'url'

// 替代 __dirname
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const swaggerSource = 'http://localhost:3000/api-json'
const outputDir = path.resolve(__dirname, '../api')

/**
 *
 * @param {string} swaggerUrl swagger json url
 * @param {Function} callback
 * @returns
 */
function fetchSwaggerJson(swaggerUrl, callback) {
  if (!swaggerUrl.startsWith('http')) {
    const data = fs.readFileSync(swaggerUrl, 'utf-8')
    return callback(null, JSON.parse(data))
  }

  // 网络请求
  const lib = swaggerUrl.startsWith('https') ? https : http
  lib
    .get(swaggerUrl, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        try {
          callback(null, JSON.parse(data))
        } catch (err) {
          callback(err)
        }
      })
    })
    .on('error', callback)
}

/**
 *
 * @param {Object} prop 一个 { type, example, descript, ... } 或 { $ref } 对象
 * @returns
 */
function resolveType(prop) {
  if (!prop) return 'any'
  if (prop.$ref) return `Types.${prop.$ref.split('/').pop()}` // 通常是一个dto的名称
  if (prop.type === 'array') return `${resolveType(prop.items)}[]`
  if (prop.enum) return prop.enum.map((v) => `'${v}'`).join(' | ')
  switch (prop.type) {
    case 'string':
      return 'string'
    case 'integer':
    case 'number':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'object':
      return 'Record<string, any>'
    default:
      return 'any'
  }
}

function toCamelCase(str) {
  return str.replace(/[-_\/{}]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 *
 * @param {Object} schemas 响应体数据描述
 * @returns
 */
function generateTypes(schemas) {
  let lines = [`// Auto-generated from swagger`, ``]
  // 每个name都是一个dto，用来对应ts的interface名称
  for (const name in schemas) {
    const schema = schemas[name]
    lines.push(`export interface ${name} {`)
    // schema.properties是一个对象，里面是每个字段的信息：字段：{ type, description }
    const props = schema.properties || {}
    // required是一个数组，里面是必填的字段
    const required = schema.required || []
    for (const key in props) {
      // 字段名
      const prop = props[key]
      // 是否必填
      const isRequired = required.includes(key)
      // 可选表达式
      const optional = isRequired ? '' : '?'
      // 字段类型
      const type = resolveType(prop)
      // 字段描述
      const description = prop.description || ''
      if (description) {
        lines.push(`  /** ${description} */`)
      }
      lines.push(`  ${key}${optional}: ${type};`)
    }
    lines.push('}\n')
  }
  return lines.join('\n')
}

/**
 *
 * @param {Object} swagger swagger-json
 * @returns
 */
function generateApi(swagger) {
  const baseURL = swaggerSource || ''
  let lines = [
    `import * as Types from './types';`,
    ``,
    `import { uccAxios } from '@/request';`,
    ``,
    `const baseURL = '${baseURL}';`,
    ``,
  ]

  // route: 路由/请求路径
  for (const route in swagger.paths) {
    // methods: 请求类型数组及器请求体响应体等信息
    const methods = swagger.paths[route]
    // method：请求类型，post/get/put/delete...
    for (const method in methods) {
      // api：请求体响应体等信息
      const api = methods[method]
      // fnName：函数名
      const fnName = toCamelCase(api.operationId || `${method}_${route}`)

      // params：请求参数信息
      const params = api.parameters || []
      // api/1/2
      const pathParams = params.filter((p) => p.in === 'path')
      // api?id=1&name=2
      const queryParams = params.filter((p) => p.in === 'query')

      // requestBodySchema：请求体信息，里面有一个$ref属性：一个dto路径
      const requestBodySchema = api.requestBody?.content?.['application/json']?.schema
      // responseSchema：  响应体信息
      const responseSchema = (api.responses['200'] || api.responses['201'])?.content?.[
        'application/json'
      ]?.schema

      const args = []
      const tsParams = []

      // 路径参数，作为请求函数的参数 params
      if (pathParams.length > 0) {
        const entries = pathParams.map(
          (p) => `${p.name}${p.required ? '' : '?'}: ${resolveType(p.schema)}`,
        )
        tsParams.push(`params: { ${entries.join('; ')} }`)
        args.push('params')
      }

      // 查询参数，作为请求函数的参数 params
      if (queryParams.length > 0) {
        const entries = queryParams.map(
          (p) => `${p.name}${p.required ? '' : '?'}: ${resolveType(p.schema)}`,
        )
        tsParams.push(`query: { ${entries.join('; ')} }`)
        args.push('query')
      }

      // 请求体，作为请求函数的参数 data，类型是一个 dto
      if (requestBodySchema) {
        const bodyType = resolveType(requestBodySchema)
        tsParams.push(`data: ${bodyType}`)
        args.push('data')
      }

      // 响应体类型没处理好
      const returnType = responseSchema ? resolveType(responseSchema) : 'any'

      // 拼接路径：url + params
      const finalPath = route.replace(/{([^}]+)}/g, (_, key) => `\${params.${key}}`)

      lines.push(
        `export function ${fnName}(${tsParams.length ? tsParams.join(', ') + ',' : ''} config?: RequestConfig): Promise<${returnType}> {`,
      )
      lines.push(`  const url = \`${finalPath}\`;`)
      if (method === 'get' || method === 'delete') {
        if (requestBodySchema) {
          lines.push(`  return uccAxios.${method}(url, { ...config });`)
        } else if (queryParams.length) {
          lines.push(`  return uccAxios.${method}(url, { ...config });`)
        } else {
          lines.push(`  return uccAxios.${method}(url, { ...config });`)
        }
      } else {
        lines.push(
          `  return uccAxios.${method}(url, ${requestBodySchema ? 'data' : 'null'}, { ...config });`,
        )
      }

      lines.push(`}\n`)
    }
  }

  return lines.join('\n')
}

// ---------- MAIN ----------
fetchSwaggerJson(swaggerSource, (err, swagger) => {
  if (err) {
    console.error('❌ 读取 swagger 失败：', err.message)
    return
  }

  // 创建输出文件夹
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir)

  // 生成各字段对应的ts类型和类型接口
  const typesCode = generateTypes(swagger.components?.schemas || {})

  // 生成各请求对应的请求函数
  const apiCode = generateApi(swagger)

  // 文件写入
  fs.writeFileSync(path.join(outputDir, 'types.d.ts'), typesCode, 'utf-8')
  fs.writeFileSync(path.join(outputDir, 'api.ts'), apiCode, 'utf-8')

  console.log('✅ 已生成：api/types.d.ts 与 api/api.ts')
})

import fs from 'node:fs'
import path from 'node:path'
import http from 'node:http'
import url from 'url'
import { resolveType } from './resolve-type.mjs'
import { generateTypes } from './gen-types.mjs'
import { generateTableFormConfig } from './gen-table-form-config.mjs'

// 替代 __dirname
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

function toCamelCase(str) {
  return str.replace(/[-_\/{}]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
}

/**
 *
 * @param {Object} swagger swagger-json
 * @returns
 */
function generateApi(swagger) {
  const baseURL = swaggerSource || ''
  let lines = [`import { uccAxios } from '@/request';`, ``, `const baseURL = '${baseURL}';`, ``]

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

      lines.push(`/** ${api.summary} */`)
      lines.push(
        `export async function ${fnName}(${tsParams.length ? tsParams.join(', ') + ',' : ''} config?: RequestConfig): Promise<${returnType}> {`,
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
          `  return await uccAxios.${method}(url, ${requestBodySchema ? 'data' : 'null'}, { ...config });`,
        )
      }

      lines.push(`}\n`)
    }
  }

  return lines.join('\n')
}

// ---------- MAIN ----------
function run(modelArg) {
  if (!modelArg) {
    console.warn('请指定要生成的模块名')
    return
  }
  if (!swaggerJson[modelArg]) {
    console.warn('请指定正确的模块名')
    return
  }
  swaggerSource = swaggerJson[modelArg].url
  swaggerGroupName = swaggerJson[modelArg].name
  outputDir = path.resolve(__dirname, `../../api/${swaggerGroupName}`)
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

    // 生成表格配置、表单配置
    const { tableColumn, tableSearch, formConfig, formData } = generateTableFormConfig(
      swagger.components?.schemas || {},
    )

    // 文件写入
    // 类型
    let typeFileName
    const typeFile = path.join(outputDir, 'types.d.ts')
    if (fs.existsSync(typeFile)) {
      fs.mkdirSync(path.join(outputDir, './back'), { recursive: true })
      fs.writeFileSync(path.join(outputDir, './back/types.d.ts'), typesCode, 'utf-8')
      typeFileName = 'api/back/types.d.ts'
    } else {
      fs.writeFileSync(path.join(outputDir, 'types.d.ts'), typesCode, 'utf-8')
      typeFileName = 'types.d.ts'
    }

    // api
    let apiFileName
    const apiFile = path.join(outputDir, 'api.ts')
    if (fs.existsSync(apiFile)) {
      fs.mkdirSync(path.join(outputDir, './back'), { recursive: true })
      fs.writeFileSync(path.join(outputDir, './back/api.ts'), apiCode, 'utf-8')
      apiFileName = 'api/back/api.ts'
    } else {
      fs.writeFileSync(path.join(outputDir, 'api.ts'), apiCode, 'utf-8')
      apiFileName = 'api/api.ts'
    }

    const pagesResourceDir = path.join(outputDir, './pages-resource')
    fs.mkdirSync(pagesResourceDir, { recursive: true })
    const pagesResourceBackDir = path.join(outputDir, './back/pages-resource')
    // tableColumn
    let tableConfigFileName
    const tableConfigFile = path.join(pagesResourceDir, 'tableColumn.ts')
    if (fs.existsSync(tableConfigFile)) {
      fs.mkdirSync(pagesResourceBackDir, { recursive: true })
      fs.writeFileSync(path.join(pagesResourceBackDir, './tableColumn.ts'), tableColumn, 'utf-8')
      tableConfigFileName = 'api/back/pages-resource/tableColumn.ts'
    } else {
      fs.writeFileSync(path.join(pagesResourceDir, 'tableColumn.ts'), tableColumn, 'utf-8')
      tableConfigFileName = 'api/pages-resource/tableColumn.ts'
    }

    // tableSearch
    let tableSearchFileName
    const tableSearchFile = path.join(pagesResourceDir, 'tableSearch.ts')
    if (fs.existsSync(tableSearchFile)) {
      fs.mkdirSync(pagesResourceBackDir, { recursive: true })
      fs.writeFileSync(path.join(pagesResourceBackDir, './tableSearch.ts'), tableSearch, 'utf-8')
      tableSearchFileName = 'api/back/pages-resource/tableSearch.ts'
    } else {
      fs.writeFileSync(path.join(pagesResourceDir, 'tableSearch.ts'), tableSearch, 'utf-8')
      tableSearchFileName = 'api/pages-resource/tableSearch.ts'
    }

    // formConfig
    let formConfigFileName
    const formConfigFile = path.join(pagesResourceDir, 'formConfig.ts')
    if (fs.existsSync(formConfigFile)) {
      fs.mkdirSync(pagesResourceBackDir, { recursive: true })
      fs.writeFileSync(path.join(pagesResourceBackDir, './formConfig.ts'), formConfig, 'utf-8')
      formConfigFileName = 'api/back/pages-resource/formConfig.ts'
    } else {
      fs.writeFileSync(path.join(pagesResourceDir, 'formConfig.ts'), formConfig, 'utf-8')
      formConfigFileName = 'api/pages-resource/formConfig.ts'
    }

    // formData
    let formDataFileName
    const formDataFile = path.join(pagesResourceDir, 'formData.ts')
    if (fs.existsSync(formDataFile)) {
      fs.mkdirSync(pagesResourceBackDir, { recursive: true })
      fs.writeFileSync(path.join(pagesResourceBackDir, './formData.ts'), formData, 'utf-8')
      formDataFileName = 'api/back/pages-resource/formData.ts'
    } else {
      fs.writeFileSync(path.join(pagesResourceDir, 'formData.ts'), formData, 'utf-8')
      formDataFileName = 'api/pages-resource/formConfig.ts'
    }

    console.log(
      `✅ 已生成：${typeFileName} 与 ${apiFileName} 与 ${tableConfigFileName} 与 ${tableSearchFileName} 与 ${formConfigFileName} 与 ${formDataFileName}`,
    )
  })
}

const swaggerJson = {
  common: { name: 'common', url: 'http://localhost:3000/api/docs/common-json' },
  system: { name: 'system', url: 'http://localhost:3000/api/docs/system-json' },
}

let swaggerSource, swaggerGroupName, outputDir

// CLI 参数支持：node gen-api [groupName]
const modelArg = process.argv[2]
run(modelArg)

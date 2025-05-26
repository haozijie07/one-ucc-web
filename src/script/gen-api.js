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

  // 引用类型
  if (prop.$ref) {
    const dto = prop.$ref.split('/').pop()
    return `Types.API${dto}`
  }

  // 数组类型
  if (prop.type === 'array') {
    return `${resolveType(prop.items)}[]`
  }

  // 枚举类型
  if (prop.enum) {
    return prop.enum.map((v) => `'${v}'`).join(' | ')
  }

  // 处理 allOf 结构：常见于统一响应封装
  if (prop.allOf) {
    const allOfItem = prop.allOf.find((item) => item.properties?.data)
    const data = allOfItem?.properties?.data

    if (data) {
      // 1. data 是数组：如 ListResult<T>
      if (data.type === 'array' && data.items?.$ref) {
        const dto = data.items.$ref.split('/').pop()
        return `Types.API${dto}[]`
      }

      // 2. data 是分页嵌套对象：如 PageResult<{ data: T[] }>
      if (data.type === 'object' && data.properties?.data?.items?.$ref) {
        const deepData = data.properties.data
        const dto = deepData.items.$ref.split('/').pop()
        return `IPageListData<Types.API${dto}>`
      }

      // 3. data 是引用
      if (data.$ref) {
        const dto = data.$ref.split('/').pop()
        return `Types.API${dto}`
      }
    }
  }

  // 原始类型
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
 * @param {Object} schemas 字段数据描述
 * @returns
 */
function generateTypes(schemas) {
  let lines = [`// Auto-generated from swagger`, ``]
  // 每个name都是一个dto，用来对应ts的interface名称
  for (const name in schemas) {
    const schema = schemas[name]
    lines.push(`interface ${'API' + name} {`)
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

function resolveWidgetType(type) {
  switch (type) {
    case 'string':
      return 'text'
    case 'integer':
    case 'number':
      return 'number'
    default:
      return 'text'
  }
}

/**
 *
 * @param {Object} schemas 字段数据描述
 * @returns
 */
function generateTableFormConfig(schemas) {
  let tableColumn = [`// Auto-generated from swagger`, ``]
  let tableSearch = [`// Auto-generated from swagger`, ``]
  let formConfig = [`// Auto-generated from swagger`, ``]
  // 每个name都是一个dto，用来对应ts的interface名称
  for (const name in schemas) {
    if (!name.startsWith('Create')) continue
    const schema = schemas[name]
    tableColumn.push(`const ${name}TableColumn = [`)
    tableSearch.push(`const ${name}TableSearch = [`)
    formConfig.push(`const ${name}FormConfig = [`)
    // schema.properties是一个对象，里面是每个字段的信息：字段：{ type, description }
    const props = schema.properties || {}
    // required是一个数组，里面是必填的字段
    const required = schema.required || []
    for (const key in props) {
      tableColumn.push(`  {`)
      tableSearch.push(`  {`)
      formConfig.push(`  {`)
      // 字段名
      const prop = props[key]
      // 是否必填
      const isRequired = required.includes(key)
      // 可选表达式
      const optional = isRequired ? '' : '?'
      // 字段类型
      const type = resolveType(prop)
      const widgetType = resolveWidgetType(type)
      // 字段描述
      const description = prop.description || ''

      tableColumn.push(`    field: '${key}',`)
      tableColumn.push(`    title: '${prop.description}',`)
      tableColumn.push(`    width: 100,`)
      tableColumn.push(`  },`)

      tableSearch.push(`    field: '${key}',`)
      tableSearch.push(`    title: '${prop.description}',`)
      tableSearch.push(`    type: '${widgetType}',`)
      tableSearch.push(`  },`)

      formConfig.push(`    prop: '${key}',`)
      formConfig.push(`    label: '${prop.description}',`)
      formConfig.push(`    type: '${widgetType}',`)
      formConfig.push(`  },`)
    }
  }

  tableSearch.push(']\n')
  tableColumn.push(']\n')
  formConfig.push(']\n')

  return {
    tableColumn: tableColumn.join('\n'),
    tableSearch: tableSearch.join('\n'),
    formConfig: formConfig.join('\n'),
  }
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

  // 生成表格配置、表单配置
  const { tableColumn, tableSearch, formConfig } = generateTableFormConfig(
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

  // tableColumn
  let tableConfigFileName
  const tableConfigFile = path.join(outputDir, 'tableColumn.ts')
  if (fs.existsSync(tableConfigFile)) {
    fs.mkdirSync(path.join(outputDir, './back'), { recursive: true })
    fs.writeFileSync(path.join(outputDir, './back/tableColumn.ts'), tableColumn, 'utf-8')
    tableConfigFileName = 'api/back/tableColumn.ts'
  } else {
    fs.writeFileSync(path.join(outputDir, 'tableColumn.ts'), tableColumn, 'utf-8')
    tableConfigFileName = 'api/tableColumn.ts'
  }

  // tableSearch
  let tableSearchFileName
  const tableSearchFile = path.join(outputDir, 'tableSearch.ts')
  if (fs.existsSync(tableSearchFile)) {
    fs.mkdirSync(path.join(outputDir, './back'), { recursive: true })
    fs.writeFileSync(path.join(outputDir, './back/tableSearch.ts'), tableSearch, 'utf-8')
    tableSearchFileName = 'api/back/tableSearch.ts'
  } else {
    fs.writeFileSync(path.join(outputDir, 'tableSearch.ts'), tableSearch, 'utf-8')
    tableSearchFileName = 'api/tableSearch.ts'
  }

  // formConfig
  let formConfigFileName
  const formConfigFile = path.join(outputDir, 'formConfig.ts')
  if (fs.existsSync(formConfigFile)) {
    fs.mkdirSync(path.join(outputDir, './back'), { recursive: true })
    fs.writeFileSync(path.join(outputDir, './back/formConfig.ts'), formConfig, 'utf-8')
    formConfigFileName = 'api/back/formConfig.ts'
  } else {
    fs.writeFileSync(path.join(outputDir, 'formConfig.ts'), formConfig, 'utf-8')
    formConfigFileName = 'api/formConfig.ts'
  }

  console.log(
    `✅ 已生成：${typeFileName} 与 ${apiFileName} 与 ${tableConfigFileName} 与 ${tableSearchFileName} 与 ${formConfigFileName}`,
  )
})

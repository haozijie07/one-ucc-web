import { resolveWidgetType } from './widget-type.mjs'
import { resolveType } from './resolve-type.mjs'

function genDefaultValue(type) {
  switch (type) {
    case 'string':
      return `''`
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'array':
      return '[]'
    case 'object':
      return '{}'
    default:
      return `undefined`
  }
}

/**
 *
 * @param {Object} schemas 字段数据描述
 * @returns
 */
export function generateTableFormConfig(schemas) {
  let tableColumn = [`// Auto-generated from swagger`, ``]
  let tableSearch = [`// Auto-generated from swagger`, ``]
  let formConfig = [`// Auto-generated from swagger`, ``]
  let formData = [`// Auto-generated from swagger`, `import { ref } from 'vue'`, ``]
  // 每个name都是一个dto，用来对应ts的interface名称
  for (const name in schemas) {
    if (!name.startsWith('Response')) continue
    const schema = schemas[name]
    tableColumn.push(`const ${name}TableColumn = ref<ITableColumn[]>([`)
    tableSearch.push(`const ${name}TableSearch = ref<ITableSearch[]>([`)
    formConfig.push(`const ${name}FormConfig = ref<IFormConfig[]>([`)
    formData.push(`const ${name}FormData = ref<API${name}>({`)
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
      if (optional === '') {
        formConfig.push(`    rules: [{ required: true, message: '${prop.description}不能为空' }],`)
      }
      formConfig.push(`  },`)

      if (genDefaultValue(type) !== 'undefined' && optional === '') {
        formData.push(`   ${key}: ${genDefaultValue(type)},`)
      }
    }
    tableSearch.push('])\n')
    tableColumn.push('])\n')
    formConfig.push('])\n')
    formData.push('})\n')
  }

  return {
    tableColumn: tableColumn.join('\n'),
    tableSearch: tableSearch.join('\n'),
    formConfig: formConfig.join('\n'),
    formData: formData.join('\n'),
  }
}

import { resolveType } from './resolve-type.mjs'

/**
 *
 * @param {Object} schemas 字段数据描述
 * @returns
 */
export function generateTypes(schemas) {
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

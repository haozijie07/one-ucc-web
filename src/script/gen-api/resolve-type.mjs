/**
 *
 * @param {Object} prop 一个 { type, example, descript, ... } 或 { $ref } 对象
 * @returns
 */
export function resolveType(prop) {
  if (!prop) return 'any'

  // 引用类型
  if (prop.$ref) {
    const dto = prop.$ref.split('/').pop()
    return `API${dto}`
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
        return `API${dto}[]`
      }

      // 2. data 是分页嵌套对象：如 PageResult<{ data: T[] }>
      if (data.type === 'object' && data.properties?.data?.items?.$ref) {
        const deepData = data.properties.data
        const dto = deepData.items.$ref.split('/').pop()
        return `IPageListData<API${dto}>`
      }

      // 3. data 是引用
      if (data.$ref) {
        const dto = data.$ref.split('/').pop()
        return `API${dto}`
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

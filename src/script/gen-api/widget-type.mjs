export function resolveWidgetType(type) {
  switch (type) {
    case 'string':
      return 'text'
    case 'integer':
    case 'number':
      return 'number'
    case 'date':
      return 'datetimerange'
    default:
      return 'text'
  }
}

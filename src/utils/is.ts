/**
 * 判断一个值是否被赋予除undefined以外的值
 * @param value 要判断的值
 * @returns {boolean} 判断结果
 */
export function isDefined(value: any): boolean {
  return value !== undefined
}

/**
 * 判断一个值是为布尔值false
 * @param value 要判断的值
 * @returns {boolean} 判断结果
 */
export function isFalse(value: any): boolean {
  return value === false
}

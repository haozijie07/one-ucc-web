/**
 * 判断一个值是否被赋予除undefined以外的值
 * @param value 要判断的值
 * @returns {boolean} 判断结果
 */
export function isUnDefined(value: any): boolean {
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

/**
 * 判断一个值是为空值
 * @param value 要判断的值
 * @returns {boolean} 判断结果
 */
export function isEmpty(value: any): boolean {
  return value === '' || value === null || value === undefined || value.length === 0
}

/**
 * 判断一个字符串是否是身份证号
 *  @param value 要判断的字符串
 *  @returns {boolean} 判断结果
 */
export function isIdCard(value: string) {
  const reg = new RegExp(
    /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/,
  )
  return reg.test(value)
}

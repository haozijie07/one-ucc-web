import { OptionControllerGetOptions } from '@/api/common/api'

/**
 * 深度拷贝函数
 * @param source 要拷贝的值
 * @param weakMap 用于处理循环引用的 WeakMap（内部使用）
 * @returns 深拷贝后的值
 */
export function deepClone<T>(source: T, weakMap = new WeakMap<any, any>()): T {
  // 处理原始类型和函数
  if (typeof source !== 'object' || source === null) {
    return source
  }

  // 处理循环引用
  if (weakMap.has(source)) {
    return weakMap.get(source)
  }

  // 处理 Date 对象
  if (source instanceof Date) {
    const copy = new Date(source.getTime())
    weakMap.set(source, copy)
    return copy as T
  }

  // 处理 RegExp 对象
  if (source instanceof RegExp) {
    const copy = new RegExp(source.source, source.flags)
    weakMap.set(source, copy)
    return copy as T
  }

  // 处理 Map
  if (source instanceof Map) {
    const copy = new Map()
    weakMap.set(source, copy)
    source.forEach((value, key) => {
      copy.set(deepClone(key, weakMap), deepClone(value, weakMap))
    })
    return copy as T
  }

  // 处理 Set
  if (source instanceof Set) {
    const copy = new Set()
    weakMap.set(source, copy)
    source.forEach((value) => {
      copy.add(deepClone(value, weakMap))
    })
    return copy as T
  }

  // 处理 ArrayBuffer
  if (source instanceof ArrayBuffer) {
    const copy = source.slice(0)
    weakMap.set(source, copy)
    return copy as T
  }

  // 处理 TypedArray
  if (ArrayBuffer.isView(source)) {
    const copy = (source as any).constructor.from(source)
    weakMap.set(source, copy)
    return copy as T
  }

  // 处理普通对象和数组
  const copy: any = Array.isArray(source) ? [] : {}
  weakMap.set(source, copy)

  // 处理 Symbol 属性
  const symbolKeys = Object.getOwnPropertySymbols(source)
  const allKeys = [...Object.keys(source), ...symbolKeys]

  for (const key of allKeys) {
    copy[key] = deepClone((source as any)[key], weakMap)
  }

  // 保持原型链
  Object.setPrototypeOf(copy, Object.getPrototypeOf(source))

  return copy
}

/**
 * 获取通用下拉选项列表
 */
export async function getSimpleOptionsList(
  type: 'user' | 'department',
): Promise<APIGetOptionResponseDto[]> {
  const res = await OptionControllerGetOptions({ type })
  return res
}

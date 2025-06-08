/**
 *
 * @param obj 对象
 * @param path 路径
 * @returns 值
 */
export function objGetValueByPath<T extends object>(obj: T, path: string): any {
  return path.split('.').reduce((acc: any, key: string) => {
    return acc?.[key]
  }, obj)
}

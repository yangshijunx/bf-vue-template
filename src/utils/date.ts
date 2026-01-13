/**
 * 日期格式化
 * @param date 日期对象、时间戳或日期字符串
 * @param format 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 * @example
 * formatDate(new Date()) // '2026-01-13 14:30:00'
 * formatDate(1736789400000, 'YYYY/MM/DD') // '2026/01/13'
 * formatDate('2026-01-13', 'MM月DD日') // '01月13日'
 */
export function formatDate(
  date: Date | number | string,
  format: string = 'YYYY-MM-DD HH:mm:ss',
): string {
  const d = new Date(date)

  if (isNaN(d.getTime())) {
    return ''
  }

  const padZero = (n: number) => n.toString().padStart(2, '0')

  const tokens: Record<string, string> = {
    YYYY: d.getFullYear().toString(),
    MM: padZero(d.getMonth() + 1),
    DD: padZero(d.getDate()),
    HH: padZero(d.getHours()),
    mm: padZero(d.getMinutes()),
    ss: padZero(d.getSeconds()),
  }

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => tokens[match] ?? match)
}

/**
 * 获取相对时间描述
 * @param date 日期对象、时间戳或日期字符串
 * @returns 相对时间描述
 * @example
 * relativeTime(Date.now() - 30000) // '刚刚'
 * relativeTime(Date.now() - 3600000) // '1小时前'
 */
export function relativeTime(date: Date | number | string): string {
  const d = new Date(date)
  const now = Date.now()
  const diff = now - d.getTime()

  if (diff < 0) {
    return formatDate(d)
  }

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`
  } else {
    return formatDate(d, 'YYYY-MM-DD')
  }
}

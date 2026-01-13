/** 分页参数 */
export interface PageParams {
  page: number
  pageSize: number
}

/** 分页响应 */
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

/** 通用 API 响应 */
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
}

/** 选项类型 */
export interface OptionItem<V = string | number> {
  label: string
  value: V
  disabled?: boolean
}

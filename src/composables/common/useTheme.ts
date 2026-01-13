import { computed, type ComputedRef } from 'vue'
import type { ThemeConfig } from 'ant-design-vue/es/config-provider/context'

/**
 * Ant Design Vue 主题配置
 * 通过 ConfigProvider 的 theme 属性自定义 design token
 * 文档：https://antdv.com/docs/vue/customize-theme-cn
 *
 * 工作原理：
 * - Ant Design Vue 4.x 使用 CSS-in-JS 技术
 * - 当设置 theme 时，会自动生成对应的 CSS 变量（如 --ant-color-primary）
 * - 这些 CSS 变量会被注入到页面中，组件内部会使用这些变量
 * - 因此 JS 配置和 CSS 变量是同步的，无需手动维护 CSS 变量
 */
export function useTheme(): { theme: ComputedRef<ThemeConfig> } {
  /**
   * 主题配置
   * 基于此模板的项目可在此自定义 design token
   *
   * 示例：
   * const theme = computed<ThemeConfig>(() => ({
   *   token: {
   *     colorPrimary: '#1890ff',     // 主色（会自动生成 --ant-color-primary）
   *     colorSuccess: '#52c41a',     // 成功色
   *     colorWarning: '#faad14',     // 警告色
   *     colorError: '#f5222d',       // 错误色
   *     borderRadius: 6,             // 圆角
   *   },
   * }))
   */
  const theme = computed<ThemeConfig>(() => ({
    token: {
      // 在此自定义 design token
      // 默认使用 Ant Design 的默认主题
    },
  }))

  return {
    theme,
  }
}

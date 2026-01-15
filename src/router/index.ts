import { createRouter, createWebHistory } from 'vue-router'
import { BasicLayout } from '@/layouts'

/**
 * 路由配置说明
 *
 * 1. 所有页面路由都应该放在 BasicLayout 的 children 中
 * 2. 路由支持多层级嵌套，可以按模块分组
 *
 * ========== 路由分组原则（后台管理项目） ==========
 *
 * 【何时需要分组？】
 * - 同一业务模块下有多个相关页面（≥2个）
 * - 页面之间有明确的业务关联性
 * - 菜单结构需要体现层级关系
 *
 * 【常见分组场景】：
 *
 * 1. 系统管理类（system）
 *    - 用户管理、角色管理、权限管理、菜单管理
 *    - 系统设置、参数配置、日志管理
 *    → 分组：{ path: 'system', children: [...] }
 *
 * 2. 内容管理类（content）
 *    - 文章管理、分类管理、标签管理、评论管理
 *    → 分组：{ path: 'content', children: [...] }
 *
 * 3. 商品管理类（product）
 *    - 商品列表、商品分类、品牌管理、库存管理
 *    → 分组：{ path: 'product', children: [...] }
 *
 * 4. 订单管理类（order）
 *    - 订单列表、订单详情、退款管理、物流管理
 *    → 分组：{ path: 'order', children: [...] }
 *
 * 5. 数据统计类（statistics）
 *    - 销售统计、用户统计、流量统计、报表管理
 *    → 分组：{ path: 'statistics', children: [...] }
 *
 * 【不需要分组的情况】：
 * - 独立的单页面（如：仪表盘、个人设置、帮助中心）
 * - 功能完全独立，与其他页面无关联
 *
 * 【分组示例】：
 * {
 *   path: 'system',
 *   name: 'system',
 *   meta: { title: '系统管理', menuKey: 'system' },
 *   children: [
 *     {
 *       path: 'user',
 *       name: 'system-user',
 *       component: () => import('@/views/system/user/index.vue'),
 *       meta: { title: '用户管理', menuKey: 'system-user' },
 *     },
 *     {
 *       path: 'role',
 *       name: 'system-role',
 *       component: () => import('@/views/system/role/index.vue'),
 *       meta: { title: '角色管理', menuKey: 'system-role' },
 *     },
 *   ],
 * }
 *
 * 【命名规范】：
 * - 分组路由 name: 使用模块名（如 'system'）
 * - 子路由 name: 使用 '模块名-页面名'（如 'system-user'）
 * - path: 使用 kebab-case（如 'user-list'）
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/',
      component: BasicLayout,
      children: [
        /**
         * [模板示例页面] 仪表盘
         * 这是一个示例页面，如果项目不需要可以删除此路由及对应的组件文件
         * 注意：菜单会自动从路由配置生成，无需手动维护菜单配置
         */
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: { title: '仪表盘', menuKey: 'dashboard' },
        },
      ],
    },
  ],
})

export default router

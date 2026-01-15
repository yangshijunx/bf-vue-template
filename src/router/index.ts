import { createRouter, createWebHistory } from 'vue-router'
import { BasicLayout } from '@/layouts'

/**
 * 路由配置说明
 *
 * 1. 所有页面路由都应该放在 BasicLayout 的 children 中
 * 2. 路由支持多层级嵌套，可以按模块分组
 *
 * 多层级路由示例：
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
         * 删除后请同时更新 src/config/menu.ts 中的菜单配置
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

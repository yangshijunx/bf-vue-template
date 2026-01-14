import { createRouter, createWebHistory } from 'vue-router'
import { BasicLayout } from '@/layouts'

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
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: { title: '仪表盘', menuKey: 'dashboard' },
        },
        {
          path: 'user/list',
          name: 'user-list',
          component: () => import('@/views/user/list.vue'),
          meta: { title: '用户列表', menuKey: 'user-list' },
        },
      ],
    },
  ],
})

export default router

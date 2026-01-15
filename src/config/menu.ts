import { DashboardOutlined } from '@ant-design/icons-vue'
import type { Component } from 'vue'

export interface MenuItem {
  key: string
  label: string
  icon?: Component
  path?: string
  children?: MenuItem[]
}

export const menuConfig: MenuItem[] = [
  {
    key: 'dashboard',
    label: '仪表盘',
    icon: DashboardOutlined,
    path: '/dashboard',
  },
]

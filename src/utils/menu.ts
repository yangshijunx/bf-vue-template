import type { RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { DashboardOutlined } from '@ant-design/icons-vue'
import type { Component } from 'vue'

/**
 * 菜单图标映射
 * 将路由的 menuKey 映射到对应的图标组件
 * 如果路由没有指定图标，可以在这里统一配置
 */
const iconMap: Record<string, Component> = {
  dashboard: DashboardOutlined,
  // 可以继续添加其他图标的映射
  // system: SettingOutlined,
  // user: UserOutlined,
}

export interface MenuItem {
  key: string
  label: string
  icon?: Component
  path?: string
  children?: MenuItem[]
}

/**
 * 从路由配置生成菜单配置
 *
 * 规则：
 * 1. 只包含有 meta.menuKey 的路由
 * 2. 根据路由的 children 结构生成菜单树
 * 3. 图标从 iconMap 中获取，或从路由 meta.icon 获取
 */
export function generateMenuFromRoutes(routes: RouteRecordNormalized[]): MenuItem[] {
  const menuItems: MenuItem[] = []

  // 查找 BasicLayout 路由（根路径 '/' 下的路由，排除 redirect）
  const basicLayoutRoute = routes.find(
    (route) => route.path === '/' && route.children && route.children.length > 0 && !route.redirect,
  )

  if (!basicLayoutRoute || !basicLayoutRoute.children) {
    return menuItems
  }

  function processRoute(
    route: RouteRecordNormalized | RouteRecordRaw,
    parentPath = '',
  ): MenuItem | null {
    // 如果没有 menuKey，跳过（不是菜单项）
    if (!route.meta?.menuKey) {
      return null
    }

    // 构建完整路径
    let fullPath = route.path
    if (parentPath) {
      // 移除父路径末尾的斜杠，避免双斜杠
      const cleanParent = parentPath.replace(/\/$/, '')
      fullPath = `${cleanParent}/${route.path}`
    }
    // 确保路径以 / 开头
    if (!fullPath.startsWith('/')) {
      fullPath = `/${fullPath}`
    }

    const menuItem: MenuItem = {
      key: route.meta.menuKey as string,
      label: (route.meta.title as string) || (route.name as string),
      path: fullPath,
    }

    // 处理图标
    if (route.meta.icon) {
      menuItem.icon = route.meta.icon as Component
    } else if (iconMap[menuItem.key]) {
      menuItem.icon = iconMap[menuItem.key]
    }

    // 处理子路由
    if (route.children && route.children.length > 0) {
      const children: MenuItem[] = []
      for (const child of route.children) {
        const childMenuItem = processRoute(child, fullPath)
        if (childMenuItem) {
          children.push(childMenuItem)
        }
      }
      if (children.length > 0) {
        menuItem.children = children
        // 如果有子菜单，父菜单不需要 path（只是分组容器）
        delete menuItem.path
      }
    }

    return menuItem
  }

  // 只处理 BasicLayout 的直接子路由
  for (const route of basicLayoutRoute.children) {
    const menuItem = processRoute(route)
    if (menuItem) {
      menuItems.push(menuItem)
    }
  }

  return menuItems
}

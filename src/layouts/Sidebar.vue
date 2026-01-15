<script setup lang="ts">
import { computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { generateMenuFromRoutes, type MenuItem } from '@/utils/menu'

const props = defineProps<{
  collapsed: boolean
  isMobile?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const route = useRoute()

// 从路由生成菜单配置
const menuConfig = computed(() => generateMenuFromRoutes(router.getRoutes()))

// 当前选中的菜单项
const selectedKeys = computed(() => [(route.meta.menuKey as string) || (route.name as string)])

// 当前展开的子菜单
const openKeys = computed(() => {
  const key = (route.meta.menuKey as string) || (route.name as string)
  // 查找父级菜单
  for (const item of menuConfig.value) {
    if (item.children?.some((child) => child.key === key)) {
      return [item.key]
    }
  }
  return []
})

// 转换菜单配置为 Ant Design 格式
interface AntMenuItem {
  key: string
  icon?: () => ReturnType<typeof h>
  label: string
  children?: AntMenuItem[]
}

function transformMenuItems(items: MenuItem[]): AntMenuItem[] {
  return items.map((item) => ({
    key: item.key,
    icon: item.icon ? () => h(item.icon!) : undefined,
    label: item.label,
    children: item.children ? transformMenuItems(item.children) : undefined,
  }))
}

const menuItems = computed(() => transformMenuItems(menuConfig.value))

// 菜单点击处理
function handleMenuClick({ key }: { key: string }) {
  const findPath = (items: MenuItem[]): string | undefined => {
    for (const item of items) {
      if (item.key === key && item.path) {
        return item.path
      }
      if (item.children) {
        const path = findPath(item.children)
        if (path) return path
      }
    }
  }
  const path = findPath(menuConfig.value)
  if (path) {
    router.push(path)
    // 移动端点击菜单后关闭侧边栏
    if (props.isMobile) {
      emit('close')
    }
  }
}
</script>

<template>
  <a-layout-sider
    :collapsed="isMobile ? false : collapsed"
    :trigger="null"
    collapsible
    :class="['layout-sider', { 'mobile-sider': isMobile, 'mobile-hidden': isMobile && collapsed }]"
    :width="220"
  >
    <!-- Logo 区域 -->
    <div class="logo">
      <span v-show="!collapsed" class="logo-text">边锋Admin</span>
      <span v-show="collapsed" class="logo-text-mini">边</span>
    </div>

    <!-- 菜单 -->
    <a-menu
      v-model:selectedKeys="selectedKeys"
      :open-keys="openKeys"
      mode="inline"
      theme="light"
      :items="menuItems"
      @click="handleMenuClick"
    />
  </a-layout-sider>
</template>

<style lang="scss" scoped>
.layout-sider {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  background: #fff;
  border-right: 1px solid #f0f0f0;

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    border-bottom: 1px solid #f0f0f0;

    .logo-icon {
      display: none;
    }

    .logo-text-mini {
      font-size: 22px;
      font-weight: 600;
      color: #1890ff;
    }

    .logo-text {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      white-space: nowrap;
    }
  }

  // 菜单样式优化
  :deep(.ant-menu) {
    padding: 8px 12px;
    border-inline-end: none !important;

    .ant-menu-item {
      height: 44px;
      line-height: 44px;
      margin-bottom: 6px;
      border-radius: 8px;
    }

    .ant-menu-submenu-title {
      height: 44px;
      line-height: 44px;
      border-radius: 8px;
    }

    .ant-menu-submenu {
      margin-bottom: 6px;

      .ant-menu-item {
        margin-bottom: 4px;
      }
    }

    .ant-menu-item-icon,
    .anticon {
      font-size: 18px;
    }
  }
}

// 移动端侧边栏样式
.mobile-sider {
  position: fixed !important;
  z-index: 11;
  transition: transform 0.3s;
}

.mobile-hidden {
  transform: translateX(-100%);
}
</style>

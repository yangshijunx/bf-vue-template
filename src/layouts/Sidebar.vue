<script setup lang="ts">
import { computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { menuConfig, type MenuItem } from '@/config/menu'

const props = defineProps<{
  collapsed: boolean
  isMobile?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()
const route = useRoute()

// 当前选中的菜单项
const selectedKeys = computed(() => [(route.meta.menuKey as string) || (route.name as string)])

// 当前展开的子菜单
const openKeys = computed(() => {
  const key = (route.meta.menuKey as string) || (route.name as string)
  // 查找父级菜单
  for (const item of menuConfig) {
    if (item.children?.some((child) => child.key === key)) {
      return [item.key]
    }
  }
  return []
})

// 转换菜单配置为 Ant Design 格式
function transformMenuItems(items: MenuItem[]): any[] {
  return items.map((item) => ({
    key: item.key,
    icon: item.icon ? () => h(item.icon!) : undefined,
    label: item.label,
    children: item.children ? transformMenuItems(item.children) : undefined,
  }))
}

const menuItems = computed(() => transformMenuItems(menuConfig))

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
  const path = findPath(menuConfig)
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
    padding: 0 16px;
    border-bottom: 1px solid #f0f0f0;

    .logo-icon {
      display: none;
    }

    .logo-text-mini {
      font-size: 20px;
      font-weight: 600;
      color: #1890ff;
    }

    .logo-text {
      font-size: 18px;
      font-weight: 600;
      color: #1a1a1a;
      white-space: nowrap;
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

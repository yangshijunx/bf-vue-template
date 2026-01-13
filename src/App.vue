<script setup lang="ts">
import { useTheme } from '@/composables'

/**
 * 使用主题配置 hook
 * 主题配置逻辑已抽离到 composables/common/useTheme.ts
 */
const { theme } = useTheme()
</script>

<template>
  <!-- ConfigProvider 用于全局配置主题，theme 属性可自定义 design token -->
  <a-config-provider :theme="theme">
    <router-view />
  </a-config-provider>
</template>

<style scoped></style>

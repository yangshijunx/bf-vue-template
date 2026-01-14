<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'

const collapsed = ref(false)
const isMobile = ref(false)
const MOBILE_BREAKPOINT = 768

// 检测是否移动端
function checkMobile() {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  if (isMobile.value) {
    collapsed.value = true
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

const siderWidth = computed(() => {
  if (isMobile.value) return 0
  return collapsed.value ? 80 : 220
})

function toggleCollapsed() {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <a-layout class="basic-layout">
    <!-- 移动端遮罩 -->
    <div v-if="isMobile && !collapsed" class="mobile-mask" @click="collapsed = true" />

    <!-- 侧边栏 -->
    <Sidebar :collapsed="collapsed" :is-mobile="isMobile" @close="collapsed = true" />

    <!-- 右侧内容区 -->
    <a-layout class="right-layout" :style="{ marginLeft: siderWidth + 'px' }">
      <!-- 顶部 Header 固定 -->
      <Header
        :collapsed="collapsed"
        @toggle="toggleCollapsed"
        class="fixed-header"
        :style="{ width: isMobile ? '100%' : `calc(100% - ${siderWidth}px)` }"
      />

      <!-- 可滚动内容区 -->
      <div class="main-container">
        <a-layout-content class="layout-content">
          <router-view />
        </a-layout-content>
      </div>
    </a-layout>
  </a-layout>
</template>

<style lang="scss" scoped>
.basic-layout {
  min-height: 100vh;
}

.right-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: width 0.2s;
}

.main-container {
  flex: 1;
  margin-top: 64px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f5f5f5;
}

.layout-content {
  margin: 12px;
  padding: 16px;
  background: #fff;
  min-height: calc(100vh - 64px - 24px);
  border-radius: 8px;
}

// 移动端遮罩
.mobile-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 9;
}

// 移动端适配
@media screen and (max-width: 768px) {
  .layout-content {
    margin: 8px;
    padding: 12px;
    min-height: calc(100vh - 64px - 16px);
  }
}

.layout-footer {
  text-align: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}
</style>

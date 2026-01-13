<script setup lang="ts">
/**
 * 首页 - 样式验证页面
 */
</script>

<template>
  <div class="home">
    <h1 class="text-2xl font-bold mb-4">欢迎使用 Vue 模板</h1>
    <p class="text-gray-600">这是一个基础模板，包含以下功能：</p>
    <ul class="list-disc list-inside mt-4 text-gray-600">
      <li>Vue 3 + TypeScript</li>
      <li>Vite 构建工具</li>
      <li>Ant Design Vue 组件库</li>
      <li>Tailwind CSS 样式</li>
      <li>Pinia 状态管理</li>
      <li>Vue Router 路由</li>
    </ul>

    <!-- 样式验证区域 -->
    <div class="verify-section mt-8 p-6 border border-gray-300 rounded-lg">
      <h2 class="text-xl font-semibold mb-4">样式导入验证</h2>

      <!-- 1. Tailwind CSS 验证 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">✅ Tailwind CSS 验证：</h3>
        <div class="flex gap-4">
          <div class="bg-blue-500 text-white px-4 py-2 rounded">蓝色背景</div>
          <div class="bg-green-500 text-white px-4 py-2 rounded">绿色背景</div>
          <div class="bg-red-500 text-white px-4 py-2 rounded">红色背景</div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          如果看到彩色按钮，说明 Tailwind CSS 导入成功
        </p>
      </div>

      <!-- 2. SCSS 变量验证 -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">✅ SCSS 变量验证：</h3>
        <div class="transition-box">
          鼠标悬停我，查看过渡效果（使用 SCSS 变量 $transition-duration）
        </div>
        <p class="text-sm text-gray-500 mt-2">
          如果悬停有平滑过渡效果，说明 SCSS 变量导入成功
        </p>
      </div>

      <!-- 3. 全局样式验证（滚动条） -->
      <div class="mb-6">
        <h3 class="font-medium mb-2">✅ 全局样式验证（滚动条）：</h3>
        <div class="scroll-container">
          <div v-for="i in 20" :key="i" class="p-2 border-b">
            滚动条测试项 {{ i }} - 如果滚动条样式被美化，说明全局样式导入成功
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          滚动上方区域，查看滚动条样式（应该被美化为细窄样式）
        </p>
      </div>

      <!-- 4. Ant Design Vue 验证 -->
      <div>
        <h3 class="font-medium mb-2">✅ Ant Design Vue 验证：</h3>
        <div class="flex gap-2">
          <a-button type="primary">Primary</a-button>
          <a-button type="success">Success</a-button>
          <a-button type="warning">Warning</a-button>
          <a-button type="danger">Danger</a-button>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          如果看到 Ant Design 风格的按钮，说明 Ant Design Vue 导入成功
        </p>
      </div>
    </div>

    <a-button type="primary" class="mt-6">开始使用</a-button>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/variables' as *;

.home {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.verify-section {
  background-color: #f9fafb;
}

// SCSS 变量验证 - 使用 $transition-duration
.transition-box {
  padding: 12px;
  background-color: #e0e7ff;
  border-radius: 4px;
  cursor: pointer;
  transition: all $transition-duration $transition-timing;

  &:hover {
    background-color: #c7d2fe;
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
}

// 全局样式验证 - 滚动条
.scroll-container {
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  padding: 8px;
  background-color: white;
}
</style>

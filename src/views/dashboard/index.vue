<!--
  [模板示例页面] 仪表盘
  这是一个示例页面，如果项目不需要可以删除此文件
  删除后请同时更新：
  - src/router/index.ts 中的路由配置
  注意：菜单会自动从路由配置生成，无需手动维护
-->
<script setup lang="ts">
import {
  RocketOutlined,
  CodeOutlined,
  MobileOutlined,
  ApiOutlined,
  GithubOutlined,
  BookOutlined,
} from '@ant-design/icons-vue'

const features = [
  { icon: CodeOutlined, title: 'Vue 3 + TypeScript', desc: '使用最新的 Vue 3 组合式 API' },
  { icon: ApiOutlined, title: 'Ant Design Vue', desc: '企业级 UI 组件库' },
  { icon: MobileOutlined, title: '响应式布局', desc: '完美适配移动端和桌面端' },
  { icon: RocketOutlined, title: 'Vite 构建', desc: '极速的开发体验' },
]

const quickLinks = [
  { icon: BookOutlined, title: 'Ant Design Vue', url: 'https://antdv.com' },
  { icon: GithubOutlined, title: 'Vue 3 文档', url: 'https://cn.vuejs.org' },
]
</script>

<template>
  <div class="dashboard">
    <!-- 欢迎区域 -->
    <div class="welcome-section">
      <h1 class="welcome-title">欢迎使用边锋Admin</h1>
      <p class="welcome-desc">开箱即用的中后台管理系统模板，专为 AI 辅助开发优化</p>
    </div>

    <!-- 特性卡片 -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="24" :sm="12" :lg="6" v-for="item in features" :key="item.title">
        <div class="feature-card">
          <component :is="item.icon" class="feature-icon" />
          <h3 class="feature-title">{{ item.title }}</h3>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </a-col>
    </a-row>

    <!-- 快速链接 -->
    <div class="quick-section">
      <h2 class="section-title">快速开始</h2>
      <a-row :gutter="[16, 16]">
        <a-col :xs="24" :sm="12" v-for="item in quickLinks" :key="item.title">
          <a :href="item.url" target="_blank" class="quick-link">
            <component :is="item.icon" class="quick-icon" />
            <span>{{ item.title }}</span>
          </a>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  padding: 48px 0 40px;
}

.welcome-title {
  font-size: 32px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 12px;
}

.welcome-desc {
  font-size: 16px;
  color: #666;
  margin: 0;
}

.feature-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  border: 1px solid #f0f0f0;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
}

.feature-icon {
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 8px;
}

.feature-desc {
  font-size: 14px;
  color: #999;
  margin: 0;
}

.quick-section {
  margin-top: 48px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 20px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: #fafafa;
  border-radius: 8px;
  color: #1a1a1a;
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background: #1890ff;
    color: #fff;
  }
}

.quick-icon {
  font-size: 20px;
}

// 移动端适配
@media screen and (max-width: 768px) {
  .welcome-section {
    padding: 32px 0 24px;
  }

  .welcome-title {
    font-size: 24px;
  }

  .welcome-desc {
    font-size: 14px;
  }
}
</style>

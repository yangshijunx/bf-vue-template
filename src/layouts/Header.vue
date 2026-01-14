<script setup lang="ts">
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  MessageOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons-vue'
import { ref, h, computed } from 'vue'
import type { MenuProps } from 'ant-design-vue'

// 通知消息类型
interface NoticeItem {
  id: number
  title: string
  description: string
  time: string
  read: boolean
  type: 'notification' | 'message' | 'todo'
  avatar?: string
  status?: 'pending' | 'doing' | 'done'
}

// Mock 通知数据
const noticeList = ref<NoticeItem[]>([
  {
    id: 1,
    title: '系统升级通知',
    description: '系统将于今晚 22:00 进行升级维护',
    time: '5分钟前',
    read: false,
    type: 'notification',
  },
  {
    id: 2,
    title: '新功能上线',
    description: '报表导出功能已上线，欢迎体验',
    time: '1小时前',
    read: false,
    type: 'notification',
  },
  {
    id: 3,
    title: '安全提醒',
    description: '检测到异地登录，请确认是否本人操作',
    time: '2小时前',
    read: true,
    type: 'notification',
  },
])

const messageList = ref<NoticeItem[]>([
  {
    id: 4,
    title: '张三',
    description: '请问项目进度如何？',
    time: '10分钟前',
    read: false,
    type: 'message',
    avatar: 'Z',
  },
  {
    id: 5,
    title: '李四',
    description: '文档已经发送到您的邮箱',
    time: '30分钟前',
    read: false,
    type: 'message',
    avatar: 'L',
  },
  {
    id: 6,
    title: '系统管理员',
    description: '您的权限申请已通过',
    time: '1天前',
    read: true,
    type: 'message',
    avatar: 'S',
  },
])

const todoList = ref<NoticeItem[]>([
  {
    id: 7,
    title: '完成季度报告',
    description: '截止日期：2024-01-20',
    time: '进行中',
    read: false,
    type: 'todo',
    status: 'doing',
  },
  {
    id: 8,
    title: '代码审查',
    description: '审查前端模块代码',
    time: '待处理',
    read: false,
    type: 'todo',
    status: 'pending',
  },
  {
    id: 9,
    title: '需求评审',
    description: '参与产品需求评审会议',
    time: '已完成',
    read: true,
    type: 'todo',
    status: 'done',
  },
])

defineProps<{
  collapsed: boolean
}>()

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const isFullscreen = ref(false)
const activeNoticeKey = ref('notification')

// 未读消息数量
const unreadCount = computed(() => {
  const notifications = noticeList.value.filter((item) => !item.read).length
  const messages = messageList.value.filter((item) => !item.read).length
  const todos = todoList.value.filter((item) => !item.read).length
  return notifications + messages + todos
})

// 标记为已读
function markAsRead(item: NoticeItem) {
  item.read = true
}

// 清空通知
function clearNotices(type: string) {
  if (type === 'notification') {
    noticeList.value.forEach((item) => (item.read = true))
  } else if (type === 'message') {
    messageList.value.forEach((item) => (item.read = true))
  } else if (type === 'todo') {
    todoList.value.forEach((item) => (item.read = true))
  }
}

// 用户下拉菜单
const userMenuItems: MenuProps['items'] = [
  {
    key: 'profile',
    icon: () => h(UserOutlined),
    label: '个人中心',
  },
  {
    key: 'settings',
    icon: () => h(SettingOutlined),
    label: '个人设置',
  },
  { type: 'divider' },
  {
    key: 'logout',
    icon: () => h(LogoutOutlined),
    label: '退出登录',
  },
]

function handleUserMenuClick({ key }: { key: string }) {
  if (key === 'logout') {
    console.log('logout')
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}
</script>

<template>
  <a-layout-header class="layout-header">
    <div class="header-left">
      <!-- 折叠按钮 -->
      <span class="trigger" @click="emit('toggle')">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </span>
    </div>

    <div class="header-right">
      <!-- 搜索 -->
      <span class="header-action">
        <SearchOutlined />
      </span>

      <!-- 全屏 -->
      <span class="header-action" @click="toggleFullscreen">
        <FullscreenExitOutlined v-if="isFullscreen" />
        <FullscreenOutlined v-else />
      </span>

      <!-- 通知 -->
      <a-popover trigger="click" placement="bottomRight" overlay-class-name="notice-popover">
        <template #content>
          <a-tabs v-model:activeKey="activeNoticeKey" centered style="width: 336px">
            <!-- 通知 Tab -->
            <a-tab-pane key="notification">
              <template #tab>
                <span>通知 ({{ noticeList.filter((i) => !i.read).length }})</span>
              </template>
              <a-list :data-source="noticeList" size="small">
                <template #renderItem="{ item }">
                  <a-list-item :class="{ 'read-item': item.read }" @click="markAsRead(item)">
                    <a-list-item-meta :description="item.time">
                      <template #title>{{ item.title }}</template>
                      <template #avatar>
                        <a-avatar style="background-color: #1890ff"><BellOutlined /></a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div class="notice-clear" @click="clearNotices('notification')">清空通知</div>
            </a-tab-pane>

            <!-- 消息 Tab -->
            <a-tab-pane key="message">
              <template #tab>
                <span>消息 ({{ messageList.filter((i) => !i.read).length }})</span>
              </template>
              <a-list :data-source="messageList" size="small">
                <template #renderItem="{ item }">
                  <a-list-item :class="{ 'read-item': item.read }" @click="markAsRead(item)">
                    <a-list-item-meta :description="item.description">
                      <template #title
                        >{{ item.title }} <span class="msg-time">{{ item.time }}</span></template
                      >
                      <template #avatar>
                        <a-avatar style="background-color: #52c41a">{{ item.avatar }}</a-avatar>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div class="notice-clear" @click="clearNotices('message')">清空消息</div>
            </a-tab-pane>

            <!-- 待办 Tab -->
            <a-tab-pane key="todo">
              <template #tab>
                <span>待办 ({{ todoList.filter((i) => !i.read).length }})</span>
              </template>
              <a-list :data-source="todoList" size="small">
                <template #renderItem="{ item }">
                  <a-list-item :class="{ 'read-item': item.read }" @click="markAsRead(item)">
                    <a-list-item-meta :description="item.description">
                      <template #title>
                        {{ item.title }}
                        <a-tag v-if="item.status === 'pending'" color="default" size="small"
                          >待处理</a-tag
                        >
                        <a-tag v-else-if="item.status === 'doing'" color="processing" size="small"
                          >进行中</a-tag
                        >
                        <a-tag v-else color="success" size="small">已完成</a-tag>
                      </template>
                    </a-list-item-meta>
                  </a-list-item>
                </template>
              </a-list>
              <div class="notice-clear" @click="clearNotices('todo')">清空待办</div>
            </a-tab-pane>
          </a-tabs>
        </template>
        <a-badge :count="unreadCount" class="header-action">
          <BellOutlined style="font-size: 16px" />
        </a-badge>
      </a-popover>

      <!-- 用户信息 -->
      <a-dropdown :trigger="['click']">
        <span class="header-action user-action">
          <a-avatar :size="24" style="background-color: #1890ff">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <span class="username">Admin</span>
        </span>
        <template #overlay>
          <a-menu :items="userMenuItems" @click="handleUserMenuClick" />
        </template>
      </a-dropdown>
    </div>
  </a-layout-header>
</template>

<style lang="scss" scoped>
.layout-header {
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 9;

  .header-left {
    display: flex;
    align-items: center;

    .trigger {
      font-size: 18px;
      cursor: pointer;
      transition: color 0.3s;
      padding: 0 12px;

      &:hover {
        color: #1890ff;
      }
    }
  }

  .header-right {
    display: flex;
    align-items: center;

    .header-action {
      display: flex;
      align-items: center;
      height: 48px;
      padding: 0 12px;
      cursor: pointer;
      transition: background-color 0.3s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.025);
      }
    }

    .user-action {
      .username {
        margin-left: 8px;
      }
    }
  }
}

// 通知面板样式
:deep(.notice-popover) {
  .ant-popover-inner-content {
    padding: 0;
  }
}

.read-item {
  opacity: 0.5;
}

.notice-clear {
  text-align: center;
  padding: 12px 0;
  color: #1890ff;
  cursor: pointer;
  border-top: 1px solid #f0f0f0;

  &:hover {
    background: #fafafa;
  }
}

.msg-time {
  font-size: 12px;
  color: #999;
  margin-left: 8px;
  font-weight: normal;
}

// 移动端适配
@media screen and (max-width: 768px) {
  .layout-header {
    padding: 0 12px;
  }

  .header-right {
    .header-action {
      padding: 0 8px;
    }

    .username {
      display: none;
    }
  }
}
</style>

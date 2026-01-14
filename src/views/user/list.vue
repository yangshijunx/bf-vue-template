<script setup lang="ts">
import { ref, reactive } from 'vue'
import { PlusOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons-vue'

interface UserRecord {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

const loading = ref(false)

const columns = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: '用户名', dataIndex: 'name' },
  { title: '邮箱', dataIndex: 'email' },
  { title: '角色', dataIndex: 'role' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '创建时间', dataIndex: 'createdAt' },
  { title: '操作', key: 'action', width: 180 },
]

const dataSource = ref<UserRecord[]>([
  {
    id: 1,
    name: '张三',
    email: 'zhangsan@example.com',
    role: '管理员',
    status: 'active',
    createdAt: '2024-01-01',
  },
  {
    id: 2,
    name: '李四',
    email: 'lisi@example.com',
    role: '编辑',
    status: 'active',
    createdAt: '2024-01-02',
  },
  {
    id: 3,
    name: '王五',
    email: 'wangwu@example.com',
    role: '用户',
    status: 'inactive',
    createdAt: '2024-01-03',
  },
])

const searchForm = reactive({ name: '', status: undefined })

function handleSearch() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

function handleReset() {
  searchForm.name = ''
  searchForm.status = undefined
}
</script>

<template>
  <div class="user-list">
    <!-- 搜索区域 -->
    <a-card class="search-card">
      <a-form layout="inline">
        <a-form-item label="用户名">
          <a-input v-model:value="searchForm.name" placeholder="请输入用户名" allow-clear />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="searchForm.status"
            placeholder="请选择"
            style="width: 120px"
            allow-clear
          >
            <a-select-option value="active">启用</a-select-option>
            <a-select-option value="inactive">禁用</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch"><SearchOutlined />查询</a-button>
            <a-button @click="handleReset"><ReloadOutlined />重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 表格区域 -->
    <a-card style="margin-top: 16px">
      <template #extra>
        <a-button type="primary"><PlusOutlined />新增用户</a-button>
      </template>
      <a-table :columns="columns" :data-source="dataSource" :loading="loading" row-key="id">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'status'">
            <a-tag :color="record.status === 'active' ? 'green' : 'red'">
              {{ record.status === 'active' ? '启用' : '禁用' }}
            </a-tag>
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a-button type="link" size="small">编辑</a-button>
              <a-button type="link" size="small" danger>删除</a-button>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style lang="scss" scoped>
.search-card {
  margin-bottom: 16px;
}
</style>

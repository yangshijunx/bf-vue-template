<script setup lang="ts">
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  RiseOutlined,
} from '@ant-design/icons-vue'

const statisticData = [
  { title: '总用户数', value: 12893, icon: UserOutlined, color: '#1890ff' },
  { title: '总订单数', value: 8846, icon: ShoppingCartOutlined, color: '#52c41a' },
  { title: '总销售额', value: 328900, icon: DollarOutlined, color: '#faad14', prefix: '¥' },
  { title: '增长率', value: 23.6, icon: RiseOutlined, color: '#eb2f96', suffix: '%' },
]
</script>

<template>
  <div class="dashboard">
    <!-- 统计卡片 -->
    <a-row :gutter="16">
      <a-col :xs="24" :sm="12" :lg="6" v-for="item in statisticData" :key="item.title">
        <a-card class="statistic-card">
          <a-statistic
            :title="item.title"
            :value="item.value"
            :prefix="item.prefix"
            :suffix="item.suffix"
          >
            <template #prefix>
              <component :is="item.icon" :style="{ color: item.color, marginRight: '8px' }" />
              {{ item.prefix }}
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域占位 -->
    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :xs="24" :lg="16">
        <a-card title="访问趋势">
          <div class="chart-placeholder">
            <a-empty description="图表区域 - 可集成 ECharts 等图表库" />
          </div>
        </a-card>
      </a-col>
      <a-col :xs="24" :lg="8">
        <a-card title="销售占比">
          <div class="chart-placeholder">
            <a-empty description="饼图区域" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  .statistic-card {
    margin-bottom: 16px;
  }

  .chart-placeholder {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

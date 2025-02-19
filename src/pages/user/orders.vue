<template>
  <view class="orders-page">
    <!-- 订单状态切换 -->
    <view class="status-tabs">
      <view v-for="tab in tabs" :key="tab.value" :class="['tab-item', { active: currentType === tab.value }]"
        @click="handleTabChange(tab.value)">
        {{ tab.label }}
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="order-list">
      <view v-if="orderList.length === 0" class="empty-tip">
        暂无订单
      </view>
      <view v-else v-for="order in orderList" :key="order.id" class="order-item" @click="navigateToDetail(order.id)">
        <view class="order-header">
          <text class="order-no">订单号：{{ order.orderNo }}</text>
          <text :class="['order-status', order.status]">{{ getStatusText(order.status) }}</text>
        </view>
        <view class="performance-info">
          <image class="cover" :src="order.coverUrl" mode="aspectFill" />
          <view class="info">
            <text class="title">{{ order.title }}</text>
            <text class="time">{{ order.showTime }}</text>
            <text class="price">¥{{ order.price }}</text>
          </view>
        </view>
        <view class="order-footer">
          <text class="total">合计：¥{{ order.totalAmount }}</text>
          <view class="btn-group">
            <button v-if="order.status === 'unpaid'" class="action-btn pay-btn"
              @click.stop="handlePay(order)">去支付</button>
            <button v-if="order.status === 'completed'" class="action-btn detail-btn">查看详情</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { orders } from '@/mock/orders'

// 当前选中的订单类型
const currentType = ref('')

onLoad((options) => {
  currentType.value = options?.type || ''
})

// 页面加载时获取类型参数并加载订单
onMounted(() => {
  loadOrders(currentType.value)
})

// 标签页配置
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待支付', value: 'unpaid' },
  { label: '已完成', value: 'completed' }
]

// 订单列表数据
const orderList = ref(orders)

// 获取状态文本
const getStatusText = (status: string) => {
  const statusMap = {
    unpaid: '待支付',
    completed: '已完成'
  }
  return statusMap[status] || status
}

// 处理标签切换
const handleTabChange = (type: string) => {
  currentType.value = type
  loadOrders(type)
}

// 加载订单列表
const loadOrders = async (type: string) => {
  try {
    // TODO: 调用后端接口获取订单列表
    // const res = await api.getOrders({ type })
    // orderList.value = res.data
  } catch (error) {
    console.error('获取订单列表失败：', error)
    uni.showToast({
      title: '获取订单列表失败',
      icon: 'none'
    })
  }
}

// 跳转到订单详情
const navigateToDetail = (orderId: string) => {
  uni.navigateTo({
    url: `/pages/order/detail?id=${orderId}`
  })
}

// 处理支付
const handlePay = async (order: any) => {
  try {
    // TODO: 调用支付接口
    // const res = await api.payOrder(order.id)
    uni.showToast({
      title: '支付成功',
      icon: 'success'
    })
    // 刷新订单列表
    loadOrders(currentType.value)
  } catch (error) {
    console.error('支付失败：', error)
    uni.showToast({
      title: '支付失败',
      icon: 'none'
    })
  }
}
</script>

<style lang="scss">
.orders-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 20rpx;
}

.status-tabs {
  display: flex;
  background-color: #fff;
  padding: 20rpx 0;
  margin-bottom: 20rpx;

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;

    &.active {
      color: $uni-color-primary;
      font-weight: bold;

      &::after {
        content: '';
        position: absolute;
        bottom: -10rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: $uni-color-primary;
        border-radius: 2rpx;
      }
    }
  }
}

.order-list {
  padding: 0 20rpx;

  .empty-tip {
    text-align: center;
    color: #999;
    font-size: 28rpx;
    padding: 40rpx 0;
  }

  .order-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 20rpx;
    margin-bottom: 20rpx;

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20rpx;

      .order-no {
        font-size: 24rpx;
        color: #666;
      }

      .order-status {
        font-size: 24rpx;

        &.unpaid {
          color: #ff4d4f;
        }

        &.completed {
          color: #52c41a;
        }
      }
    }

    .performance-info {
      display: flex;
      margin-bottom: 20rpx;

      .cover {
        width: 160rpx;
        height: 200rpx;
        border-radius: 8rpx;
        margin-right: 20rpx;
      }

      .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          font-size: 28rpx;
          font-weight: bold;
          color: #333;
        }

        .time {
          font-size: 24rpx;
          color: #666;
        }

        .price {
          font-size: 32rpx;
          color: #ff4d4f;
          font-weight: bold;
        }
      }
    }

    .order-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20rpx;
      border-top: 1rpx solid #eee;

      .total {
        font-size: 28rpx;
        color: #333;
      }

      .btn-group {
        display: flex;
        gap: 20rpx;

        .action-btn {
          margin: 0;
          padding: 0 30rpx;
          height: 60rpx;
          line-height: 60rpx;
          font-size: 24rpx;
          border-radius: 30rpx;

          &.pay-btn {
            background-color: $uni-color-primary;
            color: #fff;
          }

          &.detail-btn {
            background-color: #f5f5f5;
            color: #666;
          }
        }
      }
    }
  }
}
</style>
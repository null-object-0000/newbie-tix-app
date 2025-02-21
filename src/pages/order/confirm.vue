<template>
  <view class="confirm-page" v-if="performance && session">
    <!-- 演出信息 -->
    <view class="performance-card">
      <view class="title">{{ performance.title }}</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">演出场次</text>
          <text class="value">{{ formatDate(session.startShowTime) }} {{ formatTime(session.startShowTime) }}</text>
        </view>
        <view class="info-item">
          <text class="label">演出场馆</text>
          <text class="value">{{ performance.venue }}</text>
        </view>
      </view>
    </view>

    <!-- 票档信息 -->
    <view class="ticket-card">
      <view class="section-title">票档信息</view>
      <view class="ticket-info">
        <view class="area">{{ ticket?.title }}</view>
        <view class="price-quantity">
          <text class="price">¥{{ ticket?.price }}</text>
          <text class="quantity">x{{ quantity }}</text>
        </view>
      </view>
    </view>

    <!-- 订单金额 -->
    <view class="amount-card">
      <view class="amount-item total">
        <text class="label">实付金额</text>
        <text class="value price">¥{{ totalAmount }}</text>
      </view>
    </view>
  </view>

  <!-- 支付按钮 -->
  <view class="footer">
    <view class="total-amount">
      <text class="label">需支付：</text>
      <text class="price">¥{{ finalAmount }}</text>
    </view>
    <button class="pay-btn" @click="handlePay">立即支付</button>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Performance, PerformanceSession, PerformanceTicket } from '@/types'
import { performanceApi } from '@/services/api'
import { onLoad } from '@dcloudio/uni-app'

// 获取路由参数
const performanceId = ref<number>()
const sessionId = ref<number>()
const ticketId = ref<number>()
const quantity = ref<number>(1)

onLoad((options) => {
  performanceId.value = Number(options?.performanceId) || 0
  sessionId.value = Number(options?.sessionId) || 0
  ticketId.value = Number(options?.ticketId) || 0
  quantity.value = Number(options?.quantity) || 1
})

onMounted(() => {
  // 获取订单详情
  getOrderInfo()
})

// 演出信息
const performance = ref<Performance>()
const session = ref<PerformanceSession>()
const ticket = ref<PerformanceTicket>()

// 计算金额
const totalAmount = computed(() => {
  return (ticket.value?.price || 0) * quantity.value
})

const finalAmount = computed(() => {
  return totalAmount.value
})

// 获取订单信息
const getOrderInfo = async () => {
  if (!performanceId.value) return

  // 通过API获取演出详情
  performance.value = await performanceApi.getPerformanceDetail(performanceId.value)

  // 获取选中的场次和票档信息
  const selectedSession = performance.value.sessions?.find(s => s.id === sessionId.value)
  if (selectedSession) {
    session.value = selectedSession
    ticket.value = selectedSession.tickets?.find(t => t.id === ticketId.value)
  }
}

// 格式化日期
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

// 格式化时间
const formatTime = (dateStr: string) => {
  const date = new Date(dateStr)
  return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
}

// 处理支付
const handlePay = async () => {
  try {
    // TODO: 调用后端接口创建订单并发起支付
    uni.showLoading({ title: '正在发起支付...' })

    // 模拟支付过程
    setTimeout(() => {
      uni.hideLoading()
      uni.showToast({
        title: '支付成功',
        icon: 'success'
      })
      // 跳转到订单详情页，使用mock数据中的订单ID
      uni.navigateTo({
        url: '/pages/order/detail?orderNo=ORDER202401200001'
      })
    }, 2000)
  } catch (error) {
    uni.showToast({
      title: '支付失败，请重试',
      icon: 'error'
    })
  }
}
</script>

<style lang="scss">
.confirm-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.performance-card,
.ticket-card,
.amount-card {
  background-color: #fff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
}

.performance-card {
  .title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .info-list {
    .info-item {
      display: flex;
      margin-bottom: 16rpx;

      .label {
        width: 140rpx;
        color: $uni-text-color-grey;
        font-size: 28rpx;
      }

      .value {
        flex: 1;
        color: $uni-text-color;
        font-size: 28rpx;
      }
    }
  }
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.ticket-info {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .area {
    font-size: 28rpx;
    color: $uni-text-color;
  }

  .price-quantity {
    .price {
      font-size: 32rpx;
      color: #ff4d4f;
      margin-right: 20rpx;
    }

    .quantity {
      font-size: 28rpx;
      color: $uni-text-color-grey;
    }
  }
}

.amount-card {
  .amount-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20rpx;

    .label {
      color: $uni-text-color-grey;
      font-size: 28rpx;
    }

    .value {
      color: $uni-text-color;
      font-size: 28rpx;

      &.price {
        color: #ff4d4f;
        font-size: 32rpx;
        font-weight: bold;
      }
    }
  }

  .divider {
    height: 2rpx;
    background-color: #eee;
    margin: 20rpx 0;
  }

  .total {
    margin-bottom: 0;
  }
}

.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  padding: 20rpx 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .total-amount {
    .label {
      font-size: 28rpx;
      color: $uni-text-color;
    }

    .price {
      font-size: 36rpx;
      color: #ff4d4f;
      font-weight: bold;
    }
  }

  .pay-btn {
    background-color: #ff4d4f;
    color: #fff;
    font-size: 32rpx;
    padding: 20rpx 60rpx;
    border-radius: 40rpx;
    margin: 0;
  }
}
</style>
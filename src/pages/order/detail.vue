<template>
  <view class="detail-page" v-if="order && performance && session && ticket">
    <!-- 订单状态 -->
    <view class="status-card">
      <view class="status-text" :class="order.status">
        {{ order.statusText }}
      </view>
    </view>

    <!-- 演出信息 -->
    <view class="performance-card">
      <view class="performance-info">
        <image class="cover" :src="performance.coverUrl" mode="aspectFill" />
        <view class="info">
          <view class="title">{{ performance.title }}</view>
          <view class="time">{{ performance.showTime }}</view>
          <view class="venue">{{ performance.venue }}</view>
        </view>
      </view>
    </view>

    <!-- 订单信息 -->
    <view class="order-card">
      <view class="section-title">订单信息</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">订单编号</text>
          <text class="value">{{ order.orderNo }}</text>
        </view>
        <view class="info-item">
          <text class="label">下单时间</text>
          <text class="value">{{ order.createTime }}</text>
        </view>
        <view class="info-item" v-if="order.payTime">
          <text class="label">支付时间</text>
          <text class="value">{{ order.payTime || '-' }}</text>
        </view>
      </view>
    </view>

    <!-- 票档信息 -->
    <view class="ticket-card">
      <view class="section-title">票档信息</view>
      <view class="ticket-info">
        <view class="area">{{ ticket.title }}</view>
        <view class="price-quantity">
          <text class="price">¥{{ order.price }}</text>
          <text class="quantity">x{{ order.quantity }}</text>
        </view>
      </view>
    </view>

    <!-- 支付信息 -->
    <view class="payment-card">
      <view class="section-title">支付信息</view>
      <view class="amount-list">
        <view class="amount-item">
          <text class="label">票面总价</text>
          <text class="value">¥{{ order.totalAmount }}</text>
        </view>
        <view class="divider"></view>
        <view class="amount-item total">
          <text class="label">实付金额</text>
          <text class="value price">¥{{ order.finalAmount }}</text>
        </view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="footer" v-if="order.status === 'unpaid'">
      <button class="pay-btn" @click="handlePay">立即支付</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Order, Performance, PerformanceSession, PerformanceTicket } from '@/types'
import { orders } from '@/mock/orders'
import { performances } from '@/mock/performances'
import { onLoad } from '@dcloudio/uni-app'

// 获取路由参数
const orderNo = ref('')

onLoad((options) => {
  orderNo.value = options?.orderNo || ''
})

onMounted(() => {
  if (orderNo.value) {
    getOrderDetail(orderNo.value)
  }
})

// 订单信息
const order = ref<Order>()
// 演出信息
const performance = ref<Performance>()
const session = ref<PerformanceSession>()
const ticket = ref<PerformanceTicket>()

// 获取订单详情
const getOrderDetail = async (orderNo: string) => {
  // 模拟API调用
  const foundOrder = orders.find(item => item.orderNo === orderNo)
  if (foundOrder) {
    order.value = foundOrder

    // 通过 status 赋值 statusText
    if (order.value.status === 'paid') {
      order.value.statusText = '已支付'
    } else if (order.value.status === 'completed') {
      order.value.statusText = '已完成'
    } else if (order.value.status === 'cancelled') {
      order.value.statusText = '已取消'
    } else if (order.value.status === 'unpaid') {
      order.value.statusText = '待支付'
    }

    // 获取演出信息
    const foundPerformance = performances.find(item => item.id === foundOrder.performanceId)
    if (foundPerformance) {
      performance.value = foundPerformance

      // 获取场次信息
      const foundSession = foundPerformance.sessions?.find(item => item.id === foundOrder.sessionId)
      if (foundSession) {
        session.value = foundSession
        // 获取票档信息
        const foundTicket = foundSession.tickets?.find(item => item.id === foundOrder.ticketId)
        if (foundTicket) {
          ticket.value = foundTicket
        }
      }
    }
  }
}

// 处理支付
const handlePay = () => {
  // TODO: 调用支付接口
  console.log('支付订单', orderNo.value)
}
</script>

<style lang="scss">
.detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.status-card {
  background-color: $uni-color-primary;
  padding: 40rpx 30rpx;

  .status-text {
    font-size: 36rpx;
    color: #fff;
    font-weight: bold;

    &.completed {
      color: #52c41a;
    }
  }
}

.performance-card,
.order-card,
.ticket-card,
.payment-card {
  background-color: #fff;
  padding: 30rpx;
  margin-top: 20rpx;
}

.section-title {
  font-size: 30rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.performance-info {
  display: flex;

  .cover {
    width: 160rpx;
    height: 200rpx;
    border-radius: 8rpx;
    margin-right: 20rpx;
  }

  .info {
    flex: 1;

    .title {
      font-size: 28rpx;
      font-weight: bold;
      color: $uni-text-color;
      margin-bottom: 10rpx;
    }

    .time,
    .venue {
      font-size: 24rpx;
      color: $uni-text-color-grey;
      margin-bottom: 6rpx;
    }
  }
}

.info-list {
  .info-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;

    .label {
      color: $uni-text-color-grey;
      font-size: 28rpx;
    }

    .value {
      color: $uni-text-color;
      font-size: 28rpx;
    }
  }
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

.amount-list {
  .amount-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16rpx;

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
  justify-content: flex-end;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .pay-btn {
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: #ff4d4f;
    color: #fff;
    font-size: 32rpx;
    border-radius: 40rpx;
  }
}
</style>
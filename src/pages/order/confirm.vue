<template>
  <view class="confirm-page">
    <!-- 演出信息 -->
    <view class="performance-card">
      <view class="title">{{ performance.title }}</view>
      <view class="info-list">
        <view class="info-item">
          <text class="label">演出时间</text>
          <text class="value">{{ performance.showTime }}</text>
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
        <view class="area">{{ ticket.area }}</view>
        <view class="price-quantity">
          <text class="price">¥{{ ticket.price }}</text>
          <text class="quantity">x{{ quantity }}</text>
        </view>
      </view>
    </view>

    <!-- 订单金额 -->
    <view class="amount-card">
      <view class="amount-item">
        <text class="label">票面总价</text>
        <text class="value">¥{{ totalAmount }}</text>
      </view>
      <view class="amount-item">
        <text class="label">服务费</text>
        <text class="value">¥{{ serviceFee }}</text>
      </view>
      <view class="divider"></view>
      <view class="amount-item total">
        <text class="label">实付金额</text>
        <text class="value price">¥{{ finalAmount }}</text>
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
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 获取页面参数
const performanceId = ref<string>('')
const sessionId = ref<string>('')
const ticketId = ref<string>('')
const quantity = ref<number>(1)

onMounted(() => {
  const pages = getCurrentPages()
  const page = pages[pages.length - 1]
  const params = page.$page?.options
  
  performanceId.value = params?.performanceId || ''
  sessionId.value = params?.sessionId || ''
  ticketId.value = params?.ticketId || ''
  quantity.value = Number(params?.quantity) || 1

  // 获取订单详情
  getOrderInfo()
})

// 演出信息
const performance = ref({
  title: '周杰伦2025巡回演唱会',
  showTime: '2025-03-15 19:30',
  venue: '深圳湾体育中心'
})

// 票档信息
const ticket = ref({
  area: 'A区',
  price: 1280
})

// 计算金额
const totalAmount = computed(() => {
  return ticket.value.price * quantity.value
})

const serviceFee = computed(() => {
  return Math.floor(totalAmount.value * 0.05) // 5%服务费
})

const finalAmount = computed(() => {
  return totalAmount.value + serviceFee.value
})

// 获取订单信息
const getOrderInfo = async () => {
  // TODO: 调用后端接口获取演出和票档信息
  console.log('获取订单信息', {
    performanceId: performanceId.value,
    sessionId: sessionId.value,
    ticketId: ticketId.value,
    quantity: quantity.value
  })
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
        url: '/pages/order/detail?id=1'
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
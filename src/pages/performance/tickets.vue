<template>
  <view class="tickets-page" v-if="performance">
    <!-- 演出基本信息 -->
    <view class="performance-info">
      <view class="title">{{ performance.title }}</view>
      <view class="details">
        <view class="venue">{{ performance.venue }}</view>
      </view>
    </view>

    <!-- 场次列表 -->
    <view class="session-list">
      <view class="section-title">选择场次</view>
      <radio-group @change="handleSessionSelect">
        <label class="session-item" v-for="session in sessions" :key="session.id" 
          :class="{ disabled: !session.canBuy, selected: selectedSessionId === session.id }">
          <view class="session-info">
            <view class="time-box">
              <text class="date">{{ session.date }}</text>
              <text class="time">{{ session.time }}</text>
            </view>
            <view class="status-tag" :class="{ 'sold-out': !session.canBuy }">
              {{ session.canBuy ? '可购买' : '已售罄' }}
            </view>
          </view>
          <radio class="hidden-radio" :value="session.id.toString()" :disabled="!session.canBuy"
            :checked="selectedSessionId === session.id" />
        </label>
      </radio-group>
    </view>

    <!-- 票档列表 -->
    <view class="ticket-list" v-if="selectedSessionId">
      <view class="section-title">选择票档</view>
      <radio-group @change="handleTicketSelect">
        <label class="ticket-item" v-for="ticket in tickets" :key="ticket.id" 
          :class="{ disabled: ticket.stock === 0, selected: selectedTicketId === ticket.id }">
          <view class="ticket-info">
            <view class="price-box">
              <text class="price">¥{{ ticket.price }}</text>
              <text class="area">[{{ ticket.area }}]</text>
            </view>
            <view class="status-tag" :class="{ 'sold-out': ticket.stock === 0 }">
              {{ ticket.stock > 0 ? '可购买' : '已售罄' }}
            </view>
          </view>
          <radio class="hidden-radio" :value="ticket.id.toString()" :disabled="ticket.stock === 0"
            :checked="selectedTicketId === ticket.id" />
        </label>
      </radio-group>
    </view>

    <!-- 购买数量 -->
    <view class="quantity-section" v-if="selectedTicket">
      <view class="section-title">购买数量</view>
      <view class="quantity-box">
        <button class="qty-btn" @click="decreaseQuantity" :disabled="quantity <= 1">-</button>
        <text class="quantity">{{ quantity }}</text>
        <button class="qty-btn" @click="increaseQuantity"
          :disabled="quantity >= maxQuantity || quantity >= selectedTicket?.stock">+</button>
      </view>
    </view>

    <!-- 底部确认按钮 -->
    <view class="footer">
      <view class="total-price">
        <text>总价：</text>
        <text class="amount">¥{{ totalAmount }}</text>
      </view>
      <button class="confirm-btn" :disabled="!canConfirm" @click="handleConfirm">确认选择</button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Performance, PerformanceSession, PerformanceTicket } from '@/types'
import { performanceApi } from '@/mock/api'
import { onLoad } from '@dcloudio/uni-app'

// 获取路由参数
const performanceId = ref<string>('')
onLoad((options) => {
  performanceId.value = options?.id || ''
})

onMounted(() => {
  // 获取演出详情和票档数据
  getPerformanceTickets()
})

// 演出基本信息
const performance = ref<Performance>()

// 场次数据
const sessions = ref<PerformanceSession[]>([])

// 选中的场次ID
const selectedSessionId = ref<number>()

// 票档数据
const tickets = ref<PerformanceTicket[]>([])

// 获取演出详情和票档数据
const getPerformanceTickets = async () => {
  if (!performanceId.value) return

  // 通过API获取演出详情
  const result = await performanceApi.getPerformanceDetail(performanceId.value)
  if (result && result.data) {
    performance.value = result.data
    sessions.value = result.data.sessions || []
  }
}

// 根据场次获取票档数据
const getSessionTickets = (sessionId: number) => {
  const session = sessions.value.find(s => s.id === sessionId)
  tickets.value = session?.tickets || []
}

// 选中的票档ID
const selectedTicketId = ref<number>()

// 选中的票档信息
const selectedTicket = computed(() => {
  return tickets.value.find(ticket => ticket.id === selectedTicketId.value)
})

// 购买数量
const quantity = ref(1)
const maxQuantity = 6

// 总价
const totalAmount = computed(() => {
  if (!selectedTicket.value) return 0
  return selectedTicket.value.price * quantity.value
})

// 是否可以确认
const canConfirm = computed(() => {
  return selectedTicket.value && quantity.value > 0
})

// 选择场次
const handleSessionSelect = (e: any) => {
  const sessionId = Number(e.detail.value)
  selectedSessionId.value = sessionId
  // 重置票档选择
  selectedTicketId.value = undefined
  quantity.value = 1
  // 获取对应场次的票档数据
  getSessionTickets(sessionId)
}

// 选择票档
const handleTicketSelect = (e: any) => {
  selectedTicketId.value = Number(e.detail.value)
  // 重置购买数量
  quantity.value = 1
}

// 减少数量
const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 增加数量
const increaseQuantity = () => {
  if (selectedTicket.value && quantity.value < maxQuantity && quantity.value < selectedTicket.value.stock) {
    quantity.value++
  }
}

// 确认选择
const handleConfirm = () => {
  if (!selectedTicket.value || !canConfirm.value) return

  // 跳转到确认订单页面，传递必要的参数
  uni.navigateTo({
    url: `/pages/order/confirm?performanceId=${performanceId.value}&sessionId=${selectedSessionId.value}&ticketId=${selectedTicket.value.id}&quantity=${quantity.value}`
  })
}
</script>

<style lang="scss">
.tickets-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.performance-info {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .title {
    font-size: 32rpx;
    font-weight: bold;
    color: $uni-text-color;
    margin-bottom: 20rpx;
  }

  .details {
    .venue {
      font-size: 28rpx;
      color: $uni-text-color-grey;
    }
  }
}

.section-title {
  font-size: 32rpx;
  font-weight: bold;
  color: $uni-text-color;
  margin-bottom: 20rpx;
  padding-left: 20rpx;
  border-left: 6rpx solid $uni-color-primary;
}

.session-list,
.ticket-list {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.session-item,
.ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-radius: 8rpx;
  background-color: #f8f8f8;
  margin-bottom: 20rpx;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &.selected {
    background-color: #f0f9ff;
    border: 2rpx solid $uni-color-primary;
  }

  .hidden-radio {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.session-info,
.ticket-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 20rpx;
}

.time-box {
  display: flex;
  align-items: center;
  gap: 20rpx;

  .date {
    font-size: 28rpx;
    color: $uni-text-color;
  }

  .time {
    font-size: 28rpx;
    color: $uni-text-color;
  }
}

.price-box {
  display: flex;
  align-items: center;
  gap: 16rpx;

  .price {
    font-size: 32rpx;
    font-weight: bold;
    color: #ff4d4f;
  }

  .area {
    font-size: 26rpx;
    color: #666;
  }
}

.status-tag {
  padding: 4rpx 16rpx;
  border-radius: 4rpx;
  font-size: 24rpx;
  background-color: $uni-color-primary;
  color: #fff;

  &.sold-out {
    background-color: #999;
  }
}

.quantity-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .quantity-box {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 20rpx;
    background-color: #f8f8f8;
    border-radius: 8rpx;

    .qty-btn {
      width: 60rpx;
      height: 60rpx;
      line-height: 56rpx;
      text-align: center;
      border: 2rpx solid #ddd;
      border-radius: 30rpx;
      background-color: #fff;
      font-size: 36rpx;
      color: #666;

      &:disabled {
        opacity: 0.5;
        background-color: #f5f5f5;
      }
    }

    .quantity {
      font-size: 32rpx;
      color: #333;
      min-width: 80rpx;
      text-align: center;
    }
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

  .total-price {
    font-size: 26rpx;
    color: #666;

    .amount {
      font-size: 36rpx;
      font-weight: bold;
      color: #ff4d4f;
      margin-left: 10rpx;
    }
  }

  .confirm-btn {
    width: 240rpx;
    height: 88rpx;
    line-height: 88rpx;
    background-color: $uni-color-primary;
    color: #fff;
    font-size: 32rpx;
    border-radius: 44rpx;

    &:disabled {
      background: #ccc;
    }
  }
}
</style>
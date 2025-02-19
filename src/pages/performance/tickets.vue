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
        <view class="session-item" v-for="session in sessions" :key="session.id" :class="{ disabled: !session.canBuy }">
          <view class="session-info">
            <view class="time-box">
              <text class="date">{{ session.date }}</text>
              <text class="time">{{ session.time }}</text>
            </view>
            <view class="status">
              <text v-if="session.canBuy">可购买</text>
              <text v-else class="sold-out">已售罄</text>
            </view>
          </view>
          <radio :value="session.id.toString()" :disabled="!session.canBuy"
            :checked="selectedSessionId === session.id" />
        </view>
      </radio-group>
    </view>

    <!-- 票档列表 -->
    <view class="ticket-list" v-if="selectedSessionId">
      <view class="section-title">选择票档</view>
      <radio-group @change="handleTicketSelect">
        <view class="ticket-item" v-for="ticket in tickets" :key="ticket.id" :class="{ disabled: ticket.stock === 0 }">
          <view class="ticket-info">
            <view class="price-box">
              <text class="price">¥{{ ticket.price }}</text>
              <text class="area">[{{ ticket.area }}]</text>
            </view>
            <view class="stock">
              <text v-if="ticket.stock > 0">剩余 {{ ticket.stock }} 张</text>
              <text v-else class="sold-out">已售罄</text>
            </view>
          </view>
          <radio :value="ticket.id.toString()" :disabled="ticket.stock === 0"
            :checked="selectedTicketId === ticket.id" />
        </view>
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

.session-list {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.session-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &.disabled {
    opacity: 0.6;
  }

  .session-info {
    flex: 1;
    margin-right: 20rpx;

    .time-box {
      display: flex;
      align-items: baseline;
      gap: 20rpx;
      margin-bottom: 10rpx;

      .date {
        font-size: 32rpx;
        font-weight: bold;
        color: $uni-text-color;
      }

      .time {
        font-size: 28rpx;
        color: $uni-text-color;
      }
    }

    .status {
      font-size: 24rpx;
      color: $uni-text-color-grey;

      .sold-out {
        color: #ff4d4f;
      }
    }
  }
}

.ticket-list {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;
}

.ticket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &.disabled {
    opacity: 0.6;
  }

  .ticket-info {
    flex: 1;
    margin-right: 20rpx;

    .price-box {
      display: flex;
      align-items: baseline;
      gap: 10rpx;
      margin-bottom: 10rpx;

      .price {
        font-size: 36rpx;
        font-weight: bold;
        color: #ff4d4f;
      }

      .area {
        font-size: 28rpx;
        color: $uni-text-color;
      }
    }

    .stock {
      font-size: 24rpx;
      color: $uni-text-color-grey;

      .sold-out {
        color: #ff4d4f;
      }
    }
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

    .qty-btn {
      width: 60rpx;
      height: 60rpx;
      line-height: 60rpx;
      text-align: center;
      border: 1rpx solid #ddd;
      border-radius: 4rpx;
      background-color: #fff;

      &:disabled {
        opacity: 0.5;
        background-color: #f5f5f5;
      }
    }

    .quantity {
      font-size: 32rpx;
      color: $uni-text-color;
      min-width: 60rpx;
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
    font-size: 28rpx;
    color: $uni-text-color;

    .amount {
      font-size: 36rpx;
      font-weight: bold;
      color: #ff4d4f;
    }
  }

  .confirm-btn {
    width: 240rpx;
    height: 80rpx;
    line-height: 80rpx;
    background-color: $uni-color-primary;
    color: #fff;
    font-size: 32rpx;
    border-radius: 40rpx;

    &:disabled {
      background-color: #ccc;
    }
  }
}
</style>
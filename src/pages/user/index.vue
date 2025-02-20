<template>
  <view class="user-page">
    <!-- 用户信息区域 -->
    <view class="user-info">
      <view class="avatar-wrap" @click="onChooseAvatar">
        <button class="avatar-btn" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
          <image class="avatar" :src="userInfo.avatarUrl || '/static/default-avatar.png'" mode="aspectFill" />
        </button>
      </view>
      <view class="info-content">
        <text class="nickname">{{ userInfo.nickName || '点击设置昵称' }}</text>

        <button class="profile-btn" @click="onEditNickname">设置昵称</button>
      </view>
    </view>

    <!-- 订单列表 -->
    <view class="orders-section">
      <!-- 订单列表 -->
      <view class="order-list" v-if="orderList && orderList.length > 0">
        <view class="section-title">我的订单</view>
        <view class="order-list">
          <view v-for="order in orderList" :key="order.orderNo" class="order-item"
            @click="navigateToDetail(order.orderNo)">
            <view class="order-header">
              <text class="order-no">订单号：{{ order.orderNo }}</text>
              <text :class="['order-status', order.status]">{{ order.statusText }}</text>
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
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { orders } from '@/mock/orders'
import { performances } from '@/mock/performances'
import type { Order } from '@/types'

// 用户信息
const userInfo = ref({
  avatarUrl: '',
  nickName: ''
})

// 静默登录
const silentLogin = async () => {
  try {
    const loginRes = await uni.login({
      provider: 'weixin'
    })

    // 这里需要调用后端接口获取用户信息
    // const { data } = await api.login(loginRes.code)
    // userInfo.value = data

    // 尝试获取用户信息
    try {
      const userProfile = await uni.getUserInfo()
      console.log('获取用户信息成功：', userProfile)
      userInfo.value.nickName = userProfile.userInfo.nickName
      userInfo.value.avatarUrl = userProfile.userInfo.avatarUrl
    } catch (error) {
      console.log('获取用户信息失败，用户可手动设置：', error)
    }

    console.log('静默登录成功：', loginRes)
  } catch (error) {
    console.error('静默登录失败：', error)
  }
}

// 处理头像选择
const onChooseAvatar = async (e: any) => {
  const { avatarUrl } = e.detail
  userInfo.value.avatarUrl = avatarUrl

  // 这里需要调用后端接口更新用户头像
  // await api.updateUserAvatar(avatarUrl)
}

// 处理昵称编辑
const onEditNickname = async () => {
  try {
    const res = await uni.showModal({
      title: '设置昵称',
      editable: true,
      placeholderText: '请输入昵称'
    })

    if (res.confirm && res.content) {
      userInfo.value.nickName = res.content
      // 这里需要调用后端接口更新用户昵称
      // await api.updateUserNickname(res.content)
    }
  } catch (error) {
    console.error('设置昵称失败：', error)
    uni.showToast({
      title: '设置失败',
      icon: 'none'
    })
  }
}

// 最近订单数据
interface OrderEx extends Order {
  title: string
  coverUrl: string
  showTime: string
  statusText?: string
}

const orderList = ref<OrderEx[]>()

// 加载订单列表
const loadOrders = async () => {
  try {
    // TODO: 调用后端接口获取订单列表
    // const res = await api.getOrders(type)
    orderList.value = orders
      .map(order => {
        // 通过 status 赋值 statusText
        if (order.status === 'paid') {
          order.statusText = '已支付'
        } else if (order.status === 'completed') {
          order.statusText = '已完成'
        } else if (order.status === 'cancelled') {
          order.statusText = '已取消'
        } else if (order.status === 'unpaid') {
          order.statusText = '待支付'
        }

        // 获取对应的演出信息
        const performance = performances.find(p => p.id === order.performanceId)
        if (performance) {
          return {
            ...order,
            title: performance.title,
            coverUrl: performance.coverUrl,
            showTime: performance.showTime
          } as OrderEx
        }
      }).filter(order => order !== undefined)
  } catch (error) {
    console.error('获取最近订单失败：', error)
  }
}

// 跳转到订单详情
const navigateToDetail = (orderNo: string) => {
  uni.navigateTo({
    url: `/pages/order/detail?orderNo=${orderNo}`
  })
}

// 处理支付
const handlePay = async (order: OrderEx) => {
  try {
    // TODO: 调用支付接口
    // const res = await api.payOrder(order.orderNo)
    uni.showToast({
      title: '支付成功',
      icon: 'success'
    })
    // 刷新订单列表
    loadOrders()
  } catch (error) {
    console.error('支付失败：', error)
    uni.showToast({
      title: '支付失败',
      icon: 'none'
    })
  }
}

// 页面加载时进行静默登录和加载订单列表
onMounted(() => {
  silentLogin()
  loadOrders()
})
</script>

<style lang="scss">
.user-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-top: 20rpx;
}

.user-info {
  background-color: #ffffff;
  margin: 20rpx;
  padding: 30rpx;
  border-radius: 12rpx;
  display: flex;
  align-items: center;

  .avatar-wrap {
    width: 120rpx;
    height: 120rpx;
    border-radius: 60rpx;
    overflow: hidden;
    margin-right: 20rpx;

    .avatar-btn {
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: none;
      background: none;
      line-height: 1;

      .avatar {
        width: 100%;
        height: 100%;
      }
    }
  }

  .avatar {
    .avatar-btn::after {
      border: none;
    }
  }

  .info-content {
    flex: 1;

    .nickname {
      font-size: 32rpx;
      font-weight: bold;
      margin-bottom: 10rpx;
    }

    .profile-btn {
      margin: 10rpx 0;
      padding: 0;
      width: 160rpx;
      height: 60rpx;
      line-height: 60rpx;
      font-size: 28rpx;
      background-color: #007aff;
      color: #ffffff;

      &:not(:last-child) {
        margin-right: 20rpx;
      }
    }
  }
}

.feature-list {
  background-color: #ffffff;
  margin: 20rpx;
  border-radius: 12rpx;

  .feature-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #eee;

    &:last-child {
      border-bottom: none;
    }

    .item-title {
      font-size: 28rpx;
      color: #333;
    }

    .item-arrow {
      font-size: 28rpx;
      color: #999;
    }
  }
}

.orders-section {
  margin: 20rpx;
  background-color: #ffffff;
  border-radius: 12rpx;
  padding: 20rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 20rpx;
  }

  .order-list {
    .order-item {
      background-color: #fff;
      border-radius: 12rpx;
      padding: 20rpx;
      margin-bottom: 20rpx;
      box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
    
      &:last-child {
        margin-bottom: 0;
      }
    
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
}
</style>
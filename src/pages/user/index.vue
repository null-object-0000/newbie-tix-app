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

    <!-- 功能列表 -->
    <view class="feature-list">
      <view class="feature-item" @click="navigateToOrders('all')">
        <text class="item-title">全部订单</text>
        <text class="item-arrow">></text>
      </view>
      <view class="feature-item" @click="navigateToOrders('unpaid')">
        <text class="item-title">待支付</text>
        <text class="item-arrow">></text>
      </view>
      <view class="feature-item" @click="navigateToOrders('completed')">
        <text class="item-title">已完成</text>
        <text class="item-arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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

// 页面加载时进行静默登录
onMounted(() => {
  silentLogin()
})

// 跳转到订单页面
const navigateToOrders = (type: string) => {
  uni.navigateTo({
    url: `/pages/user/orders?type=${type}`
  })
}
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
</style>
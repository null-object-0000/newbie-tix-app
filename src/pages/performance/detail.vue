<template>
  <view class="detail-page" v-if="performance">
    <!-- 演出海报 -->
    <swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="500">
      <swiper-item v-for="(image, index) in performance.images" :key="index">
        <image :src="image" mode="aspectFill" class="banner-image" />
      </swiper-item>
    </swiper>

    <!-- 基本信息 -->
    <view class="info-section">
      <view class="title">{{ performance.title }}</view>
      <view class="price" v-if="performance.minPrice">¥{{ performance.minPrice }}起</view>
      <view class="price" v-else>价格待定</view>

      <!-- 演出信息 -->
      <view class="info-list">
        <view class="info-item">
          <text class="label">演出时间</text>
          <text class="value">{{ performance.showTime || '暂未公布' }}</text>
        </view>
        <view class="info-item">
          <text class="label">演出场馆</text>
          <text class="value">{{ performance.venue || '暂未公布' }}</text>
        </view>
      </view>
    </view>

    <!-- 演出介绍 -->
    <view class="description-section">
      <view class="section-title">演出介绍</view>
      <rich-text :nodes="performance.description"></rich-text>
    </view>

    <!-- 购票须知 -->
    <view class="notice-section">
      <view class="section-title">购票须知</view>
      <view class="notice-list">
        <view class="notice-item" v-for="(item, index) in performance.notices" :key="index">
          <text class="dot">·</text>
          <text class="text">{{ item }}</text>
        </view>
      </view>
    </view>

    <!-- 底部购票按钮 -->
    <view class="footer" v-if="performance.statusText">
      <button class="buy-btn" :disabled="performance.status !== 'ON_SALE'" @click="handleBuy">
        {{ performance.statusText }}
      </button>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { performanceApi } from '@/services/api'
import { onLoad } from '@dcloudio/uni-app'
import type { Performance } from '@/types'

// 获取路由参数
const performanceId = ref<number>()
onLoad((options) => {
  performanceId.value = Number(options?.id) || 0
})

onMounted(() => {
  // 获取演出详情数据
  getPerformanceDetail()
})

// 演出详情数据
const performance = ref<Performance>()

// 获取演出详情
const getPerformanceDetail = async () => {
  if (!performanceId.value) return

  // 通过API获取演出详情
  const result = await performanceApi.getPerformanceDetail(performanceId.value)
  if (result) {
    performance.value = result
    // 处理富文本中的图片样式
    if (performance.value.description) {
      performance.value.description = performance.value.description.replace(/style=""/gi, '')
      performance.value.description = performance.value.description.replace(/<img/gi, '<img style="width: 100%; max-width: 100%; height: auto;"')
    }
    if (performance.value.status === 'ON_SALE') {
      performance.value.statusText = '立即购票'
    } else if (performance.value.status === 'COMING_SOON') {
      performance.value.statusText = '即将开售'
    } else if (performance.value.status === 'SOLD_OUT') {
      performance.value.statusText = '已售罄'
    }

    // 如果价格待定，则不可购买
    if (!performance.value.minPrice) {
      performance.value.statusText = ''
    }
  }
}

// 处理购票
const handleBuy = () => {
  if (performance.value?.status !== 'ON_SALE') return
  uni.navigateTo({
    url: `/pages/performance/tickets?id=${performanceId.value}`
  })
}
</script>

<style lang="scss">
.detail-page {
  min-height: 100vh;
  background-color: #f5f5f5;
  padding-bottom: 120rpx;
}

.banner {
  width: 100%;
  height: 500rpx;

  .banner-image {
    width: 100%;
    height: 100%;
  }
}

.info-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .title {
    font-size: 36rpx;
    font-weight: bold;
    color: $uni-text-color;
    margin-bottom: 20rpx;
  }

  .price {
    font-size: 40rpx;
    color: #ff4d4f;
    font-weight: bold;
    margin-bottom: 30rpx;
  }
}

.info-list {
  .info-item {
    display: flex;
    margin-bottom: 20rpx;

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

.description-section,
.notice-section {
  background-color: #fff;
  padding: 30rpx;
  margin-bottom: 20rpx;

  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: $uni-text-color;
    margin-bottom: 20rpx;
    padding-left: 20rpx;
    border-left: 6rpx solid $uni-color-primary;
  }
}

.notice-list {
  .notice-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16rpx;

    .dot {
      margin-right: 10rpx;
      color: $uni-text-color-grey;
      font-size: 28rpx;
    }

    .text {
      flex: 1;
      font-size: 28rpx;
      color: $uni-text-color;
      line-height: 1.5;
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
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);

  .buy-btn {
    width: 100%;
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
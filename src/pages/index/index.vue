<template>
  <view class="content">
    <!-- 演出列表 -->
    <scroll-view
      class="performance-list"
      scroll-y
      @scrolltolower="loadMore"
      @refresherrefresh="onRefresh"
      refresher-enabled
      :refresher-triggered="isRefreshing"
    >
      <view class="performance-item" v-for="item in performanceList" :key="item.id" @click="goToDetail(item.id)">
        <image class="cover-image" :src="item.coverUrl" mode="aspectFill" />
        <view class="info-box">
          <text class="title">{{ item.title }}</text>
          <view class="details">
            <view class="time">
              <text class="iconfont">&#xe6be;</text>
              <text>{{ item.showTime }}</text>
            </view>
            <view class="location">
              <text class="iconfont">&#xe651;</text>
              <text>{{ item.venue }}</text>
            </view>
          </view>
          <view class="price-box">
            <text class="price">¥{{ item.minPrice }}起</text>
            <text class="status" :class="item.status">{{ item.statusText }}</text>
          </view>
        </view>
      </view>
      <!-- 加载更多 -->
      <view class="loading" v-if="isLoading">加载中...</view>
      <view class="no-more" v-if="noMore">没有更多了</view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 演出列表数据
const performanceList = ref([
  {
    id: 1,
    title: '2025张学友演唱会',
    coverUrl: '/static/demo/jacky.jpg',
    showTime: '2025-03-15 19:30',
    venue: '深圳湾体育中心',
    minPrice: 380,
    status: 'on-sale',
    statusText: '售票中'
  },
  {
    id: 2,
    title: '周杰伦嘉年华世界巡回演唱会',
    coverUrl: '/static/demo/jay.jpg',
    showTime: '2025-04-20 19:30',
    venue: '深圳宝安体育场',
    minPrice: 480,
    status: 'coming-soon',
    statusText: '即将开售'
  }
])

// 加载状态
const isLoading = ref(false)
const noMore = ref(false)
const isRefreshing = ref(false)

// 跳转到详情页
const goToDetail = (id: number) => {
  uni.navigateTo({
    url: `/pages/performance/detail?id=${id}`
  })
}

// 加载更多
const loadMore = async () => {
  if (isLoading.value || noMore.value) return
  
  isLoading.value = true
  // 这里需要调用后端接口获取更多数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  isLoading.value = false
  // 模拟没有更多数据
  noMore.value = true
}

// 刷新列表
const onRefresh = async () => {
  isRefreshing.value = true
  // 这里需要调用后端接口刷新数据
  await new Promise(resolve => setTimeout(resolve, 1000))
  isRefreshing.value = false
}

// 页面加载时获取数据
onMounted(() => {
  // 这里需要调用后端接口获取初始数据
})
</script>

<style lang="scss">
.content {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.performance-list {
  height: 100vh;
  box-sizing: border-box;
  padding: 20rpx;
}

.performance-item {
  background-color: #fff;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
  display: flex;
  padding: 20rpx;

  .cover-image {
    width: 340rpx;
    height: 458rpx;
    border-radius: 8rpx;
  }

  .info-box {
    flex: 1;
    padding-left: 20rpx;
    display: flex;
    flex-direction: column;

    .title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 16rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }

    .details {
      display: flex;
      flex-direction: column;
      font-size: 26rpx;
      color: #666;
      margin-bottom: 16rpx;

      .time, .location {
        display: flex;
        align-items: center;
        margin-bottom: 12rpx;

        .iconfont {
          margin-right: 6rpx;
          font-size: 28rpx;
        }
      }
    }

    .price-box {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-size: 36rpx;
        font-weight: bold;
        color: #ff4d4f;
      }

      .status {
        font-size: 24rpx;
        padding: 4rpx 12rpx;
        border-radius: 4rpx;

        &.on-sale {
          background-color: #f6ffed;
          color: #52c41a;
        }

        &.coming-soon {
          background-color: #e6f7ff;
          color: #1890ff;
        }
      }
    }
  }
}
.loading, .no-more {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}
</style>

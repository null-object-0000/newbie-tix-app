<template>
  <view class="content">
    <!-- 演出列表 -->
    <scroll-view class="performance-list" scroll-y @scrolltolower="loadMore" @refresherrefresh="onRefresh"
      refresher-enabled :refresher-triggered="isRefreshing">
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
import { performanceApi } from '@/mock/api'
import type { Performance } from '@/types'

// 演出列表数据
const performanceList = ref<Performance[]>([])

// 加载状态
const isLoading = ref(false)
const noMore = ref(false)
const isRefreshing = ref(false)

// 跳转到详情页
const goToDetail = (id: number) => {
  if (!id) return
  uni.navigateTo({
    url: `/pages/performance/detail?id=${id}`
  })
}

// 加载更多
const loadMore = async () => {
  if (isLoading.value || noMore.value) return

  isLoading.value = true
  try {
    const res = await performanceApi.getPerformanceList()
    if (res.code === 0 && res.data.length > 0) {
      performanceList.value = [...performanceList.value, ...res.data]
    } else {
      noMore.value = true
    }
  } catch (error) {
    console.error('加载演出列表失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 刷新列表
const onRefresh = async () => {
  isRefreshing.value = true
  try {
    const res = await performanceApi.getPerformanceList()
    if (res.code === 0) {
      performanceList.value = res.data
      noMore.value = false
    }
  } catch (error) {
    console.error('刷新演出列表失败:', error)
  } finally {
    isRefreshing.value = false
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadMore()
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

      .time,
      .location {
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

.loading,
.no-more {
  text-align: center;
  padding: 20rpx;
  color: #999;
  font-size: 24rpx;
}
</style>

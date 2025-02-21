// 真实API接口
import type { Performance } from '@/types'

// API基础配置
const BASE_URL = 'http://localhost:9000'
// const BASE_URL = 'https://newbie-tix-agclrqqnvz.cn-shanghai.fcapp.run'

// 演出相关接口
export const performanceApi = {
  // 获取演出列表
  getPerformanceList: async (): Promise<Performance[]> => {
    const response = await uni.request({
      url: `${BASE_URL}/app/api/performances`,
      method: 'GET'
    })

    return response.data as Performance[]
  },

  // 获取演出详情
  getPerformanceDetail: async (id: number): Promise<Performance> => {
    const response = await uni.request({
      url: `${BASE_URL}/app/api/performances/${id}`,
      method: 'GET'
    })

    const data = response.data as Performance
    
    // 处理图片数组
    if (data) {
      if (typeof data.images === 'string') {
        data.images = JSON.parse(data.images)
      }
      if (!data.images || data.images.length === 0) {
        data.images = [data.coverUrl]
      }
      // 处理购票须知数组
      if (typeof data.notices === 'string') {
        data.notices = JSON.parse(data.notices)
      }
    }

    return data
  }
}
// 模拟API接口
import { performanceList, performanceDetail, sessionList, ticketList } from './performances'
import { orderList, orderDetail, orderStatusMap } from './orders'

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 演出相关接口
export const performanceApi = {
  // 获取演出列表
  getPerformanceList: async () => {
    await delay(500) // 模拟网络延迟
    return { code: 0, data: performanceList, message: 'success' }
  },

  // 获取演出详情
  getPerformanceDetail: async (id: string) => {
    await delay(500)
    return { code: 0, data: performanceDetail, message: 'success' }
  },

  // 获取场次列表
  getSessionList: async (performanceId: string) => {
    await delay(500)
    return { code: 0, data: sessionList, message: 'success' }
  },

  // 获取票档列表
  getTicketList: async (sessionId: number) => {
    await delay(500)
    return { code: 0, data: ticketList, message: 'success' }
  }
}

// 订单相关接口
export const orderApi = {
  // 获取订单列表
  getOrderList: async (status?: string) => {
    await delay(500)
    let list = orderList
    if (status) {
      list = list.filter(item => item.status === status)
    }
    return { code: 0, data: list, message: 'success' }
  },

  // 获取订单详情
  getOrderDetail: async (id: string) => {
    await delay(500)
    return { code: 0, data: orderDetail, message: 'success' }
  },

  // 创建订单
  createOrder: async (params: any) => {
    await delay(800)
    return { code: 0, data: { orderId: 'ORDER' + Date.now() }, message: 'success' }
  },

  // 支付订单
  payOrder: async (orderId: string) => {
    await delay(1000)
    return { code: 0, data: null, message: 'success' }
  }
}

// 获取订单状态文本
export const getOrderStatusText = (status: string) => {
  return orderStatusMap[status] || status
}
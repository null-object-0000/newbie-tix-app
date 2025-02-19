// 模拟API接口
import { performances } from './performances'
import { orders, orderStatusMap } from './orders'

// 延迟函数
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 演出相关接口
export const performanceApi = {
  // 获取演出列表
  getPerformanceList: async () => {
    await delay(500)
    return { code: 0, data: performances, message: 'success' }
  },

  // 获取演出详情
  getPerformanceDetail: async (id: number) => {
    await delay(500)
    const performance = performances.find(item => item.id === id)
    return { code: 0, data: performance, message: 'success' }
  },

  // 获取场次列表
  getSessionList: async (performanceId: number) => {
    await delay(500)
    const performance = performances.find(item => item.id === performanceId)
    return { code: 0, data: performance?.sessions || [], message: 'success' }
  },

  // 获取票档列表
  getTicketList: async (performanceId: number, sessionId: number) => {
    await delay(500)
    const performance = performances.find(item => item.id === performanceId)
    const session = performance?.sessions?.find(s => s.id === sessionId)
    return { code: 0, data: session?.tickets || [], message: 'success' }
  }
}

// 订单相关接口
export const orderApi = {
  // 获取订单列表
  getOrderList: async (status?: string) => {
    await delay(500)
    let list = orders
    if (status && status !== 'all') {
      list = list.filter(item => item.status === status)
    }
    return { code: 0, data: list, message: 'success' }
  },

  // 获取订单详情
  getOrderDetail: async (orderNo: string) => {
    await delay(500)
    const order = orders.find(item => item.orderNo === orderNo)
    return { code: 0, data: order, message: 'success' }
  },

  // 创建订单
  createOrder: async (params: any) => {
    await delay(800)
    const orderId = 'ORDER' + Date.now()
    return { code: 0, data: { orderId }, message: 'success' }
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
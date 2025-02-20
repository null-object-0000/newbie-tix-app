import type { Order } from "@/types";

// 订单数据数组
export const orders = [
  {
    orderNo: 'ORDER202401200001',
    status: 'unpaid',
    createTime: '2024-01-20 14:30:00',
    performanceId: 1,
    sessionId: 1,
    ticketId: 1,
    price: 1280,
    quantity: 2,
    totalAmount: 2560,
    finalAmount: 2600
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  },
  {
    orderNo: 'ORDER202401190001',
    status: 'completed',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00',
    performanceId: 2,
    sessionId: 1,
    ticketId: 1,
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    finalAmount: 1800,
  }
] as Order[];

// 订单状态映射
export const orderStatusMap = {
  unpaid: '待支付',
  completed: '已完成',
  cancelled: '已取消',
  refunded: '已退款'
}
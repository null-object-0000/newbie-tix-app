// 订单数据数组
export const orders = [
  {
    id: '1',
    orderNo: 'ORDER202401200001',
    title: '2024张学友演唱会',
    coverImage: '/static/demo/jacky.jpg',
    showTime: '2024-03-15 19:30',
    venue: '深圳湾体育中心',
    ticketArea: 'A区',
    price: 1280,
    quantity: 2,
    totalAmount: 2560,
    serviceFee: 40,
    finalAmount: 2600,
    status: 'unpaid',
    statusText: '待支付',
    createTime: '2024-01-20 14:30:00',
    payTime: ''
  },
  {
    id: '2',
    orderNo: 'ORDER202401190001',
    title: '五月天2024巡回演唱会',
    coverImage: '/static/demo/mayday.jpg',
    showTime: '2024-05-01 19:30',
    venue: '深圳世界之窗',
    ticketArea: 'C区',
    price: 880,
    quantity: 2,
    totalAmount: 1760,
    serviceFee: 40,
    finalAmount: 1800,
    status: 'completed',
    statusText: '已完成',
    createTime: '2024-01-19 10:15:00',
    payTime: '2024-01-19 10:20:00'
  }
]

// 订单状态映射
export const orderStatusMap = {
  unpaid: '待支付',
  completed: '已完成',
  cancelled: '已取消',
  refunded: '已退款'
}
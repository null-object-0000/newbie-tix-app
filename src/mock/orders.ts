// 订单相关的模拟数据

// 订单列表数据
export const orderList = [
  {
    id: '1',
    orderNo: 'ORDER202401200001',
    title: '2024张学友演唱会',
    coverUrl: '/static/demo/performance-1.jpg',
    showTime: '2024-03-15 19:30',
    price: 1280,
    totalAmount: 2600,
    status: 'unpaid',
    createTime: '2024-01-20 14:30:00'
  },
  {
    id: '2',
    orderNo: 'ORDER202401190001',
    title: '五月天2024巡回演唱会',
    coverUrl: '/static/demo/performance-3.jpg',
    showTime: '2024-05-01 19:30',
    price: 880,
    totalAmount: 1800,
    status: 'completed',
    createTime: '2024-01-19 10:15:00'
  }
]

// 订单详情数据
export const orderDetail = {
  id: '1',
  status: 'unpaid',
  statusText: '待支付',
  coverImage: '/static/demo/performance-1.jpg',
  title: '2024张学友演唱会',
  showTime: '2024-03-15 19:30',
  venue: '深圳湾体育中心',
  orderNo: 'ORDER202401200001',
  createTime: '2024-01-20 14:30:00',
  payTime: '',
  ticketArea: 'A区',
  price: 1280,
  quantity: 2,
  totalAmount: 2560,
  serviceFee: 40,
  finalAmount: 2600
}

// 订单状态映射
export const orderStatusMap = {
  unpaid: '待支付',
  completed: '已完成',
  cancelled: '已取消',
  refunded: '已退款'
}
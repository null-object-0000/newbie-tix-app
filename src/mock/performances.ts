// 演出相关的模拟数据

// 演出列表数据
export const performanceList = [
  {
    id: '1',
    title: '2024张学友演唱会',
    coverUrl: '/static/demo/jacky.jpg',
    showTime: '2024-03-15 19:30',
    venue: '深圳湾体育中心',
    minPrice: 580,
    status: 'on_sale',
    statusText: '售票中'
  },
  {
    id: '2',
    title: '周杰伦嘉年华世界巡回演唱会',
    coverUrl: '/static/demo/jay.jpg',
    showTime: '2024-04-20 19:30',
    venue: '深圳宝安体育场',
    minPrice: 680,
    status: 'coming_soon',
    statusText: '即将开售'
  },
  {
    id: '3',
    title: '五月天2024巡回演唱会',
    coverUrl: '/static/demo/mayday.jpg',
    showTime: '2024-05-01 19:30',
    venue: '深圳世界之窗',
    minPrice: 880,
    status: 'on_sale',
    statusText: '售票中'
  }
]

// 演出详情数据
export const performanceDetail = {
  id: '1',
  title: '2024张学友演唱会',
  images: [
    '/static/demo/performance-1.jpg',
    '/static/demo/performance-2.jpg',
    '/static/demo/performance-3.jpg'
  ],
  minPrice: 580,
  showTime: '2024-03-15 19:30',
  venue: '深圳湾体育中心',
  duration: '约120分钟',
  description: '<p>张学友，享誉华语乐坛的歌神，将在2024年带来全新巡回演唱会。</p><p>本次演唱会将为歌迷带来经典金曲以及全新创作。</p>',
  notice: [
    '观众需在演出开始前30分钟入场',
    '演出过程中请勿拍照、摄像',
    '演出票品一经售出，不退不换'
  ]
}

// 场次列表数据
export const sessionList = [
  {
    id: 1,
    date: '2024-03-15',
    time: '19:30',
    canBuy: true
  },
  {
    id: 2,
    date: '2024-03-16',
    time: '19:30',
    canBuy: true
  },
  {
    id: 3,
    date: '2024-03-17',
    time: '19:30',
    canBuy: false
  }
]

// 票档数据
export const ticketList = [
  {
    id: 1,
    area: 'A区',
    price: 1280,
    stock: 100
  },
  {
    id: 2,
    area: 'B区',
    price: 980,
    stock: 200
  },
  {
    id: 3,
    area: 'C区',
    price: 580,
    stock: 0
  }
]
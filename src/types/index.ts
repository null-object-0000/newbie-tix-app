// 演出状态类型
export type PerformanceStatus = 'on_sale' | 'coming_soon' | 'sold_out'

// 演出场次信息
export interface PerformanceSession {
    id: number | string
    date: string
    time: string
    canBuy: boolean
    tickets?: PerformanceTicket[]
}

// 票档信息
export interface PerformanceTicket {
    id: number | string
    price: number
    area: string
    stock: number
}

// 演出信息
export interface Performance {
    id: number | string
    title: string
    coverUrl: string
    images: string[]
    showTime: string
    venue: string
    minPrice: number
    maxPrice: number
    status: PerformanceStatus
    statusText: string
    duration: string
    description: string
    notices: string[]

    canBuy: boolean

    sessions?: PerformanceSession[]
}

// 订单状态类型
export type OrderStatus = 'unpaid' | 'paid' | 'cancelled' | 'completed'

// 订单信息
export interface Order {
    id: string
    orderNo: string
    status: OrderStatus
    statusText: string
    createTime: string
    payTime?: string
    // 演出相关信息
    performanceId: string
    performanceTitle: string
    showTime: string
    venue: string
    coverImage: string
    // 票档信息
    ticketId: string
    ticketArea: string
    price: number
    quantity: number
    // 金额信息
    totalAmount: number
    serviceFee: number
    finalAmount: number
}
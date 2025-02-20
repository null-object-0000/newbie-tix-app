import type { Performance } from '@/types'

// 演出数据数组
export const performances = [
    {
        id: 1,
        title: '2024张学友演唱会',
        coverUrl: '/static/demo/jacky.jpg',
        images: [
            '/static/demo/jacky.jpg'
        ],
        showTime: '2024-03-15 19:30',
        venue: '深圳湾体育中心',
        minPrice: 580,
        maxPrice: 1280,
        status: 'on_sale',
        description: '<p>张学友，享誉华语乐坛的歌神，将在2024年带来全新巡回演唱会。</p><p>本次演唱会将为歌迷带来经典金曲以及全新创作。</p>',
        notices: [
            '观众需在演出开始前30分钟入场',
            '演出过程中请勿拍照、摄像',
            '演出票品一经售出，不退不换'
        ],
        sessions: [
            {
                id: 1,
                startSaleTime: '2024-03-15 18:30',
                endSaleTime: '2024-03-15 20:00',
                startShowTime: '2024-03-15 19:00',
                endShowTime: '2024-03-15 20:30',
                status: 'coming_soon',
                tickets: [
                    {
                        id: 1,
                        title: 'A区',
                        price: 1280,
                        hasStock: true
                    },
                    {
                        id: 2,
                        title: 'B区',
                        price: 980,
                        hasStock: true
                    },
                    {
                        id: 3,
                        title: 'C区',
                        price: 580,
                        hasStock: false
                    }
                ]
            },
            {
                id: 2,
                startSaleTime: '2024-03-15 18:30',
                endSaleTime: '2024-03-15 20:00',
                startShowTime: '2024-03-15 19:00',
                endShowTime: '2024-03-15 20:30',
                status: 'coming_soon',
                tickets: [
                    {
                        id: 1,
                        title: 'A区',
                        price: 1280,
                        hasStock: true,
                    },
                    {
                        id: 2,
                        title: 'B区',
                        price: 980,
                        hasStock: true,
                    },
                    {
                        id: 3,
                        title: 'C区',
                        price: 580,
                        hasStock: true,
                    }
                ]
            },
            {
                id: 3,
                startSaleTime: '2024-03-15 18:30',
                endSaleTime: '2024-03-15 20:00',
                startShowTime: '2024-03-15 19:00',
                endShowTime: '2024-03-15 20:30',
                status: 'coming_soon',
                tickets: []
            }
        ]
    },
    {
        id: 2,
        title: '周杰伦嘉年华世界巡回演唱会',
        coverUrl: '/static/demo/jay.jpg',
        images: [
            '/static/demo/jay.jpg'
        ],
        showTime: '2024-04-20 19:30',
        venue: '深圳宝安体育场',
        minPrice: 680,
        maxPrice: 1580,
        status: 'coming_soon',
        description: '<p>周杰伦2024世界巡回演唱会，带来最新专辑以及经典歌曲。</p>',
        notices: [
            '观众需在演出开始前45分钟入场',
            '演出过程中请勿拍照、摄像',
            '演出票品一经售出，不退不换'
        ],
        sessions: [{
            id: 1,
            date: '2024-05-01',
            time: '19:30',
            canBuy: true,
            tickets: [
                {
                    id: 1,
                    title: 'A区',
                    price: 1580,
                    hasStock: true
                },
                {
                    id: 2,
                    title: 'B区',
                    price: 1280,
                    hasStock: true
                },
                {
                    id: 3,
                    title: 'C区',
                    price: 880,
                    hasStock: true
                }
            ]
        }]
    },
    {
        id: 3,
        title: '五月天2024巡回演唱会',
        coverUrl: '/static/demo/mayday.jpg',
        images: [
            '/static/demo/mayday.jpg'
        ],
        showTime: '2024-05-01 19:30',
        venue: '深圳世界之窗',
        minPrice: 880,
        maxPrice: 1580,
        status: 'on_sale',
        description: '<p>五月天2024巡回演唱会深圳站，带来震撼视听体验。</p>',
        notices: [
            '观众需在演出开始前60分钟入场',
            '演出过程中请勿拍照、摄像',
            '演出票品一经售出，不退不换'
        ],
        sessions: [
            {
                id: 1,
                startSaleTime: '2024-05-01 18:30',
                endSaleTime: '2024-05-01 20:00',
                startShowTime: '2024-05-01 19:00',
                endShowTime: '2024-05-01 20:30',
                tickets: [
                    {
                        id: 1,
                        title: 'A区',
                        price: 1580,
                        hasStock: true
                    },
                    {
                        id: 2,
                        title: 'B区',
                        price: 1280,
                        hasStock: true
                    },
                    {
                        id: 3,
                        title: 'C区',
                        price: 880,
                        hasStock: true
                    }
                ]
            }
        ]
    },
    {
        id: 4,
        title: '五月天2025巡回演唱会',
        coverUrl: '/static/demo/mayday.jpg',
        images: [
            '/static/demo/mayday.jpg'
        ],
        showTime: '2024-05-01 19:30',
        venue: '深圳世界之窗',
        minPrice: 880,
        maxPrice: 1580,
        status: 'on_sale',
        description: '<p>五月天2024巡回演唱会深圳站，带来震撼视听体验。</p>',
        notices: [
            '观众需在演出开始前60分钟入场',
            '演出过程中请勿拍照、摄像',
            '演出票品一经售出，不退不换'
        ],
    }
] as Performance[]
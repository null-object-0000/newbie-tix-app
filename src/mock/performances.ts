import type { Performance } from '@/types'

// 演出数据数组
export const performances = [
    {
        "id": 2,
        "title": "【苏州】喜力®星电音独家呈现 2025EDC雏菊电音嘉年华",
        "coverUrl": "https://iili.io/39wkeO7.jpg",
        "images": "[]",
        "venue": "苏州市·苏州阳澄湖半岛旅游度假区",
        "status": "COMING_SOON",
        "description": "<p><span style=\"color: rgb(31, 31, 31); background-color: rgb(255, 255, 255); font-size: 12px;\"><strong>重聚福利：所有购买过2024年9月15日-9月16日《喜力®星电音独家呈现 2024EDC雏菊电音嘉年华》门票的观众，凭原订单购买记录或大麦票夹电子票，现场联系工作人员出具【本人有效证件原件】即可免费领取限量发行的“典藏版纪念徽章”，每人仅限一枚，具体流程请以演出日前的现场攻略为准。</strong></span></p><p><img src=\"https://iili.io/39wSbse.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p><span style=\"color: rgb(31, 31, 31); background-color: rgb(255, 255, 255); font-size: 12px;\">2025 EDC CHINA</span></p><p><span style=\"color: rgb(31, 31, 31); background-color: rgb(255, 255, 255); font-size: 12px;\">首批艺人阵容公布</span></p><p><img src=\"https://iili.io/39wUE74.jpg\" alt=\"\" data-href=\"\" style=\"\"/></p><p><span style=\"color: rgb(31, 31, 31); background-color: rgb(255, 255, 255); font-size: 12px;\">2025 EDC CHINA 三大舞台的首批艺人阵容，现已正式集结完毕。我们在最大程度上还原了2024年的“神仙班底”，包括首次在国内呈现合作舞台的Afrojack B2B R3hab，全球最火的Melodic Bass代表人物“凤凰”Illenium，横扫各大音乐榜单的流行文化代表人物“棉花糖”Marshmello，格莱美和RIAA钻石认证的“烟鬼”组合The Chainsmokers等。</span></p><p><span style=\"color: rgb(31, 31, 31); background-color: rgb(255, 255, 255); font-size: 12px;\">除此之外还加入了全新的“硬核血液”，包括获得格莱美奖提名的美国电子音乐双人组合Slander；英伦低音美学缔造者、Drum&amp;Bass领域超高人气艺人Dimension；来自德国的Trench和Dubstep音乐灵魂领袖INFEKT以及登陆全球各大顶尖电音节舞台、颜值与实力并存的Techno艺人Lilly Palmer等。数十组国际大咖艺人轮番上阵，电音浪潮持续不停，燃爆明年三月的苏州阳澄湖半岛现场。</span></p>",
        "notices": "[\"本项目需实名制购票及入场，购票完成后观演人信息不可更改，须购票时填写的实名观演人携带本人有效证件验证入场。\",\"入场后为站席观看，门票无对应座位。\"]",
        "createdAt": "2025-02-21T04:26:56",
        "updatedAt": "2025-02-21T04:32:43",

        showTime: '2025.03.22 - 03.23',
        minPrice: 1080,
        maxPrice: 2280,
    },
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
        id: 22,
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
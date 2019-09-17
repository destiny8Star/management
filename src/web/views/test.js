export default {
    sideListOne: [
        {
            id:1,
            indexValue: '1',
            icon: require('../../assets/img/views/nav/houtai.png'),
            iconSelected: require('../../assets/img/views/nav/houtai.png'),
            label: '后台管理',
            children: [
                {
                    indexValue: '1-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '首页',
                    menuLink: '/homes'
                },
                {
                    indexValue: '1-2',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '新增账户权限',
                    menuLink: '/homes/jurisdiction'
                },
                {
                    indexValue: '1-3',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '账户管理',
                    menuLink: '/homes/accountManage'
                }
            ]
        },
        {
            id:2,
            indexValue: '2',
            icon: require('../../assets/img/views/nav/zhangdan.png'),
            iconSelected: require('../../assets/img/views/nav/zhangdan.png'),
            label: '账单管理',
            children: [
                {
                    indexValue: '2-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '收款列表',
                    menuLink: '/billList/billList'
                },
                {
                    indexValue: '2-2',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: '还款列表',
                    menuLink: '/billList/repayment'
                },
                {
                    indexValue: '2-3',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '用户提现记录',
                    menuLink: '/billList/withdrawDeposit'
                }
            ]
        },
        {
            id:3,
            indexValue: '3',
            icon: require('../../assets/img/views/nav/zhangdan.png'),
            iconSelected: require('../../assets/img/views/nav/zhangdan.png'),
            label: '运营管理',
            children: [
                {
                    indexValue: '3-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '广告设置',
                    menuLink: '/operate'
                },
                {
                    indexValue: '3-2',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: '图标管理',
                    menuLink: '/operate/iconList'
                },
                {
                    indexValue: '3-3',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '公告通知',
                    menuLink: '/operate/notice'
                }
            ]
        },
        {
            id:4,
            indexValue: '4',
            icon: require('../../assets/img/views/nav/shuju.png'),
            iconSelected: require('../../assets/img/views/nav/shuju.png'),
            label: '用户数据中心',
            children: [
                {
                    indexValue: '4-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '用户数据中心',
                    menuLink: '/userCenter'
                },
                {
                    indexValue: '4-2',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '用户列表',
                    menuLink: '/userCenter/userList'
                },
                {
                    indexValue: '4-3',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: 'PLUS会员列表',
                    menuLink: '/userCenter/vipList'
                },
                {
                    indexValue: '4-4',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '执行服务商',
                    menuLink: '/userCenter/agentList'
                },
                {
                    indexValue: '4-5',
                    icon: require('../../assets/img/views/nav/huangguan.png'),
                    iconSelected: require('../../assets/img/views/nav/huangguan.png'),
                    label: '城市合伙人',
                    menuLink: '/userCenter/partnerList'
                },
                {
                    indexValue: '4-6',
                    icon: require('../../assets/img/views/nav/shouru.png'),
                    iconSelected: require('../../assets/img/views/nav/shouru.png'),
                    label: '累计收益',
                    menuLink: '/userCenter/incomeIndex'
                },
                {
                    indexValue: '4-7',
                    icon: require('../../assets/img/views/nav/shouru.png'),
                    iconSelected: require('../../assets/img/views/nav/shouru.png'),
                    label: '合伙人申请列表',
                    menuLink: '/userCenter/applyPartnerList'
                }
            ]
        },
        {
            id:5,
            indexValue: '5',
            icon: require('../../assets/img/views/nav/shangcheng.png'),
            iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
            label: '商城管理',
            children: [
                {
                    indexValue: '5-1',
                    icon: require('../../assets/img/views/nav/shangcheng.png'),
                    iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                    label: '商品管理',
                    menuLink: '/goods'
                },
                {
                    indexValue: '5-2',
                    icon: require('../../assets/img/views/nav/wuliu.png'),
                    iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                    label: '物流管理',
                    menuLink: '/logistics'
                }
            ]
        },

    ],
    sideList: [
        {
            id: 1,
            indexValue: '1',
            icon: require('../../assets/img/views/nav/houtai.png'),
            iconSelected: require('../../assets/img/views/nav/houtai.png'),
            label: '后台管理',
            children: [
                {
                    indexValue: '1-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '首页',
                    menuLink: '/homes'
                },
                {
                    indexValue: '1-2',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '新增账户权限',
                    menuLink: '/homes/jurisdiction'
                },
                {
                    indexValue: '1-3',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '账户管理',
                    menuLink: '/homes/accountManage'
                }
            ]
        },
        {
            id: 2,
            indexValue: '2',
            icon: require('../../assets/img/views/nav/zhangdan.png'),
            iconSelected: require('../../assets/img/views/nav/zhangdan.png'),
            label: '运营管理',
            children: [
                {
                    indexValue: '2-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '广告设置',
                    menuLink: '/operate'
                },
                {
                    indexValue: '2-2',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: '图标管理',
                    menuLink: '/operate/iconIndex'
                },
                {
                    indexValue: '2-3',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: '海报管理',
                    menuLink: '/operate/posterList'
                },
                {
                    indexValue: '2-4',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '公告通知',
                    menuLink: '/operate/notice'
                }
            ]
        },
        {
            id: 3,
            indexValue: '3',
            icon: require('../../assets/img/views/nav/shuju.png'),
            iconSelected: require('../../assets/img/views/nav/shuju.png'),
            label: '用户数据中心',
            children: [
                {
                    indexValue: '3-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '用户数据中心',
                    menuLink: '/userCenter'
                },
                {
                    indexValue: '3-2',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '用户列表',
                    menuLink: '/userCenter/userList'
                },
                {
                    indexValue: '3-3',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: 'PLUS会员列表',
                    menuLink: '/userCenter/vipList'
                },
                {
                    indexValue: '3-4',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '执行服务商',
                    menuLink: '/userCenter/agentList'
                },
                {
                    indexValue: '3-5',
                    icon: require('../../assets/img/views/nav/huangguan.png'),
                    iconSelected: require('../../assets/img/views/nav/huangguan.png'),
                    label: '区域服务商',
                    menuLink: '/userCenter/CountyLevelList'
                },
                {
                    indexValue: '3-6',
                    icon: require('../../assets/img/views/nav/huangguan.png'),
                    iconSelected: require('../../assets/img/views/nav/huangguan.png'),
                    label: '城市服务商',
                    menuLink: '/userCenter/partnerList'
                },
                {
                    indexValue: '3-7',
                    icon: require('../../assets/img/views/nav/shouru.png'),
                    iconSelected: require('../../assets/img/views/nav/shouru.png'),
                    label: '升级区域服务商',
                    menuLink: '/userCenter/addPartner'
                },
                {
                    indexValue: '3-8',
                    icon: require('../../assets/img/views/nav/shouru.png'),
                    iconSelected: require('../../assets/img/views/nav/shouru.png'),
                    label: '申请列表',
                    menuLink: '/userCenter/applyPartnerList'
                }
            ]
        },
        {
            id: 4,
            indexValue: '4',
            icon: require('../../assets/img/views/nav/shangcheng.png'),
            iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
            label: '商城管理',
            children: [
                {
                    indexValue: '4-1',
                    icon: require('../../assets/img/views/nav/shangcheng.png'),
                    iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                    label: '商品管理',
                    menuLink: '/goods'
                },
                {
                    indexValue: '4-2',
                    icon: require('../../assets/img/views/nav/wuliu.png'),
                    iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                    label: '物流管理',
                    menuLink: '/logistics'
                }
            ]
        },
        {
            id: 5,
            indexValue: '5',
            icon: require('../../assets/img/views/nav/zhangdan.png'),
            iconSelected: require('../../assets/img/views/nav/zhangdan.png'),
            label: '账单管理',
            children: [
                {
                    indexValue: '5-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '收款列表',
                    menuLink: '/billList/billList'
                },
                {
                    indexValue: '5-2',
                    icon: require('../../assets/img/views/nav/VIP.png'),
                    iconSelected: require('../../assets/img/views/nav/VIP.png'),
                    label: '还款列表',
                    menuLink: '/billList/repayment'
                },
                {
                    indexValue: '5-3',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '用户提现记录',
                    menuLink: '/billList/withdrawDeposit'
                },
                {
                    indexValue: '5-4',
                    icon: require('../../assets/img/views/nav/zuanshi.png'),
                    iconSelected: require('../../assets/img/views/nav/zuanshi.png'),
                    label: '服务商审核',
                    menuLink: '/billList/auditList'
                }
            ]
        },
        {
            id: 6,
            indexValue: '6',
            icon: require('../../assets/img/views/nav/zhangdan.png'),
            iconSelected: require('../../assets/img/views/nav/zhangdan.png'),
            label: '开通服务商',
            children: [
                {
                    indexValue: '6-1',
                    icon: require('../../assets/img/views/userCenter/yh.png'),
                    iconSelected: require('../../assets/img/views/userCenter/yh.png'),
                    label: '开通服务商列表',
                    menuLink: '/openServiceProvider'
                }
            ]
        },

    ],
}
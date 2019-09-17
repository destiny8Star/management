/**
 * router Js
 * @JsName router
 * @Description Vue 程序路由
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
import VueRouter from "vue-router";
const index = resolve => require(["@/web/views/index.vue"], resolve);
const login = resolve => require(["@/web/views/login.vue"], resolve);
const updatePass = resolve => require(["@/web/views/updatePass/index.vue"], resolve);
const test = resolve => require(["@/web/views/components/test.vue"], resolve);
const testOne = resolve => require(["@/web/views/components/testOne.vue"], resolve);
const testTwo = resolve => require(["@/web/views/components/testTwo.vue"], resolve);
const configIndex = resolve => require(["@/web/views/configure/index.vue"], resolve);


//  商城模块
/* 商品管理 */
const homeIndex = resolve => require(["@/web/views/homes"], resolve);
const jurisdiction = resolve => require(["@/web/views/homes/jurisdiction"], resolve);
const accountManage = resolve => require(["@/web/views/homes/accountManage"], resolve);

//  商城模块
/* 商品管理 */
const statistics = resolve => require(["@/web/views/goods/statistics"], resolve);
const goods = resolve => require(["@/web/views/goods"], resolve);
const goodsDetail = resolve => require(["@/web/views/goods/goodsDetail"], resolve);
const goodsAdd = resolve => require(["@/web/views/goods/addition"], resolve);
const addGoods = resolve => require(["@/web/views/goods/addGoods"], resolve);
const updateGoods = resolve => require(["@/web/views/goods/updateGoods"], resolve);
const goodsModify = resolve => require(["@/web/views/goods/modify"], resolve);

//订单管理
const orderList = resolve => require(["@/web/views/order/index"], resolve);
const orderDetail = resolve => require(["@/web/views/order/orderDetail"], resolve);
/* 物流管理 */
const logistics = resolve => require(["@/web/views/order/logistics"], resolve);


//  运营模块
/* 广告设置 */
const operate = resolve => require(["@/web/views/operate"], resolve);
const addOperate = resolve => require(["@/web/views/operate/addOperate"], resolve);
const updateOperate = resolve => require(["@/web/views/operate/updateOperate"], resolve);
/* 图标设置 */
const iconList = resolve => require(["@/web/views/operate/iconList"], resolve);
const updateIcon = resolve => require(["@/web/views/operate/iconList/updateIcon"], resolve);
//改后首页
const iconIndex = resolve => require(["@/web/views/operate/iconList/iconIndex"], resolve);
const addIcon = resolve => require(["@/web/views/operate/iconList/addIcon"], resolve);
const addIcons = resolve => require(["@/web/views/operate/iconList/addIcons"], resolve);
/* 海报设置 */
const posterList = resolve => require(["@/web/views/operate/posterList"], resolve);
const addPoster = resolve => require(["@/web/views/operate/posterList/addPoster"], resolve);
/* 公告通知 */
const notice = resolve => require(["@/web/views/operate/notice"], resolve);

// 开通服务商管理模块
const openServiceProvider = resolve => require(["@/web/views/openServiceProvider"], resolve);
const openInfo = resolve => require(["@/web/views/openServiceProvider/openInfo"], resolve);


// 账单管理模块
const billList = resolve => require(["@/web/views/billList"], resolve);
const repayment = resolve => require(["@/web/views/billList/repayment"], resolve);
const withdrawDeposit = resolve => require(["@/web/views/billList/withdrawDeposit"], resolve);
const auditList = resolve => require(["@/web/views/billList/auditList"], resolve);
const auditInfo = resolve => require(["@/web/views/billList/auditInfo"], resolve);



// 用户数据中心
/* 首页 */
const userCenter = resolve => require(["@/web/views/userCenter/index"], resolve);
/* 用户列表 */
const userList = resolve => require(["@/web/views/userCenter/userList/userList"], resolve);
const userDetail = resolve => require(["@/web/views/userCenter/userList/userDetail"], resolve);
const billDetail = resolve => require(["@/web/views/userCenter/userList/billDetail"], resolve);
const teamList = resolve => require(["@/web/views/userCenter/userList/teamList"], resolve);
/* PLUS会员列表 */
const vipList = resolve => require(["@/web/views/userCenter/vipList/index"], resolve);
/* 各城市用户列表 */
const cityUserList = resolve => require(["@/web/views/userCenter/cityUserList/index"], resolve);
/* 执行服务商列表 */
const agentList = resolve => require(["@/web/views/userCenter/agentList/index"], resolve);
const addAgent = resolve => require(["@/web/views/userCenter/agentList/addAgent"], resolve);
/* 区域服务商列表 */
const partnerList = resolve => require(["@/web/views/userCenter/partnerList/index"], resolve);
/* 城市合伙人[城市服务商]列表 */
const CountyLevelList = resolve => require(["@/web/views/userCenter/CountyLevelList/index"], resolve);
const addPartner = resolve => require(["@/web/views/userCenter/partnerList/addPartner"], resolve);
/* 申请城市合伙人列表 */
const applyPartnerList = resolve => require(["@/web/views/userCenter/applyPartnerList/index"], resolve);
/* 累计收入 */
const incomeIndex = resolve => require(["@/web/views/userCenter/accumulatedIncome/incomeIndex"], resolve);
const upgradeSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/upgradeSP"], resolve);
const repaymentSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/repaymentSP"], resolve);
const proceedsSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/proceedsSP"], resolve);
const doCardSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/doCardSP"], resolve);
const recommendSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/recommendSP"], resolve);
const consumeSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/consumeSP"], resolve);
const shoppingSP = resolve => require(["@/web/views/userCenter/accumulatedIncome/shoppingSP"], resolve);
const regionalSubsidies = resolve => require(["@/web/views/userCenter/accumulatedIncome/regionalSubsidies"], resolve);
const platformSubsidies = resolve => require(["@/web/views/userCenter/accumulatedIncome/platformSubsidies"], resolve);
const withdrawalRecord = resolve => require(["@/web/views/userCenter/accumulatedIncome/withdrawalRecord"], resolve);

// 本地商圈
/* 商铺审核 */
const shopAudit = resolve => require(["@/web/views/shop/shopAudit/index"], resolve);
const auditShopInfo = resolve => require(["@/web/views/shop/shopAudit/auditShopInfo"], resolve);
/* 商铺列表 */
const shopList = resolve => require(["@/web/views/shop/shopList/index"], resolve);
const shopDetail = resolve => require(["@/web/views/shop/shopList/shopDetail"], resolve);
/* 商铺分类 */
const shopClassify = resolve => require(["@/web/views/shop/shopClassify/index"], resolve);
const addShopClassify = resolve => require(["@/web/views/shop/shopClassify/addShopClassify"], resolve);
const updateShopClassify = resolve => require(["@/web/views/shop/shopClassify/updateShopClassify"], resolve);

//  商品规格
/* 规格列表 */
const skuList = resolve => require(["@/web/views/sku/index"], resolve);
const addSku = resolve => require(["@/web/views/sku/addSku"], resolve);
const updateSku = resolve => require(["@/web/views/sku/updateSku"], resolve);

//  收款明细
const faceOrder = resolve => require(["@/web/views/face/index"], resolve);


/**
 * 默认导出
 * -- 导出清单
 * - VueRouter（ 路由实例 ）
 */
export default new VueRouter({
    mode: "hash", // 配置路由模式
    // mode: "history", // 配置路由模式
    routes: [
        {"path": "/", "name": "login", "meta": {"title": "登录"}, "component": login,},
        {"path": "/configuration", "name": "index", "meta": {"title": "商户后台管理"}, "component": index,
            "redirect": () => { // 重定向到路由
                return "/configuration";
            },
            "children": [
                {"path": "/configuration", "name": "configuration", "meta": {"title": "商户后台管理"}, "component": configIndex},
                {"path": "/updatePass", "name": "updatePass", "meta": {"title": "修改密码"}, "component": updatePass},
                {"path": "/test", "name": "test", "meta": {"title": "测试富文本编辑器页面"}, "component": test},
                {"path": "/testOne", "name": "testOne", "meta": {"title": "测试富文本编辑器页面"}, "component": testOne},
                {"path": "/testTwo", "name": "testTwo", "meta": {"title": "测试富文本编辑器页面"}, "component": testTwo},
                // ---- 首页模块
                /* 新增账户权限 */
                {"path": "/homes", "name": "homeIndex", "meta": {"title": "后台管理首页"},"component": homeIndex,},
                {"path": "/homes/jurisdiction", "name": "jurisdiction", "meta": {"title": "新增账户权限"},"component": jurisdiction,},
                {"path": "/homes/accountManage", "name": "accountManage", "meta": {"title": "账户管理"},"component": accountManage,},
                // ---- 运营模块
                /* 广告设置 */
                {"path": "/operate", "name": "operate", "meta": {"title": "广告设置"},"component": operate,},
                {"path": "/operate/addOperate", "name": "addition", "meta": {"title": "添加广告"},"component": addOperate,},
                {"path": "/operate/updateOperate", "name": "updateOperate", "meta": {"title": "编辑广告"},"component": updateOperate,},
                /* icon设置 */
                {"path": "/operate/iconList", "name": "iconList", "meta": {"title": "图标设置"},"component": iconList,},
                {"path": "/operate/iconIndex", "name": "iconIndex", "meta": {"title": "图标设置"},"component": iconIndex,},
                {"path": "/operate/addIcon", "name": "addIcon", "meta": {"title": "添加图标"},"component": addIcon,},
                {"path": "/operate/addIcons", "name": "addIcons", "meta": {"title": "添加图标"},"component": addIcons,},
                {"path": "/operate/updateIcon", "name": "updateIcon", "meta": {"title": "编辑图标"},"component": updateIcon,},
                /* 海报设置 */
                {"path": "/operate/posterList", "name": "posterList", "meta": {"title": "海报设置"},"component": posterList,},
                {"path": "/operate/addPoster", "name": "addPoster", "meta": {"title": "添加海报"},"component": addPoster,},
                /* 公告通知 */
                {"path": "/operate/notice", "name": "notice", "meta": {"title": "公告通知"},"component": notice,},

                // ---- 开通服务商管理模块
                /* 首页-待开通列表 */
                {"path": "/openServiceProvider", "name": "openServiceProvider", "meta": {"title": "开通服务商列表"},"component": openServiceProvider,},
                {"path": "/openServiceProvider/openInfo", "name": "openInfo", "meta": {"title": "开通服务商信息"},"component": openInfo,},

                // ---- 账单管理模块
                /* 首页-收款列表 */
                {"path": "/billList/billList", "name": "billList", "meta": {"title": "收款列表"},"component": billList,},
                /* 还款列表 */
                {"path": "/billList/repayment", "name": "repayment", "meta": {"title": "还款列表"},"component": repayment,},
                {"path": "/billList/withdrawDeposit", "name": "withdrawDeposit", "meta": {"title": "用户提现记录"},"component": withdrawDeposit,},
                {"path": "/billList/auditList", "name": "auditList", "meta": {"title": "服务商审核列表"},"component": auditList,},
                {"path": "/billList/auditInfo", "name": "auditInfo", "meta": {"title": "待审核服务商信息"},"component": auditInfo,},

                // ---- 商城模块
                /* 商品管理 */
                {"path": "/goods/statistics", "name": "statistics", "meta": {"title": "商城统计"},"component": statistics,},
                {"path": "/goods", "name": "goods", "meta": {"title": "商品列表"},"component": goods,},
                {"path": "/goods/modify", "name": "goods-modify", "meta": {"title": "更新商品"}, "component": goodsModify,},
                {"path": "/goods/goodsDetail", "name": "goodsDetail", "meta": {"title": "商品详情"}, "component": goodsDetail,},
                {"path": "/goods/addition", "name": "goods-addition", "meta": {"title": "新增商品"}, "component": goodsAdd},
                {"path": "/goods/addGoods", "name": "addGoods", "meta": {"title": "新增商品"}, "component": addGoods},
                {"path": "/goods/updateGoods", "name": "updateGoods", "meta": {"title": "修改商品"}, "component": updateGoods},
                // ---- 订单模块
                /* 订单管理 */
                {"path": "/order/orderList", "name": "orderList", "meta": {"title": "订单列表"},"component": orderList,},
                {"path": "/order/orderDetail", "name": "orderDetail", "meta": {"title": "订单详情"},"component": orderDetail,},
                /* 物流管理 */
                {"path": "/order/logistics", "name": "logistics", "meta": {"title": "物流列表"},"component": logistics,},

                // ---- 用户数据中心模块
                /* 首页 */
                {"path": "/userCenter", "name": "userCenter", "meta": {"title": "用户数据中心"},"component": userCenter,},
                /* 用户列表 */
                {"path": "/userCenter/userList", "name": "userList", "meta": {"title": "用户列表"},"component": userList,},
                {"path": "/userCenter/userDetail", "name": "userDetail", "meta": {"title": "用户详情"},"component": userDetail,},
                {"path": "/userCenter/billDetail", "name": "billDetail", "meta": {"title": "账单详情"},"component": billDetail,},
                {"path": "/userCenter/teamList", "name": "teamList", "meta": {"title": "团队列表"},"component": teamList,},
                /* vip列表 */
                {"path": "/userCenter/vipList", "name": "vipList", "meta": {"title": "PLUS会员列表"},"component": vipList,},
                /* 各城市用户列表 */
                {"path": "/userCenter/cityUserList", "name": "cityUserList", "meta": {"title": "各城市用户"},"component": cityUserList,},
                /* 执行服务商 */
                {"path": "/userCenter/agentList", "name": "agentList", "meta": {"title": "执行服务商"},"component": agentList,},
                {"path": "/userCenter/addAgent", "name": "addAgent", "meta": {"title": "升级执行服务商"},"component": addAgent,},
                /* 区域服务商 */
                {"path": "/userCenter/CountyLevelList", "name": "CountyLevelList", "meta": {"title": "区域服务商"},"component": CountyLevelList,},
                /* 城市合伙人【城市服务商】 */
                {"path": "/userCenter/partnerList", "name": "partnerList", "meta": {"title": "城市服务商"},"component": partnerList,},
                {"path": "/userCenter/addPartner", "name": "addPartner", "meta": {"title": "升级区域服务商"},"component": addPartner,},
                /* 申请城市合伙人列表 */
                {"path": "/userCenter/applyPartnerList", "name": "applyPartnerList", "meta": {"title": "申请区域服务商列表"},"component": applyPartnerList,},
                /* 累计收入 */
                {"path": "/userCenter/incomeIndex", "name": "incomeIndex", "meta": {"title": "累计收入"},"component": incomeIndex,},
                {"path": "/userCenter/upgradeSP", "name": "upgradeSP", "meta": {"title": "好友升级分润明细"},"component": upgradeSP,},
                {"path": "/userCenter/repaymentSP", "name": "repaymentSP", "meta": {"title": "好友还款分润明细"},"component": repaymentSP,},
                {"path": "/userCenter/proceedsSP", "name": "proceedsSP", "meta": {"title": "好友收款分润明细"},"component": proceedsSP,},
                {"path": "/userCenter/doCardSP", "name": "doCardSP", "meta": {"title": "办信用卡分润明细"},"component": doCardSP,},
                {"path": "/userCenter/regionalSubsidies", "name": "regionalSubsidies", "meta": {"title": "区域补贴明细"},"component": regionalSubsidies,},
                {"path": "/userCenter/recommendSP", "name": "recommendSP", "meta": {"title": "推荐奖励明细"},"component": recommendSP,},
                {"path": "/userCenter/consumeSP", "name": "consumeSP", "meta": {"title": "消费返佣明细"},"component": consumeSP,},
                {"path": "/userCenter/shoppingSP", "name": "shoppingSP", "meta": {"title": "商城奖励明细"},"component": shoppingSP,},
                {"path": "/userCenter/platformSubsidies", "name": "platformSubsidies", "meta": {"title": "平台补贴明细"},"component": platformSubsidies,},
                {"path": "/userCenter/withdrawalRecord", "name": "withdrawalRecord", "meta": {"title": "提现记录"},"component": withdrawalRecord,},


                // ---- 本地商圈模块
                /* 商铺分类 */
                {"path": "/shop/shopClassify", "name": "shopClassify", "meta": {"title": "商铺分类"},"component": shopClassify,},
                {"path": "/shop/addShopClassify", "name": "addShopClassify", "meta": {"title": "添加商铺分类"},"component": addShopClassify,},
                {"path": "/shop/updateShopClassify", "name": "updateShopClassify", "meta": {"title": "编辑商铺分类"},"component": updateShopClassify,},
                /* 商铺审核 */
                {"path": "/shop/shopAudit", "name": "shopAudit", "meta": {"title": "商铺审核列表"},"component": shopAudit,},
                {"path": "/shop/auditShopInfo", "name": "auditShopInfo", "meta": {"title": "商铺资质详情"},"component": auditShopInfo,},
                /* 商铺列表 */
                {"path": "/shop/shopList", "name": "shopList", "meta": {"title": "商铺列表"},"component": shopList,},
                {"path": "/shop/shopDetail", "name": "shopDetail", "meta": {"title": "商铺详情"},"component": shopDetail,},

                // ---- 商品规格模块
                /* 规格模板 */
                {"path": "/sku/skuList", "name": "skuList", "meta": {"title": "商品规格"},"component": skuList,},
                {"path": "/sku/addSku", "name": "addSku", "meta": {"title": "添加商品规格"},"component": addSku,},
                {"path": "/sku/updateSku", "name": "updateSku", "meta": {"title": "编辑商品规格"},"component": updateSku,},

                // ---- 收款明细模块
                {"path": "/face/faceOrder", "name": "faceOrder", "meta": {"title": "刷脸收款明细"},"component": faceOrder,},

            ],
        },
    ]
});
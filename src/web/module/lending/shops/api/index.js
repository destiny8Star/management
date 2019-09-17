/**
 * index Js
 * @JsName index
 * @Description 商铺（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 商铺 API
 */
const ShopsAPI = {
    obtainPaging: "/api/v1/lending/goods/paging/{tagType}/{goodsTag}/{page}", // 获取信息 , 分页获取 :: {page} : 页数
    remove: "/api/v1/lending/goods/{tagType}/{id}", // 删除信息 , 根据主键 :: {id} : 页数

    shopList: '/mall/user/store/list',//商铺列表
    shopDetail: '/mall/store/detail/{id}',//商铺详情
    putAwayShop: '/mall/store/sold/up/{id}',//上架商铺
    soldOutShop: '/mall/store/sold/out',//下架商铺
    shopClassify: '/mall/category/list',//商铺分类
    addShopClassify: '/mall/category/insert',//添加 + 商铺分类
    updateShopClassify: '/mall/category/update',// 商铺分类 + 更新
    shopClassifyDetail: '/mall/category/detail/{cid}',// 商铺分类 + 详情
    shopAuditList: '/mall/store/apply/List',// 商铺审核列表
    auditShopInfo: '/mall/store/apply/detail/{id}',// 商铺审核信息
    agreeShopAudit: '/mall/store/apply/isTrue/{id}',// 同意商铺审核
    disagreeShopAudit: '/mall/store/apply/applyRefused',// 拒绝商铺审核
};

/**agreeShop
 * 导出 or 默认导出
 * -- 导出清单
 * - shopList（ 商铺 列表 ）
 * - shopDetail（ 商铺 详情 ）
 * - putAwayShop（ 商铺 上架 ）
 * - soldOutShop（ 商铺 下架 ）
 * - shopClassify（ 商铺 分类 ）
 * - addShopClassify（ 商铺分类 - 添加 ）
 * - shopClassifyDetail（ 商铺分类 - 详情 ）
 * - updateShopClassify（ 商铺分类 - 更新 ）
 * - shopAuditList（ 商铺审核列表 ）
 * - auditShopInfo（ 商铺审核信息 ）
 * - agreeShopAudit（ 同意商铺审核 ）
 * - disagreeShopAudit（ 拒绝商铺审核 ）
 * - ShopsAPI（ 商铺 API ）
 */
export { ShopsAPI };
export default ShopsAPI;

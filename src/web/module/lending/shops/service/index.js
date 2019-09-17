/**
 * index Js
 * @JsName index
 * @Description 商铺（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 ShopsAPI 库
import ShopsAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 获取商铺列表
 */
const shopList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.shopList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取商铺详情
 */
const shopDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ShopsAPI.shopDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 上架商铺
 */
const putAwayShop = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ShopsAPI.putAwayShop, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 下架商铺
 */
const soldOutShop = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.soldOutShop, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取商铺分类
 */
const shopClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.shopClassify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加 - 商铺分类
 */
const addShopClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.addShopClassify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商铺分类 - 详情
 */
const shopClassifyDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ShopsAPI.shopClassifyDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商铺分类 - 更新
 */
const updateShopClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.updateShopClassify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商铺审核列表
 */
const shopAuditList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.shopAuditList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商铺审核信息
 */
const auditShopInfo = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ShopsAPI.auditShopInfo, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 通过商铺审核
 */
const agreeShopAudit = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(ShopsAPI.agreeShopAudit, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 拒绝商铺审核
 */
const disagreeShopAudit = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(ShopsAPI.disagreeShopAudit, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};



/**
 * API
 */
const api = ShopsAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - shopList（ 商铺列表 ）
 * - shopDetail（ 商铺详情 ）
 * - putAwayShop（ 商铺 上架 ）
 * - soldOutShop（ 商铺 下架 ）
 * - shopClassify（ 商铺分类 ）
 * - addShopClassify（ 商铺分类 - 添加 ）
 * - shopClassifyDetail（ 商铺分类 - 详情 ）
 * - updateShopClassify（ 商铺分类 - 更新 ）
 * - shopAuditList（ 商铺审核列表 ）
 * - auditShopInfo（ 商铺审核信息 ）
 * - agreeShopAudit（ 同意商铺审核 ）
 * - disagreeShopAudit（ 拒绝商铺审核 ）
 * - api ( API )
 */
export {shopList, shopDetail, putAwayShop, soldOutShop, shopClassify, addShopClassify, shopClassifyDetail, updateShopClassify, shopAuditList, auditShopInfo, agreeShopAudit, disagreeShopAudit, api };
export default {shopList, shopDetail, putAwayShop, soldOutShop, shopClassify, addShopClassify, shopClassifyDetail, updateShopClassify, shopAuditList, auditShopInfo, agreeShopAudit, disagreeShopAudit, api };



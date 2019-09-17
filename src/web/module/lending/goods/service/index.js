/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 GoodsAPI 库
import GoodsAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";



/**
 * 更新信息 , 添加or修改，【商品列表】
 */
const uploadGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.uploadGoods, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 更新信息 , 添加or修改--获取分类
 */
const goodsClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsClassify, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取商品名称
 */
const goodsName = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsName, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 搜索商品分类
 */
const searchGoodsClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.searchGoodsClassify, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商城统计
 */
const statisticsData = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.statisticsData, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 产品信息，【商品列表】
 */
const goodsList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.goodsList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 【商品列表】 顶部商品数量展示
 */
const goodsNo = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.goodsNo, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品
 */
const addGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.addGoods, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品 1.4.1 第三页 设置规格库存
 */
const addGoodsSkuStandard = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.addGoodsSkuStandard, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 下架
 */
const outGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.outGoods, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 上架
 */
const putGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.putGoods, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 删除商品信息
 */
const removeGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.removeGoods, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * 获取信息，某商品详情
 */
const goodsDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息，某商品详情 - 1.4.1 第二页
 */
const goodsDetailPT = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsDetailPT, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 获取信息，某商品详情 - 1.4.1 第三页
 */
const goodsDetailPTh = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsDetailPTh, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 修改信息，某商品常规详情 - 1.4.1 第二页
 */
const updateGoodsPT = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(GoodsAPI.updateGoodsPT, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取下级商品分类列表
 */
const nextClassify = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.nextClassify, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品 - 获取商品货号
 */
const goodsGetNo = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.goodsGetNo, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品 [获取规格库存设置列表] - 1.4.1
 */
const addGoodsSkuList = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(GoodsAPI.addGoodsSkuList, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = GoodsAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - goodsList（ 获取信息 , 产品信息 ）
 * - goodsDetail（ 获取信息 , 商品详情信息 ）
 * - uploadGoods（ 更新信息 , 添加or修改 ）
 * - goodsClassify（ 更新信息 , 添加or修改 -- 获取分类 ）
 * - searchGoodsClassify（ 更新信息 , 添加or修改 -- 搜索商品分类 ）
 * - removeGoods（ 删除商品 ）
 * - goodsName（ 获取商品名称 ）
 * - nextClassify（ 获取下级商品分类列表 ）
 * - addGoods（ 添加、修改商品）
 * - addGoodsSkuStandard（ 添加商品1.4.1 提交设置规格库存）
 * - goodsGetNo（ 添加商品 - 获取商品货号）
 * - addGoodsSkuList（ 添加商品 [获取规格库存设置列表] - 1.4.1）
 * - goodsDetailPT（ 添加商品 [获取规格库存设置列表] - 1.4.1）
 * - goodsDetailPTh（ 添加商品 [获取规格库存设置列表] - 1.4.1）
 * - updateGoodsPT（ 修改信息，某商品常规详情 - 1.4.1 第二页）
 * - outGoods（ 下架商品）
 * - putGoods（ 上架商品）
 * - api ( API )
 */
export {goodsList,goodsDetail, goodsDetailPT, goodsDetailPTh, updateGoodsPT, removeGoods, uploadGoods, goodsClassify, searchGoodsClassify, goodsName, nextClassify, addGoods, addGoodsSkuStandard, goodsGetNo, addGoodsSkuList, goodsNo, statisticsData, outGoods, putGoods, api };
export default {goodsList,goodsDetail, goodsDetailPT, goodsDetailPTh, updateGoodsPT, removeGoods, uploadGoods, goodsClassify, searchGoodsClassify, goodsName, nextClassify, addGoods, addGoodsSkuStandard, goodsGetNo, addGoodsSkuList, goodsNo, statisticsData, outGoods, putGoods, api };



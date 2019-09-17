/**
 * index Js
 * @JsName index
 * @Description sku（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 SkuAPI 库
import SkuAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 商品规格列表
 */
const skuList = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(SkuAPI.skuList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品 - 通过分类获取商品规格list
 */
const skuListByClassify = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(SkuAPI.skuListByClassify, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品 - 通过模板id获取规格list
 */
const standardListBySkuId = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(SkuAPI.standardListBySkuId, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 添加商品sku - 验证sku名称是否合法
 */
const skuName = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(SkuAPI.skuName, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商品规格列表 + 新增
 */
const skuAdd = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(SkuAPI.skuAdd, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商品规格列表 + 修改
 */
const skuUpdate = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(SkuAPI.skuUpdate, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商品规格列表 + 详情
 */
const skuDetail = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(SkuAPI.skuDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 商品规格列表 + 删除
 */
const skuRemove = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(SkuAPI.skuRemove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = SkuAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - skuList（ 商品规格列表 ）
 * - skuListByClassify（ 添加商品 - 通过分类获取商品规格list API ）
 * - standardListBySkuId（ 添加商品 - 通过模板id获取规格list API ）
 * - skuName（ 添加商品sku - 验证sku名称是否合法 API ）
 * - skuAdd（ 商品规格列表 + 新增 API ）
 * - skuUpdate（ 商品规格列表 + 修改 API ）
 * - skuDetail（ 商品规格列表 + 详情 ）
 * - skuRemove（ 商品规格列表 + 删除 ）
 * - api ( API )
 */
export { skuList, skuListByClassify, standardListBySkuId, skuName, skuAdd, skuUpdate, skuDetail, skuRemove, api };
export default { skuList, skuListByClassify, standardListBySkuId, skuName, skuAdd, skuUpdate, skuDetail, skuRemove, api };



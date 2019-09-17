/**
 * index Js
 * @JsName index
 * @Description 运营（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 OperateAPI 库
import OperateAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 广告列表
 */
const advertisingList = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(OperateAPI.advertisingList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 广告列表 + 新增or修改
 */
const advertisingUpdate = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(OperateAPI.advertisingUpdate, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 广告列表 + 详情
 */
const advertisingDetail = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(OperateAPI.advertisingDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 广告列表 + 删除
 */
const advertisingRemove = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(OperateAPI.advertisingRemove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 海报列表
 */
const posterList = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(OperateAPI.posterList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 海报列表 + 新增or修改
 */
const posterUpdate = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(OperateAPI.posterUpdate, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 海报列表 + 删除
 */
const posterRemove = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(OperateAPI.posterRemove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = OperateAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - advertisingList（ 广告列表 ）
 * - advertisingUpdate（ 广告列表 + 新增or修改 ）
 * - advertisingDetail（ 广告列表 + 详情 ）
 * - advertisingRemove（ 广告列表 + 删除 ）
 * - posterList（ 海报列表 ）
 * - posterUpdate（ 海报列表 + 新增or修改 ）
 * - posterRemove（ 海报列表 + 删除 ）
 * - api ( API )
 */
export { advertisingList, advertisingUpdate, advertisingDetail, advertisingRemove, posterList, posterUpdate, posterRemove, api };
export default { advertisingList, advertisingUpdate, advertisingDetail, advertisingRemove, posterList, posterUpdate, posterRemove, api };



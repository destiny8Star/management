/**
 * index Js
 * @JsName index
 * @Description sku（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 FaceAPI 库
import FaceAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 刷脸支付列表
 */
const faceList = (payload) => {
   return new Promise((resolve, reject) => AxiosPost(FaceAPI.faceList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 退款
 */
const refund = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(FaceAPI.refund, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = FaceAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - faceList（ 刷脸支付列表 ）
 * - refund（ 退款 API ）
 * - api ( API )
 */
export { faceList, refund, api };
export default { faceList, refund, api };



/**
 * index Js
 * @JsName index
 * @Description 公共（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author 杜
 */
// 引入 CommonAPI 库
import CommonAPI from "../api";
// Request 按需引入加载
import { AxiosPost, AxiosGet } from "@/web/request";

/**
 * 上传图片
 */
const uploadImg = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(CommonAPI.uploadImg, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 上传图片
 */
const sendCode = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(CommonAPI.sendCode, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 服务商信息【审核-开通列表时】
 */
const partnerInfo = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(CommonAPI.partnerInfo, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = CommonAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - uploadImg（ 上传图片 ）
 * - sendCode（ 发送验证码 API ）
 * - partnerInfo（ 服务商信息【审核-开通列表时】 API ）
 * - api ( API )
 */
export {uploadImg, sendCode, partnerInfo,  api };
export default {uploadImg, sendCode, partnerInfo,  api };



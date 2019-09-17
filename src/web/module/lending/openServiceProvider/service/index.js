/**
 * index Js
 * @JsName index
 * @Description 开通服务商（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 openServiceProviderAPI 库
import openServiceProviderAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosDelete, AxiosPost } from "@/web/request";
import OpenServiceProviderAPI from "../../openServiceProvider/api";

/**
 * 同意开通服务商
 */
const isOpen = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OpenServiceProviderAPI.isOpen, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = OpenServiceProviderAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - isOpen（ 同意开通服务商 ）
 * - api ( API )
 */
export {isOpen, api };
export default { isOpen, api };



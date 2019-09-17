/**
 * index Js
 * @JsName index
 * @Description 物流列表.
 * @DateTime 2019-03-19 11:39:22
 * @author Finn
 */
// 引入 LogisticsAPI 库
import LogisticsAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPost } from "@/web/request";

/**
 * 物流列表
 */
const logisticsList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(LogisticsAPI.logisticsList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 发货
 * -- {orderId} : 主键
 */
const sendGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(LogisticsAPI.sendGoods, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 发货
 * -- {orderId} : 主键
 */
const updateInfo = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(LogisticsAPI.updateInfo, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 备注
 * -- {orderId} : 主键
 */
const remark = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(LogisticsAPI.remark, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = LogisticsAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - logisticsList（ 获取物流列表 ）
 * - sendGoods（ 发货 ）
 * - updateInfo（ 修改物流信息 ）
 * - remark（ 备注 ）
 * - api ( API )
 */
export {logisticsList, sendGoods, updateInfo, remark, api };
export default { logisticsList, sendGoods, updateInfo, remark, api };



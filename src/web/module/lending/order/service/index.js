/**
 * index Js
 * @JsName index
 * @Description 订单列表.
 * @DateTime 2019-03-19 11:39:22
 * @author Finn
 */
// 引入 OrderAPI 库
import OrderAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPost } from "@/web/request";

/**
 * 物流列表
 */
const orderList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OrderAPI.orderList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 订单详情
 */
const orderDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OrderAPI.orderDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 发货
 * -- {orderId} : 主键
 */
const sendGoods = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OrderAPI.sendGoods, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 发货
 * -- {orderId} : 主键
 */
const updateInfo = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OrderAPI.updateInfo, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 备注
 * -- {orderId} : 主键
 */
const remark = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OrderAPI.remark, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = OrderAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - orderList（ 订单列表  ）
 * - orderDetail（ 订单详情  ）
 * - sendGoods（ 发货 ）
 * - updateInfo（ 修改物流信息 ）
 * - remark（ 备注 ）
 * - api ( API )
 */
export { orderList, orderDetail, sendGoods, updateInfo, remark, api };
export default { orderList, orderDetail, sendGoods, updateInfo, remark, api };



/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 物流列表 API
 */
const OrderAPI = {
    orderList: "/order/orderList", // 订单列表
    orderDetail: "order/orderList/{orderId}", // 订单详情
    updateInfo: "/order/orderModifyLogistics", // 修改物流信息
    remark: "/order/orderRemark/{orderId}", // 订单备注
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - orderList（ 订单列表  ）
 * - orderDetail（ 订单详情  ）
 * - OrderAPI（ 订单模块 API ）
 */
export { OrderAPI };
export default OrderAPI;

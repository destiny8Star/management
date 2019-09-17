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
const LogisticsAPI = {
    logisticsList: "/order/getByPage", // 物流信息 订单列表
    sendGoods: "/order/orderDelivery", // 发货
    updateInfo: "/order/orderModifyLogistics", // 修改物流信息
    remark: "/order/orderRemark/{orderId}", // 订单备注
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - LogisticsAPI（ 物流列表 API ）
 */
export { LogisticsAPI };
export default LogisticsAPI;

/**
 * index Js
 * @JsName index
 * @Description 刷脸订单模块（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author DLY
 */

/**
 * 运营 API
 */
const FaceAPI = {
    faceList: "/face/pay/order", // 刷脸支付列表
    refund: "/goods/sku/skuTemplateByCid/{cid}", // 退款
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - faceList（ 刷脸支付列表 API ）
 * - refund（ 退款 API ）
 */
export { FaceAPI };
export default FaceAPI;

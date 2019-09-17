/**
 * index Js
 * @JsName index
 * @Description 公共（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author 杜
 */

/**
 * 贷款产品 API
 */
const CommonAPI = {
    uploadImg: '/upImage/upload',//上传图片
    sendCode: '/code/send',//发送验证码
    partnerInfo: '/partner/detail/{id}',//服务商信息【审核-开通列表时】
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - uploadImg（ 上传图片 API ）
 * - sendCode（ 发送验证码 API ）
 * - partnerInfo（ 服务商信息【审核-开通列表时】 API ）
 */
export { CommonAPI };
export default CommonAPI;

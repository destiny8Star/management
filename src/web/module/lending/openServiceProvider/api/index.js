/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 累计收入 API
 */
const openServiceProviderAPI = {
    isOpen: "/partner/apply/true/{id}", // 同意开通
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - isOpen（ 同意开通 API ）
 */
export { openServiceProviderAPI };
export default openServiceProviderAPI;

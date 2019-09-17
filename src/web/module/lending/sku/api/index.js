/**
 * index Js
 * @JsName index
 * @Description sku模块（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 运营 API
 */
const SkuAPI = {
    skuList: "/goods/sku/skuTemplateList", // 商品规格列表
    skuListByClassify: "/goods/sku/skuTemplateByCid/{cid}", // 添加商品 - 通过分类获取模板list
    standardListBySkuId: "/goods/sku/skuItemList/{templateId}", // 添加商品 - 通过模板id获取规格list
    skuName: "/goods/sku/verifySkuTemplateName/{name}", // 添加商品sku - 验证sku名称是否合法
    skuAdd: "/goods/sku/addSkuTemplate", // 商品规格列表 + 新增
    skuUpdate: "/goods/sku/updateSkuTemplate", // 商品规格列表 + 修改
    skuDetail: "/goods/sku/skuTemplateDetail/{id}", // 商品规格列表 + 详情
    skuRemove: "/goods/sku/delSkuTemplate/{id}", // 商品规格列表 + 删除
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - skuList（ 商品规格列表 API ）
 * - skuListByClassify（ 添加商品 - 通过分类获取商品规格list API ）
 * - standardListBySkuId（ 添加商品 - 通过模板id获取规格list API ）
 * - skuName（ 添加商品sku - 验证sku名称是否合法 API ）
 * - skuAdd（ 商品规格列表 + 新增 API ）
 * - skuUpdate（ 商品规格列表 + 修改 API ）
 * - skuDetail（ 商品规格列表 + 详情 API ）
 * - skuRemove（ 商品规格列表 + 删除 API ）
 */
export { SkuAPI };
export default SkuAPI;

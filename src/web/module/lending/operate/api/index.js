/**
 * index Js
 * @JsName index
 * @Description 运营模块（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 运营 API
 */
const OperateAPI = {
    advertisingList: "/banner/advertising", // 广告列表
    advertisingUpdate: "/banner/advertising/add", // 广告列表 + 新增or修改
    advertisingDetail: "/banner/advertising/detail", // 广告列表 + 详情
    advertisingRemove: "/banner/advertising/delete", // 广告列表 + 删除
    posterList: "/banner/posterList", // 海报列表
    posterUpdate: "/banner/poster", // 海报列表 + 新增or编辑
    posterRemove: "/banner/poster/deleted/{id}", // 海报列表 + 删除
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - advertisingList（ 广告列表 API ）
 * - advertisingAdd（ 广告列表 + 新增or修改 API ）
 * - advertisingDetail（ 广告列表 + 详情 API ）
 * - advertisingRemove（ 广告列表 + 删除 API ）
 * - posterList（ 海报列表 API ）
 * - posterRemove（ 海报列表 + 删除 API ）
 */
export { OperateAPI };
export default OperateAPI;

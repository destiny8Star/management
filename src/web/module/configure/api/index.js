/**
 * index Js
 * @JsName index
 * @Description 配置信息（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 配置信息 API
 */
const ConfigureAPI = {
    obtainAll: "/api/v1/configure/all", // 获取全部
    obtain: "/api/v1/configure/{code}", // 获取信息 , 根据条件 :: {code} : 编码
    modify: "/api/v1/configure/modify", // 更新信息 , 根据条件

};

const OutcomesDataApi = {
    goodsReport: "/api/v1/statistics/goods/report", // 获取运营数据pv、uv
}

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - ConfigureAPI（ 配置信息 API ） 
 */
export { ConfigureAPI, OutcomesDataApi };
export default{ ConfigureAPI, OutcomesDataApi };

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
const accumulatedIncomeAPI = {
    incomeIndex: "/revenue/user/ByUserId/{userId}", // 获取信息 , 累计收入-首页
    awardDetailList: "/revenue/list/type", // 获取信息 , 累计收入-8种奖励明细列表
    withdrawList: "/revenue/withdrawal/list/userId", // 获取信息 , 累计收入-提现记录
    withdraw: "/revenue/withdrawal/{userId}", // 获取信息 , 累计收入-提现记录【头部】
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - incomeIndex（ 累计收入-首页 API ）
 * - awardDetailList（ 累计收入-8种奖励明细列表 API ）
 * - withdrawList（ 累计收入-提现记录 API ）
 * - withdraw（ 累计收入-提现记录【头部】 API ）
 */
export { accumulatedIncomeAPI };
export default accumulatedIncomeAPI;

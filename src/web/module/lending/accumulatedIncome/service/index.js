/**
 * index Js
 * @JsName index
 * @Description 累计收入（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 accumulatedIncomeAPI 库
import accumulatedIncomeAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 获取信息 , 累计收入 - 首页
 * -- {userId} : 用户id
 */
const incomeIndex = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(accumulatedIncomeAPI.incomeIndex, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 累计收入 - 8种奖励明细列表
 */
const awardDetailList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(accumulatedIncomeAPI.awardDetailList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 获取信息 , 累计收入 - 提现记录
 */
const withdrawList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(accumulatedIncomeAPI.withdrawList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * 获取信息 , 累计收入 - 提现记录[头部数据]
 */
const withdraw = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(accumulatedIncomeAPI.withdraw, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = accumulatedIncomeAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - incomeIndex（ 累计收入 - 首页 API ）
 * - awardDetailList（ 累计收入 - 8种奖励明细列表 API ）
 * - withdrawList（ 累计收入 - 提现列表 API ）
 * - withdraw（ 累计收入 - 提现列表[头部] API ）
 * - api ( API )
 */
export {incomeIndex, awardDetailList, withdrawList, withdraw, api };
export default { incomeIndex, awardDetailList, withdrawList, withdraw, api };



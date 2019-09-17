/**
 * index Js
 * @JsName index
 * @Description 账单管理（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 BillListAPI 库
import BillListAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 获取信息 , 分页获取
 * -- {page} : 页数
 */
const obtainPaging = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(BillListAPI.obtainPaging, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(BillListAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const remove = (payload) => {
    return new Promise((resolve, reject) => AxiosDelete(BillListAPI.remove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 保存信息 , 产品信息
 */
const addition = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(BillListAPI.addition, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
 };

/**
 * 更新信息 , 产品信息
 */
const modify = (payload) => {
   return new Promise((resolve, reject) => AxiosPut(BillListAPI.modify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 同意审核通过
 */
const isAudit = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(BillListAPI.isAudit, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 还款列表
 */
const repaymentList = (payload) => {
   return new Promise((resolve, reject) => AxiosGet(BillListAPI.repaymentList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = BillListAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - selectTagsByBigTag（ 获取标签 :: {tagType} 类别 ）
 * - obtainPaging（ 获取信息 , 分页获取 :: {page} : 页数 ）
 * - obtain（ 获取信息 , 根据主键 :: {id} : 主键 ）
 * - remove（ 删除信息 , 根据主键 :: {id} : 主键 ）
 * - addition（ 保存信息 , 产品信息 ）
 * - modify（ 更新信息 , 产品信息 ）
 * - isAudit（ 同意审核，通过 ）
 * - repaymentList（ 还款列表 ）
 * - api ( API )
 */
export {obtainPaging, obtain, remove, addition, modify, isAudit, repaymentList,  api };
export default { obtainPaging, obtain, remove, addition, modify, isAudit, repaymentList,  api };



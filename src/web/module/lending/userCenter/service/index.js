/**
 * index Js
 * @JsName index
 * @Description 用户数据中心（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 UserCenterAPI 库
import UserCenterAPI from "../api";
// Request 按需引入加载
import { AxiosPost, AxiosGet } from "@/web/request";

/**
 * 获取列表数据，用户数据中心
 */
const list = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.list, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取各条数据总数 + 当日各条数据, 根据主键用户数据中心
 */
const total = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.total, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户列表】
 */
const userList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.userList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户详情】
 */
const userDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserCenterAPI.userDetail, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户详情-信用卡账单详情】
 */
const bankBillDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.bankBillDetail, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户详情-信用卡账单详情】
 */
const bankBillPlanDetail = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.bankBillPlanDetail, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户详情-->团队列表{直邀好友}】
 */
const teamInvite = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserCenterAPI.teamInvite, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【用户详情-->团队列表{团队}】
 */
const teamList = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserCenterAPI.teamList, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【获取vip，一级代理，城市合伙列表】
 */
const multilevelList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.multilevelList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【服务商 申请列表】
 */
const applyList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.applyList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【是否同意 申请】
 */
const isAgreeApply = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.isAgreeApply, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【 申请 - 备注 】
 */
const remark = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(UserCenterAPI.remark, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【 服务商列表 - 待审核/开通 】
 */
const partnerList = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.partnerList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 用户数据中心 【 服务商列表 - 申请成为区域服务商 】
 */
const addPartner = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(UserCenterAPI.addPartner, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * API
 */
const api = UserCenterAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - list（ 获取列表数据，用户数据中心 ）
 * - total（ 获取各条数据总数 + 当日各条数据, 根据主键用户数据中心 ）
 * - userList（ 用户数据中心 【用户列表】 ）
 * - userDetail（ 用户数据中心 【用户详情】 ）
 * - bankBillDetail（ 用户数据中心 【用户详情-信用卡账单详情】 ）
 * - bankBillPlanDetail（ 用户数据中心 【用户详情-信用卡账单详情-还款计划详情】 ）
 * - teamInvite（ 用户数据中心 【用户详情-->团队列表{直邀好友}】 ）
 * - teamList（ 用户数据中心 【用户详情-->团队列表{团队}】 ）
 * - multilevelList（【获取vip，一级代理，城市合伙列表】 ）
 * - applyList（【服务商申请列表】 ）
 * - isAgreeApply（【是否同意申请】 ）
 * - remark（【申请 - 备注】 ）
 * - partnerList（【服务商列表 - 待审核/开通】 ）
 * - addPartner（【服务商列表 - 申请成为区域服务商】 ）
 * - api ( API )
 */
export {list, total, userList, userDetail, bankBillDetail, bankBillPlanDetail , teamInvite, teamList, multilevelList, applyList, isAgreeApply, remark, partnerList, addPartner, api };
export default { list, total, userList, userDetail, bankBillDetail, bankBillPlanDetail , teamInvite, teamList, multilevelList, applyList, isAgreeApply, remark, partnerList, addPartner, api };



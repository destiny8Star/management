/**
 * index Js
 * @JsName index
 * @Description 用户数据中心（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 用户数据中心 API
 */
const UserCenterAPI = {
    list: "/user/data/count/list", // 用户数据中心 【列表】
    total: "/user/data/count/home", // 用户数据中心 【顶部数据总数展示 + 今日数据展示】
    userList: "/user/data/userList/list", // 用户数据中心 【用户列表】
    userDetail: "/user/data/userList/account", // 用户数据中心 【用户详情】
    bankBillDetail: "/bill/BillDetail", // 用户数据中心 【用户详情-信用卡账单详情】
    bankBillPlanDetail: "/bill/PlaneDetail", // 用户数据中心 【用户详情-信用卡账单详情-还款计划详情】
    teamInvite: "/user/data/userList/invite/", // 用户数据中心 【用户详情-->团队列表{直邀好友}】
    teamList: "/user/data/userList/teamList/", // 用户数据中心 【用户详情-->团队列表{团队}】
    multilevelList: "/user/data/view/user/vip", // 用户数据中心 【获取vip，一级代理，城市合伙列表】
    applyList: "/user/data/view/user/apply", // 用户数据中心 【申请区域服务商列表】
    isAgreeApply: "/user/data/view/user/applyAudit", // 用户数据中心 【是否同意申请】
    remark: "/user/data/{cityPartnerId}/remark", // 用户数据中心 【申请 - 备注】


    partnerList: "/partner/list", // 用户数据中心 【服务商列表 - 待审核/开通】
    addPartner: "/partner/insert", // 用户数据中心 【服务商列表 - 申请成为区域服务商】
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - list（ 用户数据中心 【列表】 ）
 * - total（ 用户数据中心 【顶部数据总数展示 + 今日数据展示】 ）
 * - userList（ 用户数据中心 【用户列表】 ）
 * - userDetail（ 用户数据中心 【用户详情】 ）
 * - bankBillDetail（ 用户数据中心 【用户详情-信用卡账单详情】 ）
 * - bankBillPlanDetail（ 用户数据中心 【用户详情-信用卡账单详情-还款计划详情】 ）
 * - teamInvite（【用户详情-->团队列表{直邀好友}】 ）
 * - teamList（【用户详情-->团队列表{团队}】 ）
 * - multilevelList（【获取vip，一级代理，城市合伙列表】 ）
 * - applyList（【申请区域服务商列表】 ）
 * - isAgreeApply（【是否同意申请】 ）
 * - remark（【申请 - 备注】 ）
 * - partnerList（【服务商列表 - 待审核/开通】 ）
 * - addPartner（【服务商列表 - 申请成为区域服务商】 ）
 * - GoodsAPI（ 用户数据中心 API ）
 */
export { UserCenterAPI };
export default UserCenterAPI;

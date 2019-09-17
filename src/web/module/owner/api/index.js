/**
 * index Js
 * @JsName index
 * @Description 管理员信息（ 模块 ）API.
 * @DateTime 2018-12-22 20:39:22
 * @author 馒头
 */

/**
 * 管理员信息 API
 */
const OwnerAPI = {
    logIn: "/user/login/on", // 登录认证 , 根据条件
    logOut: "/user/login/out", // 退出登录
    logEdit: "/user/login/updatePw", // 修改密码
    forgotEdit: "/user/login/reset/password", // 忘记密码-修改密码
    sendCode: "/user/login/smsCode/{mobile}", // 发送短信验证码


    homeData: "/home/data", // 首页数据
    sideList: "/account/view/list", // 侧导航, 动态显示
    addAccount: "/account/view/list/permissions", // 新增账户权限
    accountList: "/account/view/user/list", // 所有账户列表
    accountInfo: "/account/view/user/permissions/", // 某个账户所有权限
    removeAccount: "/account/view/user/delete", // 删除某个账户
    editAccount: "/account/view/user/permissions/update", // 编辑某个账户权限
}
/**
 * 导出 or 默认导出
 * -- 导出清单
 * - OwnerAPI（ 管理员信息 API ） 
 */
export { OwnerAPI };
export default OwnerAPI;

/**
 * index Js
 * @JsName index
 * @Description 管理员信息（ 模块 ）服务.
 * @DateTime 2018-12-22 20:39:22
 * @author 馒头
 */
// 引入 OwnerAPI 库
import OwnerAPI from "../api";
// Request 按需引入加载
import { AxiosPost, AxiosGet, AxiosDelete } from "@/web/request";
import GoodsAPI from "../../lending/goods/api";

/**
 * 登录认证 , 根据条件
 */
const logIn = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OwnerAPI.logIn, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 退出登录
 */
const logOut = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OwnerAPI.logOut, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 修改密码
 */
const logEdit = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OwnerAPI.logEdit, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 忘记密码-修改密码
 */
const forgotEdit = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OwnerAPI.forgotEdit, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 发送短信验证码
 */
const sendCode = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(OwnerAPI.sendCode, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 首页数据
 */
const homeData = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OwnerAPI.homeData, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 侧导航，动态显示
 */
const sideList = (payload) => {
        return new Promise((resolve, reject) => AxiosGet(OwnerAPI.sideList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
    };

/**
 * 新增账户+权限
 */
const addAccount = (payload) => {
        return new Promise((resolve, reject) => AxiosPost(OwnerAPI.addAccount, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
    };

/**
 * 所有账户列表
 */
const accountList = (payload) => {
        return new Promise((resolve, reject) => AxiosPost(OwnerAPI.accountList, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
    };


/**
 * 某个账户所有权限
 */
const accountInfo = (payload) => {
        return new Promise((resolve, reject) => AxiosGet(OwnerAPI.accountInfo, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
    };

/**
 * 删除某个账户
 */
const removeAccount = (payload) => {
    return new Promise((resolve, reject) => AxiosDelete(OwnerAPI.removeAccount, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * 编辑某个账户-权限
 */
const editAccount = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(OwnerAPI.editAccount, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};


/**
 * 导出 or 默认导出
 * -- 导出清单
 * - logIn（ 登录认证 , 根据条件 ）
 * - logOut（ 退出登录 ）
 * - logEdit（ 修改密码 ）
 * - forgotEdit（ 忘记密码-修改密码 ）
 * - sendCode（ 发送短信验证码 ）
 * - homeData（ 首页数据 ）
 */
export { logIn ,logOut, logEdit, forgotEdit, sendCode, homeData, sideList , addAccount ,accountList , accountInfo , removeAccount ,editAccount};
export default { logIn ,logOut, logEdit, forgotEdit, sendCode, homeData, sideList , addAccount , accountList , accountInfo , removeAccount , editAccount};



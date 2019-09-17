/**
 * index Js
 * @JsName index
 * @Description 产品标签（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
// 引入 TagsAPI 库
import TagsAPI from "../api";
// Request 按需引入加载
import { AxiosGet, AxiosPut, AxiosDelete, AxiosPost } from "@/web/request";

/**
 * 获取信息 , 启用标签
 */
const obtainAll = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(TagsAPI.obtainAll, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 分页获取
 * -- {page} : 页数
 */
const obtainPaging = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(TagsAPI.obtainPaging, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const obtain = (payload) => {
    return new Promise((resolve, reject) => AxiosGet(TagsAPI.obtain, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 获取
 */
const selectTagsByBigTag = (payload) => {
    return new Promise((resolve, reject) => AxiosPut(TagsAPI.selectTagsByBigTag, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};
/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const selectCreditTags = (payload) => {
    return new Promise((resolve, reject) => AxiosPut(TagsAPI.selectCreditTags, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 获取信息 , 根据主键
 * -- {id} : 主键
 */
const remove = (payload) => {
    return new Promise((resolve, reject) => AxiosDelete(TagsAPI.remove, { "params": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * 保存信息 , 产品信息
 */
const addition = (payload) => {
    return new Promise((resolve, reject) => AxiosPost(TagsAPI.addition, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
 };

/**
 * 更新信息 , 产品信息
 */
const modify = (payload) => {
   return new Promise((resolve, reject) => AxiosPut(TagsAPI.modify, { "data": payload }).then(({ data }) => resolve(data)).catch(err => reject(err)));
};

/**
 * API
 */
const api = TagsAPI;

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - obtainAll（ 获取信息 , 启用标签 ）
 * - obtainPaging（ 获取信息 , 分页获取 :: {page} : 页数 ）
 * - obtain（ 获取信息 , 根据主键 :: {id} : 主键 ）
 * - remove（ 删除信息 , 根据主键 :: {id} : 主键 ）
 * - addition（ 保存信息 , 产品信息 ）
 * - modify（ 更新信息 , 产品信息 ）
 * - api ( API )
 */
export { selectCreditTags, selectTagsByBigTag, obtainAll, obtainPaging, obtain, remove, addition, modify, api };
export default { selectCreditTags, selectTagsByBigTag, obtainAll, obtainPaging, obtain, remove, addition, modify, api };



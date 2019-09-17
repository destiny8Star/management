/**
 * index Js
 * @JsName index
 * @Description 产品标签（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 产品标签 API
 */
const TagsAPI = {
    selectCreditTags: "/api/v1/lending/goods/tag/selectCreditTags",//获取信用卡小标签
    selectTagsByBigTag: "/api/v1/lending/goods/tag/selectTagsByBigTag",//获取列表标签
    obtainAll: "/api/v1/lending/goods/tag/all/{tagType}", // 获取全部 , 启用标签
    obtainPaging: "/api/v1/lending/goods/tag/paging/{tagType}/{page}", // 获取信息 , 分页获取 :: {page} : 页数
    obtain: "/api/v1/lending/goods/tag/{id}", // 获取信息 , 根据主键 :: {id} : 主键
    remove: "/api/v1/lending/goods/tag/{id}", // 删除信息 , 根据主键 :: {id} : 页数
    addition: "/api/v1/lending/goods/tag", // 保存信息 :: 产品信息
    modify: "/api/v1/lending/goods/tag", // 更新信息 :: 产品信息
    upload: "/api/v1/lending/goods/tag/upload", // 上传文件
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - TagsAPI（ 产品标签 API ） 
 */
export { TagsAPI };
export default TagsAPI;

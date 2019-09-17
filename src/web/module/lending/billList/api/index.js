/**
 * index Js
 * @JsName index
 * @Description 账单管理（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 账单管理 API
 */
const BillListAPI = {
    obtainPaging: "/api/v1/lending/goods/paging/{tagType}/{billListTag}/{page}", // 获取信息 , 分页获取 :: {page} : 页数
    obtain: "/api/v1/lending/billList/{tagType}/{id}", // 获取信息 , 根据主键 :: {id} : 主键
    remove: "/api/v1/lending/billList/{tagType}/{id}", // 删除信息 , 根据主键 :: {id} : 页数
    addition: "/api/v1/lending/billList", // 保存信息 :: 产品信息
    modify: "/api/v1/lending/billList", // 更新信息 :: 产品信息
    upload: "/api/v1/lending/billList/upload", // 上传文件
    isAudit: "/partner/apply/{id}", // 同意审核通过
    repaymentList: "/bill/refund/list",//还款列表
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - BillListAPI（ 账单管理 API ）
 */
export { BillListAPI };
export default BillListAPI;

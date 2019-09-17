/**
 * lending Js
 * @JsName index
 * @Description Lending 贷款信息（ 模块 ）服务.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
import Goods from "./goods";
import Tags from "./tags";
import Logistics from "./logistics";
import Order from "./order";
import UserCenter from "./userCenter";
import Common from "./common";
import Operate from "./operate";
import AccumulatedIncome from "./accumulatedIncome";
import BillList from "./billList";
import OpenServiceProvider from "./openServiceProvider";
import Shops from "./shops";
import Sku from "./sku";
import Face from "./face";

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - Goods ( 贷款产品（ 模块 ）服务 )
 * - Logistics ( 物流管理（ 模块 ）服务 )
 * - Order ( 订单管理（ 模块 ）服务 )
 * - UserCenter ( 用户数据中心（ 模块 ）服务 )
 * - Common ( 公共（ 模块 ）服务 )
 * - Operate ( 运营（ 模块 ）服务 )
 * - AccumulatedIncome ( 累计收入（ 模块 ）服务 )
 * - OpenServiceProvider ( 开通服务商（ 模块 ）服务 )
 * - BillList ( 账单（ 模块 ）服务 )
 * - Shops ( 商铺（ 模块 ）服务 )
 * - Sku ( 商品sku（ 模块 ）服务 )
 * - Face ( 刷脸收款（ 模块 ）服务 )
 * - Tags ( 产品标签（ 模块 ）服务 )
 */
export { Goods, Tags, Logistics, Order, UserCenter, Common, Operate, AccumulatedIncome ,BillList, OpenServiceProvider, Shops, Sku, Face };
export default { Goods, Tags, Logistics, Order, UserCenter, Common, Operate, AccumulatedIncome ,BillList, OpenServiceProvider, Shops, Sku, Face };

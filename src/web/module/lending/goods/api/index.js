/**
 * index Js
 * @JsName index
 * @Description 贷款产品（ 模块 ）API.
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */

/**
 * 贷款产品 API
 */
const GoodsAPI = {
    uploadGoods: '/mall/goods/update',//商品列表 添加or修改商品【更新】
    goodsClassify: '/mall/category',//商品列表 添加商品-获取分类
    goodsName: '/mall/goods/number/{number}',//商品列表 添加商品-获取名称
    searchGoodsClassify: '/goods/category/searchCate/{cateName}',//商品列表 添加商品-搜索商品分类

    statisticsData: '/statistics/getData',//统计数据
    goodsList: '/goods/list',//商品列表 信息
    goodsNo: '/goods/goodsNo',//商品列表顶部 商品数量
    // addGoods: '/goods/add',//商品列表 添加 or 修改
    outGoods: '/goods/goodsSoldOut/{goodsId}',//商品列表 下架
    putGoods: '/goods/goodsPutaway/{goodsId}',//商品列表 上架
    removeGoods: '/goods/goodsDelete/{goodsId}',//商品列表 删除
    goodsDetail: '/goods/goodsDetail/{goodsId}',//商品列表 某商品详情
    nextClassify: '/goods/category/getByParentId/{parentId}',//商品列表 添加商品-获取下一级分类列表

    //    1.4.1
    goodsGetNo: '/goods/sku/goodsNo',//商品列表 添加 - 获取商品货号
    addGoods: '/goods/sku/addGoods',//商品列表 添加 or 修改 - 1.4.1
    updateGoodsPT: '/goods/sku/updateGoods',//商品列表 修改常规信息 - 第二页【PT：pageTwo】 - 1.4.1
    addGoodsSkuStandard: '/goods/sku/addGoodsSku',//添加商品 添加 or 修改 第三页 - 1.4.1
    addGoodsSkuList: '/goods/sku/goodsSkuList/{goodsId}',//商品列表 [获取规格库存设置列表] - 1.4.1
    goodsDetailPT: '/goods/sku/goodsInfo/{goodsId}',//商品详情 - 第二页 【PT：pageTwo】
    goodsDetailPTh: '/goods/sku/goodsSkuInfo/{goodsId}',//商品详情 - 第三页 【PTh：pageThree】
};

/**
 * 导出 or 默认导出
 * -- 导出清单
 * - GoodsAPI（ 贷款产品 API ） 
 */
export { GoodsAPI };
export default GoodsAPI;

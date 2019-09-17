<template>
    <div id="goodsDetail">
        <div class="content" v-loading="isLoading">
            <!-- 第一页 start -->
            <div class="classifyBox" v-show="onePage">
                <div class="back">
                    <el-button type="text" icon="el-icon-arrow-left" @click="goOne">返回</el-button>
                </div>
                <div class="search">
                    <span>搜索商品分类：</span>
                    <el-input v-model="inputClassify" placeholder="请搜索"></el-input>
                </div>
                <div class="itemBox">
                    <!--   一级分类   -->
                    <div class="item">
                        <p>请选择一级分类</p>
                        <p @click="choClassify(ele,i,1)" :class="{act:oneIndex==i}" v-for="(ele,i) in oneClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   二级分类   -->
                    <div class="item">
                        <p>请选择二级分类</p>
                        <p @click="choClassify(ele,i,2)" :class="{act:twoIndex==i}" v-for="(ele,i) in twoClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   三级分类   -->
                    <div class="item">
                        <p>请选择三级分类</p>
                        <p @click="choClassify(ele,i,3)" :class="{act:threeIndex==i}" v-for="(ele,i) in threeClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                </div>
                <p class="showClassify">
                    您当前选择的商品类别是：
                    <span v-for="(ele,i) in chooseClassify" :key="i"><i v-show="i!=0">-</i>{{ele.text}}</span>
                </p>
                <div class="oneNext">
                    <el-button @click="updateClassify" type="primary" round>确认修改</el-button>
                </div>
            </div>
            <!-- 第一页end -->


            <!-- 第二页 start -->
            <div class="infoBox SKUBox" v-show="twoPage">
                <!--<div class="back">-->
                    <!--<el-button type="text" icon="el-icon-arrow-left" @click="goOne">返回</el-button>-->
                <!--</div>-->
                <h1>通用信息</h1>
                <div class="row">
                    <h2>商品分类：</h2>
                    <div>
                        <span v-for="(ele,i) in chooseClassify" :key="i"><i style="margin: 0 3px" v-show="i!=0">-</i>{{ele.text}}</span>
                        <!--<img class="editImg" src="../../../assets/img/views/goods/editClassify@2x.png" alt="" @click='goOne()'>-->
                    </div>

                </div>
                <div class="row">
                    <h2>商品名称：</h2>
                    <div>
                        <span>{{goodsName}}</span>
                    </div>
                </div>
                <div class="row">
                    <h2>商品描述：</h2>
                    <div>
                        <span>{{goodsDescribe}}</span>
                    </div>
                </div>
                <div class="row">
                    <h2>商品条形码：</h2>
                    <div>
                        <span>{{goodsBarCode}}</span>
                    </div>
                </div>
                <div class="row">
                    <h2>默认统一价：</h2>
                    <div>
                        <span>{{goodsBarCode}}</span>
                    </div>
                </div>
                <div class="row">
                    <h2>外部图：</h2>
                    <div>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    </div>
                </div>
                <div class="row">
                    <h2>配送方式：</h2>
                    <div>
                        <span>商家直接发货</span>
                    </div>
                </div>
                <div class="row">
                    <h2>默认运费：</h2>
                    <div>
                        <span>部分地方包邮（新疆、内蒙古、青海、四川、宁夏地区除外）</span>
                    </div>
                </div>
                <div class="row">
                    <h2>退换货：</h2>
                    <div>
                        <span>15天无忧退换货</span>
                    </div>
                </div>
                <div class="row">
                    <h2>详情图文：</h2>
                    <div>
                        <div class="detail" v-html="content"></div>
                    </div>
                </div>
                <div class="row">
                    <h2>备注：</h2>
                    <div>
                        <span>{{goodsRemark?goodsRemark:'无'}}</span>
                    </div>
                </div>

                <div class="row">
                    <h2>商品轮播图：</h2>
                    <div class="bannerBox">
                        <div v-for="(ele,i) in bannerImg" :key="i">
                            <img style="width: 100%;height: 100%;" :src="ele.url" alt="">
                        </div>

                    </div>
                </div>
                <div class="row">
                    <h2>消费返利：</h2>
                    <div>
                        <span>{{consume}}%</span>
                    </div>
                </div>
                <div class="row">
                    <h2>推荐奖励：</h2>
                    <div>
                        <span>{{recommend}}%</span>
                    </div>
                </div>
                <div class="tableBox">
                    <h2>规格库存设置：</h2>
                    <!--:span-method="objectSpanMethod1"-->
                    <el-table
                            :header-cell-style="{background:'#fafafa'}"
                            border
                            :data="skuTable"
                            :height="tableHeight"
                            :span-method="objectSpanMethod1"
                            style="width: 80%">
                        <el-table-column
                                v-if="skuOne"
                                :key="1"
                                prop="skuName1"
                                label="规格一">
                        </el-table-column>
                        <el-table-column
                                v-if="skuTwo"
                                :key="2"
                                prop="skuName2"
                                label="规格二">
                        </el-table-column>
                        <el-table-column
                                v-if="skuThree"
                                :key="3"
                                prop="skuName3"
                                label="规格三">
                        </el-table-column>
                        <el-table-column
                                :key="4"
                                prop="stock"
                                label="库存">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.stock" @blur="isStock(scope.row)" type="number"
                                          placeholder="请输入库存"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="5"
                                prop="price"
                                label="供货价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price" @blur="isPrice(scope.row)" type="number"
                                          placeholder="请输入供货价"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="6"
                                prop="skuPic"
                                label="规格缩略图">
                            <template slot-scope="scope">
                                <img v-if="scope.row.skuPic" :src="scope.row.skuPic" class="avatar">
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="7"
                                prop="skuNo"
                                label="商品规格号">
                        </el-table-column>
                        <!--<el-table-column-->
                        <!--prop="weightVal"-->
                        <!--label="重量(g)">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-input v-model="scope.row.weightVal" type="number" placeholder="请输入重量"></el-input>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </div>
                <div class="btnBox">
                    <el-button type="primary" @click="submit">确认修改</el-button>
                    <!--<el-button type="danger" @click="outLine">下架</el-button>-->
                </div>
            </div>
            <!-- 第三页end -->
        </div>
    </div>
</template>

<script>
    import {Goods, Tags} from "@/web/module/lending";

    export default {
        name: "goodsDetail",
        data() {
            return {
                "isLoading": true,
                "tableHeight": 600,
                "goodsId": '',//商品id
                "onePage": false,//第一页状态【true：显示；false：隐藏】
                "twoPage": true,//第二页状态【true：显示；false：隐藏】
                "threePage": false,//第三页状态【true：显示；false：隐藏】
                /* 第一页 */
                "inputClassify": '',//搜索分类输入框
                "oneClassify": [],
                "twoClassify": [],
                "threeClassify": [],
                "oneIndex": -1,
                "twoIndex": -1,
                "threeIndex": -1,
                "chooseClassify": [],//选择的分类
                /* 第二页 */
                "goodsName": '',//商品名称
                "goodsDescribe": '',//商品描述
                "imageUrl": '',//外部图
                "goodsBarCode": '',//商品条形码
                "price": '',
                "logisticsWay": '1',//配送方式
                "logisticsPrice": '1',//默认运费
                "safeReturn": '1',//无忧退换
                "content": null,
                "goodsRemark": '',//商品备注
                "skuTemplateReq": '',//商品规格
                /* 第三页 */

                "bannerImg": [],
                "skuOne": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "skuTwo": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "skuThree": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "consume": '',//消费返利
                "recommend": '',//推荐奖励
                "skuTable": [],
                "spanArr": [],
                "pos": "",
                "spanArr1": [],
                "pos1": "",
                "spanArr2": [],
                "pos2": ""
            }
        },
        methods: {
            /**
             * skuTable -- 计算位置的方法
             */
            getSpanArr(data) {
                this.spanArr = [];
                this.pos = "";
                this.spanArr1 = [];
                this.pos1 = "";
                this.spanArr2 = [];
                this.pos2 = "";
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0;
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].skuName1 === data[i - 1].skuName1) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }

                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr1.push(1);
                        this.pos1 = 0;
                    } else {
                        //如果笛卡尔积一直递增下去的话 这是一个很蠢的方法 由于我的要求层数是已知的 这里偷懒了 不然应该用for循环
                        if (data[i].skuName2 === data[i - 1].skuName2) {
                            this.spanArr1[this.pos1] += 1;
                            this.spanArr1.push(0);
                        } else {
                            this.spanArr1.push(1);
                            this.pos1 = i;
                        }
                    }
                }

                console.log(this.spanArr);
            },
            /**
             * skuTable -- 合并行数
             */
            objectSpanMethod1({row, column, rowIndex, columnIndex}) {
                // columnIndex === 0 找到第一列，实现合并随机出现的行数
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                    // columnIndex === 1 找到第二列，合并他的列数
                } else if (columnIndex === 1 && this.skuTable[0].skuName2 || columnIndex === 1 && this.skuTable[0].skuName3 ) {
                    const _row = this.spanArr1[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                }
                // this.getSpanArr(this.skuTable);
            },
            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                });
            },
            /**
             * 获取下级商品分类
             */
            getNextClassify(id, level) {
                var postData = {
                    "id": id
                };
                console.log(postData);
                Goods.nextClassify(postData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        if (id == 0 || level == 0) {
                            this.oneClassify = res.data;
                        } else if (level == 1) {
                            this.twoClassify = res.data;
                        } else if (level == 2) {
                            this.threeClassify = res.data;
                        }
                    }
                })
            },
            /**
             * 选择分类
             */
            choClassify(val, index, level) {
                if (level == 1) {
                    if (this.oneIndex != index) {
                        this.twoClassify = [];
                        this.threeClassify = [];
                        this.twoIndex = -1;
                        this.chooseClassify = [];
                        this.chooseClassify.push(val);
                    }
                    this.oneIndex = index;
                } else if (level == 2) {
                    if (this.twoIndex != index) {
                        this.chooseClassify.splice(1, 1, val);
                        this.threeClassify = [];
                        this.threeIndex = -1;
                        if (this.chooseClassify.length == 3) {
                            this.chooseClassify.splice(2);
                        }
                    }
                    this.twoIndex = index;
                } else if (level == 3) {
                    this.threeIndex = index;
                    this.chooseClassify.splice(2, 1, val);
                }
                this.getNextClassify(val.id, level);
            },
            /**
             * 修改商品分类
             */
            updateClassify() {
                if (this.chooseClassify.length < 3) {
                    this.open('分类需细化至三级分类');
                    return false;
                }
                var postData = {
                    "goodsId": this.goodsId,
                    "cidOne": this.chooseClassify[0].id,
                    "cidOneName": this.chooseClassify[0].text,
                    "cidThree": this.chooseClassify[2].id,
                    "cidThreeName": this.chooseClassify[2].text,
                    "cidTwo": this.chooseClassify[1].id,
                    "cidTwoName": this.chooseClassify[1].text
                };
                this.$confirm("此操作将修改该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.goodsClassifyUpdate(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('修改成功');
                            this.onePage = !this.onePage;
                            this.twoPage = !this.twoPage;
                        } else if (res.code == 100070 || res.code == 404) {
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        } else {
                            this.$message.warning('修改失败，' + res.message);
                        }
                    })
                }).catch(() => {
                    this.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            },
            /**
             * 跳至第一页
             */
            goOne() {
                if (this.chooseClassify.length < 3) {
                    this.open('分类需细化至三级分类');
                    return false;
                }
                this.onePage = !this.onePage;
                this.twoPage = !this.twoPage;
            },
            /**
             * 跳至第二页
             */
            goTwo(nowPage) {
                if (this.chooseClassify.length < 3) {
                    this.open('分类需细化至三级分类');
                    return false;
                }
                if (nowPage == 3) {
                    this.twoPage = !this.twoPage;
                    this.threePage = !this.threePage;
                } else {
                    this.onePage = !this.onePage;
                    this.twoPage = !this.twoPage;
                }

            },
            /**
             * 跳至第三页
             */
            goThree() {
                console.log(this.imageUrl);
                if (this.goodsName == '') {
                    this.open('请输入商品名称');
                    return false;
                }
                // if(this.goodsSort==''){
                //     this.open('请输入商品排序');
                //     return false;
                // }
                if (this.goodsDescribe == '') {
                    this.open('请输入商品描述');
                    return false;
                }
                if (this.price == '') {
                    this.open('请输入供货价');
                    return false;
                }
                if (this.imageUrl == '') {
                    this.open('请上传外部图');
                    return false;
                }
                if (this.content == '') {
                    this.open('请编辑详情图文');
                    return false;
                }
                this.threePage = !this.threePage;
                this.twoPage = !this.twoPage;
            },

            /**
             *  判断金额
             */
            isPrice(val) {
                console.log(val);
                var reg = new RegExp("^((0{1}\\.\\d{1,2})|([1-9]\\d*\\.{1}\\d{1,2})|([1-9]+\\d*))$");
                if (!reg.test(val.price)) {
                    let index;
                    this.skuTable.forEach((ele, i) => {
                        if (ele.id == val.id) {
                            index = i;
                        }
                    });
                    this.skuTable[index].price = val.price.substr(0, val.price.indexOf('.') + 3);
                    this.open("输入有误，自动归为统一价。请输入只包含二位小数的正整数");
                    if (val.price < 0 || val.price == 0 || val.price == '') {
                        this.skuTable[index].price = this.price;
                    }
                }
            },
            /**
             *  判断库存
             */
            isStock(val) {
                var reg = new RegExp("^[+]{0,1}(\\d+)$");
                let index;
                this.skuTable.forEach((ele, i) => {
                    if (ele.id == val.id) {
                        index = i;
                    }
                });
                if (!reg.test(val.stock)) {
                    console.log(val.stock);
                    this.skuTable[index].stock = 0;
                    this.$message("请您输入正确的库存（大于等于0的正整数）");
                    if (val.stock < 0 || val.stock == 0 || val.stock == '') {
                        this.skuTable[index].stock = 0;
                    }
                }
            },
            /**
             * 提交
             */
            submit() {
                var postData = {
                    "goodsId": this.goodsId,
                    "goodsSkuList": this.skuTable,
                    "consumerRebate": this.consume,
                    "recommendReward": this.recommend,
                };
                console.log(postData);
                this.$confirm("此操作将修改该商品规格设置 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.addGoodsSkuStandard(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('修改成功');
                            this.$router.push('/goods')
                        } else if (res.code == 100070 || res.code == 404) {
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        } else {
                            this.$message.warning('修改失败，' + res.message);
                        }
                    })
                }).catch(() => {
                    this.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            },
            /**
             * 获取商品详情 - 第二页常规详情
             */
            getDetailPT(){
                Goods.goodsDetailPT({"goodsId": this.goodsId}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.isLoading = false;
                        var list = res.data;
                        this.chooseClassify.push({id: list.cidOne, text: list.cidOneName}, {
                            id: list.cidTwo,
                            text: list.cidTwoName
                        }, {id: list.cidThree, text: list.cidThreeName},);
                        this.twoClassify.push({id: list.cidTwo, text: list.cidTwoName});
                        this.threeClassify.push({id: list.cidThree, text: list.cidThreeName});
                        console.log(this.oneClassify);
                        this.oneClassify.forEach((ele, i) => {
                            if (ele.id == list.cidOne) {
                                this.oneIndex = i
                            }
                        });
                        this.twoIndex = 0;
                        this.threeIndex = 0;
                        this.goodsName = list.goodsName;
                        this.goodsBarCode = list.goodsBarCode;
                        this.goodsDescribe = list.goodsTitle;
                        this.content = list.goodsDetails;
                        this.goodsRemark = list.remark;
                        this.imageUrl = list.goodsPic;
                        this.price = list.goodsPrice;
                        this.skuTemplateReq = list.skuTemplateReq;
                        list.goodsBanners.forEach(ele => {
                            this.bannerImg.push({url: ele});
                        });
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.isLoading = false;
                        this.$message.warning(res.message);
                    }
                });
            },
            /**
             * 获取商品详情 - 第三页 规格库存详情
             */
            getDetailPTh(){
                Goods.goodsDetailPTh({"goodsId": this.goodsId}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.isLoading = false;
                        this.skuTable = res.data.goodsSkuList;
                        if(!this.skuTable[0].skuName1){
                            this.skuOne = false;
                        }
                        if(!this.skuTable[0].skuName2){
                            this.skuTwo = false;
                        }
                        if(!this.skuTable[0].skuName3){
                            this.skuThree = false;
                        }
                        this.consume = res.data.consumerRebate;
                        this.recommend = res.data.recommendReward;
                        this.getSpanArr(this.skuTable);
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.isLoading = false;
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 获取商品详情
             */
            getDetail() {
                // 获取第二页
                this.getDetailPT();
                // 获取第三页 规格库存列表
                this.getDetailPTh();
            }
        },
        created() {
            if (this.$route.query.goodsId) {
                this.goodsId = this.$route.query.goodsId;
            }
            //    获取商品详情
            this.getDetail();
        }
    }
</script>

<style lang="scss">
    #goodsDetail {
        width: 100%;
        /*height: 100%;*/
        padding: 15px;
        color: #3E3E4D;
        .content {
            width: 100%;
            min-height: 100%;
            background: #fff;
            .classifyBox {
                height: 100%;
                text-align: left;
                padding: 25px 30px;
                .back {
                    .el-button {
                        font-size: 20px;
                        color: #3E3E4D;
                        .cell {
                            text-align: center;
                        }
                    }
                }
                .search {
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 18px;
                    .el-input {
                        width: 400px;
                        margin: 40px 12px;
                        .el-input__inner {
                            text-align: center;
                        }
                    }
                }
                .itemBox {
                    width: 1580px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .item {
                        width: 432px;
                        height: 534px;
                        overflow: auto;
                        box-shadow: inset 2px 4px 14px 0 rgba(0, 0, 0, 0.05);
                        border-radius: 12px;
                        border: 1px solid rgba(216, 216, 216, 1);
                        padding: 0 24px;
                        p {
                            line-height: 58px;
                            border-bottom: 1px solid #D8D8D8;
                            padding-left: 36px;
                            font-size: 24px;
                            margin-top: 20px;
                        }
                        p.act {
                            color: #fff;
                            background: rgba(51, 131, 255, 1);
                            border-radius: 6px;
                        }
                    }
                    b {
                        color: #3383FF;
                        font-size: 64px;
                        font-weight: 500;
                    }
                }
                @media screen and (max-width: 1400px) {
                    .itemBox {
                        width: 1200px;
                        .item {
                            width: 340px;
                        }
                        b {
                            font-size: 44px;
                        }
                    }

                }
                .showClassify {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    margin: 30px 0 75px 45px;
                    span {
                        color: #3383FF;
                        margin: 0 3px;
                        i {
                            margin-right: 3px;
                        }
                    }
                }
                .oneNext {
                    width: 1580px;
                    text-align: right;
                    .el-button {
                        width: 324px;
                        height: 68px;
                        font-size: 24px;
                        border-radius: 34px;
                    }
                }
            }
            .infoBox {
                height: 100%;
                padding-bottom: 40px;
                h1 {
                    font-size: 36px;
                    font-weight: 500;
                    color: rgba(51, 131, 255, 1);
                    line-height: 100px;
                    padding-left: 30px;
                    text-align: left;
                    border-bottom: 1px solid #DBDDDE;
                }
                .row {
                    display: flex;
                    align-items: flex-start;
                    margin: 30px 0;
                    font-size: 24px;
                    line-height: 32px;
                    h2 {
                        width: 318px !important;
                        line-height: 30px;
                        text-align: right;
                        font-size: 24px;
                        font-weight: 800;
                        margin-right: 20px;
                    }
                    div {
                        text-align: left;
                        .el-input, .el-textarea {
                            width: 400px;
                        }
                        /*.el-textarea__inner {*/
                        /*height: 60px;*/
                        /*min-height: 60px;*/
                        /*}*/
                        .remark {
                            font-size: 20px;
                            font-weight: bold;
                            color: rgba(145, 145, 145, 1);
                            margin-top: 14px;
                        }
                        .bannerRemark {
                            margin: 0 0 20px 0 !important;
                        }
                        .editImg {
                            width: 28px;
                            height: 28px;
                            margin-left: 8px;
                            cursor: pointer
                        }
                        .el-radio__label {
                            font-size: 24px;
                        }
                        .detailBox:first-child {
                            margin-top: 0;
                        }
                        .detailBox {
                            display: flex;
                            align-items: baseline;
                            margin: 10px 0;
                            h3 {
                                white-space: nowrap;
                            }
                            ol {
                                li {
                                    font-size: 18px;
                                    margin-left: 20px;
                                }
                            }
                        }
                        .el-upload {
                            text-align: center;
                        }
                        .detail {
                            width: 375px;
                            height: 580px;
                            overflow: auto;
                            border-radius: 20px;
                            border: 1px solid #e2e2e2;
                            img {
                                width: 100%;
                            }
                        }
                    }
                    .remarks {
                        display: flex;
                        align-items: flex-end;
                        margin-top: -10px;
                        .remark {
                            margin-left: 20px;
                        }
                    }
                    .bannerBox {
                        display: flex;
                        align-items: center;
                        div {
                            width: 148px;
                            height: 148px;
                            border: 1px solid #e2e2e2;
                            border-radius: 4px;
                            margin: 0 4px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
                @media screen and (max-width: 1400px) {
                    .row {
                        h2 {
                            width: 218px !important;
                        }
                    }

                }
            }
            .SKUBox {
                .tableBox {
                    margin-left: 120px;
                    padding: 1px;
                    h2 {
                        text-align: left;
                        line-height: 80px;
                        font-size: 24px;
                        font-weight: 800;
                        margin-right: 20px;
                    }
                    .el-table {
                        margin: 10px 2px;
                        .cell {
                            text-align: center;
                            img {
                                width: 100px;
                                height: 100px;
                            }
                        }
                        .el-input__inner {
                            border: 0;
                            text-align: center;
                        }
                    }
                }
                .btnBox {
                    margin: 32px 0;
                    text-align: right;
                    .el-button {
                        margin: 0 480px;
                        font-size: 24px;
                    }
                }
            }
        }
    }
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
        margin: 0 auto;
    }

    .ql-snow .ql-picker-label {
        height: auto;
    }

</style>
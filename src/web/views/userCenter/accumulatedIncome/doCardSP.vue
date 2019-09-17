<!--
  - doCardSP Vue
  - @JsName doCardSP  == doCard-share-profit
  - @Description 累计收入-办信用卡分润视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="doCardSP">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button
                                icon="el-icon-arrow-left"
                                type="text"
                                @click="$router.push('/userCenter/incomeIndex')">返回
                        </el-button>
                    </div>
                    <div class="showBox">
                        <div class="item" v-for="(ele,i) in showList" :key="i">
                            <div class="text">{{ ele.text }}</div>
                            <div class="num">{{ ele.num }}<span v-if="ele.text=='分润笔数'">笔</span></div>
                        </div>
                    </div>
                    <div class="tableBox">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="data"
                                border
                                stripe
                                style="width: 100%"
                                max-height="680">
                            <el-table-column type="index" fixed label="编号" align="center" width="258">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column label="办卡用户" align="center">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.user }}</p>
                                    <el-button type="text" sixe="small" @click="deliverClick(scope.row)">查看用户<i class="el-icon-arrow-right"></i></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column label="申请时间" align="center">
                                <template slot-scope="scope">{{ scope.row.applyDate }}</template>
                            </el-table-column>
                            <el-table-column label="办卡时间" align="center">
                                <template slot-scope="scope">{{ scope.row.doCardDate }}</template>
                            </el-table-column>
                            <el-table-column label="办卡详情" align="center">
                                <template slot-scope="scope">{{ scope.row.doCardDetail}}</template>
                            </el-table-column>
                            <el-table-column label="分润金额(元)" align="center">
                                <template slot-scope="scope">{{ scope.row.spAmount}}</template>
                            </el-table-column>
                        </el-table>
                        <!--表格结束-->
                        <!-- 分页器 -->
                        <el-footer>
                            <div class="pagination">
                                <div class="pageShow">
                                    本页显示：{{ pagination.show }}&nbsp;&nbsp;&nbsp;&nbsp;总记录数：{{ pagination.total }}
                                </div>
                                <el-pagination @current-change="jumpPagination"
                                               background
                                               layout="total, prev, pager, next, jumper, sizes"
                                               :current-page="pagination.currentPage"
                                               :page-size="pagination.pageSize"
                                               :page-sizes="[pagination.pageSize]"
                                               :total="pagination.total">
                                </el-pagination>
                            </div>
                        </el-footer>
                    </div>

                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { accumnlatedIncome, Tags } from "@/web/module/lending";
    let datalist = [
        {
            user: '15735652498',//办卡用户
            applyDate: '2019.03.20 18:19',//申请时间
            doCardDate: '2019.03.20 18:19',//办卡时间
            doCardDetail: '工商信用卡',//办卡详情
            spAmount: '888.00',//分润金额
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        },
        {
            user: '15735652498',
            applyDate: '2019.03.20 18:19',
            doCardDate: '2019.03.20 18:19',
            doCardDetail: '工商信用卡',
            spAmount: '888.00',
        }
    ];

    export default {
        name: "doCardSP",
        data(){
            return {
                loading: true,
                "param": {
                    "page": 1,
                    "logisticsTag": '',
                    "tagType": 0
                },
                "pagination": {
                    "total": 0,
                    "pageCount": 0,
                    "currentPage": 1,
                    "pageSize": 10,
                },
                data: datalist,
                showList: [
                    {id:1, text: '办信用卡分润', num: '2000.00'},
                    {id:2, text: '分润笔数', num: '888'}
                ]
            }
        },
        methods: {
            /**
             * 初始化标签
             */
            initData () {
                const that = this;
                that.loading = false;
                return;
                setTimeout(() => {
                    Tags.selectTagsByBigTag({ tagType:that.param.tagType }).then((res) => {
                        if (res) {
                            if (res.code === 10001) {
                                if(res.data){
                                    that.dropdown = false;
                                }
                            } else {
                                that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                            }
                        }
                    }, (err) => {
                        that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                        console.error(err);
                    });
                }, 500);
            },

            /**
             * 分页跳转
             */
            jumpPagination (val) {
                const that = this;
                that.loading = true;
                that.param.page = val;
                // 加载数据
                that.initData();
            },
            /**
             *
             * 查看用户
             */
            deliverClick (data) {
                var that = this;
                console.log(data);
                that.$router.push('/userCenter/userDetail')
            },
        },
        beforeCreate () {
        },
        beforeMount () {
            const that = this, { page } = that.$route.params;
            that.btnIndex = 0;
            if (page) {
                that.param.page = page;
            }
            // 初始化标签
            that.initData();
        },
    }
</script>

<style lang="scss">
    #doCardSP {
        width: 100%;
        height: 100%;
        color: #3E3E4D;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    padding: 15px;
                    position: relative;
                    .back {
                        text-align: left;
                        margin: 0 15px;
                        .el-button {
                            color: #3E3E4D;
                            font-size: 20px;
                        }
                    }
                    .showBox {
                        display: flex;
                        align-items: center;
                        margin: 10px 0 44px;
                        .item {
                            margin-left: 136px;
                            display: flex;
                            align-items: center;
                            .text,.num {
                                width: 185px;
                                line-height: 74px;
                                background: #3383FF;
                                border:3px solid #3383FF;
                                color: #fff;
                                font-size: 22px;
                            }
                            .num {
                                background: #fff;
                                color: #3383FF;
                            }
                        }
                    }
                    .tableBox {
                        .el-button {
                            padding: 0;
                        }
                        .el-footer {
                            width: 100%;
                            height: 100px !important;
                            font-size: 18px;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            background: #fff;
                            z-index: 99;
                            .pagination {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .el-pagination .el-select .el-input .el-input__inner {
                                    padding-right: 8px;
                                };
                                .el-input__suffix-inner {
                                    display: none;
                                }
                            }
                        };
                    }
                }
            }
        }
    }
</style>

<!--
  - index Vue
  - @JsName index
  - @Description 账单管理-首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="billList">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="screen-box">
                        <div>
                            <el-input style="width: 260px" v-model="searchValue" placeholder="手机号/身份证号/姓名"></el-input>
                            <el-button type="primary" size="small">搜索</el-button>
                        </div>

                        <div class="date-box">
                            <span>日期：</span>
                            <el-date-picker
                                    v-model="starDate"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <i>-</i>
                            <el-date-picker
                                    v-model="endDate"
                                    type="date"
                                    placeholder="选择日期">
                            </el-date-picker>
                            <el-button type="primary" size="small">筛选</el-button>
                        </div>

                        <div class="btnBox">
                            <div>
                                <span>累计收款：</span><span>{{ proceeds }}元</span>
                            </div>
                            <div>
                                <span>累计平台收益：</span><span>{{ platformProceeds }}元</span>
                            </div>
                        </div>

                    </div>
                    <!-- 表格 -->
                    <div class="table-box">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="data"
                                border
                                stripe
                                ref="table"
                                :height="tableHeight">
                            <el-table-column type="index" fixed label="编号" align="center" width="60">
                                <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                            </el-table-column>
                            <el-table-column prop="proceedsDate" label="日期" width="120">
                            </el-table-column>
                            <el-table-column label="收款用户" width="136">
                                <template slot-scope="scope">
                                    <p>{{ scope.row.user }}</p>
                                    <el-button type="text" @click="deliverClick(scope.row)">查看详情 <i class="el-icon-arrow-right"></i></el-button>
                                </template>
                            </el-table-column>
                            <el-table-column prop="userGrade" label="用户级别">
                                <template slot-scope="scope">
                                    <span :style="scope.row.userGrade=='普通用户'?'color:#409EFF':''">{{ scope.row.userGrade }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="amount" label="收款金额">
                            </el-table-column>
                            <el-table-column prop="paymentCard" label="付款卡">
                            </el-table-column>
                            <el-table-column prop="creditCard" label="收款卡">
                            </el-table-column>
                            <el-table-column prop="handingCharge" label="手续费(元)">
                            </el-table-column>
                            <el-table-column label="执行服务商">
                                <template slot-scope="scope">{{ scope.row.agent==''?'--':scope.row.agent}}</template>
                            </el-table-column>
                            <el-table-column label="执行服务商分润">
                                <template slot-scope="scope">{{ scope.row.agentSP==''?'--':scope.row.agentSP}}</template>
                            </el-table-column>
                            <el-table-column label="城市合伙人">
                                <template slot-scope="scope">{{ scope.row.partner==''?'--':scope.row.partner}}</template>
                            </el-table-column>
                            <el-table-column label="城市合伙人分润">
                                <template slot-scope="scope">{{ scope.row.partnerSP==''?'--':scope.row.partnerSP}}</template>
                            </el-table-column>
                            <el-table-column label="平台补贴">
                                <template slot-scope="scope">{{ scope.row.PS==''?'--':scope.row.PS}}</template>
                            </el-table-column>
                            <el-table-column label="平台收益">
                                <template slot-scope="scope">{{ scope.row.PE==''?'--':scope.row.PE}}</template>
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
    import { BillList, Tags } from "@/web/module/lending";
    export default {
        name: "billList",
        data(){
            return {
                loading: true,
                "tableHeight": 400,
                proceeds: '99999.00',//累计收款
                platformProceeds: '8888.88',//平台收款
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
                "searchValue": '',//搜索输入值
                "starDate": '',//开始日期
                "endDate": '',//结束日期
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
            deliverClick (data) {
                var that = this;
                console.log(data);
                that.$router.push('')
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
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 164;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 164
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
        },
        updated(){
            console.log(this.starDate,this.endDate)
        }
    }
</script>

<style lang="scss">
    #billList {
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    background: #fff;
                    padding: 15px;
                    overflow: hidden;
                    .screen-box {
                        margin: 15px 0 30px 0;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .el-input {
                            width: 220px;
                        }
                        .el-button {
                            font-size: 20px;
                            margin-left: 12px;
                        }
                        .date-box {
                            .el-input__prefix {
                                right: 5px;
                                left: auto;
                            }
                            .el-input__inner {
                                padding: 0 15px;
                            }
                            i {
                                margin: 0 7px;
                            }
                        }
                        .btnBox {
                            display: flex;
                            align-items: center;
                            div {
                                background: #ff980b;
                                padding: 8px 14px;
                                min-width: 200px;
                                font-size: 20px;
                                color: #fff;
                                border-radius: 4px;
                                margin-left: 10px;
                            }
                        }

                    }
                    .table-box {
                        height: 100%;
                        .el-table {
                            width: 100%;
                            .cell {
                                text-align: center;
                            }
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
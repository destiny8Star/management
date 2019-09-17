<!--
  - withdrawDeposit Vue
  - @JsName withdrawDeposit
  - @Description 账单管理-提现记录视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="withdrawDeposit">
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
                            <p>累计提现：<span>{{ WD }}元</span></p>
                        </div>

                    </div>
                    <div class="select-box">
                        <div class="radioBox">
                            <el-radio-group v-model="radio">
                                <el-radio :label="3">申请提现列表</el-radio>
                                <el-radio :label="6">拒绝打款列表</el-radio>
                                <el-radio :label="9">已打款列表</el-radio>
                            </el-radio-group>
                            <el-button type="primary" size="small">筛选</el-button>
                        </div>
                        <div class="btnBox">
                            <el-button size="small" type="primary" @click="chooseAll">
                                全选
                            </el-button>
                            <el-button size="small" type="primary" @click="haveMoney">
                                选中用户已打款
                            </el-button>
                            <el-button size="small" type="primary" @click="exportUser">
                                导出选中用户
                            </el-button>
                        </div>

                    </div>
                    <!-- 表格 -->
                    <div class="table-box">
                        <div class="tableBoxs">
                            <el-table
                                    ref="multipleTable"
                                    :header-cell-style="{background:'#fafafa'}"
                                    @selection-change="chooseRow"
                                    :data="data"
                                    border
                                    stripe
                                    height="calc(100% - 260px)"
                                    max-height="680">
                                <el-table-column
                                        type="selection"
                                        width="55">
                                </el-table-column>
                                <el-table-column type="index" fixed label="编号" align="center" width="60">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                                </el-table-column>
                                <el-table-column prop="dateWD" label="日期" width="120">
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
                                <el-table-column prop="name" label="姓名">
                                </el-table-column>
                                <el-table-column prop="cardId" label="身份证">
                                </el-table-column>
                                <el-table-column prop="amountWD" label="提现金额">
                                </el-table-column>
                                <el-table-column prop="cardWD" label="收款卡">
                                </el-table-column>
                                <el-table-column prop="handingCharge" label="手续费(元)">
                                </el-table-column>
                                <el-table-column prop="amountPaid" label="实付金额(元)">
                                </el-table-column>
                                <el-table-column label="备注">
                                    <template slot-scope="scope">
                                        <el-input
                                                type="textarea"
                                                autosize
                                                clearable
                                                v-model="scope.row.remark"
                                                placeholder="输入备注">
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" fixed="right" align="center" width="160">
                                    <template slot-scope="scope">
                                        <el-button type="text" sixe="mini" style='color:red' @click="deliverClick(scope.row)">拒绝打款</el-button>
                                        <el-button type="text" sixe="mini" @click="deliverClick(scope.row)">已打款</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>

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
    import FileSaver from 'file-saver';
    import XLSX from 'xlsx';
    import { BillList, Tags } from "@/web/module/lending";
    let datalist = [
        {
            dateWD: '2019.03.22 20:02',//时间
            user: '15735652498',//收款用户
            userGrade: '普通用户',//用户级别
            name: '杜鲁阳',//姓名
            cardId: '140335199902128907',//身份证
            amountWD: '8888.00',//提现金额
            cardWD: '6221881600035678906',//收款卡
            handingCharge: '2000',//手续费
            amountPaid: '800.00',//实付金额
            remark: '',//备注
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: 'vip用户',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '678.88',
            remark: 'A级',
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: '城市合伙人',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '999.99',
            remark: '执行服务商',
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: 'vip用户',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '678.88',
            remark: 'A级',
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: '城市合伙人',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '999.99',
            remark: '执行服务商',
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: 'vip用户',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '678.88',
            remark: 'A级',
        },
        {
            dateWD: '2019.03.22 20:02',
            user: '15735652498',
            userGrade: '城市合伙人',
            name: '杜鲁阳',
            cardId: '140335199902128907',
            amountWD: '8888.00',
            cardWD: '6221881600035678906',
            handingCharge: '2000',
            amountPaid: '999.99',
            remark: '执行服务商',
        }
    ];
    export default {
        name: "withdrawDeposit",
        data(){
            return {
                loading: true,
                WD: '99999.00',//累计提现
                chooseRowValue: [],//选择的多行
                radio: 3,//选择对应表格
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
                "data": datalist,
                "starDate": '',//开始日期
                "endDate": '',//结束日期
            }
        },
        methods: {
            /**
             * 选择的某一行
             *
             */
            chooseRow(val){
                this.chooseRowValue = val;
                console.log(this.chooseRowValue);
            },
            /**
             * 全选
             *
             */
            chooseAll(){
                datalist.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
                console.log('全选')
            },
            /**
             * 已打款按钮
             *
             */
            haveMoney(){
                consolo.log("已打款")
            },
            /**
             * 导出选中用户
             *
             */
            exportUser() {

                console.log('导出选中用户')
            },
            /**
             * 初始化标签
             */
            initData () {
                const that = this;
                that.loading = false;
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
        updated(){
            console.log(this.starDate,this.endDate)
        }
    }
</script>

<style lang="scss">
    #withdrawDeposit {
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
                    .select-box {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .radioBox {
                            .el-radio-group {
                                margin: 28px 0;
                            }
                            .el-button {
                                margin-left: 16px;
                            }
                        }
                        .btnBox {
                            display: flex;
                            align-items: center;
                            .el-button {
                                /*width: 227px;*/
                                height: 40px;
                                font-size: 20px;
                                margin-left: 12px;
                            }
                        }
                    }
                    .screen-box {
                        margin: 15px 0 2px;
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
                            background: #ff980b;
                            padding: 8px 14px;
                            min-width: 200px;
                            font-size: 20px;
                            color: #fff;
                            border-radius: 4px;
                            margin-left: 10px;
                        }

                    }
                    .table-box {
                        height: 100%;
                        .tableBoxs {
                            height: 100%;
                            padding-top: 1px;
                            .el-table {
                                width: 100%;
                                .cell {
                                    text-align: center;
                                    .ei-button {
                                        padding: 6px;
                                    }
                                }
                                .el-textarea__inner {
                                    border: 0;
                                    background: transparent;
                                    /*padding: 0;*/
                                }
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
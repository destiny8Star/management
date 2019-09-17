<!--
  - shopAudit Vue
  - @JsName shopAudit
  - @Description 商铺审核列表首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author 杜
  -->
<!-- 视图 -->
<template>
    <div id="shopAudit">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="screen-box">
                        <div class="row">
                            <div class="inquire">
                                <el-input style="width: 390px" v-model="postData.storeName" placeholder="请输入商铺姓名"></el-input>
                                <el-button type="primary" @click="search" size="small">筛选</el-button>
                            </div>
                            <div class="select-box">
                                <el-cascader
                                        :options="options"
                                        v-model="selectedOptions"
                                        @change="handleChange"
                                        :separator="' '"
                                        placeholder="请选择省市区"
                                        clearable
                                >
                                </el-cascader>
                                <el-button @click="search" type="primary" size="small">筛选</el-button>
                            </div>
                        </div>
                        <div class="select-box">
                            <el-radio-group @change="changeState" v-model="postData.type">
                                <el-radio :label="1">待审核商铺</el-radio>
                                <el-radio :label="3"> 不通过商铺</el-radio>
                            </el-radio-group>
                            <el-button @click="search" type="primary" size="small">筛选</el-button>
                        </div>
                    </div>
                    <!-- 表格 -->
                    <div class="table-box">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <!--height="calc(100% - 240px)">-->
                            <el-table-column type="index" fixed label="编号" width="80">
                                <template slot-scope="scope">{{ pagination.total - (((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1)) + 1 }}</template>
                            </el-table-column>
                            <el-table-column prop="createTime" label="申请时间">
                            </el-table-column>
                            <el-table-column prop="storeAccount" label="商家账户">
                            </el-table-column>
                            <el-table-column prop="storeName" label="商铺名称">
                            </el-table-column>
                            <el-table-column prop="address" label="所在城市">
                                <template slot-scope="scope">
                                    <span>{{scope.row.address  ?scope.row.address  :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="身份证号">
                                <template slot-scope="scope">
                                    <span>{{scope.row.idCard  ?scope.row.idCard  :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="userName" label="商铺户主">
                                <template slot-scope="scope">
                                    <span>{{scope.row.userName  ?scope.row.userName :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="remark" v-if="state" label="备注" fixed="right">
                                <template slot-scope="scope">
                                    <span>{{scope.row.remark ?scope.row.remark :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" width="160">
                                <template slot-scope="scope">
                                    <el-button type="text" sixe="small" @click="deliverClick(scope.row)">查看资质详情</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--表格结束-->
                        <!-- 分页器 -->
                        <el-footer>
                            <div class="pagination">
                                <!--<div class="pageShow">-->
                                <!--本页显示：{{ pagination.show }}&nbsp;&nbsp;&nbsp;&nbsp;总记录数：{{ pagination.total }}-->
                                <!--</div>-->
                                <el-pagination @current-change="jumpPagination"
                                               @prev-click="prevClick"
                                               @next-click="nextClick"
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

<!-- 视图 Js 脚本 -->
<script>
    import options from '@/assets/js/country-level3-data'
    import { Shops, Tags } from "@/web/module/lending";
    export default {
        name: "shopAudit",
        data(){
            return {
                loading: true,
                "dataList": [],
                "state": false,
                "tableHeight": 400,
                "selectedOptions": [],//存放默认值
                "options": options,   //存放城市数据
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": 10,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData":{
                    "area": "",//区
                    "city": "",//市
                    "cursor": 1,//当前第几页-游标
                    "prince": "",//省
                    "size": 10,//每页条数
                    "storeName": "",//商铺名称
                    "type": 1//【 1审核中 2审核通过 3已经拒绝 】
                },
            }
        },
        methods: {
            /**
             * 设置备注
             */
            settingRemark (data) {
                console.log(data);
                var getData = {
                    "orderId": data.id,
                    "remark": data.remark
                };
                Shops.remark(getData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message({ center: true, type: "info", message: "备注成功" });
                        this.getData();
                    }else {
                        this.$message({ center: true, type: "info", message: "备注失败" });
                    }
                })
            },
            /**
             *  选择区域
             */
            handleChange(value) {
                console.log(value);
                console.log(this.selectedOptions);
            },
            /**
             * 搜索
             */
            search(){
                console.log("筛选");
                if(this.postData.type==3){
                    this.state = true;
                }
                if(this.postData.type==1){
                    this.state = false;
                }
                this.postData.cursor = 1;
                this.getData();
            },
            /**
             * 弹窗-提示信息
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '知道了',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: '已关闭提示'
                        });
                    }
                });
            },
            changeState(){
                console.log(this.postData.type);
                if(this.postData.type==1){
                    this.state = true;
                    console.log(this.postData.type);
                }
            },
            /**
             * 获取列表数据
             */
            getData(){
                this.loading = false;
                this.postData.prince = this.selectedOptions[0];
                this.postData.city = this.selectedOptions[1];
                this.postData.area = this.selectedOptions[2];
                console.log('3',this.postData);
                Shops.shopAuditList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination (val) {
                console.log(val);
                const that = this;
                that.loading = true;
                this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick(){
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick(){
                this.pagination.currentPage ++;
                this.postData.cursor ++;
                this.getData();
            },
            deliverClick (data) {
                var that = this;
                console.log(data);
                that.$router.push({path:'/shop/auditShopInfo',query:{shopId:data.id,state:this.postData.type}})
            },
        },
        beforeCreate () {
        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 160;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 160
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            // 获取列表数据
            this.getData();
        },
    }
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #shopAudit{
        color: #3e3e4d;
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    padding: 15px;
                    position: relative;
                    overflow: hidden;
                    .screen-box {
                        .el-button {
                            margin-left: 12px;
                        }
                        .row {
                            display: flex;
                            align-items: center;
                            .inquire {
                                margin-right: 110px;
                                input,.el-input {
                                    width: 240px !important;
                                }
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
                        };
                        .select-box {
                            text-align: left;
                            .el-radio-group {
                                width: 280px;
                                margin: 38px 0;
                            }
                        }
                    }
                    .table-box {
                        padding: 1px;
                        .el-table {
                            margin: 1px 2px;
                            .cell {
                                text-align: center;
                            }
                            .el-textarea__inner {
                                border: 0;
                                background: transparent;
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
                                justify-content: center;
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
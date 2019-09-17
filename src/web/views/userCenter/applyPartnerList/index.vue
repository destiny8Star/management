<!--
  - applyPartnerList Vue
  - @JsName applyPartnerList
  - @Description 申请城市合伙人列表首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="applyPartnerList">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="select-box">
                        <el-radio-group v-model="postData.type" @change="search">
                            <el-radio :label="0">申请列表</el-radio>
                            <el-radio :label="2">被拒绝列表</el-radio>
                            <el-radio :label="1">已同意列表</el-radio>
                        </el-radio-group>
                        <!--<el-button type="primary" size="small">筛选</el-button>-->
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
                            <el-table-column type="index" fixed label="编号"  width="80">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="tel" label="用户" >
                            </el-table-column>
                            <el-table-column prop="registerTime" label="注册时间">
                            </el-table-column>
                            <el-table-column prop="city" label="意向城市">
                            </el-table-column>
                            <el-table-column prop="contactTel" label="联系号码">
                                <template slot-scope="scope">
                                    {{scope.row.contactTel?scope.row.contactTel:'--'}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="contactMan" label="联系人">
                            </el-table-column>
                            <el-table-column v-if="postData.type==0" label="操作" fixed="right"  width="160">
                                <template slot-scope="scope">
                                    <el-button style="margin-right: 6px" type="text" sixe="small" @click="agreeClick(scope.row)">同意申请</el-button>
                                    <el-button type="text" sixe="small" @click="rejectClick(scope.row)" style="color: red;margin-left: 0">拒绝申请</el-button>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="reason"
                                    fixed="right"
                                    label="备注"
                                    >
                                <template slot-scope="scope">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            clearable
                                            @blur = 'settingRemark(scope.row)'
                                            v-model="scope.row.reason"
                                            placeholder="备注">
                                    </el-input>
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
    import { UserCenter, Tags } from "@/web/module/lending";
    export default {
        name: "applyPartnerList",
        data(){
            return {
                loading: true,
                "dataList": [],
                "tableHeight": 400,
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
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "type": 0//【 0：申请，1：同意，2：拒绝 】
                }
            }
        },
        methods: {
            /**
             * 搜索
             */
            search(){
                console.log('1',this.postData);
                this.postData.cursor = 1;
                this.getData();
            },
            /**
             * 获取数据
             */
            getData(){
                this.loading = false;
                UserCenter.applyList(this.postData).then(res=>{
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
            // 确认完成订单
            isAgree(meassge,applyId,type) {
                var text ;
                if(type==1){
                    text = '同意操作'
                }else if(type==2){
                    text = '拒绝操作'
                }
                this.$confirm(meassge, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let postData = {
                        "cityPartnerId": applyId,
                        "status": type
                    };
                    UserCenter.isAgreeApply(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message({ center: true, type: "info", message: text + "成功" });
                            this.getData();
                        }else {
                            this.$message({ center: true, type: "info", message: text + "失败" });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消' + text
                    });
                });
            },
            /**
             * 设置备注
             */
            settingRemark (data) {
                console.log(data);
                var getData = {
                    "cityPartnerId": data.id,
                    "remark": data.reason
                };
                UserCenter.remark(getData).then(res=>{
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
             * 同意申请
             * @param data
             */
            agreeClick (data) {
                console.log(data,'同意');
                this.isAgree('此操作将同意该申请, 是否继续?',data.id,1)
            },
            /**
             * 拒绝申请
             * @param data
             */
            rejectClick (data) {
                console.log(data,'拒绝');
                this.isAgree('此操作将拒绝该申请, 是否继续?',data.id,2);
            },
        },
        beforeCreate () {
        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 170;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 170
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            // 获取列表数据
            this.getData();
        },
    }
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #applyPartnerList{
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
                    .select-box {
                        text-align: left;
                        margin: 20px 0;
                        .el-button {
                            margin-left: 12px;
                        }
                    }
                    .table-box {
                        padding: 1px;
                        .el-textarea__inner {
                            border: 0;
                            background: transparent;
                            padding: 0;
                        }
                        .el-table {
                            margin: 1px;
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

<template>
    <div id="accountManage">
        <el-container direction="horizontal" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button @click="$router.push('/homes')" icon="el-icon-arrow-left" type="text">返回</el-button>
                    </div>
                    <div class="tableBox">
                        <!-- 表格 -->
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                stripe
                                border
                                ref="table"
                                :height="tableHeight">
                            <el-table-column type="index" fixed width="180" label="编号">
                                <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                            </el-table-column>
                            <el-table-column label="账户" prop="mobile">
                            </el-table-column>
                            <el-table-column label="用户等级" prop="type">
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button :disabled="scope.row.type=='admin'" type="text" sixe="small" @click="editClick(scope.row)">编辑</el-button>
                                    <el-button :disabled="scope.row.type=='admin'" type="text" sixe="small" @click="removeClick(scope.row)" :class="{act:scope.row.type!='admin'}">删除</el-button>

                                </template>
                            </el-table-column>
                        </el-table>
                        <!--tab1e结束-->
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

<script>
    import { Tags } from "@/web/module/lending";
    import { Owner } from "@/web/module/owner";
    let map = {"1":"admin","2":"超级管理员","3":"查看者"};
    export default {
        name: "accountManage",
        data () {
            return {
                "loading": true,
                "dropdown": false,
                "tableHeight": 400,
                "dataList": [],
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
                    "cursor": 1,
                    "size": 10
                }
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getData(){
                this.loading = false;
                Owner.accountList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele=>{
                            ele.type = map[ele.type]
                        });
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
            /**
             * 编辑
             */
            editClick (data) {
                console.log(data);
                const that = this;
                that.$router.push({ "path": "/homes/jurisdiction",query:{userId: data.userId,userType: data.type}});
            },
            /**
             * 删除
             */
            removeClick (data) {
                const that = this, text = "删除";
                var postData = {
                    "userId": data.userId
                };
                that.$confirm("此操作将永久删除该账户 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Owner.removeAccount(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "删除成功" });
                            this.getData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning(res.message);
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },


        },
        mounted(){
            //获取列表数据
            this.getData();

            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 150
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
        }
    }
</script>

<style lang="scss">
    #accountManage {
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                padding: 15px;
                .content {
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    background: #fff;
                    position: relative;
                    overflow: hidden;
                    .back {
                        text-align: left;
                        .el-button {
                            font-size: 20px;
                            color: #3E3E4D;
                        }
                    }
                    .tableBox {
                        height: 100%;
                        padding: 1px;
                        .el-table {
                            width: 100%;
                            margin: 1px;
                            .cell {
                                text-align: center;
                            };
                            .act {
                                color: red;
                            }
                        };
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
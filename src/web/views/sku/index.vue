<!--
  - skuList Vue
  - @JsName index
  - @Description 商品模板SKU 模块首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author DLY
  -->
<!-- 视图 -->
<template>
    <div id="skuList">
        <el-container v-loading="loading">
            <div class="content">
                <div class="handleBox">
                    <div class="top-btn-box">
                        <el-button type="primary" @click="addition()"><i class="el-icon-plus"></i>添加商品规格</el-button>
                    </div>
                </div>
                <div class="tableBox">
                    <!-- 表格 -->
                    <el-table
                            :header-cell-style="{background:'#fafafa'}"
                            :data="dataList"
                            stripe
                            border
                            style="width: 100%"
                            ref="table"
                            :height="tableHeight">
                        <el-table-column type="index" fixed width="80" label="编号">
                            <template slot-scope="scope">{{((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="templateName" label="商品类型名称">
                        </el-table-column>
                        <el-table-column prop="cateName" label="所属分类">
                        </el-table-column>
                        <el-table-column prop="bindingGoodsNo" label="绑定商品数">
                        </el-table-column>
                        <el-table-column label="操作" width="160">
                            <template slot-scope="scope">
                                <el-button type="text" sixe="small" @click="editClick(scope.row)">编辑</el-button>
                                <el-button @click="removeClick(scope.row)" type="text" style="color:red;margin-left: 12px" size="small">移除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!--tab1e结束-->
                </div>
                <!-- 分页器 -->
                <el-footer>
                    <div class="pagination">
                        <!--<div class="pageShow">-->
                        <!--本页显示：{{ pagination.show }}&nbsp;&nbsp;&nbsp;&nbsp;总记录数：{{ pagination.total }}-->
                        <!--</div>-->
                        <el-pagination
                                @current-change="jumpPagination"
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
        </el-container>

    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import {Sku, Tags} from "@/web/module/lending";
    const mapType = {1:'0',2:'1',3:'2',9:'3',10:'4',12:'5',13:'6',14:'7',15:'8'};
    const mapStatus = {1: false,0: true};//【1：下架；0：上架】
    export default {
        name: "skuList",
        components: {},
        data() {
            return {
                "dataList": [],
                "loading": true,
                "tableHeight": 400,
                "dropdown": false,
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": 10,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                //【status： 1-首页轮播； 2-首页小banner1； 3-首页中部小banner2； 9-首页弹窗； 5-首页icon； 6-首页中部4宫格； 7-商圈顶部icon； 8-卡管顶部icon； 10-启动广告 】
                "postData": {
                    "cursor": 1,
                    "size": 10,
                }
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getData() {
                Sku.skuList(this.postData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.loading = false;
                        this.dataList = res.data.data;
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code == 100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                        this.loading = false;
                    }
                })
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination(val) {
                console.log(val);
                const that = this;
                that.loading = true;
                this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick() {
                this.pagination.currentPage--;
                this.postData.cursor--;
                this.loading = true;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage++;
                this.postData.cursor++;
                this.loading = true;
                this.getData();
            },
            /**
             * 增加信息
             */
            addition() {
                const that = this;
                that.$router.push({"path": "/sku/addSku"});
            },
            handleClick(data) {
                console.log(data);
            },
            editClick(data) {
                console.log(data);
                const that = this;
                that.$router.push({"path": "/sku/updateSku", "query": {skuId: data.id}});
            },
            /**
             * 删除
             */
            removeClick(data) {
                console.log(data);
                const that = this, text = "删除";
                if(data.bindingGoodsNo>0){
                    this.$message.warning('该模板有绑定商品，无法删除');
                    return false;
                }
                var postData = {
                    "id": data.id
                };
                that.$confirm("此操作将永久删除该模板 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Sku.skuRemove(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            that.$message({center: true, type: "info", message: "删除成功"});
                            this.getData();
                        } else if(res.code == 100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            that.$message({center: true, type: "info", message: "删除失败，" + res.message});
                        }
                    });
                }).catch(() => {
                    that.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            },
        },
        beforeCreate() {
        },
        beforeMount() {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function () {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 150
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　

            this.getData();
        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #skuList {
        padding: 20px;
        width: 100%;
        height: 100%;
        .el-container {
            .content {
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                padding: 15px;
                position: relative;
                overflow: hidden;
                .handleBox {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .top-btn-box {
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding: 15px 30px;
                        .el-button--primary {
                            height: 58px;
                            font-size: 24px;
                            .el-icon-plus {
                                margin-right: 15px;
                            }
                        }
                    }
                }
                .tableBox {
                    margin: 1px;
                    padding: 2px;
                    .el-table {
                        .cell {
                            text-align: center;
                        }
                        td {
                            padding: 10px;
                        }
                        img {
                            width: 118px;
                            margin: 12px auto 5px;
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
                        justify-content: center;
                        .el-pagination .el-select .el-input .el-input__inner {
                            padding-right: 8px;
                        }
                        .el-input__suffix-inner {
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>

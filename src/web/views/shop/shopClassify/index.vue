<!--
  - shopClassify Vue
  - @JsName index
  - @Description 商铺模块分类视图
  - @DateTime 2019-03-13 20:39:22
  - @author 杜
  -->
<!-- 视图 -->
<template>
    <div id="shopClassify">
        <el-container v-loading="loading">
            <div class="content">
                <div class="handleBox">
                    <div class="top-btn-box">
                        <el-button type="primary" @click="addition()"><i class="el-icon-plus"></i>添加商铺分类</el-button>
                    </div>
                </div>
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
                        <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="categoryFirst" label="一级分类">
                    </el-table-column>
                    <el-table-column prop="categorySecond" label="二级分类">
                        <template slot-scope="scope">
                            <p style="margin: 6px 0" v-for="(ele,i) in scope.row.categorySecond" :key="i">{{ele}}</p>
                        </template>
                    </el-table-column>
                    <el-table-column prop="storeNum" label="商铺数量">
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" sixe="small" @click="editClick(scope.row)">编辑</el-button>
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
    import {Shops, Tags} from "@/web/module/lending";

    export default {
        name: "shopClassify",
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
                this.loading = false;
                Shops.shopClassify(this.postData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.dataList = res.data.data;
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    } else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message({ center: true, type: "warning", message: res.message });
                    }
                })
            },
            /**
             * 增加信息
             */
            addition() {
                const that = this;
                that.$router.push({"path": "/shop/addShopClassify"});
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
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick() {
                this.pagination.currentPage++;
                this.postData.cursor++;
                this.getData();
            },
            handleClick(data) {
                console.log(data);
            },
            editClick(data) {
                console.log(data);
                const that = this;
                that.$router.push({"path": "/shop/updateShopClassify", "query": {shopClassifyId: data.cid}});
            }
        },
        beforeCreate() {
        },
        beforeMount() {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 190;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 190
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
    #shopClassify {
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

                .el-table {
                    margin: 1px;
                    .cell {
                        text-align: center;
                    }
                    td {
                        padding: 0;
                    }
                    img {
                        width: 118px;
                        margin: 12px auto 5px;
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
                    ;
                        .el-input__suffix-inner {
                            display: none;
                        }
                    }
                }
            }
        }

    }

    ;
</style>


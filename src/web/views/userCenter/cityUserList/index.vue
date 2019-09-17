<!--
  - index Vue
  - @JsName index
  - @Description 各城市用户视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="cityUserList">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="screen-box">
                        <el-input style="width: 390px" v-model="searchValue" placeholder="城市名称"></el-input>
                        <el-button type="primary" size="small">搜索</el-button>
                    </div>
                    <!-- 表格 -->
                    <div class="table-box">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="data"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column type="index" fixed label="编号" align="center" width="258">
                                <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                            </el-table-column>
                            <el-table-column label="省份" align="center">
                                <template slot-scope="scope">{{ scope.row.province }}</template>
                            </el-table-column>
                            <el-table-column label="所属区域" align="center">
                                <template slot-scope="scope">{{ scope.row.district }}</template>
                            </el-table-column>
                            <el-table-column label="区域人数" align="center">
                                <template slot-scope="scope">{{ scope.row.districtNum}}</template>
                            </el-table-column>
                            <el-table-column label="VIP用户数" align="center">
                                <template slot-scope="scope">{{ scope.row.vipUserNum}}</template>
                            </el-table-column>
                            <el-table-column label="一级代理用户数" align="center">
                                <template slot-scope="scope">{{ scope.row.agentUserNum}}</template>
                            </el-table-column>
                            <el-table-column label="代理人" align="center">
                                <template slot-scope="scope">
                                    <p :class="{act:scope.row.agentUser=='暂无代理'}">{{ scope.row.agentUser}}</p>
                                </template>
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
    import { UserCenter, Tags } from "@/web/module/lending";
    export default {
        name: "cityUserList",
        data(){
            return {
                loading: true,
                "tableHeight": 400,
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
        },
    }
</script>

<style lang="scss">
#cityUserList {
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
                .screen-box {
                    margin: 15px 0 30px 0;
                    text-align: left;
                    .el-button {
                        margin-left: 12px;
                    }
                }
                .table-box {
                    .act{
                        color: #3383FF !important;
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
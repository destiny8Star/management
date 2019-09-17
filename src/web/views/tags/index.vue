<!--
  - tags Vue
  - @JsName index
  - @Description 标签视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->  
<template>
    <div id="tags">
        <el-container direction="vertical" v-loading="loading">
            <el-header>
                <div id="sign">
                    <span class="signicon">#</span>
                    <span class="signtext">标签列表 :: {{$route.meta.title}}</span>
                </div>
                <div id="group">
                    <span class="groupicon" title="新增"><i class="material-icons addition" @click="addition()">add</i></span>
                    <span class="groupicon" title="刷新"><i class="material-icons" @click="refresh()">refresh</i></span>
                </div>
            </el-header>
            <el-main>
                <template>
                    <el-tabs class="tabs"  v-model="param.tagType" type="border-card"  @tab-click="tabChange">
                        <el-tab-pane label="首页标签" name="0"></el-tab-pane>
                        <el-tab-pane label="借款标签" name="1"></el-tab-pane>
                        <el-tab-pane label="信用卡标签" name="2"></el-tab-pane>
                    </el-tabs>
                </template>
                <div class="content">
                    <el-container direction="vertical">
                        <!-- 表格 -->
                        <el-main>
                            <el-table :data="data"  height="100%">
                                <el-table-column type="index" label="序号" align="center">
                                    <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                                </el-table-column>
                                <el-table-column label="名称" align="center" min-width="120">
                                    <template slot-scope="scope">{{ scope.row.name }}</template>
                                </el-table-column>
                                <el-table-column label="图标" align="center">
                                    <template slot-scope="scope">
                                        <img v-bind:src="scope.row.icon"/>
                                    </template>
                                </el-table-column>
                                <el-table-column label="编码" align="center" min-width="220">
                                    <template slot-scope="scope">{{ scope.row.code }}</template>
                                </el-table-column>
                                <el-table-column label="入口" align="center"  min-width="80">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.isEntrance === true">{{ "是" }}</span>
                                    <span v-else>{{ "否" }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="状态" align="center"  min-width="80">
                                    <template slot-scope="scope">
                                    <span v-if="scope.row.isEnable === true">{{ "启用" }}</span>
                                    <span v-else>{{ "禁用" }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="排序权重" align="center"  min-width="80">
                                    <template slot-scope="scope">{{ scope.row.sortPriority }}</template>
                                </el-table-column>
                                <el-table-column label="创建时间" align="center" min-width="160">
                                    <template slot-scope="scope">{{ scope.row.createdTime }}</template>
                                </el-table-column>
                                <el-table-column label="操作" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <el-dropdown @command="actuator" v-loading="dropdown">
                                            <el-button type="primary" size="small" plain>{{ "操作" }}</el-button>
                                            <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item :command="{data: scope.row, operate: 1}">{{ "编辑" }}</el-dropdown-item>
                                            <el-dropdown-item :command="{data: scope.row, operate: 2}">
                                                <span v-if="scope.row.isEnable === true">{{ "禁用" }}</span>
                                                <span v-else>{{ "启用" }}</span>
                                            </el-dropdown-item>
                                            <el-dropdown-item :command="{data: scope.row, operate: 3}">{{ "删除" }}</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </el-dropdown>
                                    </template>
                                </el-table-column>
                            </el-table> 
                        </el-main>
                        <!-- 分页器 -->
                        <el-footer>
                            <div class="pagination">
                                <el-pagination @current-change="jumpPagination"
                                    layout="total, prev, pager, next, jumper"
                                    :current-page="pagination.currentPage"
                                    :page-size="pagination.pageSize"
                                    :total="pagination.total">
                                </el-pagination>
                            </div>
                        </el-footer>
                     </el-container>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Tags } from "@/web/module/lending";
export default {
    name: "tags",
    components: {
        head
    },
    data () {
        return {
            "loading": true,
            "dropdown": false,
            "param": {
                "page": 1,
                "tagType": 0
            },
            "data": [],
            "pagination": {
                "total": 0,
                "pageCount": 0,
                "currentPage": 1,
                "pageSize": 10,
            },
        }
    },
    methods: {
        /**
         * 切换tab
         */
        tabChange () {
            this.loadingInfo ();
        },
        /**
         * 加载数据
         */
        loadingInfo () {
            const that = this; 
            that.loading = true;
            setTimeout(() => {
                Tags.obtainPaging({ ...that.param }).then((res) => {
                    that.loading = false;
                    if (res) {
                        if (res.code === 10001) {
                            const { totalCount, totalPage, page, size, data } = res.data;
                            that.data = data;
                            that.pagination.total = totalCount;
                            that.pagination.pageCount = totalPage;
                            that.pagination.currentPage = page;
                            that.pagination.pageSize = size;
                        } else {
                            that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                        }
                    }
                }, (err) => {
                    that.loading = false;
                    that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 状态
         */
        shelfStatus (data) {
            const that = this, status = data.isEnable, text = (status === true) ? "禁用" : "启用"; 
            that.dropdown = true;
            Tags.modify({ id: data.id, isEnable: !(status === true), tagType: that.param.tagType, creditType:data.creditType }).then((res) => {
                if (res) {
                    if (res.code === 10001) {
                        that.$message({ center: true, type: "success", duration: "1500", message: text.concat(res.result), onClose: () => {
                            that.dropdown = false;
                            // 加载数据
                            that.loadingInfo();    
                        }});
                    } else {
                        that.dropdown = false;
                        that.$message({ center: true, type: "warning", message: text.concat("失败 , ").concat(res.result) });
                    }
                } else {
                    that.dropdown = false;
                }
            }, (err) => {
                that.dropdown = false;
                that.$message({ center: true, type: "warning", message: text.concat("失败 , 网络异常") });
                console.error(err);
            });        
        },
        /**
         * 删除
         */
        remove (data) {
            const that = this, text = "删除"; 
            that.$confirm("此操作将永久删除该标签 , 是否继续 ?", "提示", { 
                "confirmButtonText": "确定",
                "cancelButtonText": "取消",
                "type": "warning",
            }).then(() => {
                that.dropdown = true;
                Tags.remove({ "id": data.id }).then((res) => {
                    if (res) {
                        if (res.code === 10001) {
                            that.$message({ center: true, type: "success", duration: "1500", message: text.concat(res.result), onClose: () => {
                                that.dropdown = false;
                                // 加载数据
                                that.loadingInfo();    
                            }});
                        } else {
                            that.dropdown = false;
                            that.$message({ center: true, type: "warning", message: text.concat("失败 , ").concat(res.result) });
                        }
                    } else {
                        that.dropdown = false;
                    }
                }, (err) => {
                    that.dropdown = false;
                    that.$message({ center: true, type: "warning", message: text.concat("失败 , 网络异常") });
                    console.error(err);
                });        
            }).catch(() => {
                that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });          
            });
        },
        /**
         * 增加信息
         */
        addition () {
            const that = this;
            that.$router.push({ "path": "/tags/addition" });
        },
        /**
         * 执行器
         */
        actuator ({ data, operate }) {
            const that = this;
            switch (operate) {
                case 1:
                    that.$router.push({ "name": "tags-modify", "params": { "tagsId": data.id, "page": that.pagination.currentPage } });
                    break;
                case 2:
                    that.shelfStatus(data);
                    break;    
                case 3:
                    that.remove(data);
                    break;    
                default:
                    console.warn("Command 操作错误 , 未匹配到 Command 操作. ")
                    break;
            }
        },
        /**
         * 刷新
         */
        refresh () {
            const that = this; 
            that.loading = true; 
            that.param.page = 1;
            // 加载数据
            that.loadingInfo();
        },
        /**
         * 分页跳转
         */
        jumpPagination (val) {
            const that = this; 
            that.loading = true; 
            that.param.page = val; 
            // 加载数据
            that.loadingInfo();
        },
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this, { page } = that.$route.params; 
        if (page) {
            that.param.page = page;
        } 
        // 加载数据
        that.loadingInfo();
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#tags {
    width: 100%;
    height: 100%;

    .tabs{
        background: #fff;
        padding:10px 20px;
        border:0 !important;
        .el-tabs__content {
            display:none;
        }

    }

    .el-header {
        padding: 0;
        height: 72px !important;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 2px #e6dfdf;
        #sign {
            width: 200px;
            height: 100%;
            display: flex;
            .signicon {
                width: 32px;
                height: 32px;
                border-radius: 16px;
                margin: 20px 10px 20px 38px;    
                background-color: #E3EDFD;
                border: 1px solid #6189D3;
                font {
                    color: #6189D3;
                    font-size: 16px;
                    font-family: "material-icons";
                    line-height: 30px;
                };
            };
            .signtext {
                line-height: 72px;
                color: #606266;
            };  
        };
        #group {
            display: flex;
            width: 170px;
            height: 72px;
            float: right;
            top: 0;
            right: 0;
            position: absolute;
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            .groupicon {
                display: block;
                width: 38px;
                height: 100%;
                margin-right: 12px;
                .material-icons {
                    cursor: pointer;
                    font-size: 24px;
                    color: #606266;
                    line-height: 72px;        
                };
                .material-icons.addition {
                    font-size: 28px;
                };
            };
        };
    };
    .el-main {
        width: 100%;
        height: 100%;
        .content {
            height: inherit;
            background-color: #FFFFFF;
            .el-main {
                .el-table {
                    td {
                        padding: 0;
                    };
                    img {
                        width: 50px;
                        border-radius: 50px;
                        margin: 12px auto 5px;
                    };
                };
            };
            .el-footer {
                height: 52px !important;
            };
        };
    };
};
</style>

<!--
  - operate Vue
  - @JsName index
  - @Description 运营模块首页视图.  【赶项目，一期，icon列表】
  - @DateTime 2019-03-13 20:39:22
  - @author 杜
  -->
<!-- 视图 -->
<template>
    <div id="iconIndex">
        <el-container v-loading="loading">
            <div class="content">
                <div class="handleBox">
                    <div class="btnBox">
                        <el-button
                                :class="{act:btnIndex==index}"
                                plain
                                v-for="(btn,index) in btnList"
                                :key="index"
                                @click="getDataClick(index)">
                            {{ btn.text }}
                            <img v-if="btnIndex==index" src="../../../../assets/dui@2x.png" alt="">
                        </el-button>
                    </div>
                    <div class="top-btn-box">
                        <el-button type="primary" @click="addition()"><i class="el-icon-plus"></i>添加图标</el-button>
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
                        <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) +
                            (scope.$index + 1) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="图标名称">
                    </el-table-column>
                    <el-table-column label="图标" align="center">
                        <template slot-scope="scope">
                            <img v-bind:src="scope.row.pic" onerror="" title="外部图片"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="click" label="点击次数">
                    </el-table-column>
                    <el-table-column prop="dateClick" label="平均日点击数">
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
    import {Operate, Tags} from "@/web/module/lending";

    export default {
        name: "iconIndex",
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
                //接口参数【status：1-首页顶部轮播；2-首页中部小banner；3-我的中部banner】
                "postData": {
                    "cursor": 1,
                    "size": 10,
                    "type": 5
                },
                btnIndex: '0',//【等同于postData里面的status】
                "btnList": [
                    {id: 5, text: '首页icon'},
                    {id: 6, text: '首页中部四宫格'},
                    {id: 7, text: '商圈icon'},
                    {id: 8, text: '卡管顶部icon'},
                ]
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getData() {
                this.loading = false;
                Operate.advertisingList(this.postData).then(res => {
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
                that.$router.push({"path": "/operate/addIcons", query: {type: that.postData.type}});
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
                that.$router.push({"path": "/operate/updateIcon", "query": {iconId: data.id}});
            },
            // 选择按钮
            getDataClick(i) {
                const that = this;
                if (i == 0) {
                    that.btnIndex = i;
                    console.log('首页icon');
                    that.postData.type = 5;
                    this.postData.cursor = 1;
                    this.getData();
                }
                if (i == 1) {
                    that.btnIndex = i;
                    that.postData.type = 6;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('首页中部4宫格');
                }
                if (i == 2) {
                    that.btnIndex = i;
                    that.postData.type = 7;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('商圈icon');
                }
                if (i == 3) {
                    that.btnIndex = i;
                    that.postData.type = 8;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('卡管顶部icon');
                }
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

            const that = this;
            that.btnIndex = 0;
            this.getData();
        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #iconIndex {
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
                            width: 211px;
                            height: 58px;
                            font-size: 24px;
                            .el-icon-plus {
                                margin-right: 15px;
                            }
                        }
                    }
                    .btnBox {
                        height: 102px;
                        display: flex;
                        align-items: center;
                        padding-left: 60px;
                        .el-button.act {
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                        }
                        .el-button {
                            width: 244px;
                            height: 57px;
                            border-radius: 5px;
                            font-size: 24px;
                            margin-right: 40px;
                            position: relative;
                            img {
                                width: 23px;
                                height: 22px;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                        }
                    }
                ;
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

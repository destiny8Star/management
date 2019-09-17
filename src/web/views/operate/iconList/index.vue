<!--
  - iconList Vue
  - @JsName index
  - @Description 运营模块-图标管理视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="iconList">
        <el-container  v-loading="loading">
            <div class="content">
                <div class="top-btn-box">
                    <el-button type="primary" @click="addition()"><i class="el-icon-plus"></i>添加图标</el-button>
                </div>
                <!-- 表格 -->
                <el-table
                        :header-cell-style="{background:'#fafafa'}"
                        :data="data"
                        stripe
                        border
                        style="width: 100%"
                        max-height="860"
                        height="calc(100% - 200px)">
                    <el-table-column type="index" fixed width="80" label="编号" align="center">
                        <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                    </el-table-column>
                    <el-table-column label="标题" align="center">
                        <template slot-scope="scope">{{ scope.row.title }}</template>
                    </el-table-column>
                    <el-table-column label="icon图标" align="center">
                        <template slot-scope="scope">
                            <img v-bind:src="scope.row.image" onerror="" title="外部图片"/>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态" align="center">
                        <template slot-scope="scope">
                            <el-tag
                                :type="scope.row.isPutaway ? 'primary' : 'success'"
                                disable-transitions>{{scope.row.isPutaway?'上架':'下架'}}</el-tag>
                        </template>

                    </el-table-column>
                    <el-table-column label="位置" align="center">
                        <template slot-scope="scope">{{ scope.row.location }}</template>
                    </el-table-column>
                    <el-table-column label="权重" align="center">
                        <template slot-scope="scope">{{ scope.row.weight}}</template>
                    </el-table-column>
                    <el-table-column label="操作" fixed="right" align="center" width="160">
                        <template slot-scope="scope">
                            <el-button type="text" sixe="small" @click="editClick(scope.row)">编辑</el-button>
                            <el-button class="Danger" @click="handleClick(scope.row)" style="color: red" type="text" size="small">{{'移除'}}</el-button>
                            <el-switch
                                    @change="putaway(scope.row,scope.row.isPutaway)"
                                    :disabled = 'data.length<5'
                                    v-model="scope.row.isPutaway"
                                    inactive-text="下架"
                                    active-text="上架">
                            </el-switch>
                        </template>
                    </el-table-column>
                </el-table>
                <!--tab1e结束-->
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
        </el-container>

    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import { Operate, Tags } from "@/web/module/lending";
    var datalist = [
        {
            id:'1',
            title:'热销爆款15',//标题
            image:require('../../../../assets/logo.png'),//icon图标
            location: '商城中部' ,//位置
            weight: '2',//权重
            isPutaway: true,//是否上下架--从而决定状态【true-上架；false-下架】
        },
        {
            id:'2',
            title:'热销爆款15',
            image:require('../../../../assets/logo.png'),
            location: '商城中部' ,
            weight: '2',
            isPutaway: false,
        },
        {
            id:'3',
            title:'热销爆款15',
            image:require('../../../../assets/logo.png'),
            location: '商城中部' ,
            weight: '2',
            isPutaway: false,
        },
        {
            id:'4',
            title:'热销爆款15',
            image:require('../../../../assets/logo.png'),
            location: '商城中部' ,
            weight: '2',
            isPutaway: true,
        },
        {
            id:'5',
            title:'热销爆款15',
            image:require('../../../../assets/logo.png'),
            location: '商城中部' ,
            weight: '2',
            isPutaway: false,
        }
    ];
    export default {
        name: "iconList",
        components: {

        },
        data () {
            return {
                "loading": true,
                "dropdown": false,
                "param": {
                    "page": 1,
                },
                "data": datalist,
                "pagination": {
                    "total": 2000,
                    "pageCount": 0,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
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
             * 增加信息
             */
            addition () {
                const that = this;
                that.$router.push({ "path": "/operate/addIcon" });
            },
            /**
             * 移除
             */
            handleClick (data) {
                console.log(data);
            },
            /**
             * 编辑
             */
            editClick (data) {
                const that = this;
                that.$router.push({ "path": "/goods/modify"});
            },
            /**
             * 上下架
             */
            putaway(data,boo){
                console.log(data,boo);
                if(data.isPutaway){
                    this.popUp('确认上架该icon图标？',data);
                }else {
                    this.popUp('确认下架该icon图标？',data);
                }
            },
            /**
             * 删除
             */
            remove (data) {
                const that = this, text = "删除";
                that.$confirm("此操作将永久删除该产品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    that.dropdown = true;
                    Goods.remove({ "id": data.id, tagType:that.param.tagType }).then((res) => {
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
             * 分页跳转
             */
            jumpPagination (val) {
                const that = this;
                that.loading = true;
                that.param.page = val;
                // 加载数据
                that.initData();
            },

            /**
             * 选择广告位置
             */
            chooseLocation(value){
                console.log(value);
            },
            /**
             * 筛选广告名称
             */
            search(){
                console.log("搜索");
            },
            popUp(message,data) {
                this.$confirm(message, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log(data.isPutaway);
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                }).catch(() => {
                    console.log(data.isPutaway);
                    data.isPutaway = !data.isPutaway;
                    console.log(data.isPutaway);
                    this.$message({
                        type: 'info',
                        message: '已取消该操作'
                    });
                });
            }

        },
        beforeCreate () {
        },
        beforeMount () {
            const that = this, { page } = that.$route.params;
            if (page) {
                that.param.page = page;
            }
            // 初始化标签
            that.initData();
        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #iconList {
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
                .top-btn-box {
                    text-align: left;
                    padding:15px 30px;
                    .el-button--primary {
                        width: 211px;
                        height: 58px;
                        font-size: 24px;
                        .el-icon-plus {
                            margin-right: 15px;
                        }
                    }
                }

                .el-table {
                    margin-bottom: 320px;
                    td {
                        padding: 0;
                    };
                    img {
                        width: 118px;
                        margin: 12px auto 5px;
                    };
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
                        justify-content: space-between;
                        .el-pagination .el-select .el-input .el-input__inner {
                            padding-right: 8px;
                        };
                        .el-input__suffix-inner {
                            display: none;
                        }
                    }
                };
            };
        }

    };
</style>

<!--
  - openServiceProvider Vue
  - @JsName index
  - @Description 开通服务商列表视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="openServiceProvider">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="btnBox">
                        <el-button
                                :class="{act:btnIndex==index}"
                                plain
                                v-for="(btn,index) in btnList"
                                :key="index"
                                @click="getDataClick(index)">
                            {{ btn.text }}
                            <img v-if="btnIndex==index" src="../../../assets/dui@2x.png" alt="">
                        </el-button>
                    </div>
                    <!--  表格  -->
                    <div class="tableBox">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column
                                    type="index"
                                    fixed
                                    label="编号"
                                    width="89px">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) )  +1 }}</template>
                                <!--<template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>-->
                            </el-table-column>
                            <el-table-column prop="account" label="开通账户">
                            </el-table-column>
                            <el-table-column prop="name" label="姓名">
                            </el-table-column>
                            <el-table-column prop="cardNo" label="身份证" width="260">
                            </el-table-column>
                            <el-table-column prop="amount" label="缴费金额（元）">
                            </el-table-column>
                            <el-table-column prop="address" label="服务区域">
                            </el-table-column>
                            <el-table-column prop="type" label="状态">
                            </el-table-column>
                            <el-table-column prop="createTime" label="申请时间">
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    fixed="right"
                                    width="130px">
                                <template slot-scope="scope">
                                    <el-button type="text"  @click="deliverClick(scope.row)" size="small">查看信息</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
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
    import { UserCenter, Tags } from "@/web/module/lending";
    const map = {1:'区域服务商', 2:'城市服务商'};
    export default {
        name: "openServiceProvider",
        data(){
            return{
                "loading": true,
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
                //接口参数【status：1 待审核 2 待开通 3 已拒绝 4 已经开通】
                "postData":{
                    "cursor": 1,
                    "size": 10,
                    "status": 2
                },
                btnIndex: '0',//【等同于postData里面的status】
                "btnList" :[
                    {id: 1, text: '待开通'},
                    {id: 2, text: '已开通'}
                ]
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getData(){
                this.loading = false;
                UserCenter.partnerList(this.postData).then(res=>{
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
            // 确认完成订单
            confrimOrder() {
                this.$confirm('此操作将确认完成该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '确认成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },
            /**
             * 查看信息
             * @param data
             */
            deliverClick (data) {
                console.log(data);
                this.$router.push({path:'/openServiceProvider/openInfo',query:{openId:data.id,isOpen:this.btnIndex}})
            },
            // 选择按钮
            getDataClick(i){
                const that = this;
                if(i==0) {
                    that.btnIndex = i;
                    console.log('待开通');
                    that.postData.status = 2;
                    this.postData.cursor = 1;
                    this.getData();
                }
                if(i==1) {
                    that.btnIndex = i;
                    that.postData.status = 4;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('已开通');
                }
            }

        },
        beforeCreate () {
        },
        beforeMount () {
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
            /**
             * 获取表格数据
             */
            this.getData();
        },
    }
</script>

<style lang="scss">
    #openServiceProvider {
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                padding: 15px;
                .content {
                    width: 100%;
                    height: 100%;
                    padding: 15px 0;
                    background: #fff;
                    position: relative;
                    .btnBox {
                        height: 102px;
                        display: flex;
                        align-items: center;
                        padding-left: 63px;
                        .el-button.act{
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                        }
                        .el-button {
                            width: 204px;
                            height: 57px;
                            border-radius: 5px;
                            font-size: 24px;
                            margin-right: 93px;
                            position: relative;
                            img {
                                width: 23px;
                                height: 22px;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                        }
                    };
                    .tableBox {
                        padding: 0 15px;
                        .el-table {
                            margin: 1px;
                            line-height: 30px;
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
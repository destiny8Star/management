<!--
  - consumeSP Vue
  - @JsName consumeSP
  - @Description 累计收入-区域消费返佣补贴明细视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="consumeSP">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button
                                icon="el-icon-arrow-left"
                                type="text"
                                @click="$router.push('/userCenter/incomeIndex')">返回
                        </el-button>
                    </div>
                    <div class="showBox">
                        <div class="item" v-for="(ele,i) in showList" :key="i">
                            <div class="text">{{ ele.text }}</div>
                            <div class="num">{{ ele.num }}<span v-if="ele.text=='补贴笔数'">笔</span></div>
                        </div>
                    </div>
                    <div class="tableBox">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column type="index" fixed label="编号"  width="258">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                            </el-table-column>
                            <!--<el-table-column label="用户" >-->
                            <!--<template slot-scope="scope">-->
                            <!--<p>{{ scope.row.userName }}</p>-->
                            <!--<el-button type="text" sixe="small" @click="deliverClick(scope.row)">查看用户<i class="el-icon-arrow-right"></i></el-button>-->
                            <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column prop="shareProfitType" label="分润详情" >
                            </el-table-column>
                            <el-table-column prop="createTime" label="分润时间" >
                            </el-table-column>
                            <el-table-column prop="subsidyAmount" label="分润金额(元)" >
                            </el-table-column>
                            <el-table-column prop="shareAmount" label="补贴金额(元)" >
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

<script>
    import { AccumulatedIncome, Tags } from "@/web/module/lending";
    const map = {1:"还款", 2:"升级PLUS会员", 3:"升级一级代理", 4:"线下收款"};
    export default {
        name: "consumeSP",
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
                    "type": '',
                    "userId": '',//用户id
                },
                showList: [
                    {id:1, text: '区域补贴', num: '2000.00'},
                    {id:2, text: '补贴笔数', num: '888'}
                ]
            }
        },
        methods: {
            /**
             * 获取列表数据
             */
            getData(){
                this.loading = false;
                console.log('3',this.postData);
                AccumulatedIncome.awardDetailList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        var date,y,m,d,h,mm,s;
                        this.dataList.forEach(ele=>{
                            ele.shareProfitType = map[ele.shareProfitType];
                            date = new Date(ele.createTime);
                            y = date.getFullYear();
                            m = date.getMonth()+1;
                            d = date.getDate();
                            h = date.getHours();
                            mm = date.getMinutes();
                            s = date.getSeconds();
                            m = m < 10 ? "0" + m : m;
                            d = d < 10 ? "0" + d : d;
                            h = h < 10 ? "0" + h : h;
                            mm = mm < 10 ? "0" + mm : mm;
                            s = s < 10 ? "0" + s : s;
                            ele.createTime = y + "-" + m + "-" + d + " " + h + ":" + mm + ":" + s;
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
             *
             * 查看用户
             */
            deliverClick (data) {
                var that = this;
                console.log(data);
                localStorage.userDetailId = data.userId;
                that.$router.push({path:'/userCenter/userDetail',query:{userId:data.userId}})
            },
        },
        beforeCreate () {
        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 240;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 240
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            if(this.$route.query){
                var info;
                console.log(JSON.parse(this.$route.query.info));
                info = JSON.parse(this.$route.query.info);
                this.postData.type = info.type;
                this.showList[0].num = info.profitAmount;
                this.showList[1].num = info.number;
            }
            this.postData.userId = localStorage.userDetailId;
            // 获取列表数据
            this.getData();
        },
    }
</script>

<style lang="scss">
    #consumeSP {
        width: 100%;
        height: 100%;
        color: #3E3E4D;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    padding: 15px;
                    position: relative;
                    .back {
                        text-align: left;
                        margin: 0 15px;
                        .el-button {
                            color: #3E3E4D;
                            font-size: 20px;
                        }
                    }
                    .showBox {
                        display: flex;
                        align-items: center;
                        margin: 10px 0 44px;
                        .item {
                            margin-left: 136px;
                            display: flex;
                            align-items: center;
                            .text,.num {
                                width: 185px;
                                line-height: 74px;
                                background: #3383FF;
                                border:3px solid #3383FF;
                                color: #fff;
                                font-size: 22px;
                            }
                            .num {
                                background: #fff;
                                color: #3383FF;
                            }
                        }
                    }
                    .tableBox {
                        width: 100%;
                        .el-button {
                            padding: 0;
                        }
                        .el-table {
                            width: 100%;
                            padding: 1px;
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


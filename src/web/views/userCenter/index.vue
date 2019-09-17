<template>
    <div id="userCenter">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="data-box">
                        <div class="data-item" v-for="(data,index) in dataLists" :key="index">
                            <img :src="data.url" alt="">
                            <div class="text-box">
                                <p>{{ data.amount }}</p>
                                <p>{{ data.title }}</p>
                                <p class="upUser" v-if="data.up">缴费升级{{ data.up }}人</p>
                            </div>
                        </div>
                    </div>
                    <div class="table-box">
                        <h2>数据统计表</h2>
                        <h3>今日数据</h3>
                        <div class="todayData">
                            <el-card
                                    class="box-card"
                                    v-for="(ele,i) in cardList"
                                    :key="i">
                                <div class="clearfix">
                                    <p>
                                       <span>{{ ele.title }}</span>
                                        <b>{{ ele.num }}</b>
                                    </p>
                                </div>
                            </el-card>
                        </div>
                        <!--<h3>历史数据</h3>-->
                        <!--  表格  -->
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column prop="date" label="日期" width="148px">
                            </el-table-column>
                            <el-table-column prop="newUserNum" label="新注册用户(人)">
                            </el-table-column>
                            <el-table-column prop="userRealNum" label="实名用户(人)">
                            </el-table-column>
                            <el-table-column prop="newRealNameNum" label="当日新注册并实名用户(人)" width="244px">
                            </el-table-column>
                            <el-table-column prop="vipUpNum" label="邀请升级vip用户(人)">
                            </el-table-column>
                            <el-table-column prop="vipBuyNum" label="购买升级VIP用户(人)">
                            </el-table-column>
                            <el-table-column prop="agentNum" label="升级执行服务商(人)">
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
    export default {
        name: "userCenter",
        data(){
            return{
                "loading": true,
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
                    "cursor": 1,
                    "size": 10
                },
                "dataList": [],
                "dataLists" :[
                    {id:1 ,title: '注册用户', amount: '8888888', url: require('../../../assets/img/views/userCenter/yh.png')},
                    {id:2 ,title: '实名用户', amount: '8888888', url: require('../../../assets/img/views/userCenter/yh(1).png')},
                    {id:3 ,title: 'VIP用户', amount: '8888888', url: require('../../../assets/img/views/userCenter/vip.png'),up: '8888'},
                    {id:4 ,title: '区域服务商', amount: '8888888', url: require('../../../assets/img/views/userCenter/zs.png')},
                    {id:5 ,title: '城市服务商', amount: '8888888', url: require('../../../assets/img/views/userCenter/hg.png')},
                    {id:6 ,title: '城市服务商申请列表', amount: '8888888', url: require('../../../assets/img/views/userCenter/hg.png')}
                ],
                "cardList": [
                    {id:1,title: '新注册用户(人)',num: '88888'},
                    {id:2,title: '实名用户(人)',num: '88888'},
                    {id:3,title: '当日新注册并实名用户(人)',num: '88888'},
                    {id:4,title: '邀请升级vip用户(人)',num: '88888'},
                    {id:5,title: '购买升级vip用户(人)',num: '88888'},
                    {id:6,title: '升级执行服务商(人)',num: '88888'}
                ],
            }
        },
        methods: {
            /**
             * 获取展示数据
             */
            getShowData(){
                this.loading = false;
                UserCenter.total().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataLists[0].amount = res.data.userTotalNum;
                        this.dataLists[1].amount = res.data.realTotalNum;
                        this.dataLists[2].amount = res.data.vipTotalNum;
                        this.dataLists[2].upUser = res.data.vipUpTotalNum;
                        this.dataLists[3].amount = res.data.oneAgentTotalNum;
                        this.dataLists[4].amount = res.data.cityAgentTotalNum;
                        this.dataLists[5].amount = res.data.cityAgentListNum;

                        this.cardList[0].num = res.data.newUserNum;
                        this.cardList[1].num = res.data.newRealNameNum;
                        this.cardList[2].num = res.data.userRealNum;
                        this.cardList[3].num = res.data.vipUpNum;
                        this.cardList[4].num = res.data.vipBuyNum;
                        this.cardList[5].num = res.data.agentNum;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 获取列表数据
             */
            getData(){
                this.loading = false;
                UserCenter.list(this.postData).then(res=>{
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
            deliverClick (data) {
                console.log(data);
            },
        },
        beforeCreate () {
        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 150;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 150
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            // 获取列表数据
            this.getData();
            // 获取展示数据
            this.getShowData();
        },
    }
</script>

<style lang="scss">
#userCenter {
    width: 100%;
    height: 100%;
    .el-container {
        .el-main {
            padding: 15px;
            .content {
                width: 100%;
                height: 100%;
                background: #fff;
                position: relative;
                overflow: hidden;
                .data-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background: #f5f5f5;
                    .data-item {
                        min-width: 260px;
                        height: 142px;
                        padding: 0 18px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        background: #0EB947;
                        font-size: 40px;
                        font-weight: bold;
                        color: #fff;
                        text-align: right;
                        margin-bottom: 15px;
                        img {
                            width: 44px;
                            height: 44px;
                            margin-right: 10px;
                            padding-bottom: 10px;
                        }
                        .text-box {
                            p:nth-child(2) {
                                font-size: 22px;
                                font-weight: normal;
                            }
                            .upUser {
                                font-size: 18px;
                            }
                        }
                    }
                    .data-item:nth-child(2) {
                        background: #FEA801;
                    }
                    .data-item:nth-child(3) {
                        background: #0FC8FF;
                    }
                    .data-item:nth-child(4) {
                        background: #696CC2;
                    }
                    .data-item:nth-child(5) {
                        background: #FE4D53;
                    }
                    .data-item:nth-child(6) {
                        background: #ff12ae;
                    }
                }
                .table-box {
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    h2,h3 {
                        font-size: 24px;
                        text-align: left;
                    }
                    h3 {
                        font-size: 20px;
                        margin: 6px 10px;
                        color: #ff3335;
                    }
                    .todayData {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .box-card {
                            min-width: 220px;
                            /*max-width: 420px;*/
                            .el-card__body {
                                padding: 15px;
                                .clearfix {
                                    p {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        font-size: 20px;
                                        span {
                                            margin-right: 20px;
                                        }
                                        b {
                                            color: #ff3335;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .el-table {
                        margin: 15px 0 405px;
                        padding: 1px 0;
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
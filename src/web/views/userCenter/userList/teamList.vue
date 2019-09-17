<!--
  - teamList Vue
  - @JsName teamList
  - @Description 团队列表视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="teamList">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <p class="back">
                        <el-button @click="$router.push('/userCenter/userDetail')" type="text"><i class="el-icon-arrow-left"></i>返回</el-button>
                    </p>
                    <div class="title">
                        <div class="left"></div>
                        <p>{{ account }}用户的团队</p>
                        <div class="right"></div>
                    </div>
                    <div class="screenBox">
                        <div class="screen">
                            <el-radio @change="radioUpdate" v-model="radio" label="1">团队用户 ({{ teamNum }}人)</el-radio>
                            <el-radio @change="radioUpdate"  v-model="radio" label="2">直邀好友</el-radio>
                            <!--<el-button type="primary" size="mini" @click="radioUpdate">筛选</el-button>-->
                        </div>
                        <div class="show" v-if="grade=='3'">
                            <div class="item" v-for="(ele,i) in showList" :key="i">
                                <div class="text">{{ ele.text }}</div>
                                <div class="num">{{ ele.num }}<span v-if="ele.text=='区域人数'">人</span></div>
                            </div>
                        </div>
                    </div>

                    <!--表格开始-->
                    <div class="table-box">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column type="index" fixed label="编号" align="center" width="100">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="createTime" label="注册时间">
                            </el-table-column>
                            <el-table-column prop="userName" label="用户">
                            </el-table-column>
                            <el-table-column prop="idCard" label="身份证号">
                                <template slot-scope="scope">{{ scope.row.idCard?scope.row.idCard:'--'}}</template>
                            </el-table-column>
                            <el-table-column prop="realName" label="姓名">
                                <template slot-scope="scope">{{ scope.row.realName?scope.row.realName:'--'}}</template>
                            </el-table-column>
                            <el-table-column prop="level" label="等级">
                            </el-table-column>
                            <el-table-column v-if="radio=='2'" label="邀请人">
                                <template slot-scope="scope">{{ account }}</template>
                            </el-table-column>
                            <el-table-column label="操作" fixed="right" align="center" width="160">
                                <template slot-scope="scope">
                                    <el-button type="text" sixe="small" @click="goUserDetail(scope.row)">查看用户详情</el-button>
                                </template>
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
                    <!--表格结束-->
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { UserCenter, Tags } from "@/web/module/lending";
    export default {
        name: "teamList",
        data(){
            return{
                loading: true,
                "tableHeight": 400,
                "account": '',//谁的团队
                grade: '',//控制show地区的显示隐藏
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
                    "userId": '',//用户id
                },
                "dataList": [],//列表数据
                "teamLists": [],//团队列表数据
                "inviteList": [],//直邀列表数据
                "radio": '1',
                "teamNum": '1000',
                showList: [
                    {id:1, text: '所属区域', num: '浙江杭州'},
                    {id:2, text: '区域人数', num: '888'}
                ]
            }
        },
        methods: {
            /**
             * 单选改变时触发的事件
             */
            radioUpdate(){
                this.postData.cursor = 1;
                this.dataList = [];
                if(this.radio==2){
                    console.log("直邀");
                    //获取直邀好友列表
                    this.getInviteData();
                }else if(this.radio==1){
                    console.log("团队");
                    //获取团队用户列表
                    this.getData();
                }
            },
            /**
             * 获取团队列表数据
             */
            getData(){
                this.loading = false;
                console.log('3',this.postData);
                UserCenter.teamList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        this.pagination.total = res.data.count;
                        this.teamNum = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code==100070 || res.code == 404) {
                        this.$message(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message({
                            type: 'warning',
                            message: res.message
                        });
                    }
                })
            },
            /**
             * 获取直邀好友列表数据
             */
            getInviteData(){
                const that = this;
                this.loading = false;
                console.log('3',this.postData);
                UserCenter.teamInvite(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele=>{
                            this.$set(ele,'invite',that.account)
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
                this.radioUpdate();
            },
            /**
             * 上一页
             */
            prevClick(){
                this.pagination.currentPage --;
                this.postData.cursor --;
                this.radioUpdate();
            },
            /**
             * 下一页
             */
            nextClick(){
                this.pagination.currentPage ++;
                this.postData.cursor ++;
                this.radioUpdate();
            },
            goBillClick (data) {
                console.log(data);
                this.$router.push('/userCenter/billDetail')
            },
            /**
             * 查看用户详情
             */
            goUserDetail(data){
                console.log(data);
                localStorage.userDetailId = data.userId;
                this.$router.push('/userCenter/userDetail')
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 180;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 180
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
            // 获取列表数据
            this.account = localStorage.userDetailAccount;
            this.postData.userId = localStorage.userDetailId;
            // 获取列表数据
            this.radioUpdate();
        },
        mounted(){

        }
    }
</script>

<style lang="scss">
#teamList {
    width: 100%;
    height: 100%;
    color: #3E3E4D;
    .el-container {
        .el-main {
            .content {
                height: 100%;
                background: #fff;
                position: relative;
                padding: 24px 15px;
                overflow: hidden;
                .back {
                    position: absolute;
                    left: 28px;
                    top: 13px;
                    .el-button {
                        color: #3E3E4D;
                        font-size: 20px;
                    }
                }
                .title {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    p {
                        font-size: 28px;
                        font-family: 'PingFang-SC-Regular';
                        font-weight: bold;
                        margin: 0 20px;
                    }
                    .left, .right {
                        height: 3px;
                        border-top: .5px solid transparent;
                        border-bottom: 1px solid transparent;
                    }
                    .left {
                        border-right: 48px solid #3E3E4D;
                    }
                    .right {
                        border-left: 48px solid #3E3E4D;
                    }
                }
                .screenBox {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .screen {
                        text-align: left;
                        margin: 20px 0;
                        .el-radio {
                            .el-radio__label {
                                font-size: 20px;
                            }
                        }
                        .el-radio__input.is-checked+.el-radio__label {
                            color: #3E3E4D;
                        }
                    }
                    .show {
                        display: flex;
                        align-items: center;

                        .item {
                            margin-left: 33px;
                            display: flex;
                            align-items: center;
                            .text,.num {
                                width: 110px;
                                line-height: 40px;
                                background: #3383FF;
                                border:1px solid #3383FF;
                                color: #fff;
                                font-size: 20px;
                            }
                            .num {
                                background: #fff;
                                color: #3383FF;
                            }
                        }
                    }
                }
                .table-box {
                    height: 100%;
                    padding: 1px;
                    .el-table {
                        height: 100%;
                        margin: 1px 2px;
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
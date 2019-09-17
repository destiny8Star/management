<!--
  - userDetail Vue
  - @JsName userDetail
  - @Description 用户详情视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="userDetail">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <p class="back" @click="$router.go(-1)">
                    <el-button type="text" fixed="left" icon="el-icon-arrow-left">返回</el-button>
                </p>
                <div class="content">
                    <div class="detail-box">
                        <el-card class="box-card">
                            <div class="headImg">
                                <img :src="picture" alt="">
                            </div>
                            <div v-for="(val,k,i) in data" :key="i" class="item">
                                <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                <el-button @click="inviteDetail" type="text" v-if="k=='邀请人'&&val">查看用户 <i class="el-icon-arrow-right"></i></el-button>
                                <el-button @click="goIncome" type="text" v-if="k=='累计收入'">查看明细 <i class="el-icon-arrow-right"></i></el-button>
                            </div>
                        </el-card>
                    </div>
                    <div class="bank-box">
                        <div class="btn-box">
                            <div class="btn-item" v-for="(ele,i) in btnList" :key="i" :style="getBtnBg(ele)">
                            <!--<div class="btn-item" v-for="(ele,i) in btnList" :key="i" :style="{'backgroundImage':'url('+ ele.bgUrl +')','backgroundSize': '100% 100%'}">-->
                                <div class="icon-box">
                                    <div>
                                        <img :src="ele.icon" alt="">
                                    </div>
                                    <div @click="goDetailClick(ele)">
                                        <el-button :disabled="i==3||i==1" v-show="i!=3" type="text">查看详情<i class="el-icon-arrow-right"></i></el-button>
                                    </div>
                                </div>
                                <div class="text-box">
                                    <div>/ / {{ ele.text }}
                                        <p class="amount" v-show="ele.text=='团队列表'">{{ ele.amount }}人</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- 银行卡表格 -->
                        <div class="bankCard-box">
                            <el-card>
                                <el-table
                                        :header-cell-style="{background:'#fafafa',height: '62px'}"
                                        :data="bankData"
                                        border
                                        stripe
                                        style="width: 100%"
                                        max-height="480">
                                    <el-table-column prop="bankNo" label="银行卡号">
                                    </el-table-column>
                                    <el-table-column prop="mobile" label="预留手机">
                                    </el-table-column>
                                    <el-table-column prop="address" label="地区">
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template slot-scope="scope">
                                            <el-button disabled v-if="scope.row.status=='0'" type="text" style="color:#01A1FF">正常</el-button>
                                            <el-button disabled v-else-if="scope.row.status=='1'" type="text" style="color:#E60012">挂失</el-button>
                                            <el-button disabled v-else="scope.row.status=='2'" type="text">注销</el-button>
                                            </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </div>
                        <!-- 信用卡表格 -->
                        <div class="bankCard-box">
                            <el-card>
                                <el-table
                                        :header-cell-style="{background:'#fafafa',height: '62px'}"
                                        :data="creditCardData"
                                        border
                                        stripe
                                        style="width: 100%"
                                        max-height="480">
                                    <el-table-column prop="bankNo" label="信用卡号">
                                    </el-table-column>
                                    <el-table-column prop="mobile" label="预留手机">
                                    </el-table-column>
                                    <el-table-column label="状态">
                                        <template slot-scope="scope">
                                            <el-button disabled v-if="scope.row.status=='0'" type="text" style="color:#01A1FF">正常</el-button>
                                            <el-button disabled v-else-if="scope.row.status=='1'" type="text" style="color:#E60012">挂失</el-button>
                                            <el-button disabled v-else="scope.row.status=='2'" type="text">注销</el-button>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" fixed="right">
                                        <template slot-scope="scope">
                                            <el-button type="text" sixe="small" @click="goBillClick(scope.row)">查看账单<i class="el-icon-arrow-right"></i></el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { UserCenter, Tags } from "@/web/module/lending";
    let datalist = {
        "昵称": '',
        "等级": '',
        "升级时间": '',
        "账户": '',
        "注册时间": '',
        "姓名": '',
        "身份证号": '',
        "邀请人": '',
        "收货地址": '',
        "累计收入": '',
    };
    export default {
        name: "userDetail",
        data(){
            return {
                "userId": '',//当前用户id
                loading: true,
                "inviteUserId": '',//邀请人id
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
                },
                "data": datalist,
                "picture": '',//头像
                "btnList": [
                    {id:1,icon: require('../../../../assets/img/views/userCenter/tuandui.png'),text: '团队列表',amount: 0,bgUrl:require("../../../../assets/img/views/userCenter/jx.png")},
                    {id:2,icon: require('../../../../assets/img/views/userCenter/tuandui(1).png'),text: '个人还款记录',bgUrl:require("../../../../assets/img/views/userCenter/jx(1).png")},
                    {id:3,icon: require('../../../../assets/img/views/userCenter/tuandui(2).png'),text: '个人提现记录',bgUrl:require("../../../../assets/img/views/userCenter/jx(2).png")},
                    {id:4,icon: require('../../../../assets/img/views/userCenter/tuandui(3).png'),text: '余额明细',bgUrl:require("../../../../assets/img/views/userCenter/jx(3).png")},
                ],
                "bankData": [],//银行卡
                "creditCardData": [],//信用卡
            }
        },
        methods: {
            /**
             * 查看邀请人详情
             */
            inviteDetail(){
                localStorage.userDetailId = this.userId = this.inviteUserId;
                this.getDatas();
            },
            /**
             * 循环渲染btn背景图 【暂时没用上，实际渲染效果是纯css控制的。这个方法只渲染了第一个div的背景】
             */
            getBtnBg(item){
                return {'backgroundImage':'url('+ item.bgUrl +')','backgroundSize': '100% 100%'}
            },
            /**
             * 获取数据
             */
            getDatas(){
                this.loading = false;
                console.log('3',this.postData);
                var getData = {
                    "userId": this.userId
                };
                UserCenter.userDetail(getData).then(res=>{
                    console.log(res);
                    let info = res.data;
                    // info.createTime = info.createTime;
                    if(res.code==200){
                        datalist['昵称'] = info.nickName;
                        datalist['等级'] = info.level;
                        datalist['升级时间'] = info.updateTime;
                        datalist['账户'] = info.userName;
                        localStorage.userDetailAccount = info.userName;
                        datalist['注册时间'] = info.createTime;
                        datalist['姓名'] = info.realName;
                        datalist['身份证号'] = info.idCard;
                        datalist['邀请人'] = info.inviteName;
                        datalist['收货地址'] = info.address;
                        datalist['累计收入'] = info.amount;
                        this.inviteUserId = info.inviteUserId;
                        this.btnList[0].amount = info.teamNum;
                        this.bankData = info.debitBankCardRespList;
                        this.creditCardData = info.creditBankCardRespList;
                        this.picture = info.photoUrl;
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
             * 分页跳转
             */
            jumpPagination (val) {
                const that = this;
                that.loading = true;
                that.param.page = val;
                // 加载数据
                that.initData();
            },
            goBillClick (data) {
                console.log(data);
                localStorage.bankDetailNo = data.bankNo;
                this.$router.push('/userCenter/billDetail')
            },
            /**
             * 上边的四个查看详情
             */
            goDetailClick(val){
                let that = this;
                if(val.id == '1'){
                    console.log("去团队列表");
                    that.$router.push('/userCenter/teamList');
                }if(val.id == '2'){
                    console.log("个人还款记录");
                    that.$router.push('/userCenter/teamList');
                }if(val.id == '3'){
                    console.log("个人提现记录");
                    this.$router.push('/userCenter/withdrawalRecord')
                }
            },
            /**
             * 累计收入
             */
            goIncome(){
                this.$router.push({path:'/userCenter/incomeIndex'})
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            this.userId = localStorage.userDetailId;
            // 初始化标签
            this.getDatas();
        },
        beforeRouteEnter(to,from,next) {
            next(vm => {
                if (from.path == '/eggHome') {
                    vm.number = 1,
                        vm.chooseCoupon = 0
                }
            })
        }
    }
</script>

<style lang="scss">
#userDetail {
    color: #3E3E4D;
    .el-container {
        .el-main {
            .back {
                text-align: left;
                font-size: 20px;
                .el-button {
                    color: #3E3E4D;
                }
            };
            .content {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                .detail-box {
                    min-width: 470px;
                    /*margin-right: 12px;*/
                    .box-card {
                        border-radius: 30px;
                        .el-card__body {
                            padding: 48px 20px;
                            .headImg{
                                width: 126px;
                                height: 126px;
                                border-radius: 50%;
                                margin: 0 auto 20px;
                                background: url("../../../../assets/img/views/userCenter/headImg.png");
                                background-size: 100% 100%;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }

                            .item {
                                font-size: 20px;
                                text-align: left;
                                padding: 20px 0;
                                display: flex;
                                align-items: center;
                                p {
                                    width: 92px;
                                    text-align: justify;
                                    text-align-last: justify;
                                }
                                span {
                                    margin-left: 30px;
                                }
                            }
                        }
                    }
                }
                .bank-box{
                    width: 100%;
                    .btn-box {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .btn-item:nth-child(2) {
                            background: url("../../../../assets/img/views/userCenter/jx(1).png");
                        }
                        .btn-item:nth-child(3) {
                            background: url("../../../../assets/img/views/userCenter/jx(2).png");
                        }
                        .btn-item:nth-child(4) {
                            background: url("../../../../assets/img/views/userCenter/jx(3).png");
                        }
                        .btn-item {
                            width: 25%;
                            height: 184px;
                            border-radius: 15px;
                            margin-left: 12px;
                            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                            /*background: red;*/
                            color: #fff;
                            .icon-box {
                                display: flex;
                                align-items: center;
                                height: 30%;
                                border-bottom: 1px solid #fff;
                                div {
                                    width: 50%;
                                    height: 100%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: left;
                                    padding-left: 30px;
                                    .el-button {
                                        color: #fff;
                                    }
                                }
                                div:first-child {
                                    border-right: 1px solid #fff;
                                }
                            }
                            .text-box {
                                height: 70%;
                                text-align: left;
                                font-size: 22px;
                                padding-left: 32px;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-around;
                                /*align-items: center;*/
                                .amount {
                                    font-size: 36px;
                                }
                            }
                        }
                    }
                    .bankCard-box {
                        margin: 20px 0 0 12px;
                        .el-card {
                            padding: 1px;
                            .el-table {
                                .cell {
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
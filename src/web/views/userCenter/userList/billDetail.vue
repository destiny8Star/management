<!--
  - billDetail Vue
  - @JsName billDetail
  - @Description 账单详情视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="billDetail">
            <el-container direction="vertical" v-loading="loading">
                <el-main>
                    <p class="back" @click="$router.push('/userCenter/userDetail')">
                        <el-button type="text" fixed="left" icon="el-icon-arrow-left">返回</el-button>
                    </p>
                    <div class="content">
                        <div class="bank-box">
                            <el-card class="bank">
                                <div class="bankName">{{ bankcard.name }}</div>
                                <p class="cardNum">{{ bankcard.cardNum }}</p>
                                <p>还款日 <span>{{ bankcard.date }}</span></p>
                            </el-card>
                            <div class="chargeOff-box">
                                <div class="money">
                                    <p>{{ bankcard.day }}<!-- 天后出账 --></p>
                                    <p class="num">{{ bankcard.payment }}</p>
                                    <p>最低应还款 : <span>{{ bankcard.minPayment }}</span></p>
                                </div>
                                <div class="chargeDetail">
                                    <div v-for="(val,k,i) in bankcard.details" :key="i" class="item">
                                        <p>{{ k }}</p>：<span>{{ val }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bill-box">
                            <!--账单明细 start-->
                            <div class="bill-item">
                                <p class="text">账单明细</p>
                                <div class="show">
                                    <el-collapse accordion>
                                        <el-collapse-item v-for='(val,i) in data' :key="i" :disabled="val">
                                            <template slot="title">
                                                <div class="NotBillBox" v-if="val.title=='未出账单'">
                                                    <!--<i class="el-icon-caret-bottom el-collapse-item__arrow"></i>-->
                                                    <span>{{ val.title }}</span>
                                                </div>
                                                <div v-else class="pastBillBox">
                                                    <!--<i class="el-icon-caret-bottom el-collapse-item__arrow"></i>-->
                                                    <div>
                                                        <p>{{ val.month }}月<span>{{val.year }}</span></p>
                                                        <div><span>{{val.timeQuantum }}</span></div>
                                                    </div>

                                                </div>
                                                <span>￥{{ val.returnAmount }}</span>
                                            </template>
                                            <!--<div v-for="(ele,i) in val.detail" class="item">-->
                                                <!--<div class="item-title">-->
                                                    <!--<img :src="ele.icon" alt="">-->
                                                    <!--<div>-->
                                                        <!--<p>{{ ele.name }}</p>-->
                                                        <!--<span>{{ ele.date }}</span>&nbsp;-->
                                                        <!--<span>{{ ele.type }}</span>-->
                                                    <!--</div>-->
                                                <!--</div>-->
                                                <!--<p>{{ ele.price }}</p>-->
                                            <!--</div>-->
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                            <!--账单明细 end-->

                            <!--还款记录 start-->
                            <div class="bill-item">
                                <p class="text">还款记录</p>
                                <div class="show">
                                    <el-collapse @change="showDetail" accordion>
                                        <el-collapse-item
                                                v-for='(val,i) in repaymentData'
                                                :name="val.planId"
                                                :key="i">
                                            <template slot="title">
                                                <div class="title-box">
                                                    <i class="el-icon-caret-bottom el-collapse-item__arrow"></i>
                                                    {{ val.creatTime }}&nbsp;提交的还款计划
                                                </div>
                                                <span>{{ val.planState }}</span>
                                            </template>
                                            <div v-for="(ele,e) in repaymentPlanDetail" :key="e" class="item">
                                                <div class="item-title">
                                                    <div>
                                                        <p>{{ ele.payType }} - {{ ele.bankName }}[{{ele.cardNo}}]</p>
                                                        <div class="date">
                                                            <img src="../../../../assets/img/views/userCenter/sj.png" alt="">
                                                            <span>{{ ele.time }}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="orderMoney">
                                                    <p>{{ele.payType=='消费'?'-':'+'}}￥{{ ele.money }}</p>
                                                    <p :class="[ele.state =='还款中'?'refunding':[ele.state =='还款失败'?'fail':'']]">{{ ele.state }}</p>
                                                </div>

                                            </div>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                            <!--还款记录 end-->
                        </div>
                    </div>
                </el-main>
            </el-container>
    </div>
</template>

<script>
    import { UserCenter, Tags } from "@/web/module/lending";
    let datalist = [
    //     {
    //     "title": '未出账单',
    //     "amount": '567,8.00',
    //     "detail": [
    //         {
    //             "name": '杭州萧山东海加油站',
    //             "icon": require("../../../../assets/logo.png"),
    //             "price": '800.00',
    //             "date": '03.21',
    //             "type": '消费 - 网联 银联支付[8870]'
    //         },
    //         {
    //             "name": '杭州萧山东海加气站',
    //             "icon": require("../../../../assets/logo.png"),
    //             "price": '1000.00',
    //             "date": '03.21',
    //             "type": '消费 - 网联 银联支付[8870]'
    //         }
    //
    //     ]
    // },
        {
        "title": '2',
        "yearDate": '2019',
        "interval": '02.12-03.20',
        "amount": '567,8.00',
        "detail": [
            {
                "name": '杭州萧山东海加油站',
                "icon": require("../../../../assets/logo.png"),
                "price": '800.00',
                "date": '03.21',
                "type": '消费 - 网联 银联支付[8870]'
            },
            {
                "name": '杭州萧山东海加气站',
                "icon": require("../../../../assets/logo.png"),
                "price": '1000.00',
                "date": '03.21',
                "type": '消费 - 网联 银联支付[8870]'
            }

        ]
    }
    ];
    let datalists = [
        {
        "title": '2019.03.22提交还款计划',
        "planState": '计划执行中',
        "detail": [
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款中',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款成功',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款失败',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            }

        ]
    },
        {
        "title": '2019.02.16提交还款计划',
        "planState": '计划已完成',
        "detail": [
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款中',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款成功',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款失败',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            }

        ]
    },
        {
        "title": '2019.01.16提交还款计划',
        "planState": '计划已完成',
        "detail": [
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款中',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款成功',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            },
            {
                "name": '还款-交通银行（4216）',
                "orderState": '还款失败',
                "price": '800.00',
                "date": '2019.03.22 10:20',
            }

        ]
    }
    ];
    const map = {0: '计划已完成',1: '计划执行中'};
    const payTypeMap = {1: '还款',2: '消费'};
    const stateMap = {0: '还款中',1: '还款成功',2:'还款失败'};
    export default {
        name: "billDetail",
        data(){
            return{
                userId: '',//本页所属用户id
                cardNo: '',//本页所属银行卡号
                loading: true,
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
                "data": datalist,//账单明细列表
                "repaymentData": datalists,//还款记录列表
                "bankcard" :{
                    "name": '交通银行',//银行名称
                    "cardNum": '6222 **** **** 4216',//银行卡号
                    "date": '03/21',//还款日
                    "day": '20',//倒记天数
                    "payment": '5,890.00',//应还
                    "minPayment": '- -',//最低还款
                    "details": {
                        "出账日": '12.16',
                        "还款日": '03.21',
                        "免息期": '32',
                        "总额度": '80,000.00',
                        "积分": '35066',
                    }
                },
                "repaymentPlanDetail": [],//每一条还款计划详情列表
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getDatas(){
                this.loading = false;
                console.log('3');
                var postData = {
                    "uid": this.userId,
                    "cardNo": this.cardNo
                };
                console.log(postData);
                UserCenter.bankBillDetail(postData).then(res=>{
                    console.log(res);
                    let info = res.data;
                    // info.createTime = info.createTime;
                    if(res.code==200){
                        this.bankcard.name = info.bankName;
                        this.bankcard.payment = info.amount ;
                        this.bankcard.cardNum = info.cardNo;
                        this.bankcard.day = info.strDateType;
                        this.bankcard.minPayment = info.miniAmount;
                        this.bankcard.date = info.dueDate.replace('.', '/');
                        this.bankcard.details['免息期'] = info.freeInterestPeriod;
                        this.bankcard.details['出账日'] = info.statementDate;
                        this.bankcard.details['积分'] = info.integral;
                        this.bankcard.details['还款日'] = info.dueDate;
                        this.bankcard.details['总额度'] = info.limit;
                        this.data = info.billListRespList;
                        this.repaymentData = info.planRepaymentRespList;
                        this.repaymentData.forEach(ele=>{
                            ele.planState = map[ele.planState];
                        });
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
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
                this.$router.push('/userCenter/billDetail')
            },
            /**
             * 还款计划详情
             */
            showDetail(val){
                // 获取还款计划数据
                console.log(val);
                var postData = {
                    "planeId": val
                };
                UserCenter.bankBillPlanDetail(postData).then(res=>{
                    console.log(res);
                    let info = res.data;
                    // info.createTime = info.createTime;
                    if(res.code==200){
                        this.repaymentPlanDetail = res.data;
                        this.repaymentPlanDetail.forEach(ele=>{
                            ele.payType = payTypeMap[ele.payType];
                            ele.state = stateMap[ele.state];
                        })
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            this.userId = localStorage.userDetailId;
            this.cardNo = localStorage.bankDetailNo;
            // 初始化标签
            this.getDatas();
        },
    }
</script>

<style lang="scss">
#billDetail {
    div {
        box-sizing: border-box;
    }
    color: #3E3E4D;
    .el-container {
        .el-main {
            .back {
                text-align: left;
                font-size: 20px;
                .el-button {
                    color: #3E3E4D;
                }
            }
            .content {
                padding: 0 58px 0 62px;
                .bank-box {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .bank {
                        min-width: 498px;
                        height: 268px;
                        border-radius: 10px;
                        background: url("../../../../assets/img/views/userCenter/BG_Shaoe.png");
                        background-size: 100% 100%;
                        color: #fff;
                        .bankName {
                            width: 96px;
                            /*height: 42px;*/
                            line-height: 42px;
                            font-size: 18px;
                            color: #3E3E4D;
                            background: #fff;
                            margin: 12px 0 0 18px;
                        }
                        .cardNum {
                            font-size: 36px;
                            margin-top: 36px;
                            font-weight: bold;
                            letter-spacing: 2px;
                        }
                        p {
                            margin: 57px 0 0 20px;
                            text-align: left;
                            font-weight: 400;
                            span {
                                font-size: 26px;
                            }
                        }

                    }
                    .chargeOff-box {
                        width: 100%;
                        height: 268px;
                        display: flex;
                        align-items: center;
                        /*box-sizing: border-box;*/
                        border-radius: 10px;
                        background: #fff;
                        margin-left: 24px;
                        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                        padding: 25px 0;
                        .money,.chargeDetail {
                            width: 50%;
                            height: 100%;
                            text-align: left;
                            font-size: 24px;
                        }
                        .money {
                            border-right: 2px solid #e9e9e9;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            padding-left: 86px;
                            .num {
                                font-size: 66px;
                            }
                        }
                        .chargeDetail {
                            padding-left: 148px;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            .item {
                                display: flex;
                                align-items: center;
                            }
                        }
                    }
                }
                .bill-box {
                    margin-top: 40px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .bill-item:last-child {
                        margin-right: 0;
                    }
                    .bill-item {
                        width: 50%;
                        margin-right: 44px;
                        text-align: left;
                        background: #fff;
                        border-radius: 10px;
                        padding: 26px 24px;
                        .text {
                            font-size:30px;
                            border-left: 5px solid #3383FF;
                            padding-left: 13px;
                            margin-left: 4px;
                        }
                        .show {
                            .el-collapse {
                                border: 0;
                                .el-collapse-item {
                                    /*border-bottom: 0.013333rem solid #EBEEF5;*/
                                    .el-collapse-item__header {
                                        height: 80px;
                                        font-size: 22px;
                                        line-height: normal;
                                        justify-content: space-between;
                                        position: relative;
                                        .el-collapse-item__arrow {
                                            font-size: 26px;
                                            color: #3383FF;
                                            position: absolute;
                                            left: 0;
                                            top: 25px;
                                        }
                                        .el-icon-arrow-right {
                                            /*空心*/
                                            display: none;
                                        }
                                        .el-icon-caret-bottom {
                                            /*实心*/
                                            display: none;
                                        }
                                        .title-box, .NotBillBox, .pastBillBox {
                                            margin-left: 30px;
                                        }
                                        .NotBillBox {
                                            span {
                                                color: #3383FF;
                                            }
                                        }
                                        .pastBillBox {
                                            height: 100%;
                                            display: flex;
                                            align-items: center;
                                            p {
                                                font-size: 28px;
                                            }
                                            span {
                                                font-size: 18px;
                                                color: #909090;
                                            }
                                        }
                                    }
                                    .el-collapse-item__content {
                                        padding: 0 24px;
                                        background: #f8f8f8;
                                        .item {
                                            padding: 16px 0;
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-between;
                                            font-size: 22px;
                                            img {
                                                width: 46px;
                                                height: 46px;
                                                margin-right: 26px;
                                            }
                                            .item-title {
                                                display: flex;
                                                align-items: center;
                                                div {
                                                    span {
                                                        font-size: 20px;
                                                        color: #909090;
                                                    }
                                                    .date {
                                                        display: flex;
                                                        align-items: center;
                                                        img {
                                                            width: 21px;
                                                            height: 21px;
                                                            margin-right: 8px;
                                                        }
                                                        span {
                                                            color: #909090;
                                                        }
                                                    }
                                                }
                                            }
                                            .orderMoney {
                                                text-align: right;
                                                p:last-child {
                                                    font-size: 20px;
                                                }
                                                .refunding {
                                                    color: #01A1FF;
                                                }
                                                .fail {
                                                    color: #E60012;
                                                }
                                            }
                                        }
                                    }
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
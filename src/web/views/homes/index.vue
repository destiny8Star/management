<!--
  - homeIndex Vue
  - @JsName homeIndex
  - @Description 首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="homeIndex">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <!--账单统计  开始-->
                    <p class="title">账单统计</p>
                    <div class="showBox">
                        <div class="item" v-for="(ele,i) in showList" :key="i">
                            <p>{{ ele.text }}</p>
                            <p>{{ ele.num }}&nbsp;<span>{{ ele.unit }}</span></p>
                        </div>
                    </div>
                    <div class="cardBox">
                        <div class="gradeDetail">
                            <el-card
                                    class="box-card"
                                    v-for="(ele,i) in cardList"
                                    :key="i">
                                <div slot="header" class="clearfix">
                                    <p>{{ ele.moneyText }}</p>
                                    <p>{{ ele.money }}元</p>
                                </div>
                                <div class="cardBody">
                                    <p>
                                        <span>{{ ele.numText }}</span>
                                        <span>{{ ele.num }}人</span>
                                    </p>
                                </div>
                            </el-card>
                        </div>
                        <div class="gradeDetail">
                            <el-card
                                    class="box-card"
                                    v-for="(ele,i) in incomeList"
                                    :key="i">
                                <div slot="header" class="clearfix">
                                    <p>{{ ele.moneyText }}</p>
                                    <p>{{ ele.money }}元</p>
                                </div>
                                <div class="cardBody">
                                    <p>
                                        <span>{{ ele.numText }}</span>
                                        <span>{{ ele.num }}人</span>
                                    </p>
                                    <p>
                                        <span>{{ ele.addUpText }}</span>
                                        <span>{{ ele.addUp }} <span>{{ ele.unit }}</span></span>
                                    </p>

                                </div>
                            </el-card>
                        </div>
                    </div>
                    <!--账单统计  结束-->

                    <!--商城统计  开始-->
                    <p class="title">商城统计</p>
                    <div class="cardBox">
                        <div class="gradeDetail">
                            <el-card
                                    class="box-card store"
                                    v-for="(ele,i) in storeList"
                                    :key="i">
                                <div slot="header" class="clearfix">
                                    <p>{{ ele.addUpText }}</p>
                                    <p>{{ ele.addUp }}{{ele.unit}}</p>
                                </div>
                                <div class="cardBody">
                                    <p>
                                        <span>{{ ele.numText }}</span>
                                        <span>{{ ele.num }}{{ele.unit}}</span>
                                    </p>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <!--商城统计  结束-->
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import { Configure } from "@/web/module/configure";
    import { Owner } from "@/web/module/owner";
    export default {
        name: "homeIndex",
        components: {
        },
        data () {
            return {
                "loading": true,
                "showList": [
                    {id:1, text: '平台累计收益', num: '888888.88',unit: '元'},
                    {id:2, text: '最近30天累计收益', num: '888888.88',unit: '元'},
                    {id:3, text: '城市合伙人', num: '888888',unit: '人'}
                ],
                "cardList": [
                    {id:1,numText: '累计执行服务商人数',num: '88888', moneyText: '执行服务商缴费(平台部分)', money:'88888888.88'},
                    {id:2,numText: '累计VIP人数',num: '88888', moneyText: '升级VIP缴费(平台部分)', money:'88888888.88'}
                ],
                "storeList": [
                    {id:1,addUpText: '累计GMV',addUp: '88888', numText: '实付订单', num:'88888888',unit: '单'},
                    {id:2,addUpText: '平台销售总额',addUp: '88888.88', numText: '客均价', num:'88888888.88',unit: '元'}
                ],
                "incomeList": [
                    {id:1,numText: '使用还款用户',num: '88888', moneyText: '还款收益', money:'88888888.88',addUpText: '累计代还金额', addUp: '888888', unit: '元'},
                    {id:2,numText: '使用收款用户',num: '88888', moneyText: '收款收益', money:'88888888.88',addUpText: '累计收款金额', addUp: '888888', unit: '元'},
                    {id:3,numText: '申请办卡用户',num: '88888', moneyText: '办卡收益', money:'88888888.88',addUpText: '累计办卡张数', addUp: '88', unit: '张'}
                ]
            }
        },
        methods: {
            /**
             * 加载数据
             */
            loadingInfo () {
                const that = this;
                setTimeout(() => {
                    Owner.homeData().then((res) => {
                        that.loading = false;
                        console.log(res);
                        if (res) {
                            if (res.code === 200) {
                                // that.data = res.data;
                                this.showList[0].num = res.data.totalEarnings;
                                this.showList[1].num = res.data.recentlyEarnings;
                                this.showList[2].num = res.data.cityPartnerNo;

                                this.cardList[0].num = res.data.oneAgencyNo;
                                this.cardList[0].money = res.data.oneAgencyAmount;
                                this.cardList[1].num = res.data.vipNo;
                                this.cardList[1].money = res.data.upVipAmount;

                                this.storeList[0].num = res.data.totalOrderNoReal;
                                this.storeList[0].addUp = res.data.totalOrderNo;
                                this.storeList[1].num = res.data.guestAverage;
                                this.storeList[1].addUp = res.data.ourTotalSales;

                                this.incomeList[0].num = res.data.repaymentNo;
                                this.incomeList[0].addUp = res.data.repaymentTotal;
                                this.incomeList[0].money = res.data.repayment;
                                this.incomeList[1].num = res.data.receiptsNo;
                                this.incomeList[1].addUp = res.data.receiptsTotal;
                                this.incomeList[1].money = res.data.receiptsAssess;
                                this.incomeList[2].num = res.data.totalCardUserNo;
                                this.incomeList[2].addUp = res.data.totalCardNo;
                                this.incomeList[2].money = res.data.creditCardEarnings;
                            } else {
                                that.$message({ center: true, type: 'warning', message: "加载失败 , ".concat(res.result) });
                            }
                        }
                    }, (err) => {
                        that.loading = false;
                        that.$message({ center: true, type: 'warning', message: "加载失败 , 网络异常" });
                        console.error(err);
                    });
                }, 500);
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            const that = this;
            // 加载数据
            that.loadingInfo();
        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #homeIndex {
        width: 100%;
        height: 100%;
        .content {
            height: inherit;
            overflow: auto;
            background: #FFF;
            padding: 18px 26px;
            .title:first-child {
                margin-top: 10px;
            }
            .title {
                color: #333;
                font-size: 36px;
                line-height: 48px;
                font-weight: bold;
                text-align: left;
                margin: 36px 4px 14px;
            }
            .showBox {
                display: flex;
                align-items: center;
                .item:nth-child(2) {
                    background: url("../../../assets/img/views/home/tp.png");
                    background-size: 100% 100%;
                }
                .item:nth-child(3) {
                    background: url("../../../assets/img/views/home/tb.png");
                    background-size: 100% 100%;
                }
                .item {
                    width: 334px;
                    height: 138px;
                    margin-right: 36px;
                    border-radius: 20px;
                    background: url("../../../assets/img/views/home/xz.png");
                    background-size: 100% 100%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                    color: #fff;
                    text-align: left;
                    padding: 30px 20px;
                    p {
                        font-size: 26px;
                    }
                    p:last-child {
                        font-size: 34px;
                        margin-top: 6px;
                    }
                }

            }
            .cardBox {
                width: calc(100% - 140px);
                .gradeDetail {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .box-card {
                        width: 50%;
                        margin: 20px 20px 0 0;
                        .clearfix,.cardBody p{
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            line-height: 42px;
                        }
                        .clearfix {
                            font-size: 28px;
                        }
                        .el-card__body {
                            padding: 15px;
                            font-size: 22px;
                        }
                    }
                    .store {
                        margin: 0 20px 0 0;
                        .el-card__header {
                            color: #ff3335;
                        }
                    }
                }
            }
        }
    }
</style>

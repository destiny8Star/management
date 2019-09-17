<!--
  - index Vue
  - @JsName index
  - @Description 累计收入首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="incomeIndex">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="showBox">
                        <div class="item"
                             v-for="(ele,i) in showList"
                             :key="i"
                             @click="withdrawalRecord(ele)"
                             :class="{act:ele.text=='提现记录'}">
                            <div>
                                <span>{{ ele.money }}</span>
                                <p v-if="ele.money">{{ ele.text }}</p>
                                <p v-else style="font-size: 24px">{{ ele.text }}</p>
                            </div>
                            <img :src="ele.icon" alt="">
                        </div>
                    </div>
                    <div class="cardBox">
                        <el-card class="box-card" v-for="(ele,i) in cardList" :key="i">
                            <div slot="header" class="clearfix">
                                <div>
                                    <img :src="ele.icon" alt="">
                                    <span>{{ ele.userName }}</span>
                                </div>
                                <el-button type="text" @click="goDetail(ele)"><i class="el-icon-arrow-right"></i></el-button>
                            </div>
                            <div class="money">
                                <p>￥{{ ele.profitAmount }}</p>
                                <span>奖励金额</span>
                                <div>
                                    <span>奖励笔数</span>{{ele.number}}
                                </div>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { AccumulatedIncome, Tags } from "@/web/module/lending";
    export default {
        name: "incomeIndex",
        data(){
            return {
                loading: true,
                showList: [
                    {id:1, text: '累计收入', money: '200000.00',icon: require("../../../../assets/img/views/income/sr.png")},
                    {id:2, text: '账户余额', money: '100000.00',icon: require("../../../../assets/img/views/income/ye.png")},
                    {id:3, text: '提现记录', icon: require("../../../../assets/img/views/income/tx.png")}
                ],
                cardList: [],
                cardLists: [
                    {id:1,type: 0, title: '升级奖励', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian.png"), url: '/upgradeSP'},
                    {id:2,type: 7, title: '消费返佣', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian@2x.png"), url: '/consumeSP'},
                    {id:3,type: 4, title: '还款奖励', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/banka.png"), url: '/repaymentSP'},
                    {id:4,type: 3, title: '收款奖励', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian(2).png"), url: '/proceedsSP'},
                    {id:5,type: 1, title: '推荐奖励', money: '0.00', moneyName: '奖励金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/tuijianjiangli@2x.png"), url: '/recommendSP'},
                    {id:6,type: 5, title: '平台奖励', money: '0.00', moneyName: '补贴金额', moneyCount: '补贴金额', countNum: '0', icon: require("../../../../assets/img/views/income/pingtaibutie.png"), url: '/platformSubsidies'},
                    {id:7,type: 6, title: '区域奖励', money: '0.00', moneyName: '补贴金额', moneyCount: '补贴金额', countNum: '0', icon: require("../../../../assets/img/views/income/fenhong.png"), url: '/regionalSubsidies'},
                    {id:8,type: 9, title: '商城奖励', money: '0.00', moneyName: '补贴金额', moneyCount: '奖励金额', countNum: '0', icon: require("../../../../assets/img/views/income/shanchengjiang@2x.png"), url: '/shoppingSP'}
                ]
                // cardList: [
                //     {id:1, title: '好友升级', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian.png"), url: '/upgradeSP'},
                //     {id:2, title: '好友还款', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/banka.png"), url: '/repaymentSP'},
                //     {id:3, title: '好友收款', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian(2).png"), url: '/proceedsSP'},
                //     {id:4, title: '办卡收益', money: '0.00', moneyName: '分润金额', moneyCount: '分润笔数', countNum: '0', icon: require("../../../../assets/img/views/income/zuanqian(1).png"), url: '/doCardSP'},
                //     {id:5, title: '平台补贴', money: '0.00', moneyName: '补贴金额', moneyCount: '补贴金额', countNum: '0', icon: require("../../../../assets/img/views/income/pingtaibutie.png"), url: '/platformSubsidies'},
                //     {id:6, title: '区域补贴', money: '0.00', moneyName: '补贴金额', moneyCount: '补贴金额', countNum: '0', icon: require("../../../../assets/img/views/income/fenhong.png"), url: '/regionalSubsidies'},
                // ]
            }
        },
        methods: {
            /**
             * 初始化标签
             */
            getData () {
                const that = this;
                that.loading = false;
                AccumulatedIncome.incomeIndex({"userId":localStorage.userDetailId}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.showList[0].money = res.data.cumulativeMoney;
                        this.showList[1].money = res.data.balance;
                        this.cardList = res.data.accountShareRespList;
                        this.cardList.forEach(ele=>{
                            this.cardLists.forEach(val=>{
                                if(ele.type==val.type){
                                    ele.icon = val.icon;
                                    ele.url = val.url;
                                }
                            })
                        })
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }

                })
            },

            /**
             * 跳转到明细页面
             */
            goDetail (val) {
                console.log(val);
                this.$router.push({path:'/userCenter'+val.url,query:{info:JSON.stringify(val)}})
            },
            /**
             * 提现记录
             */
            withdrawalRecord(item){
                if(item.text=='提现记录'){
                    console.log('去提现记录');
                    this.$router.push('/userCenter/withdrawalRecord')
                }
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            // 获取数据
            this.getData();
        },
    }
</script>

<style lang="scss">
#incomeIndex {
    width: 100%;
    /*height: 100%;*/
    color: #3E3E4D;
    .el-container {
        .el-main {
            .content {
                width: 100%;
                /*height: 100%;*/
                background: #fff;
                padding-bottom: 40px;
                .showBox {
                    display: flex;
                    align-items: center;
                    justify-content: space-around;
                    padding: 40px 80px 20px;
                    .item.act {
                        cursor: pointer;
                    }
                    .item {
                        width: 304px;
                        height: 109px;
                        border: 2px solid #3383FF;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 30px 0 20px;
                        div {
                            min-width: 166px;
                            margin-right: 10px;
                            span {
                                color: #3383FF;
                                font-size: 32px;
                            }
                            p {
                                font-size: 20px;
                            }
                        }

                    }
                }
                .cardBox {
                    padding: 0 30px;
                    display: flex;
                    align-items: center;
                    flex-flow: row wrap;
                    align-content: flex-start;
                    justify-content: space-around;
                    .box-card {
                        width: 320px;
                        height: 280px;
                        flex: 1 1 20%;
                        /*flex属性是flex-grow[放大比例], flex-shrink[缩小比例] 和 flex-basis[伸缩基准值]的简写，默认值为0 1 auto。后两个属性可选。*/
                        box-shadow: 0 0 14px 0 rgba(203,205,214,0.2);
                        border-radius: 10px;
                        margin: 26px 20px 0 0;
                        .el-card__header {
                            height: 80px;
                            .clearfix {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                div {
                                    color: #373C40;
                                    font-size: 32px;
                                    display: flex;
                                    align-items: center;
                                    img {
                                        width: 50px;
                                        height: 50px;
                                        margin: -6px 13px 0 0;
                                    }
                                }
                                .el-button {
                                    font-size: 22px;
                                    color: #373C40;
                                }
                            }
                        }

                        .el-card__body {
                            .money {
                                font-size: 38px;
                                span {
                                    color: #C3C3C3;
                                    font-size: 22px;
                                    padding-left: 10px;
                                }
                                div {
                                    font-size: 34px;
                                    margin-top: 30px;
                                    text-align: left;
                                    display: flex;
                                    align-items: center;
                                    span {
                                        font-size: 24px;
                                        margin-right: 8px;
                                        padding: 0;
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
<template>
    <div id="statistics">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <!--账单统计  开始-->
                    <div class="totalBox">
                        <div class="totalItem" v-for="(ele,i) in totalList" :key="i">
                            <h1>{{ ele.text }}</h1>
                            <p><span>{{ ele.num }}</span> {{ ele.unit }}</p>
                        </div>
                    </div>
                    <div class="showBox">
                        <div class="item" v-for="(ele,i) in showList" :key="i">
                            <p>{{ ele.text }}</p>
                            <p>{{ ele.num }}&nbsp;<span>{{ ele.unit }}</span></p>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Goods } from "@/web/module/lending";
    export default {
        name: "statistics",
        data () {
            return {
                "loading": true,
                // 头部累计数据
                "totalList": [
                    {id: 1, text: '累计GMV', num: '0', unit: '单'},
                    {id: 2, text: '累计GMV订单金额', num: '0', unit: '元'}
                ],
                "showList": [
                    {id: 1, text: '实付订单', num: '0', unit: '单'},
                    {id: 2, text: '平台销售总额', num: '0', unit: '元'},
                    {id: 3, text: '客均价', num: '0', unit: '元'},
                    {id: 4, text: '日均订单', num: '0', unit: '单'},
                    {id: 5, text: '日均交易额', num: '0', unit: '元'}
                ],
            }
        },
        methods: {
            /**
             * 加载数据
             */
            loadingInfo () {
                const that = this;
                setTimeout(() => {
                    Goods.statisticsData().then((res) => {
                        that.loading = false;
                        console.log(res);
                        // if (res) {
                            if (res.code === 200) {
                                this.totalList[0].num = res.data.gmv || 0;
                                this.totalList[1].num = res.data.amountGmv || 0;

                                this.showList[0].num = res.data.realOrder || 0;
                                this.showList[1].num = res.data.countAmount || 0;
                                this.showList[2].num = res.data.averageAmount || 0;
                                this.showList[3].num = res.data.dayOrder || 0;
                                this.showList[4].num = res.data.averageDayAmount || 0;

                            } else if (res.code==100070 || res.code == 404){
                                this.$message.warning(res.message);
                                this.$router.push('/')
                            }else {
                                this.$message.warning(res.message);
                            }
                        // }
                    })
                    // , (err) => {
                    //     that.loading = false;
                    //     that.$message({ center: true, type: 'warning', message: "加载失败 , 网络异常" });
                    //     console.error(err);
                    // });
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
    }
</script>

<style lang="scss">
    #statistics {
        width: 100%;
        height: 100%;
        .content {
            height: 100%;
            overflow: auto;
            background: #FFF;
            padding: 18px 26px;
            .totalBox {
                display: flex;
                align-items: center;
                margin: 10px 10px 46px;
                .totalItem {
                    text-align: left;
                    margin-right: 220px;
                    h1 {
                        font-size: 32px;
                        font-family: PingFang-SC-Bold;
                        font-weight: bold;
                        color: rgba(62,62,77,1);
                        line-height: 42px;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size: 30px;
                        span {
                            font-size: 42px;
                            font-weight: bold;
                            color: rgba(51,131,255,1);
                            line-height: 52px;
                        }
                    }
                }
            }
            .showBox {
                display: flex;
                align-items: center;
                justify-content: space-around;
                .item:nth-child(2) {
                    background: url("../../../../assets/img/views/goods/PT@2x.png");
                    background-size: 100% 100%;
                }
                .item:nth-child(3) {
                    background: url("../../../../assets/img/views/goods/KJJ@2x.png");
                    background-size: 100% 100%;
                }
                .item:nth-child(4) {
                    background: url("../../../../assets/img/views/goods/RJDD@2x.png");
                    background-size: 100% 100%;
                }
                .item:nth-child(5) {
                    background: url("../../../../assets/img/views/goods/RJJYE@2x.png");
                    background-size: 100% 100%;
                    margin: 0;
                }
                .item {
                    max-width: 302px;
                    width: 20%;
                    margin-right: 10px;
                    height: 198px;
                    border-radius: 20px;
                    background: url("../../../../assets/img/views/goods/DD@2x.png");
                    background-size: 100% 100%;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
                    color: #fff;
                    text-align: left;
                    padding: 40px 44px 30px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    p {
                        font-size: 24px;
                    }
                    p:last-child {
                        font-size: 34px;
                        margin-top: 6px;
                        span {
                            font-size: 28px;
                        }
                    }
                }

            }

        }
        @media screen and (max-width: 1400px) {
            .showBox {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
        }
    }
</style>
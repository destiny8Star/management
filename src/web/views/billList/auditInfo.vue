<template>
    <div id="auditInfo">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <p class="back" @click="$router.back()">
                    <el-button type="text" fixed="left" icon="el-icon-arrow-left">返回</el-button>
                </p>
                <div class="content">
                    <div class="detail-box">
                        <el-card class="box-card">
                            <div class="item" v-for="(ele,i) in infoList" :key="i">
                                <div>{{ele.text}}：</div>
                                <p v-show="ele.id!=12">{{ele.val}}<span v-show="ele.id==7">元</span></p>
                                <div v-show="ele.id==12" @click="lookBidImg" :class="{bigAct:big}">
                                    <img :src="ele.val" alt="">
                                </div>
                            </div>
                            <div class="btn">
                                <el-button type="primary" @click="confirm">确认到账，通过审核</el-button>
                            </div>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { BillList, Common, Tags } from "@/web/module/lending";
    export default {
        name: "auditInfo",
        data(){
            return {
                id: '',
                loading: true,
                big: false,//是否展示大图
                infoList: [
                    {id: 1, text: '选择城市', val: ''},
                    {id: 2, text: '开通用户', val: ''},
                    {id: 3, text: '真实姓名', val: ''},
                    {id: 4, text: '身份证号', val: ''},
                    {id: 5, text: '银行卡号', val: ''},
                    {id: 6, text: '预留手机号', val: ''},
                    {id: 7, text: '缴费金额', val: ''},
                    {id: 8, text: '推荐服务商', val: ''},
                    {id: 9, text: '销售人员', val: ''},
                    {id: 10, text: '提交账户', val: ''},
                    {id: 11, text: '提交时间', val: ''},
                    {id: 12, text: '打款截图', val: ''},
                ],
                imgList: [],//图片
            }
        },
        methods:{
            getData(){
                this.loading = false;
                Common.partnerInfo({"id":this.id}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.infoList[0].val = res.data.province + res.data.city + res.data.area;//选择城市
                        this.infoList[1].val = res.data.account;//开通用户
                        this.infoList[2].val = res.data.name;//真实姓名
                        this.infoList[3].val = res.data.cardNo;//身份证号
                        this.infoList[4].val = res.data.bankNo;//银行卡号
                        this.infoList[5].val = res.data.bankMobile;//预留手机号
                        this.infoList[6].val = res.data.amount;//缴费金额
                        this.infoList[7].val = res.data.invateMobile;//推荐服务商
                        this.infoList[8].val = res.data.operator;//销售人员
                        this.infoList[9].val = res.data.operatorAccount;//提交账户
                        this.infoList[10].val = res.data.createTime;//提交时间
                        // this.infoList[11].val = require('../../../assets/logo.png');//截图
                        this.infoList[11].val = res.data.pic;//截图
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 查看大图
             */
            lookBidImg(){
                this.big = !this.big;
            },
            /**
             * 确认通过
             */
            confirm(){
                const that = this;
                this.$confirm('此操作将确认完成该审核, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    console.log('确认');
                    BillList.isAudit({"id":that.id}).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message({
                                type: 'success',
                                message: '确认成功!'
                            });
                            this.$router.push('/billList/auditList')
                        }else if(res.code==100070 || res.code == 404) {
                            this.$message('登录失效，请重新登录!');
                        }else {
                            this.$message({
                                type: 'success',
                                message: '确认失败!'
                            });
                        }
                    });
                }).catch(() => {
                    console.log('取消确认')
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });

            },

        },
        mounted(){
            if(this.$route.query.auditId){
                this.id = this.$route.query.auditId;
            }
            this.getData();
        }
    }
</script>

<style lang="scss">
    #auditInfo {
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
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    .detail-box {
                        width: calc( 100% - 30%);
                        min-width: 570px;
                        /*margin-right: 12px;*/
                        .box-card {
                            border-radius: 30px;
                            .el-card__body {
                                padding: 48px 40px;
                                .el-button {
                                    font-size: 24px;
                                }
                                .item {
                                    font-size: 26px;
                                    text-align: left;
                                    padding: 10px 0;
                                    display: flex;
                                    align-items: flex-start;
                                    div {
                                        width: 162px;
                                        text-align: right;
                                        margin-right: 30px;
                                    }
                                    span {
                                        margin-left: 10px;
                                    }
                                    img {
                                        width: 120px;
                                    }
                                    .bigAct {
                                        width: 100vw;
                                        height: 100vh;
                                        position: fixed;
                                        left: 0;
                                        top: 0;
                                        background: rgba(51, 51, 51, 0.4);
                                        img {
                                            transform: scale(3,3);
                                            position: absolute;
                                            margin: auto;
                                            left: 0;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
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
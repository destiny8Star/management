<template>
    <div id="auditShopInfo">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <p class="back" @click="$router.push('/shop/shopAudit')">
                    <el-button type="text" fixed="left" icon="el-icon-arrow-left">返回</el-button>
                </p>
                <div class="content">
                    <div class="infoBox">
                        <div class="detail-box">
                            <el-card class="box-card">
                                <div v-for="(val,k,i) in data" :key="i" class="infoItem">
                                    <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <div class="detailBox">
                        <div class="auditContentBox">
                            <div class="auditBox">

                                <h1>商铺信息</h1>

                                <div class="item">
                                    <div class="title">身份证实照</div>
                                    <div class="imgBox">
                                        <div @click="lookBigImg(cardOne)" :class="{bigAct:cardOne.flag}"><img :src="cardOne.url" alt=""></div>
                                        <div @click="lookBigImg(cardTwo)" :class="{bigAct:cardTwo.flag}"><img :src="cardTwo.url" alt=""></div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="title">手持身份证实照</div>
                                    <div class="imgBox">
                                        <div @click="lookBigImg(cardThree)" :class="{bigAct:cardThree.flag}"><img :src="cardThree.url" alt=""></div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="title">生产资质或营业执照</div>
                                    <div class="imgBox">
                                        <div @click="lookBigImg(ele.url)" :class="{bigAct:ele.flag}" v-for="(ele,i) in aptitudeImgList" :key="i">
                                            <img :src="ele.url" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="btnBox" v-show="btnState==1">
                        <el-button type="primary" @click="deliverClick(1)">审核通过</el-button>
                        <el-button type="danger" @click="deliverClick(0)">不通过</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Shops, Tags } from "@/web/module/lending";
    let datalist = {
        "时间": '',
        "审核编号": '',
        "用户": '',
        "姓名": '',
        "身份证号": '',
        "商铺品牌名称": '',
        "商铺分类": '',
        "联系号码": '',
        "商铺地址": ''
    };
    export default {
        name: "auditShopInfo",
        data(){
            return {
                "shopId": '',//当前店铺id
                loading: true,
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
                "btnState": '1',

                //审核备注模块
                "cardOne": {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},//身份证正面
                "cardTwo": {flag:false,url:require('../../../../assets/logo.png')},//身份证反面
                "cardThree": {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},//手持身份证
                "aptitudeImgList": [
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'}
                ],//资质图片
            }
        },
        methods:{
            /**
             *  查看大图
             */
            lookBigImg(target){
                target.flag = !target.flag;
            },
            /**
             * 通过 or 不通过
             */
            deliverClick (num) {
                if(num){
                    console.log("审核通过");
                    this.agree();
                }else {
                    console.log("审核不通过");
                    this.disAgree();
                }
            },
            /**
             *  不同意
             */
            disAgree(){
                this.$prompt('请输入不通过的原因', '拒绝', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: '该商铺不通过的理由是: ' + value
                    });
                    var getData = {
                        "id": this.shopId,
                        "reason": value
                    };
                    Shops.disagreeShopAudit(getData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message({ center: true, type: "info", message: "拒绝成功" });
                            this.$router.push('/shop/shopAudit');
                            this.getData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message({ center: true, type: "info", message: "拒绝失败," + res.message });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            /**
             *  同意
             */
            agree(){
                this.$confirm('此操作将确认同意该商铺审核, 是否继续?', '提示', {
                    confirmButtonText: '审核通过',
                    cancelButtonText: '我再看看',
                    type: 'warning'
                }).then(() => {
                    Shops.agreeShopAudit({"id":this.shopId}).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message({
                                type: 'success',
                                message: '确认成功!'
                            });
                            this.$router.push('/shop/shopAudit')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning(res.message);
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },
            /**
             * 获取审核历史数据
             */
            getAuditData(){
                this.loading = false;
                Shops.auditShopInfo({"id":this.shopId}).then(res=>{
                    console.log(res);
                    var info = res.data;
                    if(res.code==200){
                        this.auditList = res.data.data;
                        datalist['时间'] = info.createTime;
                        datalist['审核编号'] = info.monotoneNo;
                        datalist['用户'] = info.userName;
                        datalist['姓名'] = info.realName;
                        datalist['身份证号'] = info.icCard;
                        datalist['商铺品牌名称'] = info.storeName;
                        datalist['商铺分类'] = info.categoryName;
                        datalist['联系号码'] = info.mobile;
                        datalist['商铺地址'] = info.address;
                        this.cardOne = info.userIdCardPicPositive;
                        this.cardTwo = info.userIdCardPicNegative;
                        this.cardThree = info.handCardUrl;
                        info.imgList.forEach(ele=>{
                            this.aptitudeImgList.push({flag:false,url:ele});
                        });
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            }
        },
        created(){
            if(this.$route.query.shopId){
                this.shopId = this.$route.query.shopId;
                this.btnState = this.$route.query.state;
            }
            /**
             * 审核历史数据
             */
            this.getAuditData();
        }
    }
</script>

<style lang="scss">
    #auditShopInfo {
        color: #3E3E4D;
        .el-container {
            padding: 15px;
            .el-main {
                width: 100%;
                background: #fff;
                .back {
                    text-align: left;
                    font-size: 20px;
                    .el-button {
                        color: #3E3E4D;
                    }
                }
                .content {
                    .infoBox {
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        .detail-box {
                            width: 60%;
                            .box-card {
                                border-radius: 30px;
                                .el-card__body {
                                    padding: 20px;
                                    .infoItem {
                                        font-size: 20px;
                                        text-align: left;
                                        padding: 14px 0;
                                        display: flex;
                                        align-items: center;
                                        p {
                                            width: 122px;
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
                    }
                    .btnBox {
                        width: 60%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                    .auditContentBox {
                        .auditBox {
                            p{
                                margin: 20px 0;
                                font-size: 24px;
                                text-align: left;
                                padding-left: 24px;
                            }
                            .el-table {
                                .cell {
                                    text-align: center;
                                }
                            }
                            h1 {
                                font-size: 28px;
                                text-align: left;
                                font-weight: 600;
                                margin: 30px 0 20px;
                            }
                            .item {
                                margin: 26px 0;
                                .title {
                                    font-size: 24px;
                                    text-align: left;
                                    line-height: 30px;
                                }
                                .imgBox {
                                    min-height: 200px;
                                    display: flex;
                                    align-items: center;
                                    margin: 20px 0;
                                    div{
                                        margin: 8px;
                                    }
                                    .bigAct {
                                        width: 100vw !important;
                                        height: 100vh !important;
                                        position: fixed;
                                        left: 0;
                                        top: 0;
                                        margin: 0;
                                        background: rgba(51, 51, 51, 0.4);
                                        img {
                                            transform: scale(3,3);
                                            position: absolute;
                                            margin: auto;
                                            left: 0;
                                            top: 0;
                                            right: 0;
                                            bottom: 0;
                                            transition: all 1s;
                                        }
                                    }
                                }
                            }
                            .item:nth-child(2) {
                                .imgBox {
                                    div {
                                        img {
                                            width: 240px;
                                            height: 160px;
                                        }
                                    }
                                }
                            }
                            .item:nth-child(3),.item:nth-child(5) {
                                .imgBox {
                                    div{
                                        img {
                                            width: 240px;
                                            height: 240px;
                                        }
                                    }
                                }
                            }
                            .item:nth-child(4) {
                                .imgBox {
                                    div{
                                        img {
                                            width: 200px;
                                            height: 260px;
                                        }
                                    }
                                }
                            }
                            .item:nth-child(5) {
                                .imgBox {
                                    width: 660px;
                                    flex-wrap: wrap;
                                    div {
                                        img {
                                            width: 200px;
                                            height: 240px;
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
<template>
    <div id="shopDetail">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <p class="back" @click="$router.push('/shop/shopList')">
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
                        <div class="money-box">
                            <div class="headImg">
                                <img :src="picture" alt="">
                            </div>
                            <el-card class="box-card">
                                <h1>账户余额(元)：<span>{{audit.amount}}</span></h1>
                                <div class="money">
                                    <p>累计收益： {{audit.income}}元</p>
                                    <p>待入账： {{audit.account}}元</p>
                                </div>
                                <div class="delBox">
                                    <el-button disabled type="primary">提现记录</el-button>
                                    <el-button v-show="isLine" class="del" type="primary"  @click="lineClick">上架该商铺</el-button>
                                    <el-button v-show="!isLine" class="del" type="danger" @click="lineClick">下架该商铺</el-button>
                                </div>

                            </el-card>
                        </div>
                    </div>
                    <div class="detailBox">
                        <!--<div class="btnBox">-->
                            <!--<el-button-->
                                    <!--:class="{act:btnIndex==index}"-->
                                    <!--plain-->
                                    <!--v-for="(btn,index) in btnList"-->
                                    <!--:key="index">-->
                                <!--&lt;!&ndash;@click="getDataClick(index)"&ndash;&gt;-->
                                <!--{{ btn.text }}-->
                                <!--<img v-if="btnIndex==index" src="../../../../assets/dui@2x.png" alt="">-->
                            <!--</el-button>-->
                        <!--</div>-->
                        <div class="auditContentBox">
                            <div class="auditBox">
                                <!--<p>订单编号：{{audit.orderNo}}</p>-->
                                <!--<el-table-->
                                        <!--:header-cell-style="{background:'#fafafa',height: '62px'}"-->
                                        <!--:data="auditData"-->
                                        <!--border-->
                                        <!--stripe-->
                                        <!--style="width: 100%">-->
                                    <!--<el-table-column prop="bankNo" label="时间">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column prop="bankNo" label="状态">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column prop="address" label="备注">-->
                                    <!--</el-table-column>-->
                                <!--</el-table>-->

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
                                        <div @click="lookBigImg(ele)" :class="{bigAct:ele.flag}" v-for="(ele,i) in aptitudeImgList" :key="i">
                                            <img :src="ele.url" alt="">
                                        </div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="title">门店照片</div>
                                    <div class="imgBox">
                                        <div @click="lookBigImg(ele)" :class="{bigAct:ele.flag}" v-for="(ele,i) in storeImgList" :key="i">
                                            <img :src="ele.url" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Shops, Tags } from "@/web/module/lending";
    let datalist = {
        "账户": '',
        "姓名": '',
        "身份证号": '',
        "商铺品牌名称": '',
        "商铺分类": '',
        "联系商铺": '',
        "商铺地址": ''
    };
    export default {
        name: "shopDetail",
        data(){
            return {
                "shopId": '',//当前店铺id
                loading: true,
                isLine: '',//商铺是否 在线【0上架 1下架】
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
                btnIndex: '0',//【等同于postData里面的status】
                "btnList" :[
                    // {id: 1, text: '线上商品'},
                    // {id: 2, text: '商铺数据'},
                    {id: 3, text: '审核备注'},
                ],

                //审核备注模块
                "big": false,
                "auditData":[],
                "audit": {
                    "orderNo": '',//订单编号
                    "income": '',//累计收益
                    "amount": '',//余额
                    "account": '',//待入账
                },
                "cardOne": {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},//身份证正面
                "cardTwo": {flag:false,url:require('../../../../assets/logo.png')},//身份证反面
                "cardThree": {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},//手持身份证
                "aptitudeImgList": [
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'}
                ],//资质图片
                "storeImgList": [
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'},
                    {flag:false,url:'http://fishmatrixtest.oss-cn-beijing.aliyuncs.com/test/xingqi.png'}
                ],//门店图片
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
             * 获取审核历史数据
             */
            getAuditData(){
                this.loading = false;
                Shops.shopDetail({"id":this.shopId}).then(res=>{
                    console.log(res);
                    var info = res.data;
                    if(res.code==200){
                        this.auditList = res.data.data;
                        datalist['账户'] = info.userName;
                        datalist['姓名'] = info.realName;
                        datalist['身份证号'] = info.icCard;
                        datalist['商铺品牌名称'] = info.storeName;
                        datalist['商铺分类'] = info.storeCategory;
                        datalist['联系商铺'] = info.storeMobile;
                        datalist['商铺地址'] = info.address;
                        this.audit.amount = info.storeAmount;
                        this.audit.income = info.totalInterest;
                        this.audit.account = info.unEnterAccount;
                        this.isLine = info.status;
                        console.log(this.isLine);
                        this.picture = info.storeAvar;
                        this.cardOne = info.userIdCardPicPositive;
                        this.cardTwo = info.userIdCardPicNegative;
                        this.cardThree = info.handCardUrl;
                        if(info.imgList.length!=0){
                            info.imgList.forEach(ele=>{
                                this.aptitudeImgList.push({flag:false,url:ele});
                            });
                        }
                        if(info.storeUrl.length!=0){
                            info.storeUrl.forEach(ele=>{
                                this.storeImgList.push({flag:false,url:ele});
                            });
                        }
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            // 选择按钮
            getDataClick(i){
                const that = this;
                if(i==0) {
                    that.btnIndex = i;
                    console.log('线上商品');
                    that.postData.status = 1;
                }
                if(i==1) {
                    that.btnIndex = i;
                    that.postData.status = 2;
                    console.log('商铺数据');
                }
                if(i==2) {
                    that.btnIndex = i;
                    that.postData.status = 3;
                    console.log('审核备注');
                }
            },
            /**
             *  上下架按钮
             */
            lineClick(){
                //isLine:[当前店铺状态：0：上架；1：下架]
                if(this.isLine){
                //    上架商铺
                    this.$confirm('此操作将上架该商铺, 是否继续?', '提示', {
                        confirmButtonText: '确认上架',
                        cancelButtonText: '我再看看',
                        type: 'warning'
                    }).then(() => {
                        Shops.putAwayShop({"id":this.shopId}).then(res=>{
                            console.log(res);
                            if(res.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '确认成功!'
                                });
                                this.$router.push('/shop/shopList')
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
                }else {
                //    下架商铺
                    this.$prompt('请输入下架该商铺的原因', '下架', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消'
                    }).then(({ value }) => {
                        this.$message({
                            type: 'success',
                            message: '下架该商铺的理由是: ' + value
                        });
                        var getData = {
                            "id": this.shopId,
                            "reason": value
                        };
                        Shops.soldOutShop(getData).then(res=>{
                            console.log(res);
                            if(res.code==200){
                                this.$message({ center: true, type: "info", message: "下架成功" });
                                this.$router.push('/shop/shopList')
                            }else {
                                this.$message({ center: true, type: "info", message: "下架失败" });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消输入'
                        });
                    });
                }
            }
        },
        created(){
            this.btnIndex = 0;
            if(this.$route.query.shopId){
                this.shopId = this.$route.query.shopId
            }
            /**
             * 审核历史数据
             */
            this.getAuditData();
        }
    }
</script>

<style lang="scss">
    #shopDetail {
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
                            width: 42%;
                            height: 420px;
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
                        .money-box {
                            width: 50%;
                            height: 420px;
                            margin-right: 30px;
                            .headImg{
                                width: 126px;
                                height: 126px;
                                border-radius: 50%;
                                overflow: hidden;
                                margin: 0 auto 20px;
                                background: url("../../../../assets/img/views/userCenter/headImg.png");
                                background-size: 100% 100%;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .box-card {
                                border-radius: 30px;
                                height: 268px;
                                .el-card__body {
                                    overflow: hidden;
                                    padding: 28px 80px;
                                    h1 {
                                        font-size: 26px;
                                        span {
                                            font-size: 32px;
                                            color: red;
                                        }
                                    }
                                    .money {
                                        font-size: 26px;
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        margin: 26px 0;
                                        p:first-child {
                                            margin-right: 60px;
                                        }
                                    }
                                    .delBox {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-around;
                                        padding-top: 16px;
                                        .el-button {
                                            line-height: 28px;
                                            font-size: 20px;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .btnBox {
                        height: 102px;
                        display: flex;
                        align-items: center;
                        padding-left: 24px;
                        .el-button.act{
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                        }
                        .el-button {
                            width: 164px;
                            height: 48px;
                            border-radius: 5px;
                            font-size: 22px;
                            margin-right: 60px;
                            position: relative;
                            img {
                                width: 23px;
                                height: 22px;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                        }
                    };
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
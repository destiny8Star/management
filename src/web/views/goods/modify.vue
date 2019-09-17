<!--
  - modify Vue
  - @JsName modify
  - @Description 更新视图 :: 更新产品.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="addition">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button @click="$router.push('/goods')" type="text"><i class="el-icon-arrow-left"></i>返回</el-button>
                    </div>
                    <div class="mainCon">
                        <!--外部图片-->
                        <div class="withOut">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span class="outTitle">外部图片</span>
                                    <div class="classifyBox">
                                        <span>商品分类：</span>
                                        <el-select @change="choClass" v-model="classify" placeholder="请选择">
                                            <el-option
                                                    v-for="item in classifyList"
                                                    :key="item.cid"
                                                    :label="item.name"
                                                    :value="item.cid">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="goods">
                                    <div class="picture">
                                        <img v-if="outsideImg==''" src="../../../assets/logo.png" alt="">
                                        <el-upload
                                                class="upload-demo"
                                                :action="$baseUrl+'/mall/upLoad'"
                                                name="photo"
                                                :on-preview="handlePreview"
                                                :on-remove="handleRemoveOut"
                                                :file-list="outsideImg"
                                                :limit="1"
                                                :on-success="outWin"
                                                :on-error="outFail"
                                                :on-exceed="handleExceed"
                                                list-type="picture">
                                            <el-button type="primary" round>上传图片</el-button>
                                        </el-upload>
                                        <p>外部图片尺寸：<span>236*108</span></p>
                                    </div>
                                    <table class="mailTable">
                                        <tr>
                                            <td>商品主标题</td>
                                            <td><el-input v-model="goods.title"  placeholder="请输入商品主标题"></el-input></td>
                                        </tr>
                                        <tr>
                                            <td>价格(元)</td>
                                            <td><el-input v-model="goods.price"  placeholder="请输入价格"></el-input></td>
                                        </tr>
                                        <tr>
                                            <td>库存(件)</td>
                                            <td><el-input v-model="goods.stock"  placeholder="请输入库存"></el-input></td>
                                        </tr>
                                    </table>
                                </div>

                            </el-card>
                        </div>
                        <!--顶部轮播主图-->
                        <div class="withOut">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span class="outTitle">顶部轮播主图</span>
                                    <div>
                                        <span class="limit">最多6张图，尺寸：750*666</span>
                                    </div>
                                </div>
                                <div class="bannerBox">
                                    <img v-if="bannerImg.length==0" src="../../../assets/logo.png" alt="" class="perch">
                                    <el-upload
                                            class="upload-demo"
                                            :action="$baseUrl+'/mall/upLoad'"
                                            name="photo"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveBanner"
                                            :on-success="bannerWin"
                                            :on-error="bannerFail"
                                            :file-list="bannerImg"
                                            :limit="6"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button type="primary" round>上传图片</el-button>
                                    </el-upload>
                                </div>

                            </el-card>
                        </div>
                        <!--详情主图-->
                        <div class="withOut">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span class="outTitle">详情主图</span>
                                </div>
                                <div class="bannerBox">
                                    <img v-if="mainImg.length==0" src="../../../assets/logo.png" alt="" class="perch">
                                    <el-upload
                                            class="upload-demo"
                                            :action="$baseUrl+'/mall/upLoad'"
                                            name="photo"
                                            :on-preview="handlePreview"
                                            :on-remove="handleRemoveMain"
                                            :file-list="mainImg"
                                            :on-success="mainWin"
                                            :on-error="mainFail"
                                            :limit="1"
                                            :on-exceed="handleExceed"
                                            list-type="picture">
                                        <el-button type="primary" round class="detailImg">上传图片</el-button>
                                    </el-upload>
                                </div>

                            </el-card>
                        </div>
                        <el-button type="primary" class="save" @click="save">保存并上传</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import { Service } from "@/web/request";
    import { Goods, Tags } from "@/web/module/lending";
    export default {
        name: "goods-modify",
        components: {
        },
        data () {
            return {
                // 分类
                classifyList: [],
                classify: '',
                //外部图示例
                "outsideImg": [],
                //轮播图示例
                "bannerImg": [],
                //主图示例
                "mainImg": [],
                goods: {
                    title: '',//标题
                    price: '',//价格
                    stock: '',//库存
                    id: '',//id
                },
                "action": Service.host.concat(Goods.api.upload),
                "loading": false,
                "isSubmit": false,
            }
        },
        methods: {
            // 获取商品分类
            getClassity(){
                Goods.goodsClassify().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.classifyList = res.data;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            choClass(value){
                console.log(value,this.classify);
            },
            // 外部图删除
            handleRemoveOut(file, fileList) {
                console.log(file, fileList);
                this.outsideImg = [];
            },
            // banner删除
            handleRemoveBanner(file, fileList){
                this.bannerImg = this.bannerImg.filter(ele=>{
                    return ele.uid != file.uid;
                });
            },
            // 详情主图删除
            handleRemoveMain(){
                this.mainImg = [];
            },
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(file) {
                console.log(file);
            },

            /**
             * 关闭
             * -- 返回指定页面
             */
            close () {
                const that = this;
                that.$router.push({ "path": "/goods" });
            },
            /**
             * 当超上传限制时的提示
             */
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                });
            },
            /**
             * 上传成功
             */
            onSuccess (res) {
                const that = this;
                that.loading = false;
                if (res) {
                    if (res.code === 10013) {
                        that.data.icon = res.data;
                        that.$refs["data"].validateField("icon");
                    } else {
                        that.$message({ center: true, type: "warning", message: res.result });
                    }
                }
            },
            /**
             * 外部图上传成功
             */
            outWin (response, file, fileList) {
                console.log(response,file,fileList)
                if (response) {
                    if (response.code == 200) {
                        this.outsideImg.push({url:  response.data});
                        console.log(this.outsideImg);
                    } else {
                        this.$message({ center: true, type: "warning", message: res.message });
                    }
                }

            },
            /**
             * 外部图上传失败
             */
            outFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * banner图上传成功
             */
            bannerWin (response, file, fileList) {
                console.log(response,file,fileList)
                if (response) {
                    if (response.code == 200) {
                        this.bannerImg.push({url:  response.data});
                    } else {
                        this.$message({ center: true, type: "warning", message: res.message });
                    }
                }

            },
            /**
             * banner图上传失败
             */
            bannerFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * 主图上传成功
             */
            mainWin (response, file, fileList) {
                console.log(response,file,fileList)
                if (response) {
                    if (response.code == 200) {
                        this.mainImg.push({url:  response.data});
                    } else {
                        this.$message({ center: true, type: "warning", message: res.message });
                    }
                }

            },
            /**
             * 主图上传失败
             */
            mainFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * 保存并上传
             */
            save(){
                const that = this,text = "修改";
                if(this.classify==''){
                    this.open('请选择商品分类');
                    return false;
                }
                if(this.goods.title==''){
                    this.open('请输入商品主标题');
                    return false;
                }
                if(this.goods.price==''){
                    this.open('请输入商品价格');
                    return false;
                }
                if(this.goods.stock==''){
                    this.open('请输入商品库存');
                    return false;
                }
                if(this.outsideImg.length==0){
                    this.open('请上传外部图片');
                    return false;
                }
                if(this.bannerImg.length==0){
                    this.open('请上传顶部轮播主图');
                    return false;
                }
                if(this.mainImg.length==0){
                    this.open('请上传详情主图');
                    return false;
                }
                var bannerUrl = [];
                this.bannerImg.forEach(ele=>{
                    bannerUrl.push(ele.url);
                });
                var postData = {
                    "bannerUrl": bannerUrl,
                    "defaultUrl": this.outsideImg[0].url,
                    "detailUrl": this.mainImg[0].url,
                    "status": 0,
                    "cid": this.classify,
                    "id": this.goods.id,
                    "mainTitle": this.goods.title,
                    "price": this.goods.price,
                    "stock": this.goods.stock,
                };
                console.log(postData);
                this.$confirm("此操作将修改该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.uploadGoods(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('修改成功');
                            this.$router.push('/goods')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning('修改失败，' + res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });

            },

        },
        beforeCreate () {
        },
        beforeMount () {
            //获取商品分类
            this.getClassity();
            this.goods.id = this.$route.query.goodsId;
            var getData = {
                "id": this.goods.id
            };
            Goods.goodsDetail(getData).then(res=>{
                console.log(res);
                if(res.code==200){
                    var list = res.data;
                    this.goods.title = list.mainTitle;
                    this.goods.price = list.price;
                    this.goods.stock = list.stock;
                    this.classify = list.cid;
                    this.outsideImg.push({url: list.defaultUrl});
                    this.mainImg.push({url: list.detailUrl});
                    list.bannerUrl.forEach(ele=>{
                        this.bannerImg.push({url: ele});
                    });
                }else if(res.code==100070 || res.code == 404){
                    this.$message.warning(res.message);
                    this.$router.push('/')
                }else {
                    this.$message.warning(res.message);
                }
            })
        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #addition {
        width: 100%;
        height: 100%;
        .el-main {
            .content {
                height: inherit;
                background-color: #FFFFFF;
                text-align: left;
                padding: 13px 30px 30px;
                .back {
                    .el-button {
                        font-size: 20px;
                        color: #3E3E4D;
                    }
                }

                .mainCon {
                    padding: 0 50px;
                    .withOut:first-child {
                        margin-top: 0;
                    }
                    .withOut {
                        margin-top: 20px;
                        .el-card {
                            .clearfix {
                                display: flex;
                                align-items: center;
                                .outTitle {
                                    font-size: 24px;
                                };
                                .classifyBox {
                                    width: 628px;
                                    display: flex;
                                    align-items: center;
                                    margin-left: 372px;
                                    span {
                                        font-size: 24px;
                                    }
                                }
                                .el-button.is-round {
                                    margin-left: 34px;
                                    color: #fff;
                                };
                                div {
                                    .limit {
                                        height: 45px;
                                        display: table-cell; /*按照单元格的样式显示元素*/
                                        vertical-align: bottom; /*底对齐*/
                                        font-size: 16px;
                                        font-family: 'PingFang-SC-Regular';
                                        color: #909090;
                                        padding-left: 184px;
                                    }
                                }
                            };
                            .goods {
                                display: flex;
                                align-items: center;
                                position: relative;
                                .picture {
                                    margin: 0 116px;
                                    text-align: center;
                                    color: #909090;
                                    font-size: 16px;
                                    img {
                                        width:236px;
                                        height:108px;
                                        margin-bottom: 24px;
                                        position: absolute;
                                        top: 0;
                                        left: 0;
                                        margin-left: 116px;
                                    };
                                    .el-button.is-round {
                                        position: absolute;
                                        top: -78px;
                                        left: 136px;
                                    };
                                    .upload-demo {
                                        width:236px;
                                        min-height: 108px;
                                        margin-bottom: 24px;
                                        .el-upload-list {
                                            display: flex;
                                            align-items: center;
                                            .el-upload-list__item {
                                                border: 0;
                                                width:236px;
                                                height:108px;
                                                padding: 0;
                                                margin: 0 4px;
                                                .el-icon-close {
                                                    width: 26px;
                                                    line-height: 26px;
                                                    text-align: center;
                                                    display: block;
                                                    z-index: 99;
                                                    background: #909090;
                                                    border-radius: 50%;
                                                    color: #fff;
                                                }
                                                .el-upload-list__item-name {
                                                    display: none;
                                                }
                                                .el-upload-list__item-thumbnail {
                                                    width: 100%;
                                                    height: 100%;
                                                    margin: 0;
                                                }
                                            }
                                        }
                                    }
                                };
                                .mailTable {
                                    width: 628px;
                                    border-collapse: collapse;
                                    text-align: center;
                                    tr {
                                        height: 62px;
                                        color: #909090;
                                        td {
                                            width: 50%;
                                            border: 1px solid #E5E5E5;
                                            .el-input__inner  {
                                                border: 0;
                                                color: #333;
                                            }
                                        }
                                    }
                                }
                            }
                            .bannerBox {
                                position: relative;
                                .perch {
                                    width: 222px;
                                    height: 197px;
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                }
                                .el-button.is-round {
                                    position: absolute;
                                    top: -84px;
                                    left: 184px;
                                };
                                .el-button.is-round.detailImg {
                                    position: absolute;
                                    top: -78px;
                                    left: 135px;
                                }
                                .upload-demo {
                                    min-height: 197px;
                                    .el-upload-list {
                                        display: flex;
                                        align-items: center;
                                        .el-upload-list__item {
                                            border: 0;
                                            width: 222px;
                                            height: 197px;
                                            padding: 0;
                                            margin: 0 4px;
                                            .el-icon-close {
                                                width: 26px;
                                                line-height: 26px;
                                                text-align: center;
                                                display: block;
                                                z-index: 99;
                                                background: #909090;
                                                color: #fff;
                                                border-radius: 50%;
                                            }
                                            .el-upload-list__item-name {
                                                display: none;
                                            }
                                            .el-upload-list__item-thumbnail {
                                                width: 100%;
                                                height: 100%;
                                                margin: 0;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                .el-button--primary.save {
                    margin-top: 30px;
                    width: 281px;
                    height: 61px;
                    font-size: 24px;
                    border-radius: 10px;
                }
            };
        }
    };
</style>

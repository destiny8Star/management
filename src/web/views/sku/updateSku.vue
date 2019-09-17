<template>
    <div id="updateSku">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-main>
                <div class="content">
                    <el-button @click="back" class="back" type="text"><i
                            class="el-icon-arrow-left"></i>返回
                    </el-button>
                    <div class="bindClassify">
                        <div class="row">
                            <p>绑定商品分类：</p>
                            <span v-if="type==2">{{choClassify.text}}</span>
                            <el-select v-else v-model="goodsClassifyId" placeholder="请选择商品分类" @change="choGoodsClassify">
                                <el-option
                                        v-for="item in goodsClassifyList"
                                        :key="item.id"
                                        :label="item.text"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="row">
                            <p>商品类型名称：</p>
                            <span v-if="type==2">{{skuName}}</span>
                            <el-input v-else v-model="skuName" @blur="isName" maxlength="12" clearable placeholder="请输入商品类型名称"></el-input>
                        </div>
                    </div>
                    <div class="skuBox">
                        <el-card class="box-card" v-for="(ele,i) in templateList" :key="i">
                            <div slot="header" class="clearfix">
                                <div class="standard">
                                    <p>规格{{mapSkuIndex[i]}}:</p>
                                    <span v-if="ele.flag">{{ele.templateName}}</span>
                                    <el-input v-else v-model="ele.templateName" maxlength="12" clearable placeholder="请输入规格名称"></el-input>
                                </div>
                                <div class="btnBox">
                                    <el-button :disabled="(templateList.length==1&&type==1)||(ele.flag&&type==2)" type="danger" @click="delStandard(ele,i)">删除</el-button>
                                </div>
                            </div>
                            <p style="margin-bottom: 6px">规格属性：</p>
                            <p class="item" v-for="(val,v) in ele.skuSecondItemList" :key="v">{{val.templateName}}
                                <el-button v-show="!val.flag" @click="delAttr(i,v)" class="delBtn el-icon-circle-close" type="text"></el-button>
                            </p>
                            <el-row style="margin-left: 3px">
                                <el-input v-model="ele.attrText" maxlength="12" placeholder="请输入规格属性"></el-input>
                                <el-button @click="addAttr(ele,i)" style="margin: 0 6px" type="primary" icon="el-icon-check" circle size="mini"></el-button>
                            </el-row>
                        </el-card>
                    </div>
                    <el-button type="primary" @click="addStandard">添加</el-button>
                    <el-row class="saveBox">
                        <el-button type="primary" class="save" @click="save">保存</el-button>
                    </el-row>

                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Sku, Goods, Tags } from "@/web/module/lending";
    export default {
        name: "updateSku",
        data() {
            return {
                isSubmit: true,
                "skuId": '',//sku模板id
                "type": 0,//编辑规格时的状态，1：无商品，可随意操作   2：有商品，只可添加
                "skuName": '',//sku模板名称
                "mapSkuIndex": {0: '一',1: '二',2: '三'},

                goodsClassifyId: '',//绑定的商品分类id
                goodsClassifyList: [],//所有商品分类
                choClassify: {},//选中的商品分类

                // attrText: '',//添加输入的属性值
                //规格list
                templateList: [
                    {
                        templateName: '',
                        attrText: '',
                        skuSecondItemList: []
                    },
                ]
            }
        },
        methods: {
            //返回上一页
            back(){
                this.$router.push({path:'/sku/skuList'})
            },
            /**
             * 获取商品分类
             */
            getGoodsClassify(id) {
                var postData = {
                    "parentId": id
                };
                console.log(postData);
                Goods.nextClassify(postData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.goodsClassifyList = res.data;
                    }else if(res.code == 100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message(res.message);
                    }
                })
            },
            // 验证sku名称
            isName(){
                Sku.skuName({"id":this.skuId,"name":this.skuName}).then(res=>{
                    console.log(res);
                    if(res.code==200){

                    }else if(res.code == 100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.skuName = '';
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 选择商品分类
             */
            choGoodsClassify(){
                console.log(this.goodsClassifyId);
                this.choClassify = this.goodsClassifyList.filter(ele=>{
                    return ele.id == this.goodsClassifyId
                });
                this.choClassify = this.choClassify[0];
                console.log(this.choClassify);
            },
            /**
             * 添加规格
             */
            addStandard() {
                let index = this.templateList.length;
                if(this.templateList[index-1].templateName.trim()==''||this.templateList[index-1].skuSecondItemList.length==0){
                    this.open("请先完善当前规格再添加");
                    return false;
                }
                if(index==3){
                    this.open("规格数量已达上限，如需添加请调整");
                    return false;
                }
                this.templateList.push({
                    templateName: '',
                    attrText: '',
                    skuSecondItemList: []
                })
            },
            /**
             * 删除规格
             */
            delStandard(data,index) {
                console.log(data,index,this.templateList[index].skuSecondItemList.length);
                const that = this, text = "删除";
                that.$confirm("此操作将删除该规格 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    this.templateList.splice(index,1);
                }).catch(() => {
                    that.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            },
            /**
             * 添加相应规格属性
             */
            addAttr(data,index) {
                console.log(data,index);
                if(data.attrText.trim()==''){
                    this.$message('请输入规格属性，再添加');
                    return false;
                }
                this.templateList[index].skuSecondItemList.push({templateName: data.attrText});
                data.attrText = '';
            },
            /**
             * 删除相应规格属性
             */
            delAttr(i,v) {
                console.log(i,v);
                this.templateList[i].skuSecondItemList.splice(v,1);
                console.log(this.templateList);
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
             * 保存
             * @returns {boolean}
             */
            save() {
                const that = this,text = "添加";
                if(this.goodsClassifyId == ''){
                    this.open('请绑定商品分类');
                    return false;
                }
                if(this.skuName.trim()==''){
                    this.open('请输入商品类型名称');
                    return false;
                }
                if(this.templateList[this.templateList.length-1].templateName==''){
                    this.open('请先完善规格');
                    return false;
                }
                if(this.templateList[this.templateList.length-1].skuSecondItemList.length==0){
                    this.open('请先完善规格');
                    return false;
                }
                this.isSubmit = true;
                var postData = {
                    "id": this.skuId,
                    "type": this.type,
                    "cateId": this.goodsClassifyId,
                    "cateName": this.choClassify.text,
                    "templateName": this.skuName,
                    "skuItemList": this.templateList,
                };
                console.log(postData);
                this.$confirm("此操作将修改该模板 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Sku.skuUpdate(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('修改成功');
                            this.isSubmit = false;
                            this.$router.push({path:'/sku/skuList'})
                        }else if(res.code == 100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.isSubmit = false;
                            this.$message('修改失败，' + res.message);
                        }

                    })
                }).catch(() => {
                    this.isSubmit = false;
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });

            },
            /**
             * 获取详情
             */
            getDetail(){
                Sku.skuDetail({"id":this.skuId}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.isSubmit = false;
                        this.goodsClassifyId = res.data.cateId;
                        this.type = res.data.type;
                        this.skuName = res.data.templateName;
                        this.templateList = res.data.skuItemList;
                        this.choClassify.text = res.data.cateName;
                        this.templateList.forEach(ele=>{
                            this.$set(ele,"flag",true);
                            ele.skuSecondItemList.forEach(val=>{
                                this.$set(val,"flag",true);
                            })
                        })
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.isSubmit = false;
                        this.$message(res.message);
                    }

                })
            }
        },
        mounted() {
            if (this.$route.query) {
                this.skuId = this.$route.query.skuId;
            }
            // 获取商品分类一级
            this.getGoodsClassify(0, 0);
            // 获取详情
            this.getDetail();
        },
    }
</script>


<style lang="scss">
    #updateSku {
        width: 100%;
        height: 100%;

        .el-main {
            .content {
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                text-align: left;
                padding: 13px 30px 30px;
                .back {
                    font-size: 20px;
                    color: #3E3E4D;
                }
                .bindClassify {
                    width: 60%;
                    position: relative;
                    margin: 20px 0;
                    .row {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                        position: relative;
                        font-size: 22px;
                        p {
                            min-width: 180px;
                            text-align: left;
                        }
                        .el-select {
                            width: 300px;
                            margin-right: 10px;

                        }
                        .el-input,input.el-input__inner {
                            width: 300px;
                        }
                    }
                }
                .skuBox {
                    .box-card {
                        width: 60%;
                        font-size: 20px;
                        margin: 20px 0;
                        .el-card__header {
                            .clearfix {
                                display: flex;
                                align-items: center;
                                justify-content: space-between;
                                .standard,.btnBox {
                                    display: flex;
                                    align-items: center;
                                }
                                .standard {
                                    p {
                                        white-space: nowrap;
                                        margin-right: 20px;
                                    }
                                }
                            }
                        }
                        .el-card__body {
                            .el-input {
                                width: auto;
                            }
                            .item {
                                font-size: inherit;
                                height: 0.533333rem;
                                line-height: 0.533333rem;
                                border-radius: 0.053333rem;
                                border: 0.013333rem solid #DCDFE6;
                                display: inline-block;
                                padding:  0 10px;
                                margin: 6px;
                                .delBtn {
                                    color: #C0C4CC;
                                    margin-left: 6px;
                                    line-height: 0.533333rem;
                                    padding: 0;
                                }
                                .delBtn:hover {
                                    color: #909399;
                                }
                            }
                            .item:hover {
                                border: 0.013333rem solid #b9bcc2;
                            }
                        }
                    }
                }
                .saveBox {
                    width: 60%;
                    text-align: right;
                    .save {
                        width: 200px;
                        height: 50px;
                        font-size: 24px;
                        margin: 20px 0;
                    }
                }

            }
        }
    }
</style>
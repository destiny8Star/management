<template>
    <div id="updateShopClassify">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <p class="back">
                        <el-button @click="$router.push('/shop/shopClassify')" type="text"><i
                                class="el-icon-arrow-left"></i>返回
                        </el-button>
                    </p>
                    <div class="itemBox">
                        <h2>一级分类：</h2>
                        <table class="mailTable">
                            <tr>
                                <td>一级分类</td>
                                <td>
                                    <el-input v-model="bigClass" placeholder="请输入一级分类"></el-input>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="itemBox">
                        <h2>二级分类：</h2>
                        <table class="mailTable">
                            <tr v-for="(ele,i) in oldClassifyList" :key="i">
                                <td>二级分类</td>
                                <td>
                                    <el-input v-model="ele.category"
                                              placeholder="请输入二级分类"></el-input>
                                </td>
                            </tr>
                            <tr v-for="(ele,i) in classifyList" :key="i">
                                <td>二级分类</td>
                                <td>
                                    <el-input clearable v-model="ele.category"
                                              placeholder="请输入二级分类"></el-input>
                                </td>
                            </tr>
                        </table>
                        <el-button @click="addClass" type="primary" icon="el-icon-plus">增加二级类目</el-button>
                    </div>
                    <el-button @click="save" class="saveBtn" type="primary">保存</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import {Shops, Tags} from "@/web/module/lending";

    export default {
        name: "updateShopClassify",
        data() {
            return {
                loading: false,
                state: true,
                classifyId: '',//分类id
                bigClass: '',//一级分类
                oldClassifyList: [],//原本的二级分类
                classifyList: [],//新增二级分类
            }
        },
        methods: {
            /**
             * 添加二级分类
             * @param val
             * @param index
             */
            addClass() {
                console.log("111");
                if (this.classifyList.length == 0) {
                    this.classifyList.push({category: '',cid: ''});
                } else if (this.classifyList[this.classifyList.length - 1].category != '') {
                    this.classifyList.push({category: '',cid: ''});
                    console.log(this.classifyList);
                }
            },
            /**
             * 当某个值改变时
             * @param val
             * @param index
             */
            updateClass(val, index) {
                var text = val;
                console.log(text, val);
                if (!val.text) {
                    console.log(val, index, this.oldClassifyList);
                    val = text;
                    console.log(val, index, this.oldClassifyList);
                }
            },
            /**
             * 保存
             */
            save() {
                const that = this, text = "修改";
                if (this.bigClass === '' || this.bigClass === " ") {
                    console.log(this.bigClass);
                    this.open('不可清空一级分类，只可编辑');
                    return false;
                }
                this.oldClassifyList.forEach((ele, i) => {
                    console.log(ele.category);
                    if (ele.category === '' || ele.category === " ") {
                        that.state = false;
                    }
                });
                if(!that.state){
                    that.state = true;
                    that.open('不可清空二级分类，只可编辑');
                    return false;
                }
                var list = this.oldClassifyList.concat(this.classifyList);
                console.log(list);
                for(var i = 0; i < list.length; i++) {
                    for(var j = i + 1; j < list.length; j++){
                        if (list[i].category === list[j].category){
                            that.state = false;
                        }
                    }
                }
                if(!that.state){
                    that.state = true;
                    that.open('不可设置同名分类，请修改');
                    return false;
                }
                that.state = true;
                var postData = {
                    "category": this.bigClass,
                    "childDetailReqList": list,
                    "cid": this.classifyId
                };
                console.log(postData);
                this.$confirm("此操作将修改该分类 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Shops.updateShopClassify(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('修改成功');
                            this.$router.push('/shop/shopClassify')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message(res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
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
             * 获取详情
             */
            getData() {
                Shops.shopClassifyDetail({"cid": this.classifyId}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.bigClass = res.data.category;
                        this.oldClassifyList = res.data.childDetailRespList;
                    }
                })
            }
        },
        created() {
            if (this.$route.query.shopClassifyId) {
                this.classifyId = this.$route.query.shopClassifyId;
            }
            this.getData();
        }
    }
</script>

<style lang="scss">
    #updateShopClassify {
        width: 100%;
        height: 100%;
        color: #3E3E4D;
        .el-container {
            .el-main {
                .content {
                    min-height: 100%;
                    background: #fff;
                    padding: 24px 15px;
                    overflow: hidden;
                    .back {
                        text-align: left;
                        .el-button {
                            color: #3E3E4D;
                            font-size: 20px;
                        }
                    }
                    .itemBox {
                        overflow: hidden;
                        h2 {
                            font-weight: 600;
                            text-align: left;
                            font-size: 28px;
                            margin: 30px 0 25px;
                        }
                        .mailTable {
                            width: 628px;
                            border-collapse: collapse;
                            text-align: center;
                            margin: 2px 20px;
                            tr {
                                height: 62px;
                                color: #909090;
                                td {
                                    width: 50%;
                                    border: 1px solid #E5E5E5;
                                    .el-input__inner {
                                        border: 0;
                                        color: #333;
                                    }
                                }
                            }
                        }
                        .el-button {
                            float: left;
                            margin: 20px 40px;
                        }
                    }
                    .saveBtn {
                        width: 200px;
                        height: 46px;
                        float: left;
                        font-size: 20px;
                        margin: 40px;
                    }
                }
            }
        }
    }
</style>
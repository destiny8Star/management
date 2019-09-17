<template>
    <div id="addShopClassify">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <p class="back">
                        <el-button @click="$router.push('/shop/shopClassify')" type="text"><i class="el-icon-arrow-left"></i>返回</el-button>
                    </p>
                    <div class="itemBox">
                        <h2>一级分类：</h2>
                        <table class="mailTable">
                            <tr>
                                <td>一级分类</td>
                                <td><el-input v-model="bigClass"  placeholder="请输入一级分类"></el-input></td>
                            </tr>
                        </table>
                    </div>
                    <div class="itemBox">
                        <h2>二级分类：</h2>
                        <table class="mailTable">
                            <tr v-for="(ele,i) in classifyList" :key="i">
                                <td>二级分类</td>
                                <td><el-input clearable @change="updateClass(ele,i)" v-model="ele.text" placeholder="请输入二级分类"></el-input></td>
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
    import { Shops, Tags } from "@/web/module/lending";
    export default {
        name: "addShopClassify",
        data(){
            return{
                loading: false,
                bigClass: '',
                classifyList:[
                    {text:''}
                ]
            }
        },
        methods:{
            /**
             * 添加二级分类
             * @param val
             * @param index
             */
            addClass(){
                console.log("111");
                if(this.classifyList[this.classifyList.length-1].text!=''){
                    this.classifyList.push({text:''});
                    console.log(this.classifyList);
                }
            },
            /**
             * 当某个值改变时
             * @param val
             * @param index
             */
            updateClass(val,index){
                if(!val.text){
                    console.log(val,index,this.classifyList);
                    this.classifyList.splice(index,1);
                    console.log(val,index,this.classifyList);
                }
            },
            /**
             * 保存
             */
            save(){
                const that = this,text = "添加";
                if(this.bigClass==''){
                    this.open('请输入一级分类');
                    return false;
                }
                var list = [];
                this.classifyList.forEach(ele=>{
                    list.push(ele.text);
                });
                console.log(list.length);
                if(list[0]==''){
                    this.open('请至少设置一个二级分类');
                    return false;
                }
                var postData = {
                    "cateGory": list,
                    "parentCategory": this.bigClass
                };
                console.log(postData);
                this.$confirm("此操作将添加该分类 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Shops.addShopClassify(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('添加成功');
                            this.$router.push('/shop/shopClassify')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message(res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
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
        }
    }
</script>

<style lang="scss">
    #addShopClassify {
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
                                    .el-input__inner  {
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
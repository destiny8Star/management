

<!-- 赶项目，一期，添加icon页面 -->



<template>
    <div id="addIcons">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-main>
                <div class="content">
                    <el-button @click="$router.push('/operate/posterList')" class="back" type="text"><i
                            class="el-icon-arrow-left"></i>返回
                    </el-button>
                    <el-card class="box-card">
                        <div class="row">
                            <p>海报位置：</p>
                            <p>{{location}}</p>
                        </div>
                        <div class="row">
                            <p>海报名称：</p>
                            <el-input v-model="title" placeholder="请输入海报名称"></el-input>
                        </div>
                        <div class="row">
                            <p><!--<strong>*</strong>-->上传海报图片：</p>
                            <el-upload
                                    class="upload-demo"
                                    :action="$baseUrl+'/mall/upLoad'"
                                    limit="1"
                                    name="photo"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="updateImg"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="1"
                                    :on-success="imgWin"
                                    :on-error="imgFail"
                                    :on-exceed="handleExceed"
                                    list-type="picture">
                                <div class="btn">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">&nbsp;限传1张，只能上传jpg/png文件，且不超过500kb</div>
                                </div>

                            </el-upload>
                        </div>
                    </el-card>
                    <el-button type="primary" class="save" @click="save">保存</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Operate, Goods, Common, Tags } from "@/web/module/lending";
    const map = {1: '海报', 2: '易拉宝', 3: '宣传单',4:'三折页'};
    export default {
        name: "addIcons",
        data() {
            return {
                posterId: '',//海报id
                location: '请在海报列表页选定海报位置',//海报位置
                locations: '',//海报位置-调参
                title: '',//海报标题
                h5Link: '',//h5链接
                updateImg: [],//上传的图片
                isSubmit: false
            }
        },
        methods: {
            /**
             * 图上传成功
             */
            imgWin (response, file, fileList) {
                console.log(response,file,fileList)
                if (response) {
                    if (response.code == 200) {
                        this.updateImg.push({url:  response.data});
                        console.log(this.updateImg);
                    } else if(response.code==100070){
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    } else {
                        this.$message({ center: true, type: "warning", message: response.message });
                    }
                }

            },
            /**
             * 图上传失败
             */
            imgFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            // 外部图删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateImg = [];
            },
            /**
             * 选择海报类型
             */
            choType(){
                console.log(this.type);
            },
            handlePreview(file) {
                console.log(file);
            },
            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                });
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            save() {
                const that = this,text = "添加";
                if(this.locations == '请在海报列表页选定海报位置'){
                    this.open('请前往海报列表页');
                    return false;
                }
                if(this.title==''){
                    this.open('请输入海报名称');
                    return false;
                }
                if(this.updateImg.length == 0){
                    this.open('请选择图片上传');
                    return false;
                }
                var postData = {
                    "type": this.locations,
                    "pic": this.updateImg[0].url,
                    "name": this.title,
                };
                console.log(postData);
                this.$confirm("此操作将添加该海报 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Operate.posterUpdate(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('添加成功');
                            this.$router.push('/operate/posterList')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message('添加失败，' + res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });

            },
        },
        mounted() {
            if (this.$route.query) {
                this.locations = this.$route.query.type;
                this.location = map[this.$route.query.type]
            }
        },
    }
</script>

<style lang="scss">
    #addIcons {
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
                .box-card {
                    width: 60%;
                    /*height: calc(100% - 90px);*/
                    position: relative;
                    margin: 20px 0;
                    .row {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                        position: relative;
                        p {
                            min-width: 180px;
                            text-align: left;
                        }
                        .typeText {
                            line-height: 40px;
                            position: absolute;
                            left: 12px;
                            top: 0;
                            z-index: 99;
                        }
                        .el-select {
                            width: 170px;
                            margin-right: 10px;
                            input.el-input__inner {
                                width: 170px;
                            }
                        }
                        .el-select:nth-child(3) {
                            width: 280px;
                            input.el-input__inner {
                                width: 280px;
                            }
                        }
                        .el-select:last-child {
                            width: 280px;
                            input.el-input__inner {
                                width: 280px;
                            }
                        }
                        strong {
                            color: red;
                        }
                        .btn {
                            display: flex;
                        }
                        input {
                            width: 460px;
                        }
                        .inputT  {
                            width: 280px;
                            input {
                                width: 280px;
                            }
                        }
                        .dateBox {
                            input {
                                width: 220px;
                            }
                            .el-input__prefix {
                                right: 5px;
                                left: auto;
                            }
                            .el-input__inner {
                                padding: 0 15px;
                            }
                            i {
                                margin: 0 7px;
                            }
                        }
                    }
                    .row:last-child {
                        display: flex;
                        align-items: baseline;
                    }
                }
                .save {
                    width: 300px;
                    height: 50px;
                    font-size: 24px;
                }
            }
        }
    }
</style>
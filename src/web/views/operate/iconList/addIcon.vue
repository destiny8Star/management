<template>
    <div id="addIcon">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-main>
                <div class="content">
                    <el-button @click="$router.push('/operate/iconList')" class="back" type="text"><i class="el-icon-arrow-left"></i>返回</el-button>
                    <el-card class="box-card">
                        <div class="row">
                            <p>图标位置：</p>
                            <el-select v-model="location" clearable placeholder="请选择图标位置">
                                <el-option
                                        v-for="item in locationList"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="row">
                            <p>标题：</p>
                            <el-input v-model="title" placeholder="请输入标题（不在APP中显示）"></el-input>
                        </div>
                        <div class="row">
                            <p>排序：</p>
                            <el-input v-model="sortNum" placeholder="请输入0-50之间的数值以表示权重"></el-input>
                        </div>
                        <div class="row">
                            <p>广告链接：</p>
                            <el-input v-model="operateLink" placeholder="请输入链接"></el-input>
                        </div>
                        <div class="row">
                            <p><strong>*</strong>上传广告图片：</p>
                            <el-upload
                                    class="upload-demo"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    limit="1"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="1"
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
    export default {
        name: "addIcon",
        data(){
            return {
                location: '',//广告位置
                title: '',//广告标题
                sortNum: '',//广告权重排序
                isSubmit: false,
                startDate: '',//开始时间
                endDate: '',//结束时间
                operateLink: '',//广告链接
                goodsID: '',//商品id
                //选择广告位置
                locationList: [
                    {
                        value: '1',
                        label: '商城首页'
                    }, {
                        value: '2',
                        label: '账单页面'
                    }
                ],
                fileList: [],
            }
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            save(){
                console.log("保存");
            }
        }
    }
</script>

<style lang="scss">
    #addIcon {
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
                    width: 50%;
                    /*height: calc(100% - 90px);*/
                    padding-right: 100px;
                    position: relative;
                    margin: 20px 0;
                    .row {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                        p {
                            min-width: 180px;
                            text-align: left;
                        }
                        strong {
                            color: red;
                        }
                        .btn {
                            display: flex;
                        }
                        input {
                            width: 400px;
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
<!--
  - modify Vue
  - @JsName modify
  - @Description 更新视图 :: 更新标签.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->  
<template>
    <div id="modify">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-header>
                <div id="sign">
                    <span class="signicon"><font>#</font></span>
                    <span class="signtext">{{$route.meta.title}} :: 产品标签</span>
                </div>
                <div id="group">
                    <button class="groupicon"><i class="material-icons" @click="submit('data')">done_all</i></button>
                    <span class="groupicon"><i class="material-icons" @click="reset('data')">settings_backup_restore</i></span>
                    <span class="groupicon"><i class="material-icons" @click="close()">settings_power</i></span>
                </div>
            </el-header>
            <el-main>
                <div class="content">
                    <el-form :model="data" :rules="rules" ref="data" label-width="100px">
                        <!--<el-row class="tab-btn-box">-->
                            <!--<el-col :span="12">-->
                                <!--<el-button :class="{btnActive:data.tagType==0}" @click="tabChange(0)" round :autofocus="true">首页标签</el-button>-->
                                <!--<el-button :class="{btnActive:data.tagType==1}" @click="tabChange(1)" round>借款标签</el-button>-->
                                <!--<el-button :class="{btnActive:data.tagType==2}" @click="tabChange(2)" round>信用卡标签</el-button>-->
                            <!--</el-col>-->
                        <!--</el-row>-->
                        <el-row v-if="!data.tagType">
                            <el-col :span="5" :sm="{ span: 16 }" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 5 }">
                                <el-form-item label="图标" prop="icon" class="locate">
                                    <el-upload v-loading="loading" :on-success="onSuccess" :on-error="onError" :before-upload="beforeUpload" :action="action" :headers="headers" name="icon" :show-file-list="false" list-type="picture-card" class="avatar-uploader">
                                        <img v-if="data.icon" :src="data.icon" class="avatar">
                                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row type="flex" class="row-bg" justify="left">
                            <el-col :span="6" :sm="{ span: 16 }" :md="{ span: 12 }" :lg="{ span: 8 }" :xl="{ span: 6 }">
                                <div style="min-width: 678px;">
                                    <el-form-item v-if="data.tagType==2" label="*" prop="cardType" class="locate">
                                        <el-radio-group v-model="data.creditType">
                                            <el-radio label="bankTypeTag">{{ "银行" }}</el-radio>
                                            <el-radio label="topicTypeTag">{{ "主题" }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="名称" prop="name">
                                        <el-col :span="12">
                                            <el-input v-model="data.name" placeholder="请输入名称"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <!--<el-form-item label="状态" prop="parentTag" class="locate">-->
                                    <!--<el-radio-group v-model="data.parentTag">-->
                                    <!--<el-radio :label="0">{{ "首页产品" }}</el-radio>-->
                                    <!--<el-radio :label="1">{{ "借款产品" }}</el-radio>-->
                                    <!--<el-radio :label="2">{{ "信用卡产品" }}</el-radio>-->
                                    <!--</el-radio-group>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="编码" prop="code">
                                        <el-col :span="12">
                                            <el-input size="small" v-model="data.code" placeholder="请输入编码"></el-input>
                                        </el-col>
                                    </el-form-item>
                                    <el-form-item label="排序" prop="sortPriority" class="locate">
                                        <el-input-number size="small" :min="0" v-model="data.sortPriority"></el-input-number>
                                    </el-form-item>
                                    <!--<el-form-item label="入口" prop="isEntrance" class="locate">-->
                                    <!--<el-radio-group v-model="data.isEntrance">-->
                                    <!--<el-radio :label="true">{{ "是" }}</el-radio>-->
                                    <!--<el-radio :label="false">{{ "否" }}</el-radio>-->
                                    <!--</el-radio-group>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="状态" prop="isEnable" class="locate">
                                        <el-radio-group v-model="data.isEnable">
                                            <el-radio :label="true">{{ "启用" }}</el-radio>
                                            <el-radio :label="false">{{ "禁用" }}</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Service } from "@/web/request";
import { Tags } from "@/web/module/lending";
export default {
    name: "tags-modify",
    components: {
    },
    data () {
        return { 
            "page": 1,
            "action": Service.host.concat(Tags.api.upload),
            "headers": {
                "Token": localStorage.getItem("$Key") ? localStorage.getItem("$Key") : "",
            },
            "param": {
                "id": 0,
            },
            "loading": false,
            "isSubmit": false,
            "data": {
                "icon": "",
                "name": "",
                "code": "",
                "tagType": 0,
                "sortPriority": 0,
                "isEntrance": false,
                "isEnable": true,
                "creditType": 'bankTypeTag'
            },
            "rules": {
                // "icon": [
                //     { "required": true, "message": "请上传图标" },
                // ],
                "name": [
                    { "required": true, "message": "请输入名称", "trigger": "blur" },
                    { "min": 2, "max": 10, "message": "长度在 2 到 10 个字符", "trigger": "blur" },
                ],
                "code": [
                    { "required": true, "message": "请输入标签", "trigger": "blur" },
                    { "min": 2, "max": 20, "message": "长度在 2 到 20 个字符", "trigger": "blur" },
                    { "pattern": /^[A-Za-z]+$/, "message": "只允许输入 2 - 20 个字母字符" },
                ],
                "sortPriority": [
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入排序"));
                        }
                        if (!Number.isInteger(value)) {
                            callback(new Error("排序必须为数字值"));
                        } else {
                            (value >= 0) ? callback() : callback(new Error("排序必须为 >= 0 的数字值"));
                        }
                    }, "trigger": "blur" },
                    { "required": true, "validator": (rule, value, callback) => {
                        if (value === undefined) {
                            return callback(new Error("请输入排序"));
                        }
                        if (!Number.isInteger(value)) {
                            callback(new Error("排序必须为数字值"));
                        } else {
                            (value >= 0) ? callback() : callback(new Error("排序必须为 >= 0 的数字值"));
                        }
                    }, "trigger": "change" },
                ],
                 "isEntrance": [
                    { "required": true, "message": '请选择状态', "trigger": "change" },
                ],
                "isEnable": [
                    { "required": true, "message": '请选择状态', "trigger": "change" },
                ],
            }
        }
    },
    methods: {
        /**
         * 加载数据
         */
        loadingInfo () {
            const that = this;
            that.isSubmit = true; 
            setTimeout(() => {
                Tags.obtain({ ...that.param }).then((res) => {
                    that.isSubmit = false;
                    if (res) {
                        if (res.code === 10001) {
                            delete res.data["createdTime"];
                            that.data = { ...res.data };
                        } else {
                            that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                        }
                    }
                }, (err) => {
                    that.isSubmit = false; 
                    that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                    console.error(err);
                });
            }, 500);
        },
        /**
         * 提交表单
         */
        submit (formName) {
            const that = this
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    that.isSubmit = true; 
                    setTimeout(() => {
                        Tags.modify({ ...that.data }).then((res) => {
                            that.isSubmit = false; 
                            if (res) {
                                if (res.code === 10001) {
                                    that.$message({ center: true, type: "success", duration: "1500", message: "更新".concat(res.result) });
                                } else {
                                    that.$message({ center: true, type: "warning", message: "更新失败 , ".concat(res.result) });
                                }
                            }
                        }, (err) => {
                            that.isSubmit = false; 
                            that.$message({ center: true, type: "warning", message: "更新失败 , 网络异常" });
                            console.error(err);
                        });
                    }, 500);
                }
            });
        },
        /**
         * 重置表单
         */
        reset () {
            const that = this;
            that.loadingInfo();
        },
        /**
         * 关闭
         * -- 返回指定页面
         */
        close () {
            const that = this;
            that.$router.push({ "name": "tags", "params": { "page": that.page }});
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
         * 上传失败
         */
        onError (err) {
            const that = this;
            that.loading = false;
            that.$message({ center: true, type: "warning", message: "上传失败 , 网络异常" });
            console.error(err);
        },
        /**
         * 上传之前的钩子
         */
        beforeUpload (file) {
            const that = this, isJPGPNG = (file.type === 'image/jpeg' || file.type === 'image/png'), isLt2M = file.size / 1024 / 1024 < 2;
            if (!isJPGPNG) {
                that.$message({ center: true, type: "warning", message: "上传图标只能是 JPG/PNG 格式. " });
            }
            if (!isLt2M) {
                 that.$message({ center: true, type: "warning", message: "上传图标大小不能超过 2MB. " });
            }
            that.loading = (isJPGPNG && isLt2M);
            return isJPGPNG && isLt2M;
        }
    },
    beforeCreate () {
    },
    beforeMount () {
        const that = this, { tagsId, page } = that.$route.params; 
        if (tagsId) {
            that.page = page;
            that.param.id = tagsId;
            // 加载数据
            that.loadingInfo();
        } else {
            that.close();
        }
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#modify {
    width: 100%;
    height: 100%;
    .el-header {
        padding: 0;
        height: 72px !important;
        background-color: #FFFFFF;
        box-shadow: 0px 0px 2px #e6dfdf;
        #sign {
            width: 200px;
            height: 100%;
            display: flex;
            .signicon {
                width: 32px;
                height: 32px;
                border-radius: 16px;
                margin: 20px 10px 20px 38px;    
                background-color: #E3EDFD;
                border: 1px solid #6189D3;
                font {
                    color: #6189D3;
                    font-size: 16px;
                    font-family: "material-icons";
                    line-height: 30px;
                };
            };
            .signtext {
                line-height: 72px;
                color: #606266;
            };  
        };
        #group {
            display: flex;
            width: 170px;
            height: 72px;
            float: right;
            top: 0;
            right: 0;
            position: absolute;
            user-select: none;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            .groupicon {
                display: block;
                width: 38px;
                height: 100%;
                margin-right: 12px;
                .material-icons {
                    cursor: pointer;
                    font-size: 24px;
                    color: #606266;
                    line-height: 72px;        
                };
            };
        };
    };
    .el-main {
        width: 100%;
        height: 100%;
        .tab-btn-box {
            padding-top: 15px;
        }
        .btnActive {
            color: #409eff;
            background: #ecf5ff;
            border-color: #b3d8ff;
        }
        .content {
            height: inherit;
            background-color: #FFFFFF;
            .el-row > .el-col {
                margin-top: 38px;
                .el-form-item {
                    margin: 25px auto;
                    .avatar-uploader {
                        .el-upload {
                            border: 1px dashed #d9d9d9;
                            border-radius: 6px;
                            cursor: pointer;
                            position: relative;
                            overflow: hidden;
                        };
                        .el-upload:hover {
                            border-color: #409EFF;
                        };
                    };
                    .avatar-uploader-icon {
                        font-size: 28px;
                        color: #8c939d;
                        width: 146px;
                        height: 146px;
                        line-height: 146px;
                        text-align: center;
                    };
                    .avatar {
                        width: 146px;
                        height: 146px;
                        display: block;
                    };
                };
                .el-form-item.locate > .el-form-item__content {
                    display: table-cell;
                    .el-input-number--small {
                        width: 150px;
                        margin-right: 8px;
                    };
                    .depict {
                        font-size: 12px;
                        color: #8e7c7c;
                        display: contents;
                    };
                };
            };
        };
    };
};
</style>

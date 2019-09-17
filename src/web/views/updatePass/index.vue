<template>
    <div id="updatePass">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button
                                icon="el-icon-arrow-left"
                                type="text"
                                @click="$router.push('/configuration')">返回
                        </el-button>
                    </div>
                    <el-card>
                        <div class="item">
                            <p>账号：</p>{{account}}
                            <!--<el-button class="code" plain size="small" @click="getCode" type="primary" :disabled="disabled">{{ codeBtn }}</el-button>-->
                        </div>
                        <!--<div class="item">-->
                            <!--<p>旧密码：</p>-->
                            <!--<el-input v-model="oldPass" type="password" placeholder="请输入旧密码"></el-input>-->
                        <!--</div>-->
                        <div class="item">
                            <p>新密码：</p>
                            <el-input v-model="newPass" type="password" placeholder="请输入新密码"></el-input>
                        </div>
                        <div class="item">
                            <p>确认密码：</p>
                            <el-input v-model="newPassReset" type="password" placeholder="请再次输入新密码"></el-input>
                        </div>
                        <el-button type="primary" @click="submit">确认</el-button>
                    </el-card>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Owner } from "@/web/module/owner";
    export default {
        name: "updatePass",
        data(){
            return{
                "loading": false,
                "account": '',
                "oldPass": '',//旧密码
                "newPass": '',//新密码
                "newPassReset": '',//确认新密码
                "code": '',//短信验证码
                "codeBtn": '获取验证码',//获取验证码btn
                "disabled": false,
                "time": 0,
            }
        },
        methods:{
            //获取验证码
            getCode:function(){
                this.time = 60;
                this.disabled=true;
                this.timer();
            },
            //封装一个函数，获取验证码部分：60s 或 重新发送
            timer:function (){
                if (this.time > 0) {
                    this.time --;
                    this.codeBtn = this.time+"s";
                    setTimeout(this.timer,1000);
                } else{
                    this.time = 0;
                    this.codeBtn = "获取验证码";
                    this.disabled = false;
                }
            },
            //提示信息
            open(text,title){
                this.$alert(text, title || '温馨提示', {
                    confirmButtonText: '知道了',
                });
            },
            //提交
            submit(){
                // if(this.oldPass==''){
                //     this.open('请输入旧密码');
                //     return false;
                // }
                if(this.newPass==''){
                    this.open('请输入新密码');
                    return false;
                }
                if(this.newPassReset==''){
                    this.open('请再次输入新密码');
                    return false;
                }
                if(this.newPass!==this.newPassReset){
                    this.open('新密码两次输入不一致');
                    return false;
                }
                // if(this.oldPass==this.newPass){
                //     this.open('新密码不能与旧密码一样');
                //     return false;
                // }
                var that = this,text = "修改密码";
                console.log("修改密码");
                that.$confirm("此操作将修改密码 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    var postData = {
                        "pwd": this.newPassReset,
                    };
                    Owner.logEdit(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "修改成功，请重新登录" });
                            this.$router.push('/')
                        }else {
                            that.$message({ center: true, type: "info", message: "修改失败" });
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            //首次登录，修改密码
            firstUpdatePassword(){
                if(this.newPass==''){
                    this.open('请输入新密码');
                    return false;
                }
                if(this.newPassReset==''){
                    this.open('请再次输入新密码');
                    return false;
                }
                if(this.newPassReset!==this.newPass){
                    this.open('新密码两次输入不一致');
                    return false;
                }
                var postData = {
                    "pwd": this.newPassReset,
                };
                Owner.logEdit(postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message({ center: true, type: "info", message: "修改成功，直接登录" });
                        this.$router.push('/configuration')
                    }else {
                        this.$message({ center: true, type: "info", message: "修改失败" });
                    }
                });
            },
        },
        mounted(){
            this.account = localStorage.accountPhone;
        }
    }
</script>

<style lang="scss" >
    #updatePass{
        width: 100%;
        height: 100%;
        color: #3E3E4D;
        .el-container {
            .el-main {
                .content {
                    height: 100%;
                    background: #fff;
                    padding: 20px;
                    .back {
                        text-align: left;
                        margin: 0 15px;
                        .el-button {
                            color: #3E3E4D;
                            font-size: 20px;
                        }
                    }
                    .el-card {
                        width: calc(100% - 50%);
                        .item {
                            width: 100%;
                            display: flex;
                            align-items: center;
                            margin: 20px 0;
                            p {
                                width: 120px;
                                text-align: right;
                                margin-right: 30px;
                            }
                            .el-input {
                                width: 300px;
                            }
                            input {
                                width: 300px;
                            }
                            .code {
                                min-width: 116px;
                                text-align: center;
                                height: 34px;
                                line-height: 34px;
                                border-radius: 10px;
                                font-size:20px;
                                padding: 0;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
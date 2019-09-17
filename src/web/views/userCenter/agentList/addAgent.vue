<!--
  - addAgent Vue
  - @JsName addAgent
  - @Description 升级执行服务商.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="addAgent">
        <el-container direction="vertical">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button
                                icon="el-icon-arrow-left"
                                type="text"
                                @click="$router.push('/userCenter/agentList')"
                        >返回</el-button>
                    </div>
                    <div class="inputBox">
                        <div class="demo-input-suffix">
                            <p>区域用户：</p>
                            <el-input
                                    placeholder="请输入手机号"
                                    v-model="user">
                            </el-input>
                            <el-button class="code" size="small" @click="getCode" type="primary" :disabled="disabled">{{ codeBtn }}</el-button>
                        </div>
                        <div class="demo-input-suffix">
                            <p>验证码：</p>
                            <el-input
                                    placeholder="请填写验证码"
                                    v-model="code">
                            </el-input>
                            <el-button class="code" size="small" @click="confirmUpgrade" type="primary" :disabled="disabled"> 确认升级 </el-button>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    export default {
        name: "addAgent",
        data() {
            return{
                user: '',//区域用户手机号
                code: '',//短信验证码
                codeBtn: '获取验证码',//获取验证码btn
                disabled: false,
                time: 0,
            }
        },
        methods:{
            //获取验证码
            getCode:function(){
                this.time = 60;
                this.disabled=true;
                this.timer();
                // let postData = {
                //     "mobile": this.phone,
                //     "deviceType": '3',
                //     "timestamp": this.timestamp,
                // };
                // console.log(postData);
                // this.axios.post('/api/user/smsCodeH5',postData).then(res=>{
                //     console.log(res);
                //     if(res.data.code==200){
                //         Toast('发送成功');
                //         this.code = res.data.data;
                //     }else {
                //         Toast(res.data.message);
                //     }
                // });
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
            //确认升级
            confirmUpgrade(){
                if(this.user==''){
                    this.open('请输入手机号');
                    return false;
                }
                if(!reg.test(this.user)){
                    this.open('请输入正确的手机号');
                    return false;
                }
                if(this.code==''){
                    this.open('请输入验证码');
                    return false;
                }
                console.log('确认升级');

            }
        }
    }
</script>

<style lang="scss">
#addAgent {
    width: 100%;
    height: 100%;
    color: #3E3E4D;
    .el-container {
        .el-main {
            .content {
                width: 100%;
                height: 100%;
                background: #fff;
                padding: 15px;
                .back {
                    text-align: left;
                    .el-button {
                        font-size: 20px;
                        color: #3E3E4D;
                    }
                }
                .inputBox {
                    padding: 48px 65px;
                    .demo-input-suffix {
                        font-size: 26px;
                        color: #262626;
                        display: flex;
                        align-items: center;
                        margin-bottom: 40px;
                        p {
                            width: 132px;
                            text-align: left;
                        }
                        .el-input {
                            width: 274px;
                        }
                        .code {
                            min-width: 132px;
                            margin-left: 28px;
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
}
</style>
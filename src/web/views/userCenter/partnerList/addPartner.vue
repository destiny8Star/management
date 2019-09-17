<!--
  - addPartner Vue
  - @JsName addPartner
  - @Description 升级城市合伙人视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="addPartner">
        <el-container direction="vertical">
            <el-main>
                <div class="content">
                    <div class="back">
                        <el-button
                                icon="el-icon-arrow-left"
                                type="text"
                                @click="$router.push('/userCenter/partnerList')"
                        >返回
                        </el-button>
                    </div>
                    <div class="btnBox">
                        <el-button
                                :class="{act:btnIndex==index+1}"
                                plain
                                v-for="(btn,index) in btnList"
                                :key="index"
                                @click="getDataClick(index)">
                            {{ btn.text }}
                            <img v-if="btnIndex==index+1" src="../../../../assets/dui@2x.png" alt="">
                        </el-button>
                    </div>
                    <div class="inputBox">
                        <div class="demo-input-suffix">
                            <p>选择区域：</p>
                            <el-cascader
                                    :options="btnIndex==1?options:cityOptions"
                                    v-model="selectedOptions"
                                    @change="handleChange"
                                    :separator="' '"
                            >
                            </el-cascader>
                        </div>
                        <div class="demo-input-suffix" v-for="(ele,i) in inputList" :key="i">
                            <p>{{ele.text}}：</p>
                            <el-input
                                    :placeholder="ele.hintText"
                                    v-model="$data[ele.modelVal]"
                                    :class="{act:ele.id==1}">
                            </el-input>
                            <el-button v-if="ele.id==1" class="code" size="small" @click="getCode" type="primary"
                                       :disabled="disabled">{{ codeBtn }}
                            </el-button>
                        </div>
                        <div class="demo-input-suffix demo-input-suffix-last">
                            <p class="updateText"><!--<strong>*</strong>-->上传打款截图：</p>
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
                        <el-button type="primary" class="confirm" @click="confirmUpgrade">提交审核</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import cityOptions from '@/assets/js/country-data'
    import options from '@/assets/js/country-level3-data'
    import {UserCenter, Common, Tags} from "@/web/module/lending";

    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    export default {
        name: "addPartner",
        data() {
            const that = this;
            return {
                btnIndex: '1',//【等同于postData里面的status】
                "btnList": [
                    {id: 1, text: '升级区域服务商'},
                    {id: 2, text: '升级城市服务商'}
                ],
                selectedOptions: [],//存放默认值
                options: options,   //存放城市数据
                cityOptions: cityOptions,   //存放市级城市数据
                codeBtn: '获取验证码',//获取验证码btn
                disabled: false,
                time: 0,
                user: '',//区域用户手机号
                code: '',//短信验证码
                name: '',//服务商姓名
                cardId: '',//身份证号
                depositCard: '',//储蓄卡
                bankName: '',//储蓄卡名称
                phone: '',//手机号
                amount: '',//缴费金额
                invitePhone: '',//邀请人手机号
                operator: '',//业务员人员姓名
                inputList: [
                    {id: 1, text: '区域用户', hintText: '请输入手机号', modelVal: 'user'},
                    {id: 2, text: '验证码', hintText: '请输入验证码', modelVal: 'code'},
                    {id: 3, text: '姓名', hintText: '请输入服务商姓名', modelVal: 'name'},
                    {id: 4, text: '身份证', hintText: '请填写身份证号', modelVal: 'cardId'},
                    {id: 5, text: '储蓄卡名称', hintText: '请填写储蓄卡名称', modelVal: 'bankName'},
                    {id: 6, text: '储蓄卡', hintText: '请填写储蓄卡号', modelVal: 'depositCard'},
                    {id: 7, text: '手机号', hintText: '请填写银行预留手机号', modelVal: 'phone'},
                    {id: 8, text: '缴费金额', hintText: '请填写缴费金额', modelVal: 'amount'},
                    {id: 9, text: '推荐人', hintText: '请填写推荐服务商账户手机号，可不填', modelVal: 'invitePhone'},
                    {id: 10, text: '业务人员', hintText: '请填写业务人员姓名', modelVal: 'operator'},
                ],
                updateImg: [],//上传的图片
            }
        },
        methods: {
            // 选择区域
            handleChange(value) {
                console.log(value);
                console.log(this.selectedOptions);
            },
            //获取验证码
            getCode: function () {
                if (this.user == '') {
                    this.alertBox('请输入区域用户');
                    return false;
                }
                this.time = 60;
                this.disabled = true;
                this.timer();
                // console.log(postData);
                Common.sendCode({"mobile": this.user}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message('发送成功');
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message('请重新登录');
                    } else {
                        this.$message('发送失败'+res.message);
                    }
                });
            },
            //封装一个函数，获取验证码部分：60s 或 重新发送
            timer: function () {
                if (this.time > 0) {
                    this.time--;
                    this.codeBtn = this.time + "s";
                    setTimeout(this.timer, 1000);
                } else {
                    this.time = 0;
                    this.codeBtn = "获取验证码";
                    this.disabled = false;
                }
            },
            //提示信息
            alertBox(text, title) {
                this.$alert(text, title || '温馨提示', {
                    confirmButtonText: '知道了',
                    callback: action => {
                        // this.$message({
                        //     // type: 'info',
                        //     message: ''
                        // });
                    }
                })
            },
            confirmBox(text, title) {
                this.$confirm('确认成为' + text + '服务商', title || '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var postData = {
                        "amount": this.amount,
                        "area": this.selectedOptions[2],
                        "bankMobile": this.phone,
                        "bankName": this.bankName,
                        "bankNo": this.depositCard,
                        "cardNo": this.cardId,
                        "city": this.selectedOptions[1],
                        "code": this.code,
                        "invateMobile": this.invitePhone,
                        "mobile": this.user,
                        "name": this.name,
                        "operator": this.operator,
                        "pic": this.updateImg[0].url,
                        "province": this.selectedOptions[0],
                        "type": this.btnIndex
                    };
                    console.log('确认升级');
                    UserCenter.addPartner(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '提交成功，可继续添加'
                            });
                            this.clearData();

                        }else {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消升级城市合伙人'
                    });
                });
            },
            /**
             * 清空表单
             */
            clearData() {
                this.amount = '';
                this.selectedOptions = [];
                this.phone = '';
                this.bankName = '';
                this.depositCard = '';
                this.cardId = '';
                this.code = '';
                this.invitePhone = '';
                this.user = '';
                this.name = '';
                this.operator = '';
                this.updateImg = [];
            },
            //提交审核
            confirmUpgrade() {
                if (this.selectedOptions.length == 0) {
                    this.alertBox('请选择区域');
                    return false;
                }
                if (this.user == '') {
                    this.alertBox('请填写区域用户');
                    return false;
                }
                if (!reg.test(this.user)) {
                    this.alertBox('请填写正确的区域用户');
                    return false;
                }
                if (this.code == '') {
                    this.alertBox('请输入验证码');
                    return false;
                }
                if (this.name == '') {
                    this.alertBox('请填写服务商姓名');
                    return false;
                }
                if (this.cardId == '') {
                    this.alertBox('请输入身份证号');
                    return false;
                }
                if (this.bankName == '') {
                    this.alertBox('请输入储蓄卡名称');
                    return false;
                }
                if (this.depositCard == '') {
                    this.alertBox('请输入储蓄卡号');
                    return false;
                }
                if (this.phone == '') {
                    this.alertBox('请输入银行预留手机号');
                    return false;
                }
                if (!reg.test(this.phone)) {
                    this.alertBox('请填写正确的银行预留手机号');
                    return false;
                }
                if (this.amount == '') {
                    this.alertBox('请填写缴费金额');
                    return false;
                }
                if (this.operator == '') {
                    this.alertBox('请填写业务人员姓名');
                    return false;
                }
                if (this.invitePhone) {
                    if (!reg.test(this.invitePhone)) {
                        this.alertBox('请填写正确的推荐人手机号');
                        return false;
                    }
                }
                if (this.updateImg.length == 0) {
                    this.alertBox('请上传打款截图');
                    return false;
                }
                if (this.btnIndex == 1) {
                    this.confirmBox(this.selectedOptions[0] + this.selectedOptions[1] + this.selectedOptions[2], '提示', '已取消');
                } else if (this.btnIndex == 2) {
                    this.confirmBox(this.selectedOptions[0] + this.selectedOptions[1], '提示', '已取消');
                    this.selectedOptions[2] = '';
                }

            },
            // 选择按钮
            getDataClick(i) {
                const that = this;
                if (i == 0) {
                    that.btnIndex = i + 1;
                    console.log('区域服务商');
                }
                if (i == 1) {
                    that.btnIndex = i + 1;
                    console.log('城市服务商');
                }
            },
            /**
             * 图上传成功
             */
            imgWin(response, file, fileList) {
                console.log(response, file, fileList)
                if (response) {
                    if (response.code == 200) {
                        this.updateImg.push({url: response.data});
                        console.log(this.updateImg);
                    } else if (response.code == 100070) {
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    } else {
                        this.$message({center: true, type: "warning", message: response.message});
                    }
                }

            },
            /**
             * 图上传失败
             */
            imgFail(err, file, fileList) {
                console.log(err, file, fileList);
                this.$message.warning(err.message);
            },
            // 图删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateImg = [];
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除该图片？`);
                // return this.$confirm(`确定移除 ${ file.name }？`);
            }
        },
        mounted() {
            this.btnIndex = 1;
        }
    }
</script>

<style lang="scss">
    #addPartner {
        width: 100%;
        /*height: 100%;*/
        color: #3E3E4D;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    /*height: 100%;*/
                    background: #fff;
                    padding: 15px;
                    .back {
                        text-align: left;
                        .el-button {
                            font-size: 20px;
                            color: #3E3E4D;
                        }
                    }
                    .btnBox {
                        height: 102px;
                        display: flex;
                        align-items: center;
                        padding-left: 63px;
                        .el-button.act {
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                        }
                        .el-button {
                            width: 204px;
                            height: 57px;
                            border-radius: 5px;
                            font-size: 24px;
                            margin-right: 93px;
                            position: relative;
                            img {
                                width: 23px;
                                height: 22px;
                                position: absolute;
                                right: 0;
                                top: 0;
                            }
                        }
                    }
                    .inputBox {
                        width: auto;
                        padding: 28px 85px;
                        text-align: left;
                        .demo-input-suffix {
                            font-size: 26px;
                            color: #262626;
                            display: flex;
                            align-items: center;
                            margin-bottom: 16px;
                            p {
                                width: 162px;
                                text-align: justify;
                                text-align-last: justify;
                                margin-right: 50px;
                            }
                            .updateText {
                                width: 182px;
                                margin-right: 0;
                            }
                            .el-input {
                                width: 340px;
                            }
                            .el-input.act {
                                width: 220px;
                            }
                            .code {
                                width: 112px;
                                margin-left: 8px;
                                font-size: 20px;
                                padding: 9px 6px;
                            }
                            .btn {
                                display: flex;
                            }
                        }
                        .demo-input-suffix-last {
                            display: flex;
                            align-items: flex-start;
                        }
                        .confirm {
                            width: 369px;
                            height: 52px;
                            margin: 22px 0 0 44px;
                            font-size: 20px;
                        }
                    }
                }
            }
        }
    }
</style>
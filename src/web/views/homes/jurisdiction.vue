<!--
  - logistics Vue
  - @JsName index
  - @Description 物流管理视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="jurisdiction">
        <el-container direction="horizontal" v-loading="loading">
            <el-main>
                <div class="content">
                    <!--<div class="back">-->
                        <!--<el-button-->
                                <!--icon="el-icon-arrow-left"-->
                                <!--type="text"-->
                        <!--&gt;返回</el-button>-->
                    <!--</div>-->
                    <div class="chooseBox">
                        <div class="item" v-if="edit===false">
                            <p>账户级别</p>
                            <div>
                                <el-radio v-show="accountType=='1'" v-model="radio" label="2">超级管理员</el-radio>
                                <el-radio v-model="radio" label="3">查看者</el-radio>
                            </div>
                        </div>
                        <div class="inputBox" v-if="edit===false">
                            <div class="items">
                                <p>新增账户：</p>
                                <el-input
                                        placeholder="请输入新增账户"
                                        v-model="account"
                                        clearable>
                                </el-input>
                            </div>
                            <div class="items">
                                <p>密码：</p>
                                <el-input
                                        placeholder="请输入密码"
                                        type="password"
                                        v-model="password"
                                        clearable>
                                </el-input>
                            </div>
                        </div>

                        <div class="item" v-for="(ele,i) in dataLists" :key="i">
                            <p>{{ele.label}}</p>
                            <el-checkbox :disabled="showSelect && val.label=='账户管理'||showSelect && val.label=='新增账户权限'||showSelect && val.label=='服务商审核'||showSelect && val.label=='开通服务商列表'" @change="change" v-model="val.flag" :label="val.id" v-for="(val,k) in ele.children" :key="k">{{val.label}}</el-checkbox>
                        </div>
                        <div class="confirm">
                            <el-button type="primary" @keyup.13="confirm" @click="confirm">确定</el-button>
                        </div>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Owner } from "@/web/module/owner";
    import { Tags } from "@/web/module/lending";
    var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;//手机号正则验证
    var map = {"admin": '1', "超级管理员": "2", "查看者": '3'};
    export default {
        name: "jurisdiction",
        data() {
            return {
                "accountType": '',//账号身份级别
                "account": '',//新增账户
                "password": '',//密码
                "radio": '3',//单选
                "loading": false,
                "userId": '',//被编辑的账户的id
                chooseList: [],
                dataLists: [],
                "edit": false,//判断输入框是否显示【从编辑入口为true】
                "userType": '',//被编辑者的等级
            }
        },
        computed:{
            //是否可选择 【新增用户权限 或 账户管理】
            showSelect(){
                if(this.radio==3){
                    return true;
                }else {
                    return false;
                }
            }
        },
        methods: {
            /**
             *
             *
             */
            change() {
                console.log(this.dataLists);
            },
            /**
             * 初始化标签
             */
            initData() {
                const that = this;
                that.loading = false;
            },
            // 确认
            confirm() {
                let list = JSON.parse(JSON.stringify(this.dataLists));
                console.log(list);
                if(!this.edit) {
                    list.forEach((ele) => {
                        ele.children = ele.children.filter((val) => {
                            return val.flag === true
                        })
                    });
                    list = list.filter((ele) => {
                        return ele.children.length != 0
                    });
                    if (this.radio == '') {
                        this.open('请选择账号级别');
                        return false;
                    }
                    if (this.account == '') {
                        this.open('请输入账号');
                        return false;
                    }
                    if (!reg.test(this.account)) {
                        this.open('请输入正确的手机账号');
                        return false;
                    }
                    if (this.password == '') {
                        this.open('请输入密码');
                        return false;
                    }
                }
                if (list.length == 0) {
                    this.open('请至少选择一项权限');
                    return false;
                }
                //编辑时确认
                if(this.edit){
                    let postData1 = {
                        "accountViewReqList": list,
                        "userId": this.userId,
                    };
                    console.log(postData1);
                    Owner.editAccount(postData1).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('编辑账户成功');
                            this.$router.push('/homes/accountManage')
                        } else {
                            this.$message(res.message);
                        }
                    })
                }else {
                    //新增时确认
                    let postData = {
                        "accountViewReqList": list,
                        "mobile": this.account,
                        "password": this.password,
                        "type": this.radio
                    };
                    Owner.addAccount(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('新增账户成功');
                            this.$router.push('/homes/accountManage')
                        } else {
                            this.$message(res.message);
                        }
                    })
                }

            },

            /**
             * 分页跳转
             */
            jumpPagination(val) {
                const that = this;
                that.loading = true;
                that.param.page = val;
                // 加载数据
                that.initData();
            },
            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: `action: ${ action }`
                        });
                    }
                });
            },
        },
        beforeCreate() {
        },
        beforeMount() {
            const that = this, {page} = that.$route.params;
            // 初始化标签
            that.initData();
        },
        mounted() {
            if(this.$route.query.userId!=undefined||''){
                this.edit = true;
                this.userId = this.$route.query.userId;
                this.radio = map[this.$route.query.userType];
                var getData = {
                    "userId": this.userId
                };
                Owner.accountInfo(getData).then(res=>{
                    console.log(res);
                    this.dataLists = res.data;
                })
            }else {
                Owner.sideList().then(res => {
                    console.log(res);
                    this.dataLists = res.data;
                    console.log(this.dataLists)
                });
            }
            this.accountType = localStorage.accountType;
        },
        beforeRouteEnter (to, from, next) {
            next((vm)=>{
                if(from.path=='/homes/accountManage'){
                    // vm.edit = true;
                }
            })
        },
    }
</script>

<style lang="scss">
    #jurisdiction {
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                padding: 15px;
                .content {
                    width: 100%;
                    padding: 15px;
                    background: #fff;
                    position: relative;
                    .back {
                        text-align: left;
                        .el-button {
                            font-size: 20px;
                            color: #3E3E4D;
                        }
                    }
                    .chooseBox {
                        padding: 20px 35px 0;
                        .item {
                            text-align: left;
                            p {
                                font-size: 26px;
                            }
                            .el-checkbox {
                                .el-checkbox__label {
                                    font-size: 22px;
                                    line-height: 64px;
                                }
                            }
                            div {
                                padding-left: 30px;
                                display: flex;
                                align-items: center;
                                justify-content: left;
                                .el-radio__label {
                                    font-size: 22px;
                                    line-height: 64px;
                                    text-align: left;
                                }
                            }
                        }
                        .inputBox {
                            display: flex;
                            align-items: center;
                            margin: 10px 0 20px;
                            .items {
                                display: flex;
                                align-items: center;
                                margin-right: 90px;
                                p {
                                    width: 200px;
                                    text-align: left;
                                    font-size: 26px;
                                }
                            }
                        }
                        .confirm {
                            text-align: left;
                            margin: 30px;
                            .el-button {
                                width: 180px;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
<!--
  - addition Vue
  - @JsName addition
  - @Description 头部
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->  
<template>
    <el-header>
        <div id="sign">
            <span class="signtext">| {{$route.meta.title}}</span>
        </div>
        <div id="group">
            <el-menu mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title">{{ accountPhone}}，欢迎您登录商户管理后台</template>
                    <el-menu-item index="1-1" @click="$router.push('/updatePass')">修改密码</el-menu-item>
                    <el-menu-item index="1-2" @click="logOut">退出账号</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </el-header>
</template>

<!-- 视图 Js 脚本 -->  
<script>
import { Service } from "@/web/request";
import { Tags } from "@/web/module/lending";
import { Owner } from "@/web/module/owner";
export default {
    name: "tags-addition",
    components: {
    },
    data () {
        return {
            "headers": {
                "Token": localStorage.getItem("$Key") ? localStorage.getItem("$Key") : "",
            },
            "loading": false,
            "isSubmit": false,
            "data": {
                accountPhone: ''

    },
        }
    },
    methods: {
        /**
         * 重置表单
         */
        reset (formName) {
            const that = this;
            that.$refs[formName].resetFields();
            that.data.icon = "";
        },
        /**
         * 退出账号
         */
        logOut(){
            var that = this,text = "退出账号";
            console.log("退出登录");
            that.$confirm("此操作将退出账号 , 是否继续 ?", "提示", {
                "confirmButtonText": "确定",
                "cancelButtonText": "取消",
                "type": "warning",
            }).then(() => {
                Owner.logOut().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        that.$message({ center: true, type: "info", message: "退出成功" });
                        localStorage.clear();
                        this.$router.push('/')
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        that.$message({ center: true, type: "info", message: res.message+"退出失败" });
                    }
                });
            }).catch(() => {
                that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
            });
        },
        /**
         * 关闭
         * -- 返回指定页面
         */
        close () {
            const that = this;
            that.$router.push({ "path": "/tags" });
        },
        handleSelect (key, keyPath){
            console.log(key, keyPath)
        }

    },
    beforeCreate () {
        this.accountPhone = localStorage.accountPhone;
    },
    beforeMount () {
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
.el-header {
    padding: 0 22px;
    height: 66px !important;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 2px #e6dfdf;
    display: flex;
    justify-content: space-between;
    align-items:center;
    #sign {
        font-size: 24px;
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
    };
    #group {
        .el-submenu__title, .el-menu--horizontal {
            font-size: 20px;
            border-bottom: 0 !important;
        };

        .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
            border-bottom: 0 !important;
        }
    };
};


</style>

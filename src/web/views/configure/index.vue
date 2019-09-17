<!--
  - configuration Vue
  - @JsName configuration
  - @Description 配置视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="configuration">
        <!--<img src="../../../assets/img/views/configure/comingBg.jpg" alt="">-->
        <div class="content">
            <h1>欢迎来到点击生活商户管理后台</h1>
            <img src="../../../assets/img/views/configure/TP@2x.png" alt="">
        </div>

    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import { Configure } from "@/web/module/configure";
    export default {
        name: "backend-configuration",
        components: {
        },
        data () {
            return {

            }
        },
        methods:{

        },
        beforeCreate () {
        },
        beforeMount () {

        },
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #configuration {
        width: 100%;
        height: 100%;
        padding: 20px;
        .content {
            width: 100%;
            height: 100%;
            background: #fff;
            padding-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            h1{
                height: 75px;
                font-size: 80px;
                font-weight: 600;
                color: rgba(62,62,77,1);
            }
            img {
                width: 65%;
                height: 78%;
            }
        }
    }
</style>

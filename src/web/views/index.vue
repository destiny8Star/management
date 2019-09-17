<!--
  - index Vue
  - @JsName index
  - @Description 首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="backend">
        <el-container direction="horizontal">
            <!-- 菜单 -->
            <el-aside id="asidemenu">
                <div id="login">
                    <img class="logo" :src="logoImg ? logoImg : logoImgs" alt="">
                    <p>{{shopName!='undefined' ? shopName : ' '}}</p>
                </div>
                <div class="menu-box">
                    <!--侧导航【el-menu写法】-->
                    <!--后台管理开始-->
                    <el-menu
                            v-if="grade=='1'"
                            :default-active="navBgOne"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#282B33"
                            text-color="#fff"
                            align="left"
                            :unique-opened="uniqueOpened"
                            active-text-color="#fff">
                        <el-submenu
                                :class="{noData:ele.children.length==0}"
                                :index="ele.indexValue"
                                v-for="(ele,i) in sideList"
                                :key="i">
                            <template slot="title">
                                <!--<img :src="ele.icon" alt="">-->
                                <span>{{ ele.label }}</span>
                            </template>
                            <el-menu-item-group v-if="ele.children.length!=0">
                                <el-menu-item
                                        :index="son.indexValue"
                                        :class="{isActive:son.indexValue==navBg}"
                                        v-for="(son,k) in ele.children"
                                        :key="k"
                                        @click="jumpPage(son)">
                                    <!--<img :src="son.icon" alt="">-->
                                    <span>{{ son.label }}</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                    <!--后台管理结束-->

                </div>
            </el-aside>
            <el-container direction="vertical">
                <Head/>
                <!-- 内容 -->
                <el-main id="views">
                    <transition>
                        <router-view v-if="routerAlive"></router-view>
                    </transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import Head from "@/web/views/components/head";
    import {Owner} from "@/web/module/owner";

    export default {
        name: 'backend',
        components: {
            Head
        },
        data() {
            return {
                logoImg: require('../../assets/img/views/nav/logo.png'),
                logoImgs: require('../../assets/img/views/nav/logo.png'),
                shopName: '',
                navBg: '',//二级
                navBgOne: '',//一级
                houtai: 'houtai',
                baseUrl: process.env.BASE_URL,
                grade: '1',//区分身份进入后台【1：后台管理；2：一级代理；3：地级代理】
                uniqueOpened: true,//是否只保持一个子菜单的展开
                routerAlive: true,
                // sideList: [],
                //后台管理-侧导航
                sideList: [
                    {
                        id: 1,
                        indexValue: '1',
                        icon: require('../../assets/img/views/nav/shangcheng.png'),
                        iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                        label: '线上商城',
                        children: [
                            {
                                indexValue: '1-1',
                                icon: require('../../assets/img/views/nav/shangcheng.png'),
                                iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                                label: '商城统计',
                                menuLink: '/goods/statistics'
                            },
                            {
                                indexValue: '1-2',
                                icon: require('../../assets/img/views/nav/shangcheng.png'),
                                iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                                label: '商品管理',
                                menuLink: '/goods'
                            }
                        ]
                    },
                    {
                        id: 2,
                        indexValue: '2',
                        icon: require('../../assets/img/views/nav/shangcheng.png'),
                        iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                        label: '订单管理',
                        children: [
                            {
                                indexValue: '2-1',
                                icon: require('../../assets/img/views/nav/wuliu.png'),
                                iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                                label: '订单列表',
                                menuLink: '/order/orderList'
                            },
                            // {
                            //     indexValue: '2-2',
                            //     icon: require('../../assets/img/views/nav/wuliu.png'),
                            //     iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                            //     label: '物流管理',
                            //     menuLink: '/order/logistics'
                            // }
                        ]
                    },
                    {
                        id: 3,
                        indexValue: '3',
                        icon: require('../../assets/img/views/nav/shangcheng.png'),
                        iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                        label: '商品规格',
                        children: [
                            {
                                indexValue: '3-1',
                                icon: require('../../assets/img/views/nav/wuliu.png'),
                                iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                                label: '规格模板',
                                menuLink: '/SKU/SKUList'
                            }
                        ]
                    },
                    {
                        id: 4,
                        indexValue: '4',
                        icon: require('../../assets/img/views/nav/shangcheng.png'),
                        iconSelected: require('../../assets/img/views/nav/shangcheng.png'),
                        label: '收款明细',
                        children: [
                            {
                                indexValue: '4-1',
                                icon: require('../../assets/img/views/nav/wuliu.png'),
                                iconSelected: require('../../assets/img/views/nav/wuliu.png'),
                                label: '刷脸收款明细',
                                menuLink: '/face/faceOrder'
                            }
                        ]
                    },
                ],
            }

        },
        computed: {
            fullUrl: function () {
                // `this` 指向 vm 实例
                return `${this.baseUrl}img/views/nav/${this.houtai}.png`;
            }
        },
        provide() {    //在父组件中创建属性
            return {
                routerRefresh: this.routerRefresh
            }
        },
        methods: {
            jumpPage(val) {
                const that = this;
                this.navBg = val.indexValue;
                that.$router.push(val.menuLink);
            },
            fetchData() {
                console.log('路由发送变化doing...');
                this.isAct();
            },
            routerRefresh() {
                this.routerAlive = false;
                this.$nextTick(() => {
                    this.routerAlive = true;
                });
            },
            /**
             * 判断当前所在模块，添加背景色
             * @param key
             * @param keyPath
             */
            isAct() {
                this.sideList.forEach(ele => {
                    ele.children.forEach(val => {
                        if (val.menuLink == this.$route.path) {
                            this.navBg = val.indexValue;
                            this.navBgOne = val.indexValue.substr(0, 1);
                        }
                    });
                });
            },
            //侧导航 打开 - 关闭
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
                console.log('打开');
                this.navBg = key;
                this.isAct();
                // this.jumpPage(this.sideList[key - 1].menuLink);
            },
            handleClose(key) {
                // this.jumpPage(this.sideList[key - 1].menuLink);
                console.log("关闭");
                this.isAct();
            },
        },
        beforeCreate() {
        },
        beforeMount() {
            this.isAct();
            this.shopName = localStorage.accountName;
            this.logoImg = localStorage.accountImg;
        },
        watch: {
            '$route': 'fetchData'
        }


    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #backend {
        width: 100%;
        height: 100%;
        .el-container {
            width: 100%;
            height: 100%;
            #asidemenu {
                width: 230px !important;
                background: linear-gradient(0deg, rgba(40, 43, 51, 1) 0%, rgba(40, 43, 51, 1) 100%);
                /*font-size: 26px;*/
                text-align: center;
                user-select: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                #login {
                    margin: 50px auto;
                    .logo {
                        width: 116px;
                        height: 116px;
                        border-radius: 26px;

                    }
                    p {
                        margin: 20px 0;
                        padding: 0 16px;
                        color: #fff;
                        font-weight: bold;
                        font-size: 28px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }
                .menu-box {
                    /*  el-menu开始  */
                    .el-menu-vertical-demo {
                        .el-submenu.titleActive {
                            .el-submenu__title {
                                background-color: #3383FF !important;
                                color: #fff !important;
                            }
                        }
                        .el-submenu {
                            .el-submenu__title {
                                height: 60px !important;
                                line-height: 60px !important;
                                padding: 0 20px 0 24px !important;
                            }
                            .el-menu-item {
                                height: 60px;
                                line-height: 60px;
                                padding: 0 20px 0 64px !important;
                            }
                            img {
                                width: 30px;
                                height: 28px;
                                margin-right: 16px;
                            }
                            span {
                                color: #CBCDD6;
                                font-size: 24px;
                            }
                            .el-menu-item-group {
                                .el-menu-item {
                                    span {
                                        font-size: 20px;
                                    }
                                }
                            }
                        }
                        .el-submenu.noData {
                            .el-submenu__title {
                                i {
                                    display: none !important;
                                }
                            }
                        }
                        .el-submenu.other {
                            .el-submenu__title {
                                padding: 0 20px !important;
                            }
                            .el-menu-item {
                                padding: 0 20px 0 74px !important;
                            }
                        }
                        .isActive {
                            background-color: #3383FF !important;
                            color: #fff !important;
                        }
                    }
                    /*  el-menu结束  */
                }
            }
            .el-container {
                #views {
                    width: 100%;
                    height: 100%;
                    background-color: #F5F5F5;
                    padding: 0;
                    text-align: center;
                }
            }
        }
    }


</style>

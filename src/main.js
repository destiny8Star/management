/**
 * main Js
 * @JsName main
 * @Description Vue 程序入口
 * @DateTime 2019-03-13 20:39:22
 * @author Finn
 */
import Vue from "vue";
import Vuex from "vuex";
import store from './store'
import VueRouter from "vue-router";
import Axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import FastClick from "fastclick";
import VueWechatTitle from "vue-wechat-title";
import MainView from "@/main.vue";
import Router from "@/router";
import "es6-promise/auto";
import "@/assets/css/reset.css";
import "element-ui/lib/theme-chalk/index.css";
import "material-design-icons/iconfont/material-icons.css";
import 'lib-flexible';//引入用来适屏
import  VueQuillEditor from 'vue-quill-editor';

Vue.use(VueQuillEditor);


/**
 * 关闭生产模式下给出的提示
 */
Vue.config.productionTip = false;

/**
 * FastClick :: 处理移动端点击事件 300ms 延迟问题
 */
FastClick.attach(document.body);

/**
 * 注册 Vuex 插件
 */
Vue.use(Vuex);

/**
 * 注册 VueRouter 插件
 */
Vue.use(VueRouter);

/**
 * 注册 VueAxios , Axios 插件
 */
Vue.use(VueAxios, Axios);

/**
 * 注册 ElementUI 插件
 */
Vue.use(ElementUI);

/**
 * 注册 VueWechatTitle 插件
 */
Vue.use(VueWechatTitle);

/**
 * 注册一个全局前置导航守卫
 */
Router.beforeEach((to, from, next) => {
    // 判断是否匹配到路由 ? 如果未匹配 , 匹配上级 , 上级也未匹配到则跳转登录页面 : 如果匹配到则正确跳转
    to.matched.length === 0 ? (from.name ? next({ name: from.name }) : next("/")) : next();
});

/**
 * 创建和挂载根实例
 */
new Vue({
    router: Router,
    store: store,
    vuex: Vuex,
    render: target => target(MainView),
}).$mount("#app");
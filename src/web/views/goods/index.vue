<!--
  - goods Vue
  - @JsName index
  - @Description 产品视图.
  - @DateTime 2019-03-13 20:39:22
  - @author DLY
  -->
<!-- 视图 -->
<template>
    <div id="goods">
        <el-container  v-loading="loading">
            <div class="content">
                <div class="top-btn-box">
                    <div class="btnBox">
                        <el-button
                                :class="{act:btnIndex==index}"
                                plain
                                v-for="(btn,index) in btnList"
                                :key="index"
                                @click="getDataClick(index)">
                            {{ btn.text }}({{btn.num}}件)
                            <img v-if="btnIndex==index" src="../../../assets/dui@2x.png" alt="">
                        </el-button>
                    </div>
                    <el-button type="primary" @click="addition()">添加商品</el-button>
                </div>

                <div class="screen-box">
                    <div class="row">
                        <div class="inquire">
                            <!--<span>搜索类型：</span>-->
                            <el-select clearable v-model="postData.searchType" placeholder="请选择搜索类型">
                                <el-option
                                        v-for="item in inputOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                            <i>-</i>
                            <el-input style="width: 390px" v-model="postData.searchText" placeholder="商品名称/商品货号"></el-input>
                            <el-button type="primary" @click="search" size="small">查询</el-button>
                        </div>
                        <!--  ==== 后期完善 start ====  -->
                        <!--<div class="select-box">-->
                            <!--<span>发货地区：</span>-->
                            <!--<el-cascader-->
                                    <!--:options="options"-->
                                    <!--v-model="selectedOptions"-->
                                    <!--@change="handleChange"-->
                                    <!--:separator="' '"-->
                                    <!--placeholder="请选择省市区"-->
                                    <!--clearable-->
                                    <!--change-on-select-->
                            <!--&gt;-->
                            <!--</el-cascader>-->
                            <!--<el-button @click="search" type="primary" size="small">筛选</el-button>-->
                        <!--</div>-->
                        <!--<div class="select-box">-->
                            <!--<span>活动标签：</span>-->
                            <!--<el-select-->
                                    <!--clearable-->
                                    <!--v-model="postData.activityId"-->
                                    <!--placeholder="请选择活动标签"-->
                                    <!--@change="choActiveTag">-->
                                <!--<el-option-->
                                        <!--v-for="item in activeTagList"-->
                                        <!--:key="item.id"-->
                                        <!--:label="item.text"-->
                                        <!--:value="item.id">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                            <!--<el-button @click="search" type="primary" size="small">筛选</el-button>-->
                        <!--</div>-->


                    <!--</div>-->
                    <!--<div class="row">-->


                        <!--  ==== 后期完善 end ====  -->
                        <div class="inquire">
                            <span>价格筛选：</span>
                            <el-input
                                    @blur="check(postData.minPrice,1)"
                                    type="number"
                                    style="width: 390px"
                                    v-model="postData.minPrice"
                                    placeholder="请输入最低价">
                            </el-input>
                            <i>-</i>
                            <el-input
                                    @blur="check(postData.maxPrice,0)"
                                    type="number"
                                    style="width: 390px"
                                    v-model="postData.maxPrice"
                                    placeholder="请输入最高价">
                            </el-input>
                            <el-button @click="search" type="primary" size="small">筛选</el-button>
                        </div>
                        <div class="select-box">
                            <span>商品分类：</span>
                            <el-cascader
                                    clearable
                                    v-loading="classLoading"
                                    :options="goodsTypeList"
                                    v-model="selectedGood"
                                    :props = "classifyProp"
                                    separator = "  "
                                    change-on-select
                                    @change="goodChange">
                            </el-cascader>
                            <el-button @click="search" type="primary" size="small">筛选</el-button>
                        </div>
                    </div>
                </div>
                <!-- 表格 -->
                <el-table
                        :header-cell-style="{background:'#fafafa'}"
                        :data="dataList"
                        stripe
                        border
                        style="width: 100%"
                        ref="table"
                        :height="tableHeight">
                    <!--height="calc(100% - 200px)">-->
                    <el-table-column :key="1" type="index" fixed width="80" label="编号">
                        <template slot-scope="scope">
                            {{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column :key="2" prop="goodsNo" label="商品货号">
                    </el-table-column>
                    <el-table-column :key="3" label="封面图片">
                        <template slot-scope="scope">
                            <img v-bind:src="scope.row.covers" onerror="" title="封面图片"/>
                        </template>
                    </el-table-column>
                    <el-table-column :key="4" prop="goodsTitle" label="商品主标题">
                    </el-table-column>
                    <el-table-column :key="5" prop="price" label="价格(元)">
                    </el-table-column>
                    <el-table-column :key="6" prop="stock" label="总库存(件)">
                    </el-table-column>
                    <el-table-column :key="7" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" v-show="postData.status==0" size="small" @click="editClick(scope.row,0)">编辑</el-button>
                            <el-button type="text" v-show="postData.status==0" style="color:red" size="small" @click="outClick(scope.row)">下架</el-button>
                            <el-button type="text" v-show="postData.status==1" size="small" @click="editClick(scope.row,1)">编辑</el-button>
                            <el-button type="text" v-show="postData.status==1" size="small" @click="putClick(scope.row)">上架</el-button>
                            <el-button type="text" v-show="postData.status==1" style="color:red" @click="removeClick(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--tab1e结束-->
                <!-- 分页器 -->
                <el-footer>
                    <div class="pagination">
                        <!--<div class="pageShow">-->
                        <!--本页显示：{{ pagination.show }}&nbsp;&nbsp;&nbsp;&nbsp;总记录数：{{ pagination.total }}-->
                        <!--</div>-->
                        <el-pagination @current-change="jumpPagination"
                                       @prev-click="prevClick"
                                       @next-click="nextClick"
                                       background
                                       layout="total, prev, pager, next, jumper, sizes"
                                       :current-page="pagination.currentPage"
                                       :page-size="pagination.pageSize"
                                       :page-sizes="[pagination.pageSize]"
                                       :total="pagination.total">
                        </el-pagination>
                    </div>
                </el-footer>
            </div>
        </el-container>

    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    import options from '@/assets/js/country-level3-data'
    import { Goods, Operate } from "@/web/module/lending";
    export default {
        name: "goods",
        components: {

        },
        data () {
            return {
                /* 商品分类 */
                //分类联动选择器的配置--用来将后台获取的数据绑定在联动选择器上
                "classifyProp": {value: 'id', label: 'text', children: 'categoryResps'},
                "nextClassifyId": '0',//获取下一级分类的id
                "goodsTypeList": [],//商品所有分类
                "selectedGood": [],//商品分类id数组["一级分类id","二级分类id","三级分类id"]
                "classLoading": true,//分类加载

                /* 活动标签 */
                "activeTagList": [],//所有活动标签

                "selectedOptions": [],//存放地区默认值
                "options": options,   //存放城市数据
                "loading": true,
                "dropdown": false,
                "tableHeight": 400,
                "dataList": [],
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": 10,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData":{
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                    "searchText": '',//搜索输入值
                    "minPrice": '',//最低价
                    "maxPrice": '',//最高价
                    "province": '',//省
                    "city": '',//市
                    "area": '',//区
                    "activityId": '',//活动标签id
                    "classifyId": '',//商品分类id
                    "goodsLevel": '',//商品分类id的级别
                    "searchType": '',//input输入框类型【1商品名称，2商品货号 3供应商】
                    "status": 0//【 0线上商品，1线下商品】
                },
                goodName: '',//商品名称
                goodsNo: '',//商品货号
                h5Link: '',//h5活动链接
                //1商品名称，2商品货号 3供应商
                //input输入框类型选择
                "inputOptions": [
                    {
                        value: '1',
                        label: '商品名称'
                    }, {
                        value: '2',
                        label: '商品货号'
                    },
                    // {
                    //     value: '3',
                    //     label: '供应商'
                    // }
                ],
                "activeTags": '',
                btnIndex: '0',//【等同于postData里面的status】
                // 0线上商品，1下架商品
                "btnList" :[
                    {id: 1, text: '线上商品', num: '0'},
                    {id: 2, text: '下架商品', num: '0'}
                ]
            }
        },
        methods: {
            /**
             * 搜索
             */
            search(){
                console.log('1',this.postData);
                //选择输入框
                if(this.postData.searchText) {
                    if(this.postData.searchType===''){
                        this.open('请选择搜索类型');
                        return false;
                    }
                }
                this.check(this.postData.minPrice,1);
                this.check(this.postData.maxPrice,0);
                //价格筛选
                if(this.postData.minPrice && this.postData.maxPrice){
                    if(parseInt(this.postData.minPrice) > parseInt(this.postData.maxPrice)){
                        this.open('最高价不能低于最低价');
                        return false;
                    }
                }
                console.log('2',this.postData);
                //省市区
                this.postData.province = this.selectedOptions[0];
                this.postData.city = this.selectedOptions[1];
                this.postData.area = this.selectedOptions[2];
                // 商品分类
                var len = this.selectedGood.length;
                if(len == 1){
                    this.postData.classifyId = this.selectedGood[0];
                    this.postData.goodsLevel = 1;
                }else if(len == 2){
                    this.postData.classifyId = this.selectedGood[1];
                    this.postData.goodsLevel = 2;
                }else if(len == 3){
                    this.postData.classifyId = this.selectedGood[2];
                    this.postData.goodsLevel = 3;
                }
                //表格当前页
                this.postData.cursor = 1;
                this.loading = true;
                this.getData();
            },
            /**
             * 弹窗-提示信息
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '知道了',
                    callback: action => {
                        this.$message({
                            type: 'info',
                            message: '已关闭提示'
                        });
                    }
                });
            },
            /**
             * 获取数据
             */
            getData(){
                Goods.goodsList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.loading = false;
                        this.dataList = res.data.data;
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                        console.log(this.pagination.total);
                        /** 活动标签--勿删 start **/
                        // var list=[];
                        // if(this.dataList){
                        //     this.dataList.forEach((ele)=>{
                        //         console.log(ele);
                        //         if(ele.activeTagsResps.length>0){
                        //             ele.activeTagsResps.forEach((v,i)=>{
                        //                 if(v.id && i< ele.activeTagsResps.length){
                        //                     list.push(v.id);
                        //                 }
                        //             });
                        //             ele.activeTagsResps = list;
                        //             console.log(list);
                        //             list = [];
                        //         }
                        //     });
                        // }
                        /** 活动标签--勿删 end **/
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.loading = false;
                        this.dataList = [];
                        this.pagination.total = 0;
                        this.pagination.currentPage = 1;
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 分页跳转【当前页】
             */
            jumpPagination (val) {
                console.log(val);
                const that = this;
                that.loading = true;
                this.postData.cursor = val;
                this.getData();
            },
            /**
             * 上一页
             */
            prevClick(){
                this.pagination.currentPage --;
                this.postData.cursor --;
                 this.loading = true;
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick(){
                this.pagination.currentPage ++;
                this.postData.cursor ++;
                 this.loading = true;
                this.getData();
            },
            /**
             * 增加信息-【未用】
             */
            addition () {
                const that = this;
                that.$router.push({ "path": "/goods/addGoods" });
            },
            /**
             * 编辑商品
             */
            editClick (data,num) {
                console.log(data,num);
                if(num){
                    // 跳转商品修改页面
                    this.$router.push({ "path": "/goods/updateGoods","query":{goodsId:data.id}});
                }else {
                    // 跳转商品详情
                    this.$router.push({ "path": "/goods/goodsDetail","query":{goodsId:data.id}});
                }
            },
            /**
             * 下架商品
             */
            outClick (data) {
                console.log(data);
                const that = this, text = "下架";
                var postData = {
                    "goodsId": data.id
                };
                that.$confirm("此操作将下架该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.outGoods(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "下架成功" });
                            this.getData();
                            this.getNoData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            that.$message({ center: true, type: "info", message: "下架失败，" + res.message });
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            /**
             * 上架商品
             */
            putClick (data) {
                console.log(data);
                if(data.stock == 0){
                    this.open('库存为0，无法上架');
                    return false;
                }
                const that = this, text = "上架";
                var postData = {
                    "goodsId": data.id
                };
                that.$confirm("此操作将上架该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.putGoods(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "上架成功" });
                            this.getData();
                            this.getNoData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            that.$message({ center: true, type: "info", message: "上架失败，" + res.message });
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            /**
             * 删除商品
             */
            removeClick (data) {
                console.log(data);
                const that = this, text = "删除";
                var postData = {
                    "goodsId": data.id
                };
                that.$confirm("此操作将永久删除该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Goods.removeGoods(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "删除成功" });
                            this.getData();
                            this.getNoData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            that.$message({ center: true, type: "info", message: "删除失败，" + res.message });
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },

            /**
             * 选择搜索类型
             */
            choType(){
                console.log(this.type);
            },
            /**
             * 选择活动标签
             */
            choActiveTag(){
                console.log(this.postData.activityId);
            },
            /**
             * 单个商品活动标签发生改变
             */
            goodsTagChange(data,val){
                console.log(data,val);
                console.log('改变活动标签');
                Goods.goodsActiveTag({'activityIds': val,'goodsId':data.id}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message.success('保存成功');
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 循环初始化 postData
             */
            updatePostData(){
                this.postData.cursor = 1;
                this.selectedGood = [];
                this.postData.searchText = this.postData.minPrice = this.postData.maxPrice = this.postData.province = this.postData.city = this.postData.area = this.postData.activityId = this.postData.classifyId = this.postData.goodsLevel = this.postData.searchType = '';
            },
            // 选择按钮
            getDataClick(i){
                const that = this;
                this.loading = true;
                if(i==0) {
                    that.btnIndex = i;
                    console.log('线上供应商');
                    that.postData.status = 0;
                    this.updatePostData();
                    this.getNoData();
                    this.getData();
                }
                if(i==1) {
                    that.btnIndex = i;
                    that.postData.status = 1;
                    this.updatePostData();
                    this.getNoData();
                    this.getData();
                    console.log('线上自营');
                }
            },
            /**
             *  选择区域
             */
            handleChange(value) {
                console.log(value);
                console.log(this.selectedOptions);
            },
            //效验只能为数字或金额
            check (val,e) {
                var reg = new RegExp("^\\d+(\\.\\d{0,2})?$");
                if(!reg.test(val)){
                    console.log(val,e);
                    if(val){
                        if(e==1){
                            if(val<0){
                                this.postData.minPrice = '';
                            }else {
                                this.postData.minPrice = val.substr(0,val.indexOf('.')+3)
                            }
                            console.log(val,val.substr(0,val.indexOf('.')+3));
                        }else if(e==0){
                            console.log(val,val.substr(0,val.indexOf('.')+3));
                            if(val<0){
                                this.postData.maxPrice = '';
                            }else {
                                this.postData.maxPrice = val.substr(0,val.indexOf('.')+3)
                            }
                        }
                        this.$message("请输入正确的金额（只包含二位小数）");
                    }
                }
            },
            /**
             * 商品分类 - 逐级获取分类
             * @param value
             */
            goodChange(value) {
                this.classLoading = true;
                console.log(value,this.selectedGood);
                if(value.length==0){
                    this.classLoading = false;
                    this.postData.classifyId = '';
                    this.postData.goodsLevel = '';
                    console.log(value);
                }
                if(value.length==1){
                    this.nextClassifyId = value[0];
                    this.getClassify()
                }
                if(value.length==2){
                    this.nextClassifyId = value[1];
                    this.getClassify()
                }
                if(value.length==3){
                    this.classLoading = false;
                }
            },
            // 获取商品分类
            getClassify(){
                Goods.nextClassify({"parentId": this.nextClassifyId}).then(res=>{
                    console.log(res);
                    this.classLoading = false;
                    if(res.code==200){
                        if(this.nextClassifyId==0){
                            this.goodsTypeList = res.data;
                            this.goodsTypeList.forEach(ele=>{
                                this.$set(ele,'categoryResps',[])
                            });
                        }
                        if(this.selectedGood.length==1){
                            res.data.forEach(val=>{
                                this.$set(val,'categoryResps',[])
                            });
                            this.goodsTypeList.forEach(ele=>{
                                if(ele.id == this.selectedGood[0]) {
                                    this.$set(ele,'categoryResps',res.data);
                                }
                            });
                            console.log(this.goodsTypeList);
                        }
                        if(this.selectedGood.length==2){
                            this.goodsTypeList.forEach(ele=>{
                                ele.categoryResps.forEach(val=>{
                                    if(val.id == this.selectedGood[1]) {
                                        this.$set(val,'categoryResps',res.data);
                                    }
                                });
                            });
                            console.log(this.goodsTypeList);
                        }
                        console.log(this.goodsTypeList);
                        if(this.selectedGood.length==2){

                        }
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },

            // 获取商品名称
            getGoodName(){
                Goods.goodsName({"number":this.goodsNo}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.goodName = res.data.mainTitle;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            // 获取列表顶部-商品数量
            getNoData(){
                Goods.goodsNo().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.btnList[0].num = res.data.putaway;
                        this.btnList[1].num = res.data.soldOut;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            // 获取活动标签
            getActiveTag(){
                Operate.activeTag().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.activeTagList = res.data;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
        },
        beforeCreate () {
        },
        beforeMount () {
        },
        mounted:function(){
            //获取列表数据
            this.getData();
            //获取列表数据 顶部商品数量
            this.getNoData();
            // 获取活动标签
            // this.getActiveTag();
            // 获取商品分类
            this.getClassify();

            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 164;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 164
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
        }
    };
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #goods {
        padding: 20px;
        width: 100%;
        height: 100%;
        .el-container {
            .content {
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                padding: 15px;
                position: relative;
                overflow: hidden;
                .top-btn-box {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding:15px 30px;
                    .el-button--primary {
                        width: 211px;
                        height: 58px;
                        font-size: 24px;
                        .el-icon-plus {
                            margin-right: 15px;
                        }
                    }
                }
                .btnBox {
                    height: 102px;
                    display: flex;
                    align-items: center;
                    .el-button.act{
                        color: #3a8ee6;
                        border-color: #3a8ee6;
                    }
                    .el-button {
                        height: 57px;
                        border-radius: 5px;
                        font-size: 24px;
                        margin-right: 20px;
                        position: relative;
                        img {
                            width: 23px;
                            height: 22px;
                            position: absolute;
                            right: 0;
                            top: 0;
                        }
                    }
                };
                .screen-box {
                    .el-button {
                        margin: 0 60px 0 12px;
                        font-size: 20px;
                    }
                    .row:nth-child(2n) {
                        justify-content: flex-start;
                    }
                    .row {
                        display: flex;
                        align-items: center;
                        /*justify-content: space-between;*/
                        justify-content: flex-start;
                        margin: 10px 0;
                        .select-box {
                            text-align: left;
                            .el-radio-group {
                                margin: 38px 0;
                            }
                            .el-cascader {
                                input,.el-input {
                                    font-size: 17px;
                                }
                            }
                        }
                        .inquire {
                            display: flex;
                            align-items: center;
                            i {
                                margin: 0 7px;
                            }
                            input,.el-input {
                                width: 240px !important;
                                font-size: 17px;
                            }
                        }
                        .date-box {
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
                    };
                    .select-box {
                        text-align: left;
                        .el-radio-group {
                            /*width: 490px;*/
                            margin: 38px 0;
                        }
                    }
                }
                .el-table {
                    margin: 2px 1px;
                    padding: 1px;
                    height: 100%;
                    td {
                        padding: 0;
                    };
                    img {
                        width: 118px;
                        margin: 12px auto 5px;
                    };
                    .cell {
                        text-align: center;
                        font-size: 20px;
                    }
                    .act {
                        color: red;
                    }
                    .el-button {
                        margin-left: 6px;
                        font-size: 20px;
                    }
                };
                .el-footer {
                    width: 100%;
                    height: 100px !important;
                    font-size: 18px;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    background: #fff;
                    z-index: 99;
                    span,li,.el-input__inner  {
                        font-size: 18px;
                    }
                    .pagination {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .el-pagination .el-select .el-input .el-input__inner {
                            padding-right: 8px;
                        };
                        .el-input__suffix-inner {
                            display: none;
                        }
                    }
                };
            };
        }

    };
</style>

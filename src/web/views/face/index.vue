<!--
  - faceOrder Vue
  - @JsName faceOrder
  - @Description 刷脸订单 首页视图.
  - @DateTime 2019-03-13 20:39:22
  - @author DLY
  -->
<!-- 视图 -->
<template>
    <div id="faceOrder">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="screen-box">
                        <div class="row">
                           <!-- <div class="inquire">
                                &lt;!&ndash;<el-select clearable v-model="postData.searchType" placeholder="请选择搜索类型">&ndash;&gt;
                                &lt;!&ndash;<el-option&ndash;&gt;
                                &lt;!&ndash;v-for="item in inputOptions"&ndash;&gt;
                                &lt;!&ndash;:key="item.value"&ndash;&gt;
                                &lt;!&ndash;:label="item.label"&ndash;&gt;
                                &lt;!&ndash;:value="item.value">&ndash;&gt;
                                &lt;!&ndash;</el-option>&ndash;&gt;
                                &lt;!&ndash;</el-select>&ndash;&gt;
                                &lt;!&ndash;<i>-</i>&ndash;&gt;
                                <el-input style="width: 390px" v-model="postData.searchText" placeholder="请输入订单号"></el-input>
                                <el-button type="primary" @click="search" size="small">搜索</el-button>
                            </div>-->
                            <div class="date-box">
                                <span>日期：</span>
                                <el-date-picker
                                        v-model="postData.startTime"
                                        type="date"
                                        clearable
                                        placeholder="选择开始日期">
                                </el-date-picker>
                                <i>-</i>
                                <el-date-picker
                                        v-model="postData.endTime"
                                        type="date"
                                        clearable
                                        placeholder="选择结束日期">
                                </el-date-picker>
                                <el-button @click="search" type="primary" size="small">筛选</el-button>
                            </div>
                        </div>
                        <!--<el-button type="primary" @click="exportClick">导出</el-button>-->
                    </div>
                    <!-- 表格 -->
                    <div class="table-box">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <!--<el-table-column key="1" type="index" fixed label="编号" width="80">-->
                                <!--<template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}-->
                                <!--</template>-->
                            <!--</el-table-column>-->
                            <el-table-column key="2" prop="gmtUpdate" label="支付时间">
                            </el-table-column>
                            <el-table-column key="3" label="金额" prop="price">
                                <template slot-scope="scope">
                                    <span>{{scope.row.price||scope.row.price==0 ? scope.row.price :'0'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column key="4" prop="payMethod" label="支付方式">
                                <template slot-scope="scope">
                                    <span>{{scope.row.payMethod ? scope.row.payMethod :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column key="5" prop="status" label="订单状态">
                                <template slot-scope="scope">
                                    <span>{{scope.row.status ?scope.row.status :'--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column key="6" prop="orderSn" label="订单号">
                                <template slot-scope="scope">
                                    <span>{{scope.row.orderSn ?scope.row.orderSn : '--'}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column key="7" label="操作" fixed="right" width="160">
                                <template slot-scope="scope">
                                    <el-button type="text" sixe="small" @click="deliverClick(scope.row)">退款</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <!--表格结束-->
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
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->
<script>
    const map = {1:'支付宝',2:'微信',undefined:'--',null:'--'};
    const mapStatus = {1:'0',2:'1',3:'2'};
    const mapType = {1 :'已支付', 2 : '未支付',  3: '已退款',  4: '退款中'};
    import { Face, Tags } from "@/web/module/lending";
    export default {
        name: "faceOrder",
        data(){
            return {
                loading: true,
                "dataList": [],
                "tableHeight": 400,
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
                    // "status": 1,//类型
                    // "searchText": '',//搜索输入值
                    "startTime": '',//开始日期
                    "endTime": '',//结束日期
                    // "searchType": '1'//input输入框类型
                },
                //input输入框类型选择
                "inputOptions": [
                    {
                        value: '1',
                        label: '搜索订单'
                    }
                ],
                btnIndex: '0',//【等同于postData里面的status】
                "btnList" :[
                    // {id: 1, text: '待支付'},
                    {id: 2, text: '待发货'},
                    {id: 3, text: '已发货'},
                    {id: 4, text: '已收货'}
                ]
            }
        },
        methods: {
            /**
             * 搜索
             */
            search(){
                console.log('1',this.postData);
                if(this.postData.searchText) {
                    if(this.postData.searchType===''){
                        this.open('请选择搜索类型');
                        return false;
                    }
                }
                if(this.postData.endTime&&this.postData.startTime){
                    if(this.postData.startTime > this.postData.endTime){
                        this.open('开始日期不能晚于结束日期');
                        return false;
                    }
                }
                console.log('2',this.postData);
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
             * 获取列表数据
             */
            getData(){
                console.log('3',this.postData);
                Face.faceList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.loading = false;
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele=>{
                            ele.payMethod = map[ele.payMethod];
                            ele.status = mapType[ele.status];
                        });
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code == 100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.loading = false;
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
             *  退款
             */
            deliverClick (data) {
                console.log(data);
                const that = this, text = "退款";
                var postData = {
                    "goodsId": data.id
                };
                that.$confirm("此操作将执行退款操作 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Face.refund(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            that.$message({ center: true, type: "info", message: "退款成功" });
                            this.getData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            that.$message({ center: true, type: "info", message: "退款失败，" + res.message });
                        }
                    });
                }).catch(() => {
                    that.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            /**
             *  初始化postData对象
             */
            updatePostData(){
                this.postData.cursor = 1;
                this.postData.startTime = this.postData.endTime = '';
            },
            // 选择按钮
            getDataClick(i){
                const that = this;
                this.loading = true;
                this.updatePostData();
                that.btnIndex = i;
                // if(i==0) {
                //     that.postData.status = 5;
                //     this.getData();
                //     console.log('待支付');
                // }
                if(i==0) {
                    console.log('待发货');
                    that.postData.status = 1;
                    this.getData();
                }
                if(i==1) {
                    that.postData.status = 2;
                    this.getData();
                    console.log('已发货');
                }
                if(i==2) {
                    that.postData.status = 3;
                    this.getData();
                    console.log('已收货');
                }
            }
        },
        beforeCreate () {

        },
        beforeMount () {
            /**
             * 设置表格高度
             */
            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 170;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 170
                }
            });
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　

            // if(this.$route.query.orderStatus){
            //     this.btnIndex = mapStatus[this.$route.query.orderStatus];
            //     this.getDataClick(this.btnIndex);
            // }else {
                // 获取列表数据
                this.getData();
            // }
        },
    }
</script>

<!-- 视图 Scss 样式 -->
<style lang="scss">
    #faceOrder{
        color: #3e3e4d;
        width: 100%;
        height: 100%;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    padding: 15px;
                    position: relative;
                    overflow: hidden;
                    .btnBox {
                        height: 102px;
                        display: flex;
                        align-items: center;
                        padding-left: 20px;
                        .el-button.act{
                            color: #3a8ee6;
                            border-color: #3a8ee6;
                        }
                        .el-button {
                            height: 57px;
                            border-radius: 5px;
                            font-size: 24px;
                            margin-right: 30px;
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
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        .el-button {
                            margin-left: 12px;
                            font-size: 17px;
                        }
                        .row {
                            display: flex;
                            align-items: center;
                            margin: 20px 0 30px;
                            .inquire {
                                display: flex;
                                align-items: center;
                                margin-right: 110px;
                                i {
                                    margin: 0 7px;
                                }
                                input,.el-input {
                                    width: 240px !important;
                                    font-size: 17px ;
                                }
                            }
                            .date-box {
                                .el-input__prefix {
                                    right: 5px;
                                    left: auto;
                                }
                                .el-input__inner {
                                    padding: 0 15px;
                                    font-size: 17px;
                                }
                                i {
                                    margin: 0 7px;
                                }
                            }
                        }
                    }
                    .table-box {
                        padding: 1px;
                        .el-table {
                            margin: 1px 2px;
                            .cell {
                                text-align: center;
                                font-size: 17px;
                                .el-button {
                                    font-size: 17px;
                                }
                            }
                        }
                        .el-footer {
                            width: 100%;
                            height: 100px !important;
                            font-size: 18px;
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            background: #fff;
                            z-index: 99;
                            .pagination {
                                width: 100%;
                                height: 100%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                span,li,.el-input__inner  {
                                    font-size: 18px;
                                }
                                .el-pagination .el-select .el-input .el-input__inner {
                                    padding-right: 8px;
                                };
                                .el-input__suffix-inner {
                                    display: none;
                                }
                            }
                        };
                    }
                }
            }
        }
    }
</style>
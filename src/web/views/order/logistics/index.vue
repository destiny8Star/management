<!--
  - logistics Vue
  - @JsName index
  - @Description 物流管理视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->
<template>
    <div id="logistics">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="btnBox">
                        <el-button
                            :class="{act:btnIndex==index}"
                            plain
                            v-for="(btn,index) in btnList"
                            :key="index"
                            @click="getDataClick(index)">
                            {{ btn.text }}
                            <img v-if="btnIndex==index" src="../../../../assets/dui@2x.png" alt="">
                        </el-button>
                    </div>
                    <!--  表格  -->
                    <div class="tableBox">
                        <el-table
                                :header-cell-style="{background:'#fafafa'}"
                                :data="dataList"
                                border
                                stripe
                                style="width: 100%"
                                ref="table"
                                :height="tableHeight">
                            <el-table-column
                                    type="index"
                                    fixed
                                    label="编号"
                                    width="89px">
                                <template slot-scope="scope">{{ pagination.total - ( ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) ) + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column prop="orderNo" label="订单号">
                            </el-table-column>
                            <el-table-column
                                    label="外部图片">
                                <template slot-scope="scope">
                                    <img v-bind:src="scope.row.defaultUrl" onerror="" title="外部图片"/>
                                </template>
                            </el-table-column>
                            <el-table-column prop="mainTitle" label="商品主标题">
                            </el-table-column>
                            <el-table-column prop="price" label="价格(元)">
                            </el-table-column>
                            <el-table-column prop="num" label="数量" width="89px">
                            </el-table-column>
                            <el-table-column prop="totalPrice" label="合计(元)">
                            </el-table-column>
                            <el-table-column prop="userName" label="用户">
                            </el-table-column>
                            <el-table-column prop="createTime" label="下单时间">
                            </el-table-column>
                            <el-table-column prop="address" label="地址" width="204px">
                            </el-table-column>
                            <el-table-column prop="receiveName" label="收件人">
                            </el-table-column>
                            <el-table-column prop="receiveMobile" label="收件手机号">
                            </el-table-column>
                            <el-table-column v-if="btnIndex!='0'" prop="logisticsNo" label="物流编号">
                                <template slot-scope="scope">
                                    {{scope.row.logisticsNo?scope.row.logisticsNo:'--'}}
                                </template>
                            </el-table-column>
                            <el-table-column v-if="btnIndex!='0'" prop="logisticsName" label="物流公司">
                                <template slot-scope="scope">
                                    {{scope.row.logisticsName?scope.row.logisticsName:'--'}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="操作"
                                    fixed="right"
                                    width="130px">
                                <template slot-scope="scope">
                                    <el-button type="text"  @click="deliverClick(scope.row)" size="small">{{ btnIndex == '2' ? '已完成' : ''}}</el-button>

                                    <el-button v-show="btnIndex==0" type="text" @click="scope.row.showAddInfo = true">发货</el-button>

                                    <el-dialog :modal-append-to-body='false' title="物流信息" :visible.sync="scope.row.showAddInfo">
                                        <el-form :model="scope.row">
                                            <el-form-item label="物流公司名称" :label-width="formLabelWidth">
                                                <el-input v-model="scope.row.logisticsName" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="物流单号" :label-width="formLabelWidth">
                                                <el-input v-model="scope.row.logisticsNo" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="scope.row.showAddInfo = false">取 消</el-button>
                                            <el-button type="primary" @click="fillIn(scope.row)">确 定</el-button>
                                        </div>
                                    </el-dialog>

                                    <el-button v-show="btnIndex==1" type="text" @click="scope.row.showUpdateInfo = true">修改物流信息</el-button>
                                    <el-dialog :modal-append-to-body='false' title="物流信息" :visible.sync="scope.row.showUpdateInfo">
                                        <el-form :model="scope.row">
                                            <el-form-item label="物流公司名称" :label-width="formLabelWidth">
                                                <el-input v-model="scope.row.logisticsName" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="物流单号" :label-width="formLabelWidth">
                                                <el-input v-model="scope.row.logisticsNo" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="scope.row.showUpdateInfo = false">取 消</el-button>
                                            <el-button type="primary" @click="updateInfo(scope.row)">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    v-if="btnIndex=='2'"
                                    fixed="right"
                                    label="备注"
                                    width="100">
                                <template slot-scope="scope">
                                    <el-input
                                            type="textarea"
                                            autosize
                                            clearable
                                            @blur="settingRemark(scope.row)"
                                            v-model="scope.row.remark"
                                            placeholder="输入备注">
                                    </el-input>
                                </template>
                            </el-table-column>
                        </el-table>
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

<script>
    import { Logistics, Tags } from "@/web/module/lending";
    export default {
        name: "logistics",
        data(){
            return{
                "loading": true,
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
                //接口参数【status：1-待发货列表；2-已发货列表；3-已完成列表】
                "postData":{
                    "cursor": 1,
                    "size": 10,
                    "status": 1
                },
                btnIndex: '0',//【等同于postData里面的status】
                "btnList" :[
                    {id: 1, text: '待发货订单'},
                    {id: 2, text: '已发货订单'},
                    {id: 3, text: '已完成订单'},
                ],
                "formLabelWidth": '120px',
                "showUpdateInfo": false,
                "showAddInfo": false,
                "logisticsInfo": {
                    "logisticsName": '',
                    "logisticsNo": '',
                }
            }
        },
        methods: {
            /**
             * 获取数据
             */
            getData(){
                // this.loading = false;
                Logistics.logisticsList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.loading = false;
                        this.dataList = res.data.data;
                        this.dataList.forEach(ele=>{
                            this.$set(ele,'showUpdateInfo',false);
                            this.$set(ele,'showAddInfo',false);
                        });
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code==100070 || res.code == 404){
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
            //发货， 填写物流单号弹框
            fillIn(data) {
                var regNo = /\S/;
                if(!regNo.test(data.logisticsName)){
                    this.$message({ center: true, type: "info", message: "物流公司名称不能为空" });
                    return false;
                }
                if(!regNo.test(data.logisticsNo)){
                    this.$message({ center: true, type: "info", message: "物流编号不能为空" });
                    return false;
                }
                var getData = {
                    "id": data.id,
                    "logisticsNo": data.logisticsNo,
                    "logisticsName": data.logisticsName
                };
                Logistics.sendGoods(getData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        data.showAddInfo = false;
                        this.$message({ center: true, type: "info", message: "发货成功" });
                        this.getData();
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message({ center: true, type: "info", message: res.message + "，发货失败" });
                    }
                })
            },
            // 确认完成订单
            confrimOrder() {
                this.$confirm('此操作将确认完成该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '确认成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消确认'
                    });
                });
            },

            /**
             * 修改物流信息
             */
            updateInfo (data) {
                var text = '修改';
                var updateData = {
                    "id": data.id,
                    "logisticsNo": data.logisticsNo,
                    "logisticsName": data.logisticsName
                };
                this.$confirm("此操作将修改该商品物流信息 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    this.isSubmit = true;
                    Logistics.updateInfo(updateData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('修改成功');
                            data.showUpdateInfo = false;
                            this.getData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning('修改失败' + res.message);
                            data.showUpdateInfo = false;
                        }
                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            /**
             * 发货，旧版本【暂时废弃】
             */
            deliverClick (data) {
                console.log(data);
                const that = this;
                if(that.btnIndex == '0'){
                    that.fillIn(data.id);
                }
                if(that.btnIndex == '1'){
                    // that.confrimOrder();
                    this.updateInfo(data);//修改物流信息
                }

            },
            /**
             * 设置备注
             */
            settingRemark (data) {
                console.log(data);
                if(data.remark.trim()==''){
                    console.log(data.remark);
                    this.$message({ center: true, type: "info", message: "备注输入空，未修改" });
                    this.getData();
                    return false;
                }
                var getData = {
                    "orderId": data.id,
                    "remark": data.remark
                };
                Logistics.remark(getData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message({ center: true, type: "info", message: "备注成功" });
                        this.getData();
                    }else {
                        this.$message({ center: true, type: "info", message: "备注失败" });
                    }
                })
            },
            // 选择按钮
            getDataClick(i){
                const that = this;
                this.loading = true;
                if(i==0) {
                    that.btnIndex = i;
                    console.log('待发货订单');
                    that.postData.status = 1;
                    this.postData.cursor = 1;
                    this.getData();
                }
                if(i==1) {
                    that.btnIndex = i;
                    that.postData.status = 2;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('已发货订单');
                }
                if(i==2) {
                    that.btnIndex = i;
                    that.postData.status = 3;
                    this.postData.cursor = 1;
                    this.getData();
                    console.log('已完成订单');
                }
            }
        },
        beforeCreate () {
        },
        beforeMount () {
            const that = this;
            that.btnIndex = 0;
            this.getData();

            this.$nextTick(function () {
                this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 200;

                // 监听窗口大小变化
                let self = this;
                window.onresize = function() {
                    self.tableHeight = window.innerHeight - self.$refs.table.$el.offsetTop - 200
                }
            })
            //this.$refs.table.$el.offsetTop：表格距离浏览器的高度
            //50表示你想要调整的表格距离底部的高度（你可以自己随意调整），因为我们一般都有放分页组件的，所以需要给它留一个高度　
        },
    }
</script>

<style lang="scss">
#logistics {
    width: 100%;
    height: 100%;
    .el-container {
        .el-main {
            padding: 15px;
            .content {
                width: 100%;
                height: 100%;
                padding: 15px 0;
                background: #fff;
                position: relative;
                .btnBox {
                    height: 102px;
                    display: flex;
                    align-items: center;
                    padding-left: 63px;
                    .el-button.act{
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
                };
                .tableBox {
                    padding: 0 15px;
                    .el-table {
                        line-height: 30px;
                        height: 100%;
                        img {
                            width: 118px;
                            margin: 12px auto 5px;
                        };
                        .el-textarea__inner {
                            border: 0;
                            background: transparent;
                            padding: 0;
                        }
                        .cell {
                            text-align: center;
                        }
                        .el-dialog {
                            width: 36%;
                            .el-dialog__header {
                                .el-dialog__title {
                                    text-align: left;
                                    font-size: 26px;
                                    font-weight: bold;
                                }
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
                        z-index: 2;
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
                }
            }
        }
    }
}

</style>
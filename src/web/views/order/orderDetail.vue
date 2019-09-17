<template>
    <div id="orderDetail">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <p class="back" @click="$router.push({path:'/order/orderList',query:{orderStatus:status}})">
                    <el-button type="text" fixed="left" icon="el-icon-arrow-left">返回</el-button>
                </p>
                <div class="content">
                    <div class="infoBox">
                        <div class="detail-box">
                            <el-card class="box-card">
                                <div v-for="(val,k,i) in data" :key="i" class="infoItem">
                                    <div v-if="k!='物流单号'&&k!='物流名称'&&k!='发货时间'&&k!='确认收货时间'">
                                        <p>{{ k }}</p>：<span :style=" val=='待支付'? redColor : val=='待发货'? yellowColor :val=='已发货'?blueColor:val=='已收货'?greenColor: '' ">{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="accountStatus==1&&k=='待入账金额(元)'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="accountStatus==2&&k=='已入账金额(元)'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="status==2&&k=='物流单号'||status==3&&k=='物流单号'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="status==2&&k=='物流名称'||status==3&&k=='物流名称'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="status==2&&k=='发货时间'||status==3&&k=='发货时间'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                    <div v-else-if="status==3&&k=='确认收货时间'">
                                        <p>{{ k }}</p>：<span>{{ val ? val : '--' }}</span>
                                    </div>
                                </div>
                                <div class="sendBox" v-show="status==1">
                                    <el-button type="primary" @click="showSend = true">发货</el-button>
                                    <el-dialog :modal-append-to-body='false' title="物流信息" :visible.sync="showSend">
                                        <el-form :model="logisticsInfo">
                                            <el-form-item label="物流公司名称" :label-width="sendWidth">
                                                <el-input v-model="logisticsInfo.logisticsName" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="物流单号" :label-width="sendWidth">
                                                <el-input v-model="logisticsInfo.logisticsNo" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="showSend = false">取 消</el-button>
                                            <el-button type="primary" @click="fillIn">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                                <div class="sendBox" v-show="status==2">
                                    <el-button type="primary" @click="showUpdate = true">修改物流信息</el-button>
                                    <el-dialog :modal-append-to-body='false' title="修改物流信息" :visible.sync="showUpdate">
                                        <el-form :model="logisticsInfo">
                                            <el-form-item label="物流公司名称" :label-width="sendWidth">
                                                <el-input v-model="logisticsInfo.logisticsName" autocomplete="off"></el-input>
                                            </el-form-item>
                                            <el-form-item label="物流单号" :label-width="sendWidth">
                                                <el-input v-model="logisticsInfo.logisticsNo" autocomplete="off"></el-input>
                                            </el-form-item>
                                        </el-form>
                                        <div slot="footer" class="dialog-footer">
                                            <el-button @click="showUpdate = false">取 消</el-button>
                                            <el-button type="primary" @click="updateInfo">确 定</el-button>
                                        </div>
                                    </el-dialog>
                                </div>
                            </el-card>
                        </div>
                    </div>
                    <!-- 表格 -->
                    <div class="bankCard-box">
                        <el-card>
                            <el-table
                                    :header-cell-style="{background:'#fafafa'}"
                                    :data="dataList"
                                    border
                                    stripe
                                    style="width: 100%"
                                    max-height="480">
                                <el-table-column key="1" prop="orderItemNo" label="子订单号">
                                </el-table-column>
                                <el-table-column key="2" prop="goodsUrl" label="商品图片">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.goodsUrl" alt="">
                                    </template>
                                </el-table-column>
                                <el-table-column key="3" prop="goodsName" label="商品名称">
                                </el-table-column>

                                <el-table-column key="4" prop="skuName" label="规格">
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.skuName ? scope.row.skuName : '--' }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column key="5" prop="skuPrice" label="单价">
                                </el-table-column>
                                <el-table-column key="6" prop="num" label="数量">
                                </el-table-column>
                                <el-table-column key="7" prop="freight" label="运费">
                                </el-table-column>
                                <el-table-column key="8" prop="price" label="总价">
                                </el-table-column>
                                <el-table-column key="9" prop="rebatePrice" label="用户返利">
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </div>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Logistics, Order, Tags} from "@/web/module/lending";

    const map = {1: '待发货', 2: '已发货', 3: '已收货',5: '待支付'};
    let datalist = {
        "物流状态": '待发货',
        "物流单号": '',
        "物流名称": '',
        "订单号": '',
        "创建时间": '',
        "付款时间": '',
        "支付方式": '',
        "订单总金额(元)": '',
        "返利返佣(元)": '',
        "待入账金额(元)": '',
        "已入账金额(元)": '',
        "到账时间": '',
        "供应商": '',
        "收货人": '',
        "收货手机号": '',
        "收货地址": '',
        "发货时间": '',
        "确认收货时间": '',
    };
    export default {
        name: "orderDetail",
        data() {
            return {
                "redColor": "color:red;fontWeight:800",
                "yellowColor": "color:#ffb715;fontWeight:800",
                "blueColor": "color:#409eff;fontWeight:800",
                "greenColor": "color:#2BE613;fontWeight:800",
                "orderId": '',//当前订单id
                "status": 0,//当前订单状态
                loading: true,
                "sendWidth": '120px',
                "showUpdate": false,//是否展示修改弹框
                "showSend": false,//是否展示发货
                "logisticsInfo":{
                    "logisticsName": '',
                    "logisticsNo": ''
                },
                //页面所需
                "pagination": {
                    "total": 0,
                    "pageCount": 10,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
                //接口参数
                "postData": {
                    "cursor": 1,//当前第几页-游标
                    "size": 10,//每页条数
                },
                "data": datalist,
                "dataList": [],
                "picture": '',//头像
                btnIndex: '0',//【等同于postData里面的status】
                "btnList": [
                    // {id: 1, text: '线上商品'},
                    // {id: 2, text: '商铺数据'},
                    {id: 3, text: '审核备注'},
                ],

                //审核备注模块
                "big": false,
                "auditData": [],
                "audit": {
                    "orderNo": '',//订单编号
                    "income": '',//累计收益
                    "amount": '',//余额
                    "account": '',//待入账
                },
                "accountStatus": '',//到账状态：1：待入账，2：已入账
            }
        },
        methods: {
            /**
             *  判断物流信息是否为空
             */
            isNull(){
                var regNo = /\S/;
                if(!regNo.test(this.logisticsInfo.logisticsName.trim() )){
                    this.$message({ center: true, type: "info", message: "物流公司名称不能为空" });
                    return false;
                }
                if(!regNo.test(this.logisticsInfo.logisticsNo.trim() )){
                    this.$message({ center: true, type: "info", message: "物流编号不能为空" });
                    return false;
                }
            },
            /**
             * 发货， 填写物流单号弹框
             */
            fillIn() {
                if(this.isNull() == false ){
                    return false;
                }
                var getData = {
                    "id": this.orderId,
                    "logisticsNo": this.logisticsInfo.logisticsNo,
                    "logisticsName": this.logisticsInfo.logisticsName
                };
                Logistics.sendGoods(getData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.$message({ center: true, type: "info", message: "发货成功" });
                        this.$router.push({path:'/order/orderList',query:{orderStatus:this.status}});
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message({ center: true, type: "info", message: res.message + "，发货失败" });
                    }
                })
            },
            /**
             * 修改物流信息
             */
            updateInfo () {
                if(this.isNull() == false ){
                    return false;
                }
                var text = '修改';
                var updateData = {
                    "id": this.orderId,
                    "logisticsNo": this.logisticsInfo.logisticsNo,
                    "logisticsName": this.logisticsInfo.logisticsName
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
                            this.showUpdate = false;
                            this.getData();
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning('修改失败，' + res.message);
                            this.showUpdate = false;
                        }
                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            },
            /**
             * 获取详情
             */
            getData() {
                Order.orderDetail({"orderId": this.orderId}).then(res => {
                    console.log(res);
                    var info = res.data;
                    if (res.code == 200) {
                        this.loading = false;
                        this.dataList = res.data.orderItemList;
                        this.status = info.status;
                        console.log(this.status);
                        datalist['物流状态'] = map[info.status];
                        this.logisticsInfo.logisticsName = info.logisticsName;
                        this.logisticsInfo.logisticsNo = info.logisticsNo;
                        datalist['物流单号'] = info.logisticsNo;
                        datalist['物流名称'] = info.logisticsName;
                        datalist['订单号'] = info.orderNo;
                        datalist['创建时间'] = info.createTime;
                        datalist['付款时间'] = info.payTime;
                        datalist['支付方式'] = info.payTypeName;
                        datalist['订单总金额(元)'] = info.price;
                        datalist['返利返佣(元)'] = info.rebatePrice;
                        this.accountStatus = info.accountStatus;
                        if(this.accountStatus == 1){
                            delete datalist['已入账金额(元)'];
                            datalist['待入账金额(元)'] = info.waitEnterAccount;
                        }else if(this.accountStatus == 2) {
                            delete datalist['待入账金额(元)'];
                            datalist['已入账金额(元)'] = info.waitEnterAccount;
                        }
                        datalist['到账时间'] = info.arrivalTime;
                        datalist['供应商'] = info.storeName;
                        datalist['收货人'] = info.addressName;
                        datalist['收货手机号'] = info.addressMobile;
                        datalist['收货地址'] = info.address;
                        datalist['发货时间'] = info.sendTime;
                        datalist['确认收货时间'] = info.receiptTime;
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.loading = false;
                        this.$message.warning(res.message);
                    }
                })
            },
        },
        created() {
            this.btnIndex = 0;
            if (this.$route.query.orderId) {
                this.orderId = this.$route.query.orderId
            }
            /**
             * 详情
             */
            this.getData();
        }
    }
</script>

<style lang="scss">
    #orderDetail {
        color: #3E3E4D;
        .el-container {
            padding: 15px;
            .el-main {
                width: 100%;
                background: #fff;
                .back {
                    text-align: left;
                    font-size: 20px;
                    .el-button {
                        font-size: 20px;
                    }
                    .el-button {
                        color: #3E3E4D;
                    }
                }
                .content {
                    .infoBox {
                        display: flex;
                        align-items: flex-end;
                        justify-content: space-between;
                        .detail-box {
                            width: 68%;
                            .box-card {
                                border-radius: 30px;
                                .el-card__body {
                                    padding: 20px;
                                    .infoItem {
                                        div {
                                            font-size: 20px;
                                            text-align: left;
                                            padding: 14px 0;
                                            display: flex;
                                            align-items: center;
                                            p {
                                                width: 148px;
                                                text-align: justify;
                                                text-align-last: justify;
                                            }
                                            span {
                                                margin-left: 30px;
                                            }
                                        }

                                    }
                                    .sendBox {
                                        /*text-align: left;*/
                                        .el-button {
                                            margin: 20px 0;
                                            font-size: 20px;
                                        }
                                        .el-dialog {
                                            width: 36%;
                                            .el-dialog__header {
                                                .el-dialog__title {
                                                    font-size: 26px;
                                                    font-weight: bold;
                                                }
                                            }
                                            .el-dialog__footer {
                                                .el-button {
                                                    margin-left: 10px;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .bankCard-box {
                        margin: 30px 0 0 0;
                        .el-card {
                            padding: 1px;
                            .el-table {
                                .cell {
                                    font-size: 18px;
                                    text-align: center;
                                    img {
                                        width: 100px;
                                        height: 100px;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
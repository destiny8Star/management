<template>
    <div id="vipList">
        <el-container direction="vertical" v-loading="loading">
            <el-main>
                <div class="content">
                    <div class="screen-box">
                        <div class="row">
                            <div class="inquire">
                                <el-select clearable v-model="postData.type" placeholder="请选择搜索类型">
                                    <el-option
                                            v-for="item in inputOptions"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                                <i>-</i>
                                <el-input style="width: 390px" v-model="postData.search" placeholder="手机号/身份证/姓名"></el-input>
                                <el-button type="primary" @click="search" size="small">查询</el-button>
                            </div>
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
                        <div class="select-box">
                            <el-radio-group v-model="postData.upgradeType">
                                <el-radio :label="1">全部用户</el-radio>
                                <el-radio :label="2">满足邀请条件升级</el-radio>
                                <el-radio :label="3">购买会员升级</el-radio>
                            </el-radio-group>
                            <el-button @click="search" type="primary" size="small">筛选</el-button>
                        </div>
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
                            <el-table-column type="index" fixed label="编号" width="70">
                                <template slot-scope="scope">{{ ((pagination.currentPage -1) * pagination.pageSize) + (scope.$index + 1) }}</template>
                            </el-table-column>
                            <el-table-column prop="tel" label="账户">
                            </el-table-column>
                            <el-table-column prop="upgradeTime" label="升级时间">
                            </el-table-column>
                            <el-table-column prop="idCard" label="身份证号">
                            </el-table-column>
                            <el-table-column prop="realName" label="姓名">
                            </el-table-column>
                            <el-table-column label="邀请人" prop="inviteTel">
                            </el-table-column>
                            <el-table-column prop="upgradeType" label="升级情况">
                            </el-table-column>
                            <el-table-column label="直邀好友(人)" prop="inviteNo">
                            </el-table-column>
                            <el-table-column prop="teamNo" label="团队人数(人)">
                            </el-table-column>
                            <el-table-column prop="amount" label="累计收入">
                            </el-table-column>
                            <el-table-column prop="balance" label="账户余额">
                            </el-table-column>
                            <el-table-column label="操作" fixed="right">
                                <template slot-scope="scope">
                                    <el-button type="text" sixe="small" @click="deliverClick(scope.row)">查看详情</el-button>
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

<script>
    import { UserCenter, Tags } from "@/web/module/lending";
    const map ={0:"满足邀友升级", 1:"购买PLUS会员升级", 2:"购买一级代理会员升级"};
    export default {
        name: "vipList",
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
                    "search": '',//搜索输入值
                    "startTime": '',//开始日期
                    "endTime": '',//结束日期
                    "upgradeType": 1,//筛选【1全部 2满足邀请条件升级 3购买会员升级】
                    "type": '',//input输入框类型
                    "portType": 1//【1：vip用户，2：执行服务商，3：县级合伙人，4：城市合伙人 】
                },
                //input输入框类型选择
                "inputOptions": [
                    {
                        value: '1',
                        label: '手机号'
                    }, {
                        value: '2',
                        label: '姓名'
                    }, {
                        value: '3',
                        label: '身份证号'
                    }
                ]
            }
        },
        methods: {
            /**
             * 搜索
             */
            search(){
                console.log('1',this.postData);
                if(this.postData.search) {
                    if(this.postData.type===''){
                        this.open('请选择搜索类型');
                        return false;
                    }
                }
                // if(this.postData.endTime) {
                //     if(!this.postData.startTime){
                //         this.open('请选择开始日期');
                //         return false;
                //     }
                // }
                // if(this.postData.startTime) {
                //     if(!this.postData.endTime){
                //         this.open('请选择结束日期');
                //         return false;
                //     }
                // }
                if(this.postData.endTime&&this.postData.startTime){
                    if(this.postData.startTime > this.postData.endTime){
                        this.open('开始日期不能晚于结束日期');
                        return false;
                    }
                }
                console.log('2',this.postData);
                this.postData.cursor = 1;
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
                this.loading = false;
                console.log('3',this.postData);
                UserCenter.multilevelList(this.postData).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.dataList = res.data.data;
                        // this.dataList.forEach(ele=>{
                            // ele.upgradeType = map[ele.upgradeType];
                        // });
                        this.pagination.total = res.data.count;
                        this.pagination.currentPage = res.data.cursor;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
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
                this.getData();
            },
            /**
             * 下一页
             */
            nextClick(){
                this.pagination.currentPage ++;
                this.postData.cursor ++;
                this.getData();
            },
            deliverClick (data) {
                var that = this;
                console.log(data);
                this.$store.state.userDetailId = data.userId;
                localStorage.userDetailId = data.userId;
                that.$router.push({path:'/userCenter/userDetail',query:{userId:data.userId}})
            },
        },
        beforeCreate () {
        },
        beforeMount () {
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
            // 获取列表数据
            this.getData();
        },
    }
</script>

<style lang="scss">
    #vipList{
        width: 100%;
        height: 100%;
        color: #3e3e4d;
        .el-container {
            .el-main {
                .content {
                    width: 100%;
                    height: 100%;
                    background: #fff;
                    padding: 15px;
                    position: relative;
                    .screen-box {
                        .el-button {
                            margin-left: 12px;
                        }
                        .row {
                            display: flex;
                            align-items: center;

                            .inquire {
                                display: flex;
                                align-items: center;
                                margin-right: 110px;
                                i {
                                    margin: 0 7px;
                                }
                                input,.el-input {
                                    width: 240px !important;
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
                    .table-box {
                        .el-table {
                            height: 100%;
                            margin: 1px 2px;
                            .cell {
                                text-align: center;
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
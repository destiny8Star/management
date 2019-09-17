

<!-- 赶项目，一期，编辑icon页面 -->



<template>
    <div id="updateIcon">
        <el-container direction="vertical" v-loading="isSubmit">
            <el-main>
                <div class="content">
                    <el-button @click="$router.push('/operate/iconIndex')" class="back" type="text"><i
                            class="el-icon-arrow-left"></i>返回
                    </el-button>
                    <el-card class="box-card">
                        <div class="row">
                            <p>图标位置：</p>
                            <p>{{location}}</p>
                        </div>
                        <div class="row">
                            <p>图标名称：</p>
                            <el-input v-model="title" placeholder="请输入图标名称（不在app中显示）"></el-input>
                        </div>
                        <div class="row">
                            <p>图标类型：</p>
                            <!--<span class="typeText" v-show="!type">图标类型</span>-->
                            <el-select v-model="type" placeholder="" @change="choType">
                                <el-option
                                        v-for="item in typeList"
                                        :key="item.id"
                                        :label="item.label"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                            <el-select v-show="type==1" v-model="goodType" placeholder="请选择商品分类" @change="choGoodType">
                                <el-option
                                        v-for="item in goodsTypeList"
                                        :key="item.cid"
                                        :label="item.name"
                                        :value="item.cid">
                                </el-option>
                            </el-select>
                            <el-input class="inputT" v-show="type==2" v-model="goodsNo" placeholder="请输入商品货号" @blur="getGoodName"></el-input>
                            <p v-show="goodName&&type==2" style="padding-left: 10px">商品名称：{{goodName}}</p>
                            <el-input class="inputT" v-show="type==3" v-model="h5Link" placeholder="请输入h5链接"></el-input>
                            <!--<el-input v-show="type==1" v-model="operateLink" placeholder="请输入链接"></el-input>-->
                        </div>
                        <div class="row">
                            <p><!--<strong>*</strong>-->上传图标图片：</p>
                            <el-upload
                                    class="upload-demo"
                                    :action="$baseUrl+'/mall/upLoad'"
                                    limit="1"
                                    name="photo"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="updateImg"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="1"
                                    :on-success="imgWin"
                                    :on-error="imgFail"
                                    :on-exceed="handleExceed"
                                    list-type="picture">
                                <div class="btn">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">&nbsp;限传1张，只能上传jpg/png文件，且不超过500kb</div>
                                </div>

                            </el-upload>
                        </div>
                    </el-card>
                    <!--<el-card class="box-card">-->
                    <!--<div class="row">-->
                    <!--<p>&lt;!&ndash;<strong>*</strong> &ndash;&gt;起止日期：</p>-->
                    <!--<div class="dateBox">-->
                    <!--<el-date-picker-->
                    <!--v-model="startDate"-->
                    <!--type="date"-->
                    <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                    <!--<i>-</i>-->
                    <!--<el-date-picker-->
                    <!--v-model="endDate"-->
                    <!--type="date"-->
                    <!--placeholder="选择日期">-->
                    <!--</el-date-picker>-->
                    <!--</div>-->
                    <!--</div>-->


                    <!--</el-card>-->
                    <el-button type="primary" class="save" @click="save">保存</el-button>
                </div>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import { Operate, Goods, Common, Tags } from "@/web/module/lending";
    const map = {5: '首页icon', 6: '首页中部四宫格', 7: '商圈icon',8:'卡管顶部icon'};
    export default {
        name: "updateIcon",
        data() {
            return {
                iconId: '',//图标id
                location: '请在图标列表页选定图标位置',//图标位置
                locations: '',//图标位置-调参
                title: '',//图标标题
                sortNum: '',//图标权重排序
                isSubmit: false,
                startDate: '',//开始时间
                endDate: '',//结束时间
                operateLink: '',//图标链接
                goodsNo: '',//商品货号
                goodName: '',//商品名称
                h5Link: '',//h5链接
                goodType: '',//商品分类
                goodsTypeList: [],//商品所有分类
                updateImg: [],//上传的图片
                typeList: [
                    {
                        id: 1,
                        label: '商品分类'
                    },
                    {
                        id: 2,
                        label: '商品货号'
                    }, {
                        id: 3,
                        label: 'h5链接'
                    }
                ],
                type: 1,//图标类型
            }
        },
        methods: {
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
            /**
             * 图上传成功
             */
            imgWin (response, file, fileList) {
                console.log(response,file,fileList)
                if (response) {
                    if (response.code == 200) {
                        this.updateImg.push({url:  response.data});
                        console.log(this.updateImg);
                    } else if(response.code==100070){
                        this.$message.warning(response.message);
                        // this.$router.push('/')
                    } else {
                        this.$message({ center: true, type: "warning", message: response.message });
                    }
                }

            },
            /**
             * 图上传失败
             */
            imgFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            // 外部图删除
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.updateImg = [];
            },
            // 获取商品分类
            getClassify(){
                Goods.goodsClassify().then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.goodsTypeList = res.data;
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 选择图标类型
             */
            choType(){
                console.log(this.type);
            },
            /**
             * 选择商品分类
             */
            choGoodType(){
                console.log(this.goodType);
            },
            handlePreview(file) {
                console.log(file);
            },
            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                });
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            save() {
                const that = this,text = "修改";
                if(this.locations == '请在图标列表页选定图标位置'){
                    this.open('请前往图标列表页');
                    return false;
                }
                if(this.title==''){
                    this.open('请输入图标名称');
                    return false;
                }
                if(this.updateImg.length == 0){
                    this.open('请选择图片上传');
                    return false;
                }
                if(this.type==2){
                    if(this.goodsNo==''){
                        this.open('请输入商品货号');
                        return false;
                    }
                }
                if(this.type==3){
                    if(this.h5Link ==''){
                        this.open('请输入h5链接');
                        return false;
                    }
                }
                if(this.type==1){
                    if(this.goodType ==''){
                        this.open('请选择商品分类');
                        return false;
                    }
                }
                var postData = {
                    "bannerType": this.locations,
                    "id": this.iconId,
                    "pic": this.updateImg[0].url,
                    "content": this.h5Link || this.goodsNo,
                    "startTime": this.startDate,
                    "endTime": this.endDate,
                    "name": this.title,
                    "sort": this.sortNum,
                    "targetId": this.goodType,
                    "targetWay": this.type,
                };
                console.log(postData);
                this.$confirm("此操作将修改该图标 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    Operate.advertisingUpdate(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('修改成功');
                            this.$router.push('/operate/iconIndex')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message('修改失败，' + res.message);
                        }

                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });

            },
            /**
             * 获取详情
             */
            getDetail(){
                Operate.advertisingDetail({"id":this.iconId}).then(res=>{
                    console.log(res);
                    if(res.code==200){
                        this.location = map[res.data.bannerType];
                        this.locations = res.data.bannerType;
                        this.title = res.data.name;
                        this.updateImg.push({ url : res.data.pic});
                        this.sortNum = res.data.sort;
                        this.goodName = res.data.goodName;
                        this.startDate = res.data.startTime;
                        this.endDate = res.data.endTime;
                        this.type = res.data.targetWay;
                        if(this.type == 1) {
                            this.goodType = res.data.targetId;
                        }
                        if(this.type == 3) {
                            this.h5Link = res.data.content;
                        }
                        if(this.type == 2) {
                            this.goodsNo = res.data.content;
                        }
                    }else if(res.code==100070 || res.code == 404){
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    }else {
                        this.$message.warning(res.message);
                    }

                })
            }
        },
        mounted() {
            if (this.$route.query) {
                this.iconId = this.$route.query.iconId;
                this.locations = this.$route.query.type;
                this.location = map[this.$route.query.type]
            }
            // 获取商品分类
            this.getClassify();
            //    获取图标详情
            this.getDetail();
        },
    }
</script>

<style lang="scss">
    #updateIcon {
        width: 100%;
        height: 100%;

        .el-main {
            .content {
                width: 100%;
                height: 100%;
                background-color: #FFFFFF;
                text-align: left;
                padding: 13px 30px 30px;
                .back {
                    font-size: 20px;
                    color: #3E3E4D;
                }
                .box-card {
                    width: 60%;
                    /*height: calc(100% - 90px);*/
                    position: relative;
                    margin: 20px 0;
                    .row {
                        display: flex;
                        align-items: center;
                        margin: 10px 0;
                        position: relative;
                        p {
                            min-width: 180px;
                            text-align: left;
                        }
                        .typeText {
                            line-height: 40px;
                            position: absolute;
                            left: 12px;
                            top: 0;
                            z-index: 99;
                        }
                        .el-select {
                            width: 170px;
                            margin-right: 10px;
                            input.el-input__inner {
                                width: 170px;
                            }
                        }
                        .el-select:nth-child(3) {
                            width: 280px;
                            input.el-input__inner {
                                width: 280px;
                            }
                        }
                        .el-select:last-child {
                            width: 280px;
                            input.el-input__inner {
                                width: 280px;
                            }
                        }
                        strong {
                            color: red;
                        }
                        .btn {
                            display: flex;
                        }
                        input {
                            width: 460px;
                        }
                        .inputT  {
                            width: 280px;
                            input {
                                width: 280px;
                            }
                        }
                        .dateBox {
                            input {
                                width: 220px;
                            }
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
                    }
                    .row:last-child {
                        display: flex;
                        align-items: baseline;
                    }
                }
                .save {
                    width: 300px;
                    height: 50px;
                    font-size: 24px;
                }
            }
        }
    }
</style>
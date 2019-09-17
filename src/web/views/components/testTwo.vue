<template>
    <div id="testTwo">
        <div class="content">
            <!-- 第一页 start -->
            <div class="classifyBox" v-show="onePage">
                <div class="back">
                    <el-button type="text" icon="el-icon-arrow-left" @click="$router.push('/goods')">返回</el-button>
                </div>
                <div class="search">
                    <span>搜索商品分类：</span>
                    <el-input v-model="inputClassify" placeholder="请搜索"></el-input>
                </div>
                <div class="itemBox">
                    <!--   一级分类   -->
                    <div class="item">
                        <p>请选择一级分类</p>
                        <p @click="choClassify(ele,i,1)" :class="{act:oneIndex==i}" v-for="(ele,i) in oneClassify" :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   二级分类   -->
                    <div class="item">
                        <p>请选择二级分类</p>
                        <p @click="choClassify(ele,i,2)" :class="{act:twoIndex==i}" v-for="(ele,i) in twoClassify" :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   三级分类   -->
                    <div class="item">
                        <p>请选择三级分类</p>
                        <p @click="choClassify(ele,i,3)" :class="{act:threeIndex==i}" v-for="(ele,i) in threeClassify" :key="i">{{ele.text}}</p>
                    </div>
                </div>
                <p class="showClassify">
                    您当前选择的商品类别是：
                    <span v-for="(ele,i) in chooseClassify" :key="i"><i v-show="i!=0">-</i>{{ele.text}}</span>
                </p>
                <div class="oneNext"><el-button @click="goTwo" type="primary" round>下一步</el-button></div>
            </div>
            <!-- 第一页end -->


            <!-- 第二页 start -->
            <div class="infoBox" v-show="twoPage">
                <h1>通用信息</h1>
                <div class="row">
                    <h2>商品分类：</h2>
                    <div>
                        <span v-for="(ele,i) in chooseClassify" :key="i"><i style="margin: 0 3px" v-show="i!=0">-</i>{{ele.text}}</span>
                        <img class="editImg" src="../../../assets/img/views/goods/editClassify@2x.png" alt="" @click="goOne">
                    </div>

                </div>
                <div class="row">
                    <h2>商品名称：</h2>
                    <div>
                        <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
                    </div>
                </div>
                <!--<div class="row">-->
                <!--<h2>商品排序：</h2>-->
                <!--<div>-->
                <!--<el-input v-model="goodsSort" type="number" placeholder="请输入商品排序"></el-input>-->
                <!--</div>-->
                <!--</div>-->
                <div class="row">
                    <h2>商品描述：</h2>
                    <div>
                        <el-input v-model="goodsDescribe" autosize maxlength="60" placeholder="请输入商品描述" type="textarea"></el-input>
                        <p class="remark">注：限制60字以内。</p>
                    </div>
                </div>
                <div class="row">
                    <h2>供货价：</h2>
                    <div>
                        <el-input v-model="price" type="number" @blur="isPrice(price,1)" placeholder="请输入供货价"></el-input>
                        <p class="remark">平台和商家结算按照供货价结算，供货价包含5%平台服务费和商家自行设置的用户返利。</p>
                    </div>
                </div>
                <div class="row">
                    <h2>外部图：</h2>
                    <!--:action="$baseUrl+'/upImage/upload'"-->
                    <!--:action="'https://product.dianjishenghuo.cn/store'+'/upImage/upload'"-->
                    <div>
                        <el-upload
                                class="avatar-uploader"
                                :action="$baseUrl+'/upImage/upLoad'"
                                :show-file-list="false"
                                name = "photo"
                                :on-success="goodsImgWin"
                                :on-error="goodsImgFail"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="remark">图片尺寸宽344*高458像素</p>
                    </div>
                </div>
                <div class="row">
                    <h2>配送方式：</h2>
                    <div>
                        <el-radio v-model="logisticsWay" label="1">商家直接发货</el-radio>
                        <!--<el-radio v-model="logisticsWay" label="2">云仓配送</el-radio>-->
                    </div>
                </div>
                <div class="row">
                    <h2>默认运费：</h2>
                    <div>
                        <el-radio v-model="logisticsPrice" label="1">部分地方包邮（新疆、内蒙古、青海、四川、宁夏地区除外）</el-radio>
                    </div>
                </div>
                <div class="row">
                    <h2>退换货：</h2>
                    <div>
                        <el-radio v-model="safeReturn" label="1">15天无忧退换货</el-radio>
                    </div>
                </div>
                <div class="row">
                    <h2>详情图文：</h2>
                    <div>
                        <ul>
                            <li class="detailBox" v-for="(ele,i) in ruleList" :key="i">
                                <h3>{{ele.title}}</h3>
                                <ol>
                                    <li v-for="(val,v) in ele.detail" :key="v">{{val.text}}</li>
                                </ol>
                            </li>
                        </ul>

                        <div class="edit_container">
                            <el-card style="height: 560px;">
                                    <div class="app-container" append-to-body>
                                        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="close">
                                            <el-form :inline="true" :rules="rules" ref="dataforms" :model="form" label-width="100px" size="mini">
                                                <div class="avatar">
                                                    <!-- 图片上传组件辅助-->
                                                    <el-upload
                                                            class="avatar-uploader"
                                                            :action="serverUrl"
                                                            name="img"
                                                            :show-file-list="false"
                                                            :on-success="uploadSuccess"
                                                            :on-error="uploadError"
                                                            :before-upload="beforeUpload">
                                                    </el-upload>
                                                </div>
                                                <el-row v-loading="quillUpdateImg">
                                                    <el-form-item label="警示信息" prop="content">
                                                        <div class="edit_container">
                                                            <div class="pre-view">
                                                                <el-button type="primary" @click="preView">预览</el-button>
                                                            </div>
                                                            <quill-editor
                                                                    v-model="form.content"
                                                                    ref="myQuillEditor"
                                                                    :options="editorOption"
                                                                    @blur="onEditorBlur($event)"
                                                                    @focus="onEditorFocus($event)"
                                                                    @change="onEditorChange($event)">
                                                            </quill-editor>
                                                            <div class="limit">
                                                                <div class="limit-tip">友情提示：支持第三方微信编辑器的内容复制</div>
                                                                <div class="limit-content">当前已输入 <span>{{contentLen}}</span> 个字符，您还可以输入 <span>{{surPlusLen}}</span> 个字符。
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </el-form-item>
                                                </el-row>
                                            </el-form>
                                        </el-dialog>
                                    </div>

                            </el-card>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <h2>备注：</h2>
                    <div class="remarks">
                        <el-input v-model="goodsRemark"  autosize type="textarea"></el-input>
                        <p class="remark">仅供商家自己看的信息</p>
                    </div>
                </div>
                <div class="btnBox">
                    <el-button type="primary" plain @click="goOne">上一步，选择商品分类</el-button>
                    <el-button type="primary" @click="goThree">下一步，填写商品属性</el-button>
                </div>
            </div>
            <!-- 第二页end -->


            <!-- 第三页 start -->
            <div class="infoBox SKUBox" v-show="threePage">
                <h1>增加商品</h1>
                <div class="row">
                    <h2>商品轮播图：</h2>
                    <div>
                        <p class="remark bannerRemark">图片尺寸宽750*高666像素，最多上传6张</p>
                        <!--:action="$baseUrl+'/upImage/upLoad'"-->
                        <!--:action="'https://product.dianjishenghuo.cn/store'+'/upImage/upLoad'"-->
                        <el-upload
                                :action="$baseUrl+'/upImage/upLoad'"
                                list-type="picture-card"
                                :limit="6"
                                name = "photo"
                                :on-preview="handlePictureCardPreview"
                                :on-exceed="handleExceed"
                                :on-success="bannerImgWin"
                                :on-error="bannerImgFail"
                                :file-list="bannerImg"
                                :before-upload="beforeAvatarUploadTwo"
                                :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                </div>
                <div class="tableBox">
                    <h2>规格库存设置：</h2>
                    <el-table
                            :header-cell-style="{background:'#fafafa'}"
                            border
                            :data="SKUTable"
                            style="width: 80%">
                        <el-table-column
                                label="商品名称">
                            <template>
                                <span>{{goodsName}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="cover"
                                label="库存">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.cover" type="number" placeholder="请输入库存"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="供货价">
                            <template slot-scope="scope">
                                <el-input v-model="price"  @blur="isPrice(price,1)" type="number" placeholder="请输入供货价"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="smallImg"
                                label="规格缩略图（宽224*高224）">
                            <template slot-scope="scope">
                                <el-upload
                                        class="avatar-uploader"
                                        :action="$baseUrl+'/upImage/upLoad'"
                                        :show-file-list="false"
                                        name = "photo"
                                        :on-success="smallImgWin"
                                        :on-error="smallImgFail"
                                        :before-upload="beforeAvatarUploadThree">
                                    <img v-if="scope.row.smallImg" :src="scope.row.smallImg" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="weightVal"
                                label="重量(g)">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.weightVal" type="number" placeholder="请输入重量"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="btnBox">
                    <el-button type="primary" plain @click="goTwo(3)">上一步，填写商品信息</el-button>
                    <el-button type="primary" :loading="isSubmit" @click="submit">提交上架</el-button>
                </div>
            </div>
            <!-- 第三页end -->
        </div>
    </div>
</template>

<script>
    import { Goods, Tags } from "@/web/module/lending";
    import { Quill, quillEditor } from 'vue-quill-editor' //调用编辑器
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    import ElDialog from '../../../../node_modules/element-ui/packages/dialog/src/component.vue'
    //引入font.css
    import '@/assets/css/font.css'
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{'header': 1}, {'header': 2}],               // custom button values
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
        [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
        [{'direction': 'rtl'}],                         // text direction

        [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
        [{'header': [1, 2, 3, 4, 5, 6, false]}],

        [{'color': []}, {'background': []}],          // dropdown with defaults from theme
        [{'font': []}],
        [{'align': []}],
        ['image'],
        ['clean']                                         // remove formatting button
    ];
    // 自定义字体大小
    // let Size = Quill.import('attributors/style/size');
    // Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
    // Quill.register(Size, true);
    //
    // // 自定义字体类型
    // var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
    //     '宋体', '黑体'];
    // var Font = Quill.import('formats/font');
    // Font.whitelist = fonts;
    // Quill.register(Font, true);


    export default {
        name: "testTwo",
        components: {
            //使用编辑器
            quillEditor,
            ElDialog,
        },
        data(){
            return {
                "isSubmit": false,//是否已点击提交【避免重复提交】
                "onePage": false,//第一页状态【true：显示；false：隐藏】
                "twoPage": true,//第二页状态【true：显示；false：隐藏】
                "threePage": false,//第三页状态【true：显示；false：隐藏】
                /* 第一页 */
                "inputClassify": '',//搜索分类输入框
                "oneClassify": [],
                "twoClassify": [],
                "threeClassify": [],
                "oneIndex": -1,
                "twoIndex": -1,
                "threeIndex": -1,
                "chooseClassify": [],//选择的分类
                /* 第二页 */
                "goodsName": '',//商品名称
                "goodsSort": '',//商品排序
                "goodsDescribe": '',//商品描述
                "price": '',//商品供货价
                "imageUrl": '',//外部图
                "logisticsWay": '1',//配送方式
                "logisticsPrice": '1',//默认运费
                "safeReturn": '1',//无忧退换
                "ruleList": [
                    {
                        "title": '一、基本要求',
                        "detail": [
                            {
                                "text": '1、手机详情总体大小：图片+文字，图片不超过20张，文字不超过5000字； 建议：所有图片都是本宝贝相关的图片',
                            }
                        ]
                    },
                    {
                        "title": '二、图片大小',
                        "detail": [
                            {
                                "text": '1、建议使用宽度750像素，高度小于等于960像素的图片; ',
                            },
                            {
                                "text": '2、格式为：JPEG\\JEPG\\GIF\\PNG; 举例：可以上传一张宽度为750，高度为960像素，格式为jpg的图片',
                            }
                        ]
                    },
                    {
                        "title": '三、文字要求',
                        "detail": [
                            {
                                "text": '1、每次插入文字不超过500个字，标点，特殊字符按照一个字计算；',
                            },
                            {
                                "text": '2、请手动输入文字，不要复制粘贴网页上的文字，防止出现乱码；',
                            },
                            {
                                "text": ' 3、以下特殊字符“<”、“>”、“\\”会被替换为空。 建议：不要添加太多的文字，这样看起来更清晰',
                            }
                        ]
                    },
                ],
                "content": null,
                // "editorOption": {
                //     "placeholder": "请输入",
                //     "theme": "snow", // or 'bubble'
                //     "modules": {
                //         "toolbar": {
                //             "container": '#toolbar'
                //         }
                //     }
                // },
                "goodsRemark": '',//商品备注
                /* 第三页 */
                // "dialogImageUrl": '',
                // "dialogVisible": false,
                "bannerImg": [],
                "SKUTable": [
                    {
                        "name": '',//商品名称
                        "cover": '',//库存
                        "price": '',//供货价
                        "smallImg": '',//规格缩略图
                        "weightVal": '',//重量
                    }
                ],
                editorOption: {
                    placeholder: '请输入内容',
                    theme: 'snow',  // or 'bubble'
                    modules: {
                        toolbar: {
                            container: toolbarOptions,  // 工具栏
                            handlers: {
                                'image': function (value) {
                                    if (value) {
                                        // 触发input框选择图片文件
                                        document.querySelector('.avatar-uploader input').click()
                                    } else {
                                        this.quill.format('image', false)
                                    }
                                }
                            }
                        }
                    }
                },
                quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
                serverUrl: `$baseUrl+'/upImage/upload'`, // 这里写你要上传的图片服务器地址
                form: {
                    content: ''
                },
                rules: {},
                contentLen: 0,
                surPlusLen: 4000,
                maxLen: 4000,
                dialogTitle: '',
                preTitle: '预览',
                dialogFormVisible: false,
                preDialogFormVisible: false,
                buttonShow: '',
                dialogImageUrl: '',
                dialogVisible: false
            }
        },
        computed: {
            editor () {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods:{
            // 编辑器光标离开 将编辑器内容发射给父组件
            onEditorBlur (editor) {
//      this.$emit('getValue', this.form.content)
            },

            // 编辑器获得光标
            onEditorFocus (editor) {
                editor.enable(true) // 实现达到上限字符可删除
            },

            // 编辑器文本发生变化
            onEditorChange ({editor, html, text}) {
                let textLength = 0
                if (html && html.trim() !== '') {
                    textLength = html.length
                }
                this.contentLen = textLength
                if (textLength > this.maxLen) {
                    this.surPlusLen = 0
                    this.$message.error('最多输入' + this.maxLen + '个字符')
                    this.$refs.myQuillEditor.quill.enable(false)
                } else {
                    this.surPlusLen = this.maxLen - Number(textLength)
                }
                this.$emit('getValue', this.form.content)
            },
            // 富文本图片上传前
            beforeUpload () {
                // 显示loading动画
                this.quillUpdateImg = true
            },

            uploadSuccess (response, file) {
                // response为图片服务器返回的数据
                try {
                    // 获取富文本组件实例
                    let quill = this.$refs.myQuillEditor.quill
                    // 如果上传成功
                    if (response.code === '0000') {
                        // 获取光标所在位置
                        let length = quill.getSelection().index
                        // 插入图片  res.info为服务器返回的图片地址
                        quill.insertEmbed(length, 'image', response.data.fileUrl)
                        // 调整光标到最后
                        quill.setSelection(length + 1)
                    } else {
                        this.$message.error('图片插入失败')
                    }
                } catch (e) {
                    console.log(e)
                    this.$message.error('图片插入失败')
                } finally {
                    // loading动画消失
                    this.quillUpdateImg = false
                }
            },

            // 富文本图片上传失败
            uploadError () {
                // loading动画消失
                this.quillUpdateImg = false
                this.$message.error('图片插入失败')
            },

            close () { // 关闭按钮事件
                this.dialogFormVisible = false
                this.$refs['dataforms'].resetFields()
            },
            preView () {
                if (this.form.content) {
                    this.preDialogFormVisible = true
                }
            },



            /**
             * 提示弹窗
             */
            open(message) {
                this.$alert(message, '提示', {
                    confirmButtonText: '确定',
                });
            },

            /**
             * 获取下级商品分类
             */
            getNextClassify(id,level){
                var postData = {
                    "parentId" : id
                };
                console.log(postData);
                Goods.nextClassify(postData).then(res=>{
                    console.log(res);
                    if( res.code == 200 ){
                        if( id == 0 || level == 0 ){
                            this.oneClassify = res.data;
                        }else if(level == 1) {
                            this.twoClassify = res.data;
                        }else if(level == 2) {
                            this.threeClassify = res.data;
                        }
                    }
                })
            },
            /**
             * 选择分类
             */
            choClassify(val,index,level){
                if( level == 1 ){
                    if(this.oneIndex != index){
                        this.twoClassify = [];
                        this.threeClassify = [];
                        this.twoIndex = -1;
                        this.chooseClassify = [];
                        this.chooseClassify.push(val);
                    }
                    this.oneIndex = index;
                }else if(level == 2) {
                    if(this.twoIndex != index){
                        this.chooseClassify.splice(1,1,val);
                        this.threeClassify = [];
                        this.threeIndex = -1;
                        if(this.chooseClassify.length == 3){
                            this.chooseClassify.splice(2);
                        }
                    }
                    this.twoIndex = index;
                }else if(level == 3) {
                    this.threeIndex = index;
                    this.chooseClassify.splice(2,1,val);
                }
                this.getNextClassify(val.id,level);
            },
            /**
             * 跳至第一页
             */
            goOne(){
                if(this.chooseClassify.length<3){
                    this.open('分类需细化至三级分类');
                    return false;
                }
                this.onePage = !this.onePage;
                this.twoPage = !this.twoPage;
            },
            /**
             * 跳至第二页
             */
            goTwo(nowPage){
                if(this.chooseClassify.length<3){
                    this.open('分类需细化至三级分类');
                    return false;
                }
                if(nowPage==3) {
                    this.twoPage = !this.twoPage;
                    this.threePage = !this.threePage;
                }else {
                    this.onePage = !this.onePage;
                    this.twoPage = !this.twoPage;
                }

            },
            /**
             * 跳至第三页
             */
            goThree(){
                console.log(this.imageUrl);
                if(this.goodsName==''){
                    this.open('请输入商品名称');
                    return false;
                }
                // if(this.goodsSort==''){
                //     this.open('请输入商品排序');
                //     return false;
                // }
                if(this.goodsDescribe==''){
                    this.open('请输入商品描述');
                    return false;
                }
                if(this.price==''){
                    this.open('请输入供货价');
                    return false;
                }
                if(this.imageUrl==''){
                    this.open('请上传外部图');
                    return false;
                }
                if(this.content==''){
                    this.open('请编辑详情图文');
                    return false;
                }
                this.threePage = !this.threePage;
                this.twoPage = !this.twoPage;
            },
            /**
             * 外部图上传成功
             * @param res
             * @param file
             */
            goodsImgWin(response, file, fileList) {
                console.log(response,file,fileList);
                if (response) {
                    if (response.code == 200) {
                        // this.bannerImg.push({url:  response.data});
                        // this.imageUrl = URL.createObjectURL(file.raw);
                        this.imageUrl = response.data;
                        console.log(this.imageUrl);
                    } else if(response.code==100070){
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    } else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({ center: true, type: "warning", message: response.message });
                    }
                }
            },

            /**
             * 外部图上传失败
             * @param res
             * @param file
             */
            goodsImgFail(err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * 图片上传前判断
             * @param file
             * @returns {boolean|Promise<T>}
             */
            beforeAvatarUpload(file) {
                // const isJPG = file.type === 'image/jpeg';
                let isJPG = false;
                if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    isJPG = file.type;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isSize = new Promise(function (resolve,reject) {
                    let width = 344;
                    let height = 458;
                    let _URL = window.URL || window.webkitURL;
                    let image = new Image();
                    image.onload = function () {
                        let valid = image.width <= width && image.height <= height;
                        valid ? resolve() : reject();
                    };
                    image.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸344*458最为合适');
                        return Promise.reject();
                    }
                );
                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isSize;
            },
            beforeAvatarUploadTwo(file) {
                // const isJPG = file.type === 'image/jpeg';
                let isJPG = false;
                if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    isJPG = file.type;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isSize = new Promise(function (resolve,reject) {
                    let width = 750;
                    let height = 666;
                    let _URL = window.URL || window.webkitURL;
                    let image = new Image();
                    image.onload = function () {
                        let valid = image.width <= width && image.height <= height;
                        valid ? resolve() : reject();
                    };
                    image.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸750*666最为合适');
                        return Promise.reject();
                    }
                );
                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isSize;
            },
            beforeAvatarUploadThree(file) {
                // const isJPG = file.type === 'image/jpeg';
                let isJPG = false;
                if(file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    isJPG = file.type;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isSize = new Promise(function (resolve,reject) {
                    let width = 224;
                    let height = 224;
                    let _URL = window.URL || window.webkitURL;
                    let image = new Image();
                    image.onload = function () {
                        let valid = image.width <= width && image.height <= height;
                        valid ? resolve() : reject();
                    };
                    image.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸224*224最为合适');
                        return Promise.reject();
                    }
                );
                if (!isJPG) {
                    this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M && isSize;
            },
            /**
             *  判断金额
             */
            isPrice(val,e){
                var reg = new RegExp("^\\d+(\\.\\d{0,2})?$");
                if(!reg.test(val)){
                    console.log(val,e);
                    if(this.price){
                        if(e==1){
                            console.log(val,val.substr(0,val.indexOf('.')+3));
                            this.price = val.substr(0,val.indexOf('.')+3)
                        }else if(e==0){
                            console.log(val,val.substr(0,val.indexOf('.')+3));
                            this.price = val.substr(0,val.indexOf('.')+3)
                        }
                        this.$message("请您输入正确的金额（只包含二位小数）");
                    }
                }
            },
            /**
             * 商品轮播图删除
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.bannerImg.forEach(ele=>{
                    console.log(ele);
                    if(ele.url === file.url) {
                        this.bannerImg.splice(this.bannerImg.indexOf(ele),1);
                    }
                });
                console.log(this.bannerImg);
            },
            /**
             * 商品轮播图预览
             * @param file
             */
            handlePictureCardPreview(file) {
                console.log(this.dialogImageUrl,file);
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(this.dialogImageUrl)
            },
            /**
             * 当超上传限制时的提示
             */
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            /**
             * 轮播图上传成功
             */
            bannerImgWin (response, file, fileList) {
                console.log(response,file,fileList);
                if (response) {
                    if (response.code == 200) {
                        this.bannerImg.push({url:  response.data});
                    } else if(response.code==100070){
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    }
                    else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({ center: true, type: "warning", message: response.message });
                    }
                }
                console.log(this.bannerImg);
            },
            /**
             * 轮播图上传失败
             */
            bannerImgFail (err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * 规格缩略图上传成功
             * @param res
             * @param file
             */
            smallImgWin(response, file, fileList) {
                console.log(response,file,fileList);
                if (response) {
                    if (response.code == 200) {
                        // this.bannerImg.push({url:  response.data});
                        // this.SKUTable[0].smallImg = URL.createObjectURL(file.raw);
                        this.SKUTable[0].smallImg = response.data;
                        console.log(this.SKUTable[0].smallImg)
                    } else if(response.code==100070){
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    } else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({ center: true, type: "warning", message: response.message });
                    }
                }
            },

            /**
             * 规格缩略图上传失败
             * @param res
             * @param file
             */
            smallImgFail(err, file, fileList) {
                console.log(err,file,fileList);
                this.$message.warning(err.message);
            },
            /**
             * 提交
             */
            submit(){
                console.log(this.bannerImg);
                if(this.bannerImg.length==0){
                    this.open('请上传商品轮播图');
                    return false;
                }
                if(this.SKUTable[0].cover==''){
                    this.open('请输入商品库存');
                    return false;
                }
                if(this.price==''){
                    this.open('请输入商品供货价');
                    return false;
                }
                if(this.SKUTable[0].smallImg==''){
                    this.open('请上传缩略图');
                    return false;
                }
                var bannerUrl = [];
                this.bannerImg.forEach(ele=>{
                    bannerUrl.push(ele.url);
                });
                // this.SKUTable[0].smallImg = this.SKUTable[0].smallImg.substr(5);
                // this.imageUrl = this.imageUrl.substr(5);
                console.log(this.SKUTable[0].smallImg, this.imageUrl);
                var postData = {
                    "cidOne": this.chooseClassify[0].id,
                    "cidOneName": this.chooseClassify[0].text,
                    "cidThree": this.chooseClassify[2].id,
                    "cidThreeName": this.chooseClassify[2].text,
                    "cidTwo": this.chooseClassify[1].id,
                    "cidTwoName": this.chooseClassify[1].text,
                    "goodsBanner": bannerUrl,
                    "goodsDesc": this.goodsDescribe,
                    "goodsDetail": this.content,
                    "remark": this.goodsRemark,
                    "goodsName": this.goodsName,
                    "skuPic": this.SKUTable[0].smallImg,
                    "sort": this.goodsSort ,
                    "stock": this.SKUTable[0].cover,
                    "storeGoodsUrl": this.imageUrl,
                    "vipPrice": this.price,
                    "weight": this.SKUTable[0].weightVal || 0
                };
                console.log(postData);
                this.$confirm("此操作将添加该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    this.isSubmit = true;
                    Goods.addGoods(postData).then(res=>{
                        console.log(res);
                        if(res.code==200){
                            this.$message('添加成功');
                            this.$router.push('/goods')
                        }else if(res.code==100070 || res.code == 404){
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        }else {
                            this.$message.warning('添加失败' + res.message);
                            this.isSubmit = false;
                        }
                    })
                }).catch(() => {
                    this.$message({ center: true, type: "info", message: "已取消".concat(text).concat("操作") });
                });
            }
        },
        created(){
            //    获取下级商品分类
            this.getNextClassify(0,0);
            //初始化富文本编辑器
            // setTimeout(function () {
            //     this.$router.go(0);
            // },100);
        }
    }
</script>

<style lang="scss">
    #testTwo {
        width: 100%;
        height: 100%;
        padding: 15px;
        color: #3E3E4D;
        .content {
            width: 100%;
            min-height: 100%;
            background: #fff;
            .classifyBox {
                height: 100%;
                text-align: left;
                padding: 25px 30px;
                .back {
                    .el-button {
                        font-size: 20px;
                        color: #3E3E4D;
                    }
                }
                .search {
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    font-weight: bold;
                    margin-left: 18px;
                    .el-input {
                        width: 400px;
                        margin: 40px 12px;
                        .el-input__inner {
                            text-align: center;
                        }
                    }
                }
                .itemBox {
                    width: 1580px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .item {
                        width: 432px;
                        height: 534px;
                        overflow: auto;
                        box-shadow: inset 2px 4px 14px 0 rgba(0,0,0,0.05);
                        border-radius: 12px;
                        border: 1px solid rgba(216,216,216,1);
                        padding: 0 24px;
                        p {
                            line-height: 58px;
                            border-bottom: 1px solid #D8D8D8;
                            padding-left: 36px;
                            font-size: 24px;
                            margin-top: 20px;
                        }
                        p.act {
                            color: #fff;
                            background: rgba(51,131,255,1);
                            border-radius: 6px;
                        }
                    }
                    b {
                        color: #3383FF;
                        font-size: 64px;
                        font-weight: 500;
                    }
                }
                @media screen and (max-width: 1400px) {
                    .itemBox {
                        width: 1200px;
                        .item {
                            width: 340px;
                        }
                        b {
                            font-size: 44px;
                        }
                    }

                }
                .showClassify {
                    display: flex;
                    align-items: center;
                    font-size: 20px;
                    margin: 30px 0 75px 45px;
                    span {
                        color: #3383FF;
                        margin: 0 3px;
                        i {
                            margin-right: 3px;
                        }
                    }
                }
                .oneNext {
                    width: 1580px;
                    text-align: right;
                    .el-button {
                        width: 324px;
                        height: 68px;
                        font-size: 24px;
                        border-radius: 34px;
                    }
                }
            }
            .infoBox {
                height: 100%;
                padding-bottom: 40px;
                h1 {
                    font-size: 36px;
                    font-weight: 500;
                    color: rgba(51,131,255,1);
                    line-height: 100px;
                    padding-left: 30px;
                    text-align: left;
                    border-bottom: 1px solid #DBDDDE;
                }
                .row {
                    display: flex;
                    align-items: flex-start;
                    margin: 30px 0;
                    font-size: 24px;
                    line-height: 32px;
                    h2 {
                        width: 318px !important;
                        line-height: 30px;
                        text-align: right;
                        font-size: 24px;
                        font-weight: 800;
                        margin-right: 20px;
                    }
                    div {
                        text-align: left;
                        .el-input,.el-textarea {
                            width: 400px;
                        }
                        /*.el-textarea {*/
                        /*min-height: 60px;*/
                        /*}*/
                        .remark {
                            font-size: 20px;
                            font-weight: bold;
                            color: rgba(145,145,145,1);
                            margin-top: 14px;
                        }
                        .bannerRemark {
                            margin: 0 0 20px 0 !important;
                        }
                        .editImg {
                            width: 28px;
                            height: 28px;
                            margin-left: 8px;
                            cursor: pointer
                        }
                        .el-radio__label {
                            font-size: 24px;
                        }
                        .detailBox:first-child {
                            margin-top: 0;
                        }
                        .detailBox {
                            display: flex;
                            align-items: baseline;
                            margin: 10px 0;
                            h3 {
                                white-space: nowrap;
                            }
                            ol {
                                li {
                                    font-size: 18px;
                                    margin-left: 20px;
                                }
                            }
                        }
                        .el-upload {
                            text-align: center;
                        }
                    }
                    .remarks {
                        display: flex;
                        align-items: flex-end;
                        margin-top: -10px;
                        .remark {
                            margin-left: 20px;
                        }
                    }
                }
                @media screen and (max-width: 1400px) {
                    .row {
                        h2 {
                            width: 218px !important;
                        }
                    }

                }
            }
            .SKUBox {
                .tableBox {
                    margin-left: 120px;
                    padding: 1px;
                    h2 {
                        text-align: left;
                        line-height: 80px;
                        font-size: 24px;
                        font-weight: 800;
                        margin-right: 20px;
                    }
                    .el-table {
                        margin: 1px 0;
                        .cell{
                            text-align: center;
                        }
                        .el-input__inner {
                            border: 0;
                            text-align: center;
                        }
                    }
                }
                .btnBox {
                    margin: 32px 0;
                }
            }
        }
    }
</style>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
<style>
    .quill-editor {
        width: 800px;
        height: 250px;
    }

    .limit {
        margin-top: 81px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 800px;
        height: 30px;
        border: 1px solid #ccc;
        line-height: 30px;
        text-align: right;
    }

    .limit > div {
        display: inline-block;
        width: 49%;
    }

    .limit > div.limit-tip {
        text-align: left;
    }

    .limit span {
        color: #ee2a7b;
    }

    .avatar {
        display: none;
    }

    .edit_container {
        position: relative;
    }

    .pre-view {
        position: absolute;
        left: 800px;
    }

    .pre-div {
        width: 800px;
        margin: 0 auto;
    }
</style>
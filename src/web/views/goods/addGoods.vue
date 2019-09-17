<template>
    <div id="addGoods">
        <div class="content">
            <!-- 第一页 start -->
            <div class="classifyBox" v-show="onePage">
                <div class="back">
                    <el-button type="text" icon="el-icon-arrow-left" @click="$router.push('/goods')">返回</el-button>
                </div>
                <div class="search">
                    <!--<span style="margin: 10px">选择商品分类：</span>-->
                    <span>搜索商品分类：</span>
                    <el-input v-model="inputClassify" placeholder="请搜索"></el-input>
                    <el-button type="primary" @click="search" size="small">搜索</el-button>
                </div>
                <div class="itemBox">
                    <!--   一级分类   -->
                    <div class="item">
                        <p>请选择一级分类</p>
                        <p @click="choClassify(ele,i,1)" :class="{act:oneIndex==i}" v-for="(ele,i) in oneClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   二级分类   -->
                    <div class="item">
                        <p>请选择二级分类</p>
                        <p @click="choClassify(ele,i,2)" :class="{act:twoIndex==i}" v-for="(ele,i) in twoClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                    <b>→</b>
                    <!--   三级分类   -->
                    <div class="item">
                        <p>请选择三级分类</p>
                        <p @click="choClassify(ele,i,3)" :class="{act:threeIndex==i}" v-for="(ele,i) in threeClassify"
                           :key="i">{{ele.text}}</p>
                    </div>
                </div>
                <p class="showClassify">
                    您当前选择的商品类别是：
                    <span v-for="(ele,i) in chooseClassify" :key="i"><i v-show="i!=0">-</i>{{ele.text}}</span>
                </p>
                <div class="oneNext">
                    <el-button @click="goTwo" type="primary" round>下一步</el-button>
                </div>
            </div>
            <!-- 第一页end -->


            <!-- 第二页 start -->
            <div class="infoBox" v-show="twoPage">
                <h1>通用信息</h1>
                <div class="row">
                    <h2>商品分类：</h2>
                    <div>
                        <span v-for="(ele,i) in chooseClassify" :key="i"><i style="margin: 0 3px" v-show="i!=0">-</i>{{ele.text}}</span>
                        <img class="editImg" src="../../../assets/img/views/goods/editClassify@2x.png" alt=""
                             @click="goOne">
                    </div>

                </div>
                <div class="row">
                    <h2>商品货号：</h2>
                    <div>{{goodsNo}}</div>
                </div>
                <div class="row">
                    <h2>商品名称：</h2>
                    <div>
                        <el-input v-model="goodsName" placeholder="请输入商品名称"></el-input>
                    </div>
                </div>
                <div class="row">
                    <h2>商品描述：</h2>
                    <div>
                        <el-input v-model="goodsDescribe" autosize maxlength="60" placeholder="请输入商品描述"
                                  type="textarea"></el-input>
                        <p class="remark">注：限制60字以内。</p>
                    </div>
                </div>
                <div class="row">
                    <h2>商品条形码：</h2>
                    <div>
                        <el-input v-model="goodsBarCode" autosize maxlength="60" placeholder="请输入商品条形码"
                                  type="text"></el-input>
                    </div>
                </div>
                <div class="row">
                    <h2>默认统一价：</h2>
                    <div>
                        <el-input v-model="price" type="number" @blur="isPrice(price,0)"
                                  placeholder="请输入默认统一价"></el-input>
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
                                name="photo"
                                :on-success="goodsImgWin"
                                :on-error="goodsImgFail"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        <p class="remark">图片尺寸宽344*高344像素</p>
                    </div>
                </div>
                <div class="row">
                    <h2>商品类型：</h2>
                    <div>
                        <el-select v-model="skuId" placeholder="请选择商品类型" @change="choSku" clearable>
                            <el-option
                                    v-for="item in skuList"
                                    :key="item.id"
                                    :label="item.templateName"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                        <p class="remark">注：可不选。选择后必须设置至少一个规格及至少一个属性</p>
                    </div>
                </div>
                <div class="row" v-show="showStandard">
                    <h2>设置规格：</h2>
                    <div style="width: 60%">
                        <el-card class="standardBox">
                            <el-card class="box-card" v-for="(item,index) in skuDetailListDefault" :key="index">
                                <div slot="header" class="clearfix">
                                    <div class="standard">
                                        <p>规格{{mapSkuIndex[index]}}:</p>
                                        <el-select v-model="item.id" placeholder="请选择商品规格" clearable>
                                            <el-option
                                                    v-for="selectItem in selectList(item.id)"
                                                    :key="selectItem.id"
                                                    :label="selectItem.templateName"
                                                    :value="selectItem.id"
                                                    :disabled="selectItem.disabled">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <p style="margin-bottom: 6px">规格属性：</p>

                                <el-checkbox-group v-show="item.id" v-model="item.checkList">
                                    <el-checkbox
                                            v-for="(val,v) in formatCheckList(item.id)"
                                            :key="v"
                                            :label="val.id">{{val.templateName}}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-card>
                        </el-card>
                        <p class="remark">注：所有规格属性总数不得超过22个。</p>
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
                    <h2>商品轮播图：</h2>
                    <div>
                        <p class="remark bannerRemark">图片尺寸宽750*高666像素，最多上传6张</p>
                        <!--:action="$baseUrl+'/upImage/upLoad'"-->
                        <!--:action="'https://product.dianjishenghuo.cn/store'+'/upImage/upLoad'"-->
                        <el-upload
                                :action="$baseUrl+'/upImage/upLoad'"
                                list-type="picture-card"
                                :limit="6"
                                name="photo"
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

                        <div>
                            <!--:action="$baseUrl+'/upImage/upLoad'"-->
                            <!--:action="'https://product.dianjishenghuo.cn/store'+'/upImage/upLoad'"-->
                            <el-upload
                                    :action="$baseUrl+'/upImage/upLoad'"
                                    list-type="picture-card"
                                    :limit="8"
                                    name="photo"
                                    :on-preview="handleDetailPreview"
                                    :on-exceed="handleExceedDetail"
                                    :on-success="detailImgWin"
                                    :on-error="detailImgFail"
                                    :file-list="detailImg"
                                    :before-upload="beforeAvatarUploadDetail"
                                    :on-remove="handleRemoveDetail">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogDetailVisible" size="tiny">
                                <img width="100%" :src="dialogDetailImageUrl" alt="">
                            </el-dialog>
                        </div>

                        <!--  以前的版本-含富文本编辑器 start  -->

                        <!--<div class="edit_container">-->
                        <!--<el-card style="height: 560px;">-->
                        <!--<quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption">-->
                        <!--&lt;!&ndash;自定义toolar&ndash;&gt;-->
                        <!--<div id="toolbar" slot="toolbar">-->
                        <!--&lt;!&ndash; Add a bold button &ndash;&gt;-->
                        <!--<button class="ql-bold" title="加粗">Bold</button>-->
                        <!--<button class="ql-italic" title="斜体">Italic</button>-->
                        <!--<button class="ql-underline" title="下划线">underline</button>-->
                        <!--<button class="ql-strike" title="删除线">strike</button>-->
                        <!--<button class="ql-blockquote" title="引用"></button>-->
                        <!--<button class="ql-code-block" title="代码"></button>-->
                        <!--<button class="ql-header" value="1" title="标题1"></button>-->
                        <!--<button class="ql-header" value="2" title="标题2"></button>-->
                        <!--&lt;!&ndash;Add list &ndash;&gt;-->
                        <!--<button class="ql-list" value="ordered" title="有序列表"></button>-->
                        <!--<button class="ql-list" value="bullet" title="无序列表"></button>-->
                        <!--&lt;!&ndash; Add font size dropdown &ndash;&gt;-->
                        <!--<select class="ql-header" title="段落格式">-->
                        <!--<option selected>段落</option>-->
                        <!--<option value="1">标题1</option>-->
                        <!--<option value="2">标题2</option>-->
                        <!--<option value="3">标题3</option>-->
                        <!--<option value="4">标题4</option>-->
                        <!--<option value="5">标题5</option>-->
                        <!--<option value="6">标题6</option>-->
                        <!--</select>-->
                        <!--<select class="ql-size" title="字体大小">-->
                        <!--<option value="10px">10px</option>-->
                        <!--<option value="12px">12px</option>-->
                        <!--<option value="14px">14px</option>-->
                        <!--<option value="16px" selected>16px</option>-->
                        <!--<option value="18px">18px</option>-->
                        <!--<option value="20px">20px</option>-->
                        <!--</select>-->
                        <!--<select class="ql-font" title="字体">-->
                        <!--<option value="SimSun">宋体</option>-->
                        <!--<option value="SimHei">黑体</option>-->
                        <!--<option value="Microsoft-YaHei">微软雅黑</option>-->
                        <!--<option value="KaiTi">楷体</option>-->
                        <!--<option value="FangSong">仿宋</option>-->
                        <!--<option value="Arial">Arial</option>-->
                        <!--</select>-->
                        <!--&lt;!&ndash; Add subscript and superscript buttons &ndash;&gt;-->
                        <!--<select class="ql-color" value="color" title="字体颜色"></select>-->
                        <!--<select class="ql-background" value="background" title="背景颜色"></select>-->
                        <!--<select class="ql-align" value="align" title="对齐"></select>-->
                        <!--<button class="ql-clean" title="还原"></button>-->

                        <!--<button class="ql-image" title="上传图片"></button>-->
                        <!--&lt;!&ndash; You can also add your own &ndash;&gt;-->
                        <!--</div>-->
                        <!--</quill-editor>-->
                        <!--</el-card>-->
                        <!--</div>-->
                        <!--  以前的版本-含富文本编辑器 end  -->
                    </div>
                </div>
                <div class="row">
                    <h2>备注：</h2>
                    <div class="remarks">
                        <el-input v-model="goodsRemark" autosize type="textarea"></el-input>
                        <p class="remark">仅供商家自己看的信息</p>
                    </div>
                </div>
                <div class="btnBox">
                    <el-button type="primary" plain @click="goOne">上一步，选择商品分类</el-button>
                    <el-button type="primary" @click="goThree">保存商品，去填写商品属性</el-button>
                </div>
            </div>
            <!-- 第二页end -->


            <!-- 第三页 start -->
            <div class="infoBox SKUBox" v-show="threePage">
                <h1>商品规格</h1>
                <!--<div class="tableBox">-->
                    <!--<h2>设置商品消费返利和推荐奖励：</h2>-->
                <!--</div>-->
                <div class="row">
                    <h2>消费返利：</h2>
                    <div>
                        <el-input v-model="consume" @blur="isSize(consume,0)" placeholder="请输入消费返利（%）"></el-input> %
                        <p class="remark">注：消费返利为商家推出的营销工具，用户购买能得到商家设置的返利金额。返利金额最高不超过商品的50%。</p>
                    </div>
                </div>
                <div class="row">
                    <h2>推荐奖励：</h2>
                    <div>
                        <el-input v-model="recommend" @blur="isSize(recommend,1)" placeholder="请输入推荐奖励（%）"></el-input> %
                        <p class="remark">注：商家设置推荐奖励为了鼓励平台用户为其分销。 为了避免恶意竞争，推奖奖励最高不超过45%，不能低于2% 。</p>
                    </div>
                </div>
                <div class="tableBox">
                    <h2>规格库存设置：</h2>
                    <!--:span-method="objectSpanMethod1"-->
                    <el-table
                            :header-cell-style="{background:'#fafafa'}"
                            border
                            :data="skuTable"
                            :height="tableHeight"
                            :span-method="objectSpanMethod1"
                            style="width: 80%">
                        <el-table-column
                                v-if="skuOne"
                                :key="1"
                                prop="skuName1"
                                label="规格一">
                        </el-table-column>
                        <el-table-column
                                v-if="skuTwo"
                                :key="2"
                                prop="skuName2"
                                label="规格二">
                        </el-table-column>
                        <el-table-column
                                v-if="skuThree"
                                :key="3"
                                prop="skuName3"
                                label="规格三">
                        </el-table-column>
                        <el-table-column
                                :key="4"
                                prop="stock"
                                label="库存">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.stock" @blur="isStock(scope.row)" type="number"
                                          placeholder="请输入库存"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="5"
                                prop="price"
                                label="供货价">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.price" @blur="isPrice(scope.row,1)" type="number"
                                          placeholder="请输入供货价"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="6"
                                prop="skuPic"
                                label="规格缩略图（宽224*高224）">
                            <template slot-scope="scope">
                                <!--:show-file-list="false"-->
                                <el-upload
                                        class="avatar-uploader"
                                        :action="$baseUrl+'/upImage/upLoad'"
                                        :show-file-list="false"
                                        name="photo"
                                        :on-success="smallImgWin(scope.$index)"
                                        :on-error="smallImgFail"
                                        :before-upload="beforeAvatarUploadThree">
                                    <img v-if="scope.row.skuPic" :src="scope.row.skuPic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </template>
                        </el-table-column>
                        <el-table-column
                                :key="7"
                                prop="skuNo"
                                label="商品规格号">
                        </el-table-column>
                        <!--<el-table-column-->
                        <!--prop="weightVal"-->
                        <!--label="重量(g)">-->
                        <!--<template slot-scope="scope">-->
                        <!--<el-input v-model="scope.row.weightVal" type="number" placeholder="请输入重量"></el-input>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                    </el-table>
                </div>
                <div class="btnBox">
                    <!--<el-button type="primary" plain @click="goTwo(3)">上一步，填写商品信息</el-button>-->
                    <el-button type="primary" :loading="isSubmit2" @click="submit">提交</el-button>
                </div>
            </div>
            <!-- 第三页end -->
        </div>
    </div>
</template>

<script>
    import {Sku, Goods, Tags} from "@/web/module/lending";
    import { compress } from '@/assets/js/imgCompress';//引入压缩图片
    import imageCompression from 'browser-image-compression';//引入压缩图片
    import {Quill, quillEditor} from 'vue-quill-editor' //调用编辑器
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'
    //引入font.css
    import '@/assets/css/font.css'


    // 自定义字体大小
    let Size = Quill.import('attributors/style/size');
    Size.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px'];
    Quill.register(Size, true);

    // 自定义字体类型
    var fonts = ['SimSun', 'SimHei', 'Microsoft-YaHei', 'KaiTi', 'FangSong', 'Arial', 'Times-New-Roman', 'sans-serif',
        '宋体', '黑体'];
    var Font = Quill.import('formats/font');
    Font.whitelist = fonts;
    Quill.register(Font, true);


    export default {
        name: "addGoods",
        components: {
            //使用编辑器
            quillEditor
        },
        data() {
            return {
                "tableHeight": 600,
                "isSubmit": false,//是否已点击提交【避免重复提交】
                "isSubmit2": false,//是否已点击提交规格设置列表【避免重复提交】
                "onePage": true,//第一页状态【true：显示；false：隐藏】
                "twoPage": false,//第二页状态【true：显示；false：隐藏】
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
                "oneClassifyId": '',
                /* 第二页 */
                "showStandard": false,//是否展示规格，【展示：true，隐藏：false】
                "goodsNo": '',//商品货号
                "goodsName": '',//商品名称
                "goodsSort": '',//商品排序
                "goodsDescribe": '',//商品描述
                "goodsBarCode": '',//商品条形码
                "price": '',//商品默认统一价
                "imageUrl": '',//外部图
                "skuId": '',//skuId
                "choSkuData": '',//选择的sku对象
                "skuTemplateReq": {
                    // "id": "",//模板id
                    // "templateName": "",//模板名称
                    // "cateId": '',//所属分类id
                    // "cateName": '',//所属分类名称
                    // "skuItemList": [
                    //     {
                    //         id: 1,
                    //         templateName: '',
                    //         skuSecondItemList: [
                    //             {
                    //                 id: '',
                    //                 templateName: '',
                    //             }
                    //         ]
                    //     }
                    // ],//模板列表
                },//数据联调--sku列表数据
                "skuList": [
                    // {
                    //     id: 1,
                    //     text: '衣服'
                    // }
                ],//sku数据
                "mapSkuIndex": {0: '一', 1: '二', 2: '三'},
                // "standardId": '',//standardId
                "skuDetailList": [
                    // {
                    //     id: 3,
                    //     name: '大小2',
                    //     attrText: '',
                    //     flag: false,
                    //     checkList: [],//选中的规格属性
                    //     standardId: '',//选中的规格id
                    //     child: [
                    //         {
                    //             id: 3-1,
                    //             text: 'XS2',
                    //         },
                    //         {
                    //             id: 3-2,
                    //             text: 'S2',
                    //         },
                    //         {
                    //             id: 3-3,
                    //             text: 'M2',
                    //         },
                    //         {
                    //             id: 3-4,
                    //             text: 'L2',
                    //         },
                    //         {
                    //             id: 3-5,
                    //             text: 'XL2',
                    //         },
                    //         {
                    //             id: 3-6,
                    //             text: 'XXL2',
                    //         },
                    //         {
                    //             id: 3-7,
                    //             text: 'XXXL2',
                    //         },
                    //         {
                    //             id: 3-8,
                    //             text: 'XXXXL2',
                    //         },
                    //     ],
                    // }
                ],
                skuDetailListDefault: [
                    // {
                    //     id: "",
                    //     name: "",
                    //     checkList: []
                    // }
                ],
                "logisticsWay": '1',//配送方式
                "logisticsPrice": '1',//默认运费
                "safeReturn": '1',//无忧退换
                "ruleList": [
                    {
                        "title": '详情图片要求',
                        "detail": [
                            {
                                "text": '1、建议：所有图片都是本宝贝相关的图片',
                            },
                            {
                                "text": '2、宽度600像素不限制高度，大小不超过400kb，详情图片总数不超过8张;',
                            },
                            {
                                "text": '3、格式为：JPEG\\JEPG\\PNG',
                            },
                        ]
                    }
                ],
                "content": null,
                "editorOption": {
                    "placeholder": "请输入",
                    "theme": "snow", // or 'bubble'
                    "modules": {
                        "toolbar": {
                            "container": '#toolbar'
                        }
                    }
                },
                "goodsRemark": '',//商品备注
                "dialogDetailImageUrl": '',
                "dialogDetailVisible": false,
                "detailImg": [],
                "dialogImageUrl": '',
                "dialogVisible": false,
                "bannerImg": [],

                /* 第三页 */
                "goodsId": '52',//商品id -- 添加至第三步需用id获取规格设置列表
                "skuOne": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "skuTwo": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "skuThree": true,//商品id -- 添加至第三步需用id获取规格设置列表
                "consume": '',//消费返利
                "recommend": '',//推荐奖励
                "skuTable": [],
                "spanArr": [],
                "pos": "",
                "spanArr1": [],
                "pos1": ""
            }
        },
        methods: {
            /**
             * 规格数组
             */
            selectList(itemId) {
                console.log(itemId);
                // Array.from(object, mapFunction, thisValue)通过拥有 length 属性的对象或可迭代的对象来返回一个数组【bject:必需，要转换为数组的对象;mapFunction:可选，数组中每个元素要调用的函数。】
                return Array.from(this.skuDetailList, item => {
                    console.log(item);
                    //array.some(function(currentValue,index,arr),thisValue) 方法用于检测数组中的元素是否满足指定条件（函数提供）。
                    if (itemId !== item.id && this.skuDetailListDefault.some(i => i.id === item.id)) {
                        item.disabled = true;
                    } else {
                        item.disabled = false;
                    }
                    console.log(item);
                    console.log(this.skuDetailListDefault);
                    return item
                })
            },
            /**
             *  规格属性数组
             */
            formatCheckList(id) {
                let checkList = [];
                this.skuDetailList.some(item => {
                    if (item.id === id) {
                        checkList = item.skuSecondItemList;
                        return true
                    }
                });
                return checkList
            },
            /**
             * 图片压缩方法-canvas压缩
             */
            compressUpload(image) {
                let canvas = document.createElement('canvas')
                let ctx = canvas.getContext('2d')
                let initSize = image.src.length
                let {width} = image, {height} = image
                canvas.width = width
                canvas.height = height
                ctx.fillRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(image, 0, 0, width, height)

                // 进行最小压缩0.1
                let compressData = canvas.toDataURL('image/jpeg', 0.1)

                // 压缩后调用方法进行base64转Blob，方法写在下边
                let blobImg = this.dataURItoBlob(compressData)
                return blobImg
            },

            /**
             * base64转Blob对象
             */
            dataURItoBlob(data) {
                let byteString;
                if (data.split(',')[0].indexOf('base64') >= 0) {
                    byteString = atob(data.split(',')[1])
                } else {
                    byteString = unescape(data.split(',')[1])
                }
                let mimeString = data
                    .split(',')[0]
                    .split(':')[1]
                    .split(';')[0];
                let ia = new Uint8Array(byteString.length)
                for (let i = 0; i < byteString.length; i += 1) {
                    ia[i] = byteString.charCodeAt(i)
                }
                return new Blob([ia], {type: mimeString})
            },

            /**
             * skuTable -- 计算位置的方法
             */
            getSpanArr(data) {
                this.spanArr = [];
                this.pos = "";
                this.spanArr1 = [];
                this.pos1 = "";
                this.spanArr2 = [];
                this.pos2 = "";
                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr.push(1);
                        this.pos = 0;
                    } else {
                        // 判断当前元素与上一个元素是否相同
                        if (data[i].skuName1 === data[i - 1].skuName1) {
                            this.spanArr[this.pos] += 1;
                            this.spanArr.push(0);
                        } else {
                            this.spanArr.push(1);
                            this.pos = i;
                        }
                    }
                }

                for (var i = 0; i < data.length; i++) {
                    if (i === 0) {
                        this.spanArr1.push(1);
                        this.pos1 = 0;
                    } else {
                        //如果笛卡尔积一直递增下去的话 这是一个很蠢的方法 由于我的要求层数是已知的 这里偷懒了 不然应该用for循环
                        if (data[i].skuName2 === data[i - 1].skuName2) {
                            this.spanArr1[this.pos1] += 1;
                            this.spanArr1.push(0);
                        } else {
                            this.spanArr1.push(1);
                            this.pos1 = i;
                        }
                    }
                }

                console.log(this.spanArr);
            },
            /**
             * skuTable -- 合并行数
             */
            objectSpanMethod1({row, column, rowIndex, columnIndex}) {
                // columnIndex === 0 找到第一列，实现合并随机出现的行数
                if (columnIndex === 0) {
                    const _row = this.spanArr[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                    // columnIndex === 1 找到第二列，合并他的列数
                } else if (columnIndex === 1 && this.skuTable[0].skuName2 || columnIndex === 1 && this.skuTable[0].skuName3 ) {
                    const _row = this.spanArr1[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                }
                // this.getSpanArr(this.skuTable);
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
             * 搜索
             */
            search() {
                Goods.searchGoodsClassify({
                    "cateName": this.inputClassify
                }).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.chooseClassify = [];
                        var list = res.data;
                        this.twoClassify = list.twoCate;
                        this.threeClassify = list.threeCate;
                        var one, two, three;
                        if (!list.oneCateId) {
                            this.oneIndex = -1;
                            this.$message({center: true, type: "warning", message: '暂无此分类'});
                            return;
                        }
                        this.oneClassify.forEach((ele, i) => {
                            if (ele.id == list.oneCateId) {
                                this.oneIndex = i;
                                one = ele.text;
                                this.chooseClassify.push({id: list.oneCateId, text: one})
                            }
                        });
                        if (list.twoCate) {
                            this.twoClassify.forEach((ele, i) => {
                                if (ele.id == list.twoCateId) {
                                    this.twoIndex = i;
                                    two = ele.text;
                                    this.chooseClassify.push({id: list.twoCateId, text: two})
                                }
                            });
                        }
                        if (list.threeCate) {
                            this.threeClassify.forEach((ele, i) => {
                                if (ele.id == list.threeCateId) {
                                    this.threeIndex = i;
                                    three = ele.text;
                                    this.chooseClassify.push({id: list.threeCateId, text: three})
                                }
                            });
                        }
                        // this.chooseClassify.push({id:list.oneCateId,text:one},{id:list.twoCateId,text:two},{id:list.threeCateId,text:three},);
                        console.log(this.chooseClassify);
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning('搜索失败' + res.message);
                        this.isSubmit = false;
                    }
                })
            },
            /**
             * 选择SKU
             */
            choSku() {
                console.log(this.skuId);
                if (this.skuId == '') {
                    this.showStandard = false;
                    this.skuDetailList = [];
                    this.skuDetailListDefault = [];
                } else {
                    this.showStandard = true;
                    this.getStandardList();
                    this.choSkuData = this.skuList.filter(ele => {
                        return ele.id == this.skuId;
                    })
                    console.log(this.skuDetailListDefault, this.skuDetailList, this.choSkuData);
                }
            },
            /**
             * 获取下级商品分类
             */
            getNextClassify(id, level) {
                var postData = {
                    "parentId": id
                };
                console.log(postData);
                Goods.nextClassify(postData).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        if (id == 0 || level == 0) {
                            this.oneClassify = res.data;
                        } else if (level == 1) {
                            this.twoClassify = res.data;
                        } else if (level == 2) {
                            this.threeClassify = res.data;
                        }
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 获取商品货号
             */
            getGoodsNo() {
                Goods.goodsGetNo().then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.goodsNo = res.data;
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 获取商品规格列表 - 设置库存价格
             */
            getSkuTableList(id) {
                Goods.addGoodsSkuList({"goodsId": id}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.skuTable = res.data;
                        if(!this.skuTable[0].skuName1){
                            this.skuOne = false;
                        }
                        if(!this.skuTable[0].skuName2){
                            this.skuTwo = false;
                        }
                        if(!this.skuTable[0].skuName3){
                            this.skuThree = false;
                        }
                        this.getSpanArr(res.data);
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             *  获取对应分类下sku模板list
             */
            getSkuList() {
                Sku.skuListByClassify({"cid": this.chooseClassify[0].id}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.skuList = res.data;
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             *  获取对应sku模板下规格list
             */
            getStandardList() {
                Sku.standardListBySkuId({"templateId": this.skuId}).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.skuDetailList = res.data;
                        console.log(this.skuDetailList);
                        this.skuDetailListDefault = Array.from(this.skuDetailList, ele => {
                            return {
                                id: "",
                                name: "",
                                checkList: []
                            }
                        })
                    } else if (res.code == 100070 || res.code == 404) {
                        this.$message.warning(res.message);
                        this.$router.push('/')
                    } else {
                        this.$message.warning(res.message);
                    }
                })
            },
            /**
             * 选择分类
             */
            choClassify(val, index, level) {
                if (level == 1) {
                    // if(this.oneIndex != index){
                    this.twoClassify = [];
                    this.threeClassify = [];
                    this.twoIndex = -1;
                    this.chooseClassify = [];
                    this.chooseClassify.push(val);
                    // }
                    this.oneIndex = index;
                } else if (level == 2) {
                    // if(this.twoIndex != index){
                    this.chooseClassify.splice(1, 1, val);
                    this.threeClassify = [];
                    this.threeIndex = -1;
                    if (this.chooseClassify.length == 3) {
                        this.chooseClassify.splice(2);
                    }
                    // }
                    this.twoIndex = index;
                } else if (level == 3) {
                    this.threeIndex = index;
                    this.chooseClassify.splice(2, 1, val);
                }
                this.getNextClassify(val.id, level);
            },
            /**
             * 跳至第一页
             */
            goOne() {
                if (this.chooseClassify.length < 3) {
                    // this.open('分类需细化至三级分类');
                    // return false;
                }
                this.oneClassifyId = this.chooseClassify[0].id;
                this.onePage = !this.onePage;
                this.twoPage = !this.twoPage;
            },
            /**
             * 跳至第二页
             */
            goTwo(nowPage) {
                if (this.chooseClassify.length < 3) {
                    this.open('分类需细化至三级分类');
                    return false;
                }
                if(this.chooseClassify[0].id !== this.oneClassifyId){
                    this.skuId = '';
                    this.choSku();
                }
                if (nowPage == 3) {
                    this.twoPage = !this.twoPage;
                    this.threePage = !this.threePage;
                } else {
                    this.onePage = !this.onePage;
                    this.twoPage = !this.twoPage;
                }
                console.log(this.chooseClassify);
                this.getSkuList();
            },
            /**
             * 跳至第三页
             */
            goThree() {
                console.log(this.imageUrl);
                if (this.goodsName.trim() == '') {
                    this.open('请输入商品名称');
                    return false;
                }
                if (this.goodsDescribe.trim() == '') {
                    this.open('请输入商品描述');
                    return false;
                }
                if (this.goodsBarCode.trim() == '') {
                    this.open('请输入商品条形码');
                    return false;
                }
                if (this.price == '') {
                    this.open('请输入默认统一价');
                    return false;
                }
                if (this.imageUrl == '') {
                    this.open('请上传外部图');
                    return false;
                }
                if (this.skuId !== '') {
                    let standardNum = 0, attrNum = 0, len = this.skuDetailListDefault.length, choSkuList;
                    console.log(this.skuDetailListDefault, this.skuDetailList, standardNum, attrNum, len);

                    choSkuList = this.skuDetailListDefault.filter(ele => {
                        if (ele.id == '') {
                            standardNum++;
                        }
                        if (ele.checkList.length == 0) {
                            attrNum++;
                        }
                        return ele.id != ''
                    });
                    console.log(choSkuList, standardNum, attrNum, len);
                    if (standardNum == len) {
                        this.open('请至少选择一项规格');
                        return false;
                    }
                    if (standardNum < len || standardNum == len) {
                        if (attrNum > standardNum) {
                            this.open('请至少选择一项属性');
                            return false;
                        }
                    }
                    let list = Array.from(choSkuList, item => {
                        let newArr = {};
                        this.skuDetailList.some(it => {
                            console.log(it);
                            if (item.id === it.id) {
                                newArr.id = it.id;
                                newArr.templateName = it.templateName;
                                if (item.checkList) {
                                    newArr.skuSecondItemList = it.skuSecondItemList.filter(i => item.checkList.includes(i.id))
                                }
                            }
                        });
                        return newArr
                    });
                    console.log(list);
                    this.skuTemplateReq.id = this.skuId;
                    this.skuTemplateReq.templateName = this.choSkuData[0].templateName;
                    this.skuTemplateReq.cateId = this.chooseClassify[0].id;
                    this.skuTemplateReq.cateName = this.chooseClassify[0].text;
                    this.skuTemplateReq.skuItemList = list;
                    let num = 0;
                    this.skuTemplateReq.skuItemList.forEach(ite=>{
                        num += ite.skuSecondItemList.length;
                    });
                    if(num > 22){
                        this.open("设置规格属性总数不得大于22");
                        return false;
                    }
                }
                console.log(this.bannerImg);
                if (this.bannerImg.length == 0) {
                    this.open('请上传商品轮播图');
                    return false;
                }
                console.log(this.content);
                if (!this.detailImg) {
                    this.open('请编辑详情图文');
                    return false;
                }
                var bannerUrl = [], detailUrl = [];
                this.bannerImg.forEach(ele => {
                    bannerUrl.push(ele.url);
                });
                this.detailImg.forEach(ele => {
                    detailUrl.push(`<img width="100%" src="${ele.url}" alt="">`);
                    // detailUrl.push(ele.url);
                });
                this.content = detailUrl.join("");
                // this.content = detailUrl;
                console.log(this.content, this.skuDetailListDefault);
                var postData = {
                    "cidOne": this.chooseClassify[0].id,
                    "cidOneName": this.chooseClassify[0].text,
                    "cidThree": this.chooseClassify[2].id,
                    "cidThreeName": this.chooseClassify[2].text,
                    "cidTwo": this.chooseClassify[1].id,
                    "cidTwoName": this.chooseClassify[1].text,
                    "goodsBanners": bannerUrl,
                    "goodsBarCode": this.goodsBarCode,
                    "goodsTitle": this.goodsDescribe,
                    "goodsDetails": this.content,
                    "remark": this.goodsRemark,
                    "goodsName": this.goodsName,
                    "goodsNo": this.goodsNo,
                    "goodsPic": this.imageUrl,
                    "goodsPrice": this.price,
                    "skuTemplateReq": this.skuTemplateReq,
                };
                console.log(postData);

                this.$confirm("此操作将添加该商品 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    this.isSubmit = true;
                    Goods.addGoods(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('添加成功');
                            this.threePage = !this.threePage;
                            this.twoPage = !this.twoPage;
                            this.goodsId = res.data;
                            this.getSkuTableList(res.data);
                        } else if (res.code == 100070 || res.code == 404) {
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        } else {
                            this.$message.warning('添加失败' + res.message);
                            this.isSubmit = false;
                        }
                    })
                }).catch(() => {
                    this.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            },
            /**
             * 外部图上传成功
             * @param res
             * @param file
             */
            goodsImgWin(response, file, fileList) {
                console.log(response, file, fileList);
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log(isLt2M);
                if (response) {
                    if (response.code == 200) {
                        // this.bannerImg.push({url:  response.data});
                        // this.imageUrl = URL.createObjectURL(file.raw);
                        this.imageUrl = response.data;
                        console.log(this.imageUrl);
                    } else if (response.code == 100070) {
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    } else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({center: true, type: "warning", message: response.message});
                    }
                }
            },
            /**
             * 外部图上传失败
             * @param res
             * @param file
             */
            goodsImgFail(err, file, fileList) {
                console.log(err, file, fileList);
                const isLt2M = file.size / 1024 / 1024 < 2;
                console.log(isLt2M,file.size);
                this.$message.warning(err.message);
            },
            /**
             * 图片上传前判断
             * @param file
             * @returns {boolean|Promise<T>}
             */
          /*  beforeAvatarUpload(file) {

                // /!** browser-image-compression    开始 **!/
                //
                // // var imageFile = event.target.files[0];
                // console.log('originalFile instanceof Blob', file instanceof Blob); // true
                // console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                //
                // var options = {
                //     maxSizeMB: 1,
                //     maxWidthOrHeight: 1920,
                //     useWebWorker: true
                // };
                // imageCompression( file,options)
                //     .then(function (compressedFile) {
                //         console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                //         console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                //         return compressedFile;
                //     })
                //     .catch(function (error) {
                //         console.log(error.message);
                //     });
                // /!**  browser-image-compression   结束**!/


                // const isJPG = file.type === 'image/jpeg';
                let isJPG = false, that = this;
                if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    isJPG = file.type;
                }
                const isLt2M = file.size / 1024 / 1024 < 2;
                const isSize = new Promise(function (resolve, reject) {
                    let width = 344;
                    let height = 344;
                    let _URL = window.URL || window.webkitURL;
                    let image = new Image();
                    image.onload = function () {
                        let valid = image.width <= width && image.height <= height;
                        let resultBlob = '';
                        // 调用方法获取blob格式，方法写在下边
                        resultBlob = that.compressUpload(image);
                        valid ? resolve(resultBlob) : reject();
                        // resolve(resultBlob)

                    };
                    image.src = _URL.createObjectURL(file);
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸344*344最为合适');
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



            },*/
            beforeAvatarUpload(file) {
                let that = this;
                return new Promise((resolve, reject) => {
                    /** browser-image-compression 开始 **/

                    // var imageFile = event.target.files[0];
                    console.log('originalFile instanceof Blob', file instanceof Blob); // true
                    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

                    var options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    };
                    imageCompression( file,options)
                        .then(function (compressedFile) {
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                            let isJPG = false;
                            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                                isJPG = file.type;
                            }
                            const isLt2M = compressedFile.size / 1024 / 1024 < 2;
                            let width = 344;
                            let height = 344;
                            let _URL = window.URL || window.webkitURL;
                            let image = new Image();
                            image.onload = function () {
                                let valid = image.width <= width && image.height <= height;
                                let resultBlob = '';
                                // 调用方法获取blob格式，方法写在下边
                                resultBlob = that.compressUpload(image);
                                valid ? resolve(resultBlob) : reject();
                                // resolve(resultBlob)
                            }
                            image.src = _URL.createObjectURL(compressedFile);
                            if (!isJPG) {
                                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                            }
                            if (!isLt2M) {
                                this.$message.error('上传图片大小不能超过 2MB!');
                            }
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });
                    /** browser-image-compression 结束**/
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸344*344最为合适');
                        return Promise.reject();
                    }
                );
            },
            beforeAvatarUploadTwo(file) {
                let that = this;
                return new Promise((resolve, reject) => {
                    /** browser-image-compression 开始 **/

                    // var imageFile = event.target.files[0];
                    console.log('originalFile instanceof Blob', file instanceof Blob); // true
                    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

                    var options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    };
                    imageCompression( file,options)
                        .then(function (compressedFile) {
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                            let isJPG = false;
                            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                                isJPG = file.type;
                            }
                            const isLt2M = compressedFile.size / 1024 / 1024 < 2;
                            let width = 750;
                            let height = 666;
                            let _URL = window.URL || window.webkitURL;
                            let image = new Image();
                            image.onload = function () {
                                let valid = image.width <= width && image.height <= height;
                                let resultBlob = '';
                                // 调用方法获取blob格式，方法写在下边
                                resultBlob = that.compressUpload(image);
                                valid ? resolve(resultBlob) : reject();
                                // resolve(resultBlob)
                            }
                            image.src = _URL.createObjectURL(compressedFile);
                            if (!isJPG) {
                                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                            }
                            if (!isLt2M) {
                                this.$message.error('上传图片大小不能超过 2MB!');
                            }
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });
                    /** browser-image-compression 结束**/
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸750*666最为合适');
                        return Promise.reject();
                    }
                );
            },
            beforeAvatarUploadDetail(file) {
                let that = this;
                return new Promise((resolve, reject) => {
                    /** browser-image-compression 开始 **/

                    // var imageFile = event.target.files[0];
                    console.log('originalFile instanceof Blob', file instanceof Blob); // true
                    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

                    var options = {
                        maxSizeMB: .4,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    };
                    imageCompression( file,options)
                        .then(function (compressedFile) {
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                            let isJPG = false;
                            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                                isJPG = file.type;
                            }
                            const isLt2M = compressedFile.size / 1024 / 1024 < .4;
                            let width = 600;
                            let height = 3800;
                            let _URL = window.URL || window.webkitURL;
                            let image = new Image();
                            image.onload = function () {
                                let valid = image.width <= width && image.height <= height;
                                let resultBlob = '';
                                // 调用方法获取blob格式，方法写在下边
                                resultBlob = that.compressUpload(image);
                                valid ? resolve(resultBlob) : reject();
                                // resolve(resultBlob)
                            }
                            image.src = _URL.createObjectURL(compressedFile);
                            if (!isJPG) {
                                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                            }
                            if (!isLt2M) {
                                this.$message.error('上传图片大小不能超过 400kb!');
                            }
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });
                    /** browser-image-compression 结束**/
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸宽600最为合适');
                        return Promise.reject();
                    }
                );
            },
            beforeAvatarUploadThree(file) {
                let that = this;
                return new Promise((resolve, reject) => {
                    /** browser-image-compression 开始 **/
                    // var imageFile = event.target.files[0];
                    console.log('originalFile instanceof Blob', file instanceof Blob); // true
                    console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

                    var options = {
                        maxSizeMB: 1,
                        maxWidthOrHeight: 1920,
                        useWebWorker: true
                    };
                    imageCompression( file,options)
                        .then(function (compressedFile) {
                            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
                            let isJPG = false;
                            if (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg') {
                                isJPG = file.type;
                            }
                            const isLt2M = compressedFile.size / 1024 / 1024 < 2;
                            let width = 244;
                            let height = 244;
                            let _URL = window.URL || window.webkitURL;
                            let image = new Image();
                            image.onload = function () {
                                let valid = image.width <= width && image.height <= height;
                                let resultBlob = '';
                                // 调用方法获取blob格式，方法写在下边
                                resultBlob = that.compressUpload(image);
                                valid ? resolve(resultBlob) : reject();
                                // resolve(resultBlob)
                            }
                            image.src = _URL.createObjectURL(compressedFile);
                            if (!isJPG) {
                                this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
                            }
                            if (!isLt2M) {
                                this.$message.error('上传图片大小不能超过 2MB!');
                            }
                        })
                        .catch(function (error) {
                            console.log(error.message);
                        });
                    /** browser-image-compression 结束**/
                }).then(
                    () => {
                        return file;
                    },
                    () => {
                        this.$message.error('注：上传图片尺寸224*224最为合适');
                        return Promise.reject();
                    }
                );
            },
            /**
             *  判断金额
             */
            isPrice(val, e) {
                console.log(val);
                // var reg = new RegExp("^\\d+(\\.\\d{0,2})?$");
                var reg = new RegExp("^((0{1}\\.\\d{1,2})|([1-9]\\d*\\.{1}\\d{1,2})|([1-9]+\\d*))$");
                if (e == 1) {
                    if (!reg.test(val.price)) {
                        let index;
                        this.skuTable.forEach((ele, i) => {
                            if (ele.id == val.id) {
                                index = i;
                            }
                        });
                        this.skuTable[index].price = val.price.substr(0, val.price.indexOf('.') + 3);
                        this.open("请您输入正确的金额（只包含二位小数的正整数）");
                        if (val.price < 0 || val.price == 0 || val.price == '') {
                            this.skuTable[index].price = this.price;
                        }
                    }
                } else if (e == 0) {
                    if (!reg.test(val)) {
                        this.price = val.substr(0, val.indexOf('.') + 3);
                        this.open("请您输入正确的金额（只包含二位小数的正整数）");
                        if (this.price < 0 || this.price == 0 || this.price == '') {
                            this.price = ''
                        }
                    }
                }
            },
            /**
             *  判断库存
             */
            isStock(val) {
                var reg = new RegExp("^[+]{0,1}(\\d+)$");
                let index;
                this.skuTable.forEach((ele, i) => {
                    if (ele.id == val.id) {
                        index = i;
                    }
                });
                if (!reg.test(val.stock)) {
                    console.log(val.stock);
                    this.skuTable[index].stock = 0;
                    this.open("请您输入正确的库存（大于等于0的正整数）");
                    if (val.stock < 0 || val.stock == 0 || val.stock == '') {
                        this.skuTable[index].stock = 0;
                    }
                }
            },
            /**
             *  判断返利返佣大小
             */
            // recommend  consume
            isSize(val,e) {
                var reg = new RegExp("^[+]{0,1}(\\d+)$");
                if(e){
                    if (val < 2 || val > 45) {
                        console.log(val<2,val > 45);
                        this.recommend = '';
                        this.$message("请您输入正确的推荐奖励（≥2并且≤45的正整数）");
                    }
                    if (!reg.test(val)) {
                        console.log(val);
                        this.recommend = '';
                        this.$message("请您输入正确的推荐奖励（≥2并且≤45的正整数）");
                    }
                }else {
                    if ( val > 50 ) {
                        this.consume = '';
                        console.log(val > 50);
                        this.$message("请您输入正确的消费返利（≥0并且＜50的正整数）");
                    }
                    if (!reg.test(val)) {
                        this.consume = '';
                        this.$message("请您输入正确的消费返利（≥0并且＜50的正整数）");
                    }
                }
            },

            /**
             * 详情图预览
             * @param file
             */
            handleDetailPreview(file) {
                console.log(this.dialogDetailImageUrl, file);
                this.dialogDetailImageUrl = file.url;
                this.dialogDetailVisible = true;
                console.log(this.dialogDetailImageUrl)
            },
            /**
             * 详情图，当超上传限制时的提示
             */
            handleExceedDetail(files, fileList) {
                this.$message.warning(`当前限制选择 8 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            /**
             * 详情图上传成功
             */
            detailImgWin(response, file, fileList) {
                console.log(response, file, fileList);
                if (response) {
                    if (response.code == 200) {
                        this.detailImg.push({url: response.data});
                    } else if (response.code == 100070) {
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    }
                    else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({center: true, type: "warning", message: response.message});
                    }
                }
                console.log(this.detailImg);
            },
            /**
             * 详情图上传失败
             */
            detailImgFail(err, file, fileList) {
                console.log(err, file, fileList);
                this.$message.warning(err.message);
            },
            /**
             * 详情图删除
             * @param file
             * @param fileList
             */
            handleRemoveDetail(file, fileList) {
                console.log(file, fileList);
                this.detailImg.forEach(ele => {
                    console.log(ele);
                    if (ele.url === file.url) {
                        this.detailImg.splice(this.detailImg.indexOf(ele), 1);
                    }
                });
                console.log(this.detailImg);
            },
            /**
             * 商品轮播图删除
             * @param file
             * @param fileList
             */
            handleRemove(file, fileList) {
                console.log(file, fileList);
                this.bannerImg.forEach(ele => {
                    console.log(ele);
                    if (ele.url === file.url) {
                        this.bannerImg.splice(this.bannerImg.indexOf(ele), 1);
                    }
                });
                console.log(this.bannerImg);
            },
            /**
             * 商品轮播图预览
             * @param file
             */
            handlePictureCardPreview(file) {
                console.log(this.dialogImageUrl, file);
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
            bannerImgWin(response, file, fileList) {
                console.log(response, file, fileList);
                console.log('originalFile instanceof Blob', file instanceof Blob); // true
                console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
                if (response) {
                    if (response.code == 200) {
                        this.bannerImg.push({url: response.data});
                    } else if (response.code == 100070) {
                        this.$message.warning(response.message);
                        this.$router.push('/')
                    }
                    else {
                        file.status = 'fail';
                        fileList.splice(fileList.indexOf(file), 1);
                        this.$message({center: true, type: "warning", message: response.message});
                    }
                }
                console.log(this.bannerImg);
            },
            /**
             * 轮播图上传失败
             */
            bannerImgFail(err, file, fileList) {
                console.log(err, file, fileList);
                this.$message.warning(err.message);
            },
            /**
             * 规格缩略图上传成功
             * @param res
             * @param file
             */
            smallImgWin(index){
                return (response, file, fileList, val) => {
                    console.log(index);
                    console.log(response, file, fileList, val);
                    if (response) {
                        if (response.code == 200) {
                            this.skuTable[index].skuPic = response.data;
                            console.log(this.skuTable);
                        } else if (response.code == 100070) {
                            this.$message.warning(response.message);
                            this.$router.push('/')
                        } else {
                            file.status = 'fail';
                            fileList.splice(fileList.indexOf(file), 1);
                            this.skuTable[index].skuPic = this.imageUrl;
                            this.$message({center: true, type: "warning", message: response.message});
                        }
                    }
                }
            },

            /**
             * 规格缩略图上传失败
             * @param res
             * @param file
             */
            smallImgFail(err, file, fileList) {
                console.log(err, file, fileList);
                this.$message.warning(err.message);
            },
            /**
             * 提交 规格库存设置表
             */
            submit() {
                if (this.consume.trim() == '') {
                    this.open('请输入消费返利');
                    return false;
                }
                if (this.recommend.trim() == '') {
                    this.open('请输入推荐奖励');
                    return false;
                }
                var postData = {
                    "consumerRebate": this.consume,
                    "recommendReward": this.recommend,
                    "goodsSkuList": this.skuTable,
                    "goodsId": this.goodsId
                };
                console.log(postData);
                this.$confirm("此操作将保存该商品规格 , 是否继续 ?", "提示", {
                    "confirmButtonText": "确定",
                    "cancelButtonText": "取消",
                    "type": "warning",
                }).then(() => {
                    this.isSubmit2 = true;
                    Goods.addGoodsSkuStandard(postData).then(res => {
                        console.log(res);
                        if (res.code == 200) {
                            this.$message('保存成功');
                            this.$router.push('/goods')
                        } else if (res.code == 100070 || res.code == 404) {
                            this.$message.warning(res.message);
                            this.$router.push('/')
                        } else {
                            this.$message.warning('保存失败' + res.message);
                            this.isSubmit2 = false;
                        }
                    })
                }).catch(() => {
                    this.$message({center: true, type: "info", message: "已取消".concat(text).concat("操作")});
                });
            }
        },
        created() {
            //    获取下级商品分类
            this.getNextClassify(0, 0);

            //  联调阶段 - 获取模板
            //     this.getSkuList();
            //  联调阶段 - 获取设置规格列表
            //     this.getSkuTableList(55);
            //  获取商品货号
                this.getGoodsNo();

            //初始化富文本编辑器
            // setTimeout(function () {
            //     this.$router.go(0);
            // },100);
        }
    }
</script>

<style lang="scss">
    #addGoods {
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
                        font-size: 18px;
                        .el-input__inner {
                            text-align: center;
                        }
                    }
                    .el-button {
                        font-size: 18px;
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
                        box-shadow: inset 2px 4px 14px 0 rgba(0, 0, 0, 0.05);
                        border-radius: 12px;
                        border: 1px solid rgba(216, 216, 216, 1);
                        padding: 0 24px 24px;
                        p:last-child {
                            border: 0;
                        }
                        p {
                            line-height: 58px;
                            border-bottom: 1px solid #D8D8D8;
                            padding-left: 36px;
                            font-size: 24px;
                            margin-top: 20px;
                        }
                        p.act {
                            color: #fff;
                            background: rgba(51, 131, 255, 1);
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
                    color: rgba(51, 131, 255, 1);
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
                        .el-input, .el-textarea {
                            width: 400px;
                        }
                        /*.el-textarea {*/
                        /*min-height: 60px;*/
                        /*}*/
                        .remark {
                            font-size: 20px;
                            font-weight: bold;
                            color: rgba(145, 145, 145, 1);
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
                        .standardBox {
                            .box-card {
                                width: 100%;
                                font-size: 20px;
                                margin: 20px 0;
                                .el-card__header {
                                    .clearfix {
                                        display: flex;
                                        align-items: center;
                                        justify-content: space-between;
                                        .standard, .btnBox {
                                            display: flex;
                                            align-items: center;
                                        }
                                        .standard {
                                            p {
                                                white-space: nowrap;
                                                margin-right: 20px;
                                            }
                                        }
                                    }
                                }
                                .el-card__body {
                                    .el-input {
                                        width: auto;
                                    }
                                    .item {
                                        font-size: inherit;
                                        height: 0.533333rem;
                                        line-height: 0.533333rem;
                                        border-radius: 0.053333rem;
                                        border: 0.013333rem solid #DCDFE6;
                                        display: inline-block;
                                        padding: 0 10px;
                                        margin: 6px;
                                        .delBtn {
                                            color: #C0C4CC;
                                            margin-left: 6px;
                                            line-height: 0.533333rem;
                                            padding: 0;
                                        }
                                        .delBtn:hover {
                                            color: #909399;
                                        }
                                    }
                                    .item:hover {
                                        border: 0.013333rem solid #b9bcc2;
                                    }
                                }
                            }
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
                        margin: 10px 2px;
                        .cell {
                            text-align: center;
                            img {
                                width: 100px;
                                height: 100px;
                            }
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
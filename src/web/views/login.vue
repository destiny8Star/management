<!--
  - login Vue
  - @JsName login
  - @Description 登录视图.
  - @DateTime 2019-03-13 20:39:22
  - @author Finn
  -->
<!-- 视图 -->  
<template>
    <div id="backendLogin">
        <el-container direction="horizontal">
            <div class="mainBox">
                <img class="logo" src="../../assets/img/views/nav/logo.png" alt="">
                <div class="main">
                    <img src="../../assets/img/views/login/tp.png" alt="" class="picture">
                    <div class="inputBox">
                        <p class="title">商户开放后台</p>
                        <div class="item">
                            <div>
                                <img src="../../assets/img/views/login/r.png" alt="">
                                <div class="line"></div>
                                <input type="text" placeholder="请输入手机账户" v-model="phone">
                            </div>
                        </div>
                        <!-- 图形验证码 start -->
                        <!--<div class="item">-->
                            <!--<div>-->
                                <!--<img src="../../assets/img/views/login/tb.png" alt="">-->
                                <!--<div class="line"></div>-->
                                <!--<input type="text" placeholder="图形验证码" v-model="codeImg">-->
                            <!--</div>-->
                            <!--<div class="codeBox">-->
                                <!--<div class="codeText" @click="refreshCode"></div>-->
                                <!--<s-identify-->
                                        <!--class="codeImg"-->
                                        <!--:identifyCode="identifyCode"-->
                                        <!--:contentWidth="117"-->
                                        <!--:contentHeight="52"-->
                                        <!--:lineColorMin="200"-->
                                        <!--:fontSizeMin="32"-->
                                        <!--:fontSizeMax="56"></s-identify>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!-- 图形验证码 end -->
                        <div class="item">
                            <div>
                                <img src="../../assets/img/views/login/tb(1).png" alt="">
                                <div class="line"></div>
                                <input type="password" placeholder="请输入密码" v-model="password">
                            </div>
                            <!--<el-button class="code" plain size="small" @click="getCode" type="primary" :disabled="disabled">{{ codeBtn }}</el-button>-->
                        </div>
                        <div class="agree">
                            <div class="ruleText">
                                <img @click="isAgree=!isAgree" v-show="isAgree" src="../../assets/img/views/login/dui.png" alt="">
                                <img @click="isAgree=!isAgree" v-show="!isAgree" src="../../assets/img/views/login/dui_prev@2x.png" alt="">
                                <p>同意用户<span @click="showBlue=!showBlue">服务协议</span></p>
                            </div>
                            <el-button type="text" style="color:#999" @click="showUpdatePass=!showUpdatePass">忘记密码?</el-button>
                        </div>
                        <div v-show="showBlue" class="blueBox">
                            <div class="close" @click="showBlue=!showBlue" >×</div>
                            <div class="blue">
                                <h1>《点击生活用户协议及隐私政策》</h1>
                                <p>欢迎您阅读浙江逗号信息技术有限公司（下称"逗号公司"、"我们"）发布的"用户 服务协议及隐私政策"(下称"本协议")。本协议是关于您（下称"用户"、"您"）在使用点击生活（"点击"）时，约定您和浙江逗号信息技术有限公司之间权利义务关系的有效协议， 自您通过互联网注册点击、登录点击生活app、获得点击生活账号时成立并生效。自您成为点击生活产品用户之日起，至您按本协议约定的方式通知点击生活注销您的账户之日止的期间内，本协议将全面约束和规制您与逗号公司间的权利义务关系。</p>

                                <p>请您在使用点击生活产品前务必事先认真阅读本协议中的各条款，包括用户信息 使用和保护条款（特别是以粗体、下划线标注的内容）、免除责任条款及违约 条款等，并在阅读后选择"接受"或"拒绝"本协议（未成年人审阅时应得到法定监 护人的陪同）。如您拒绝本协议，您将无法使用点击生活产品。</p>



                                <h2>一、服务内容</h2>
                                <ol>
                                    <li>1. 点击生活是逗号公司的一款智能社交电商新零售以及信用卡账单APP，通过智能解析信用 卡电子账单，来实现用户的个人生活消费与信用卡管理和以及个人财务的智能化应用，是集成在线消费、管卡（智能账单管理、还款提醒），电商平台的一站式本地生活服务平台。</li>
                                    <li>2. 用户理解并同意，点击生活产品中包含浙江逗号信息技术有限公司及关联公司提供的各项服务， 用户在点击生活产品完成注册后，即可通过点击生活相应端口直接使用逗号公司关联的我公司提供的服务。为了使用户更便捷地使用逗号公司及关联公司的服务，用户在此明确且不可撤销地同意： 1)用户以任何方式使用逗号公司关联的我公司的相关服务，即表示用户已充分阅读、理解并同意接受相应的服务协议； 2)用户以任何方式使用逗号公司关联公司的相关服务，即表示用户已授权逗号公司将用户相关信息披露给相应关联公司并授权该关联公司使用。</li>
                                </ol>

                                <h2>二、用户信息的使用和保护</h2>

                                <p>逗号公司尊重并保护所有使用点击生活产品服务用户的个人信息。逗号公司将严格按照本协议附件《用户隐私政策》及具体服务中与您关于信息授权的约定， 收集、使用、存储、披露您的用户个人信息。用户应在使用本平台各项服务前 完整地阅读具体授权条款，如您不同意《用户隐私政策》或具体服务中的任一 项关于您的个人信息授权的约定，则您应停止注册或使用逗号公司服务。</p>

                                <h2>三、知识产权</h2>

                                <ol>
                                    <li>1. 逗号公司对点击生活产品拥有的著作权、商标权、商业秘密以及其他相关的知 识产权，包括但不限于各种文档资料、软件、商标、FLASH、设计、图案、音像、 摄影、动画、美术等，及其它本协议中未经提及的知识产权均由逗号公司享有。</li>
                                    <li>2. 未经逗号公司事先书面同意，用户不得为任何营利性或非营利性的目的自 行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权。</li>
                                </ol>

                                <h2>四、免责条款</h2>

                                <h3>（一）点击生活产品是基于互联网为用户提供服务的，互联网的不稳定性及第三 方行为的不可控性给互联网的服务埋下了各种隐患，故在下述情况发生时，逗号公司应免除相应的责任：</h3>

                                <ol>
                                    <li>1. 逗号公司不就通信系统或互联网的中断或无法运作、技术故障、计算机错 误或病毒、信息损坏或丢失或其它在公司合理控制范围之外的原因而产生的其他 任何性质的破坏而向用户或任何第三方承担赔偿责任。</li>
                                    <li>2. 鉴于目前的技术条件逗号公司不保证用户在使用点击生活产品时在操作上不会中断或没有错误，不保证会纠正点击生活产品所有缺陷，亦不保证点击生活产品能满足用户的所有要求。</li>
                                    <li>3. 逗号公司不担保其所提供的服务一定能满足用户的要求，也不担保服务不会中断，对网络服务的及时性、安全性、准确性也都不作担保。</li>
                                    <li>4. 用户明确同意其使用点击生活产品所存在的风险将完全由其自己承担；因其使 用本服务而产生的一切后果也由其自己承担，逗号公司不对用户承担任何责任。</li>
                                    <li>5. 用户在此同意逗号公司在任何情况下都无需向用户或任何第三方在使用点击生活产品时对其在传输或联络中的延迟、不准确、错误或疏漏及因此而致使的损害负责。</li>
                                    <li>6. 在所适用的法律允许的范围内，逗号公司均无须就用户个人信息的丢失和 /或损坏及任何间接的、附带的、特殊的、后果性的损失向用户负责赔偿。</li>
                                    <li>7. 如逗号公司的系统发生故障影响到点击生活产品的正常运行，逗号公司承诺在第一时间内与相关单位配合，及时处理进行修复；但用户因此而产生的经济损失，逗号公司公司不承担责任；此外，逗号公司保留不经事先通知为维修保养、升级或其他目的暂停服务任何部分的权利。</li>
                                    <li>8. 用户了解并确认点击生活产品中可能包含由第三方提供的服务，逗号公司只是为了用户的便利而提供功能模块，逗号公司对第三方提供的服务不提供任何形式的保证，同时亦不对商业性的隐含担保，特定目的和不违反规定的适当担保作限 制；包括：逗号公司公司不担保服务一定能满足用户的要求，不担保服务不会中 断，及对服务的及时性、安全性、出错或文件丢失的发生，不承担任何赔偿责任； 用户自行承担全部风险。</li>
                                </ol>

                                <h3>（二）鉴于逗号公司仅基于您自行导入的账单或手动填写、更新的账单为基 础，提供账单解析及相关管理服务，因此，当出现如下情形时，逗号公司不承担 任何责任：</h3>

                                <ol>
                                    <li>1. 当用户导入并查询账单信息时，用户授权逗号公司根据用户设置的相关信 息，在一定时间内对用户相应的邮箱、网银等信息进行查询，并根据查询结果向 用户展示账单信息。鉴于技术的可实现性，逗号公司基于该服务向您展示的账 单仅供用户参考，具体账单信息请以相关出账单方（包括但不限于银行等）出 具的账单内容为准；逗号公司不对本服务中展示的账单的完整性、准确性、及 时性和真实性承担保证责任；如对账单内容有任何疑问用户应向相关出账单方 进行咨询。因相关账单不及时、不准确等造成的包括但不限于还款逾期等所有 责任均由用户与出账单方自行协商解决。
                                    </li>
                                    <li>2. 用户应对您导入的账单、手动填写的账单或使用点击生活产品相关服务过程中填写的信息（包括但不限于银行卡号、持卡人姓名、还款金额、到期日等）的真实性、完整性、准确性、有效性负责。如用户利用光学扫描识别、语音识别、 邮箱导入等便利技术的识别功能提供前述信息的，等同于用户自行填写。因用户未尽前述义务而导致资金损失的，由用户自行承担。</li>
                                    <li>3. 用户理解并同意，用户通过平台查询到的账单信息，如无特别说明仅为 人民币账单信息；如用户查询到外币账单信息的，该外币账单信息仅供参考； 尤其是当用户需查询准确的信用卡外币账单信息或对外币账单进行还款的，请 联系发卡银行进行查询或还款。</li>
                                    <li>4. 如用户根据平台查询到的账单信息自行设置了相应的还款提醒，则用户 理解并同意，该提醒仅作为对应账单中还款时间、还款金额等信息的参考，而非用户是否应该还款及何时还款的依据，如因此造成包括但不限于用户还款逾 期等其他不利后果的，由用户自行承担，与逗号公司无涉。</li>
                                </ol>

                                <h2>五、违约</h2>

                                <ol>
                                    <li>1. 用户在使用点击生活产品时，应严格遵守本协议的约定。若用户有任何违反本 协议或相关法规的规定，逗号公司有权视用户的行为性质，在不事先通知用户的 情况下，采取包括但不限于中断使用许可、限制使用、中止或终止服务、追究法 律责任等措施，若因此造成逗号公司或他人损失的，用户应予赔偿。</li>
                                    <li>2. 用户不得利用点击生活产品进行任何损害逗号公司及其合作方或任何其他第 三方的利益的行为，否则逗号公司有权立即终止为用户提供服务，并要求用户赔偿损失，由此产生的后果由用户自行承担，与逗号公司无关。</li>
                                    <li>3. 逗号公司有权判定您的行为是否符合本协议的要求，出现包括但不限于以 下情形的，逗号公司有权单方在不作通知的情况下终止对您提供的服务，由此产 生的风险及责任由您自行承担。如造成逗号公司损失的，您还应承担赔偿等责任：<br>
                                        <p>
                                            1)用户提供的资料不真实；

                                            2)用户违反本协议中规定的使用规则；

                                            3)用户未按时足额向逗号公司公司支付费用（前提如果需要支付费用）；

                                            4)用户违反本协议其它规定，且自逗号公司公司通知其纠正之日起10个工作日内仍未纠正的。
                                        </p>
                                    </li>
                                </ol>




                                <h2>六、您的选择</h2>
                                <ol>
                                    <li>1. 如果您不希望接受逗号公司提供的信用卡账单管理服务，可以通过以下方式选择停用：点击其中一张信用卡—右上角选择删除信用卡。（请使用最新的版本）</li>
                                    <li>2. 如果您不希望接受任何逗号公司提供的服务，您可以联系客服申请注销账户。若您未选择进行以上操作，视为您同意并授权逗号公司按本协议的约定接触、 收集、使用、披露和处置您的个人信息，并同意逗号公司按本协议的约定向您提 供服务。</li>
                                    <li>3. 为了向您提供更加方便的账单管理服务，您理解并同意在您注册／登陆点击生活产品时，逗号公司为您开启账单自动更新服务（如有），如您不希望接受此项 服务，您可通过以下方式选择停用：点击【我的】-设置-自动更新设置-关闭自动更新功能。</li>
                                </ol>
                                <h2>七、执行和变更</h2>

                                <p>逗号公司有权根据需要修改、增加或删减本协议。逗号公司将采用在网页公告、App推送或其他方式通知您该等修改、增加或删减的内容。一经逗号公司公告，即视为上述内容已经通知到您。若您在本协议及各类规则变更后继续使 用逗号公司服务的，视为您已仔细认真阅读、充分理解并同意接受修改后的服 务协议及各类规则。</p>

                                <h2>八、适用法律</h2>

                                <p>本服务条款的解释，效力及纠纷的解决，适用于中华人民共和国大陆地区法 律、法规。若用户和逗号公司之间发生任何纠纷或争议，首先应友好协商解决， 协商不成的，用户在此完全同意将纠纷或争议提交逗号公司所在地杭州市萧山区人民法院管辖。</p>


                                <h2>九、问题与投诉</h2>
                                <p>如果您对本协议有任何问题，请通过以下途径联系逗号公司：</p>
                                <p>A.官方客服微信:15988498799</p>
                                <p>B.登陆我们的网站给我们留言：<a href="https://www.dou-hao.net/">https://www.dou-hao.net/</a></p>
                                <p>C.客服电话：<a href="4009900188"></a>4009900188</p>
                                <p>浙江逗号信息技术有限公司会尽最大努力在合理时间内回复您。</p>

                            </div>
                        </div>
                        <div v-show="showUpdatePass" class="blueBox">
                            <div class="close" @click="showUpdatePass=!showUpdatePass" >×</div>
                            <div class="blue blues">
                                <div class="inputBox">
                                    <p class="title">修改密码</p>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/r.png" alt="">
                                            <div class="line"></div>
                                            <input type="text" placeholder="请输入手机账户" v-model="phone">
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/tb(1).png" alt="">
                                            <div class="line"></div>
                                            <input type="text" placeholder="请输入验证码" v-model="code">
                                        </div>
                                        <el-button class="code" plain size="small" @click="getCode" type="primary" :disabled="disabled">{{ codeBtn }}</el-button>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/tb(1).png" alt="">
                                            <div class="line"></div>
                                            <input type="password" placeholder="请输入新密码" v-model="newPass">
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/tb(1).png" alt="">
                                            <div class="line"></div>
                                            <input type="password" placeholder="请再次输入密码" v-model="newPassReset">
                                        </div>
                                    </div>
                                    <el-row>
                                        <el-button @click="updatePass" @keydown.13="login" class="loginBtn" type="primary" round>确认修改</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <div v-show="firstUpdatePass" class="blueBox">
                            <div class="close" @click="firstUpdatePass=!firstUpdatePass" >×</div>
                            <div class="blue blues">
                                <div class="inputBox">
                                    <p class="title1">首次登录，请修改密码</p>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/r.png" alt="">
                                            <div class="line"></div>
                                            <p>{{phone}}</p>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/tb(1).png" alt="">
                                            <div class="line"></div>
                                            <input type="password" placeholder="请输入新密码" v-model="newPass">
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div>
                                            <img src="../../assets/img/views/login/tb(1).png" alt="">
                                            <div class="line"></div>
                                            <input type="password" placeholder="请再次输入密码" v-model="newPassReset">
                                        </div>
                                    </div>
                                    <el-row>
                                        <el-button @click="firstUpdatePassword" class="loginBtn" type="primary" round>确认修改</el-button>
                                    </el-row>
                                </div>
                            </div>
                        </div>
                        <el-row>
                            <el-button @click="login" @keydown.13="login" class="loginBtn" type="primary" round>登录</el-button>
                        </el-row>
                    </div>
                </div>
            </div>
        </el-container>
    </div>
</template>

<!-- 视图 Js 脚本 -->

<script>
import { Encoding } from "@/tools";
import { Owner } from "@/web/module/owner";
import SIdentify from '@/web/views/components/identify'//生成随机图片验证码
var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;//手机号正则验证
export default {
    name: "login",
    components: {
        SIdentify
    },
    data () {
        return {
            //图片验证码设定字母+数字
            "identifyCodes": "1234567890ZXCVBNMLKJHGFDSAQWERTYUIOP",
            "identifyCode": "",//动态生成的图片验证码
            "phone": '',//手机账户
            "password": '',//密码
            "code": '',//短信验证码
            "newPass": '',//新密码
            "newPassReset": '',//二次新密码
            "codeImg": '',//输入的图片验证码
            "codeBtn": '获取验证码',//获取验证码btn
            "disabled": false,
            "time": 0,
            "isAgree": true,//是否勾选协议【true：勾选；false：未勾选】
            "showBlue": false,//展示协议
            "showUpdatePass": false,//展示修改密码
            "firstUpdatePass": false,//展示首次登录修改密码
        }
    },
    methods:{
        //获取验证码
        getCode:function(){
            this.time = 60;
            this.disabled=true;
            this.timer();
            Owner.sendCode({
                "mobile": this.phone,
            }).then(res=>{
                console.log(res);
                if(res.code==200){
                    this.$message('发送成功');
                }else {
                    this.$message.warning(res.message);
                }
            })
        },
        //封装一个函数，获取验证码部分：60s 或 重新发送
        timer:function (){
            if (this.time > 0) {
                this.time --;
                this.codeBtn = this.time+"s";
                setTimeout(this.timer,1000);
            } else{
                this.time = 0;
                this.codeBtn = "获取验证码";
                this.disabled = false;
            }
        },
        //提示信息
        open(text,title){
            this.$alert(text, title || '温馨提示', {
                confirmButtonText: '知道了',
            });
        },
        //登录
        login(){
            if(this.phone==''){
                this.open('请输入手机账号');
                return false;
            }
            if(!reg.test(this.phone)){
                this.open('请输入正确的手机号');
                return false;
            }
            // if(this.identifyCode==''){
            //     this.open('请输入图形验证码');
            //     return false;
            // }
            // if(this.identifyCode!==this.codeImg){
            //     this.open('请输入正确的图形验证码');
            //     return false;
            // }
            if(this.password==''){
                this.open('请输入密码');
                return false;
            }
            if(!this.isAgree){
                this.open('请勾选用户协议');
                return false;
            }
            Owner.logIn({
                "mobile": this.phone,
                "password": this.password
            }).then(res=>{
                console.log(res);
                if(res.code==200){
                    this.$message('登录成功');
                    localStorage.accountType = res.data.type;
                    localStorage.accountPhone = res.data.mobile;
                    localStorage.accountName = res.data.storeName;
                    localStorage.accountImg = res.data.storeUrl;
                    localStorage.isFirstLogin = res.data.isFirstLogin;
                    //isFirstLogin -- 【是否是第一次登陆,0:是  1:否 】
                    if(!res.data.isFirstLogin){
                        this.$message('请修改默认密码');
                        this.firstUpdatePass = true;
                    }else {
                        this.$router.push('/configuration')
                    }
                }else if(res.code==100070 || res.code == 404){
                    this.$message.warning(res.message);
                    this.$router.push('/')
                }else {
                    this.$message.warning(res.message);
                }
            }).catch(err => {
                console.log(err);
                this.$message('网络异常');
            });
        },
        //忘记密码，修改密码
        updatePass(){
            if(this.phone==''){
                this.open('请输入手机账号');
                return false;
            }
            if(!reg.test(this.phone)){
                this.open('请输入正确的手机号');
                return false;
            }
            if(this.code==''){
                this.open('请输入验证码');
                return false;
            }
            if(this.newPass==''){
                this.open('请输入新密码');
                return false;
            }
            if(this.newPassReset==''){
                this.open('请再次输入新密码');
                return false;
            }
            if(this.newPassReset!==this.newPass){
                this.open('新密码两次输入不一致');
                return false;
            }
            Owner.forgotEdit({
                "code": this.code,
                "mobile": this.phone,
                "pwd": this.newPassReset
            }).then(res=>{
                console.log(res);
                if(res.code==200){
                    this.$message('修改成功');
                    this.showUpdatePass = false;
                }else {
                    this.$message.warning(res.message);
                }
            }).catch(err => {
                console.log(err);
                this.$message('网络异常');
            });
        },
        //首次登录，修改密码
        firstUpdatePassword(){
            if(this.newPass==''){
                this.open('请输入新密码');
                return false;
            }
            if(this.newPass==this.password){
                this.open('不能跟旧密码一样');
                return false;
            }
            if(this.newPassReset==''){
                this.open('请再次输入新密码');
                return false;
            }
            if(this.newPassReset!==this.newPass){
                this.open('新密码两次输入不一致');
                return false;
            }
            var postData = {
                "pwd": this.newPassReset,
            };
            Owner.logEdit(postData).then(res=>{
                console.log(res);
                if(res.code==200){
                    this.$message({ center: true, type: "info", message: "修改成功，直接登录" });
                    this.$router.push('/configuration')
                }else {
                    this.$message({ center: true, type: "info", message: "修改失败" });
                }
            });
        },
        //生成图形验证码--开始
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
            }
            console.log(this.identifyCode);
        }
        //生成图形验证码--结束
    },
    beforeCreate () {
    },
    beforeMount () {
    },
    mounted() {
        /* 生成图形验证码 start */
        // this.identifyCode = "";
        // this.makeCode(this.identifyCodes, 4);
        /* 生成图形验证码 end */
    },
};
</script>

<!-- 视图 Scss 样式 -->  
<style lang="scss">
#backendLogin {
    width: 100%;
    height: 100%;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    background: url("../../assets/img/views/login/bj.png");
    background-size: 100% 100%;
    .el-container {
        width: 100%;
        height: 100%;
        .content {
            position: relative;
            top: 20%;
            margin: 0 auto;
            width: 388px;
            height: 388px;
            text-align: center;
            font-weight: 600;
            vertical-align: middle;
            h2 {
                color: #CCCCCC;
                font-size: 65px;
                line-height: 99px;
                text-align: center;
                margin-bottom: 30px;
            };
            h5 {
                color: #7C7B78;
                font-size: 18px;
                text-align: center;
                margin-bottom:22px;
            };
            .el-input, .el-button {
                width:328px;
                margin-bottom: 18px;
            };
            .el-button {
                margin-top: 12px;
            };
        };
        .mainBox {
            width: 1200px;
            height: 738px;
            background: #fff;
            border-radius: 30px;
            box-shadow: 0 0 20px 6px #1C35FC, 0 0 8px #1C35FC;
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            .logo {
                width: 135px;
                height: 135px;
                position: absolute;
                top: 21px;
                left: 44px;
            }
            .main {
                display: flex;
                align-items: center;
                justify-content: center;
                .picture {
                    width: 522px;
                    height: 424px;
                    margin: 76px 74px 0 0;
                }
                .inputBox {
                    padding: 175px 0;
                    position: relative;
                    p {
                        text-indent: 0!important;
                    }
                    .title,.title1 {
                        font-size: 44px;
                        font-weight: bold;
                        margin-bottom: 20px;
                        text-align: center;
                    }
                    .title1{
                        margin-left: -16px;
                    }
                    .item {
                        width: 400px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-bottom: 1px solid #eee;
                        padding: 30px 0 14px;
                        div {
                            display: flex;
                            align-items: center;
                            img {
                                width: 40px;
                                height: 40px;
                            }
                            .line {
                                width: 1px;
                                height: 21px;
                                background: #CBCDD6;
                                margin: 0 14px;
                            }
                            input {
                                width: 180px;
                                padding-left: 4px;
                            }
                        }
                        .code {
                            min-width: 116px;
                            text-align: center;
                            height: 34px;
                            line-height: 34px;
                            border-radius: 10px;
                            font-size:20px;
                            padding: 0;
                        }
                        .codeBox {
                            width: 115px;
                            height: 52px;
                            position: relative;
                            .codeText,.codeImg {
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 1;
                            }
                            .codeText {
                                z-index: 3;
                            }
                        }
                    }
                    .agree {
                        width: 380px;
                        margin-top: 46px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size:20px;
                        color: #919191;
                        .ruleText {
                            display: flex;
                            align-items: center;
                            img {
                                width: 21px;
                                height: 20px;
                                margin: 0 18px 0 4px;
                            }
                            img:hover,span:hover  {
                                cursor: pointer;
                            }
                            p {
                                span {
                                    color: #01A1FF;
                                }
                            }
                        }

                    }
                    .blueBox {
                        width: 100vw;
                        height: 100vh;
                        /*color: #fff;*/
                        /*background: #fff;*/
                        background: rgba(51, 51, 51, 0.6);
                        position: fixed;
                        top: 0;
                        left: 0;
                        z-index: 999;
                        overflow: auto;
                        .close {
                            width: 48px;
                            line-height: 48px;
                            border-radius: 50%;
                            border: 2px solid #e2e2e2;
                            color: #e2e2e2;
                            text-align: center;
                            position: absolute;
                            right: 68px;
                            top: 68px;
                            font-size: 36px;
                        }
                        .close:hover {
                            cursor: pointer;
                            background: rgba(51, 51, 51, 0.5);
                            color: #fff;
                        }
                        .blues {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .inputBox {
                                padding: 0;
                            }
                        }
                        .blue {
                            width: 1200px;
                            height: 738px;
                            background: #fff;
                            border-radius: 30px;
                            padding: 0 60px 80px;
                            overflow: auto;
                            font-size: 20px;
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                            right: 0;
                            margin: auto;
                            h1,h2 {
                                text-indent: 1em;
                            }
                            h1{
                                font-size: 32px;
                                font-weight: bold;
                                text-align: center;
                                line-height: 100px;
                            }
                            h2 {
                                font-size: 28px;
                                font-weight: 600;
                                line-height: 58px;
                            }
                            h3 {
                                font-size: 22px;
                                font-weight: 600;
                                margin: 20px 0;
                            }
                            p,li {
                                text-indent: 2em;
                                line-height: 36px;
                            }
                        }
                    }
                    .loginBtn {
                        width: 400px;
                        height: 59px;
                        font-size: 26px;
                        border-radius: 30px;
                        margin-top: 17px;
                    }
                }
            }
        }
    };
};
</style>

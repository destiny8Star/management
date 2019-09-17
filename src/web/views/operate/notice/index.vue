<template>
    <div id="notice">
        <el-container  v-loading="loading">
            <div class="content">
                <p>暂无信息</p>
            </div>
        </el-container>
    </div>
</template>

<script>
    import { Operate, Tags } from "@/web/module/lending";
    export default {
        name: "notice",
        data () {
            return {
                "loading": true,
                "dropdown": false,
                "param": {
                    "page": 1,
                },
                "data": datalist,
                "pagination": {
                    "total": 2000,
                    "pageCount": 0,
                    "currentPage": 1,
                    "pageSize": 10,
                    "show": '1-5'
                },
            }
        },
        methods: {
            /**
             * 初始化标签
             */
            initData () {
                const that = this;
                that.loading = false;
                return;
                setTimeout(() => {
                    Tags.selectTagsByBigTag({ tagType:that.param.tagType }).then((res) => {
                        if (res) {
                            if (res.code === 10001) {
                                if(res.data){
                                    that.dropdown = false;
                                }
                            } else {
                                that.$message({ center: true, type: "warning", message: "加载失败 , ".concat(res.result) });
                            }
                        }
                    }, (err) => {
                        that.$message({ center: true, type: "warning", message: "加载失败 , 网络异常" });
                        console.error(err);
                    });
                }, 500);
            },

            /**
             * 分页跳转
             */
            jumpPagination (val) {
                const that = this;
                that.loading = true;
                that.param.page = val;
                // 加载数据
                that.initData();
            },

        },
        beforeCreate () {
        },
        beforeMount () {
            const that = this, { page } = that.$route.params;
            if (page) {
                that.param.page = page;
            }
            // 初始化标签
            that.initData();
        },
    }
</script>

<style lang="scss">
#notice{
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
            p {
                line-height: 48px;
                color: #cacaca;
            }
        }
    }
}
</style>
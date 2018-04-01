<template>
    <div class="container" :class="{hasResult:hasresult}">
        <el-carousel arrow="hover" :autoplay="false" class="card" height="100%">
            <el-carousel-item v-for="resource in result" :key="item">
                <div class="content">
                    <div v-for="test in result" class="row">
                        <div class="form">网易云</div>
                        <div class="song">七里香</div>
                        <div class="artist">周杰伦</div>
                        <div class="album">七里香</div>
                    </div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
    import Bus from '../assets/eventBus.js'

    export default {
        data() {
            return {
                hasresult: false,
                result: [1, 2, 3],
                keyword: ''
            }
        },
        created() {
            Bus.$on('startsearch', (keyword) => {
                this.hasresult = true
                this.keyword = keyword
                console.log(keyword)
            })
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    .container {
        visibility: hidden;
        margin: auto;
        margin-top: calc(30vh + 190px);
        max-width: 650px;
        transition: margin-top .7s ease;
        &.hasResult {
            visibility: visible;
            margin-top: calc(10vh + 190px);
        }
        .card {
            height: calc(90vh - 250px);
            border: 1px solid #e4e4e4;
            border-radius: 10px;
            padding: 5px 1px 18px;
            background: #eae8e838;
            .content {
                overflow: auto;
                box-sizing: border-box;
                height: 100%;
                width: 100%;
            }
        }
    }

    .row {
        display: flex;
        justify-content: space-around;
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #e4e4e4;
        color: #575656;
        &:nth-of-type(2n) {
            background: rgba(160, 158, 158, 0.22);

        }
    }


</style>
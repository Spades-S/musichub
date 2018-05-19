<template>
    <div class="container" :class="{hasResult:hasResult}">
        <div class="title">MusicHub</div>
        <el-input class="search" type="text" placeholder="find your favourite songs"
                  v-model="input" :clearable="true" @keydown.enter.native = "enter">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
    </div>
</template>
<script>
    import Bus from '../../../assets/eventBus.js'

    export default {
        data() {
            return {
                input: '',
                hasResult: false
            }
        },
        methods: {
            search() {
                const keyword = this.input
                if (keyword === '') {
                    return
                } else {
                    this.hasResult = true
                    Bus.$emit('startsearch', keyword)
                }
            },
            enter(){
                this.search()
            }
        }
    }
</script>
<style lang="scss" scoped>
    $width: 300px;
    $height: 40px;
    .container {
        position: absolute;
        left: 0;
        right: 0;
        margin: 30vh auto;
        width: $width;
        height: 140px;
        transition: margin-top .5s ease;

        &.hasResult {
            margin: 10vh auto;
        }
    }

    .title {
        font-size: 40px;
        color: #fff;
    }

    .search {
        margin-top: 40px;
    }


</style>
<template>
    <div class="container" :class="{hasResult:hasResult}">
        <div class="title">MusicHub</div>
        <div class="srch-wrapper">
            <my-input :clearable="true" placeholder="Find your favourite songs"
                      class="srch-input" v-model="input" @keydown.enter.native="enter"
            >
            </my-input>
            <my-button :inline="true" :light="true" class="srch-btn" @click="search"></my-button>
        </div>
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
            enter() {
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
            margin: 3vh auto;
            .srch-wrapper {
                margin-top: 15px;
            }
        }
    }

    .title {
        font-size: 40px;
        color: #fff;
    }

    .srch-wrapper {
        display: flex;
        margin-top: 40px;
        font-size: 0;
        .srch-input {
            outline: none;
            border: none;
            flex: 1;
            text-align: center;
            &:after {
                width: 200%;
                height: 200%;
            }
        }
        .srch-btn {
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
            width: 55px;
            height: $height;
            background: url(../../../assets/search.png) no-repeat;
            -webkit-background-size: cover;
            background-size: cover;

        }
    }


</style>
<!--Created by Spades<spadesge@gmail.com> on 2018/04/24-->

<template>
    <div id="app">
        <my-header></my-header>
        <router-view></router-view>
    </div>

</template>
<script>
    import Header from './components/Header.vue'

    export default {
        data() {
            return {}
        },
        components: {
            myHeader: Header
        }

    }
</script>
<style lang="scss" scoped>

    body {
        margin: 0;
    }



    #app {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        position: fixed;
        padding-top: 20px;
        height: 100%;
        width: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        background: url(../../assets/background.png) center;
        -webkit-background-size: cover;
        background-size: cover;
        background: linear-gradient(#8ccad9, #d6c3ac);
    }

</style>
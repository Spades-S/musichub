<template>
    <div id="app">
        <my-header></my-header>
        <router-view/>
    </div>
</template>

<script>
    import Header from './components/Header.vue'

    export default {
        name: 'App',
        components: {
            myHeader: Header
        }
    }
</script>

<style lang="scss">
    body {
        margin: 0;
    }

    #app {
        position: fixed;
        height: 100%;
        width: 100%;
        margin: 0;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        background: url(./assets/background.png) center;
        -webkit-background-size: cover;
        background-size: cover;
        background: linear-gradient(#8ccad9, #d6c3ac);
    }


</style>

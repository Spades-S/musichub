// Created by Spades<spadesge@gmail.com> on 2018/04/24

import Vue from 'vue'
import { Button, Input, Scroll, Slide } from 'cube-ui'
import 'cube-ui/lib/cube.min.css'

import Mobile from './Mobile.vue'
import router from '../mobile/router/index'

Vue.component('myButton', Button)
Vue.component('myInput', Input)
Vue.component('myScroll', Scroll)
Vue.component('mySlide', Slide)
Vue.component('mySlideItem', Slide.Item)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        Mobile
    },
    template: '<Mobile/>'
})

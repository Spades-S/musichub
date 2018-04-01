// Created by Spades<spadesge@gmail.com> on 18/04/01

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Carousel, CarouselItem, Input } from 'element-ui'

import App from './App.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})


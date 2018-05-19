// Created by Spades<spadesge@gmail.com> on 18/04/01

import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import { Button, Carousel, CarouselItem, Input, Pagination } from 'element-ui'

import Desktop from './Desktop.vue'
import router from './router/index'

Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)
Vue.use(Pagination)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { Desktop },
    template: '<Desktop/>'
})


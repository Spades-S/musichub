import Vue from 'vue'
import Router from 'vue-router'

import Result from '../components/Result.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Results',
            component: Result
        }
    ]
})

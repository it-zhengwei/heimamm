import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
import login from '@/views/login/login.vue'
const router = new VueRouter({
    routes: [{
        path: '/login',
        component:login
    },
        {
            path: '/',
            redirect:'/login'
    }]
})
export default router
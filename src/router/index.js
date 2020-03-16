import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '../views/login/index.vue'
import useElement from '../views/useElement/useElement.vue'


Vue.use(VueRouter)
// 防止同路由点击报错
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
const router = new VueRouter({
    routes: [{
        path: '/login',
        component: login
    },{
        path:'/useElement',
        component:useElement
    }
    ,{
        path:'*',
        redirect:"/login"
    }
   
]

})
export default router
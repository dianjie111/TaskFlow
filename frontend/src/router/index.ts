import { createRouter,createWebHistory } from "vue-router";

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/login'},
        {path:'/login',component:()=>import('../compontents/Login.vue'),meta:{hide:true},beforeEnter: () => {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('mode')
        }},               //登录页
        {path:'/home',component:()=>import('../compontents/Home.vue'),meta:{hide:false}},                 //首页
        {path:'/projectList',component:()=>import('../compontents/ProjectList.vue'),meta:{hide:false}},   //项目列表
        {path:'/rwView',component:()=>import('../compontents/rwView.vue'),meta:{hide:false}},             //任务看板
        {path:'/rwDetail',component:()=>import('../compontents/rwDetail.vue'),meta:{hide:false}},         //任务详情
        {path:'/rlView',component:()=>import('../compontents/rlView.vue'),meta:{hide:false}},             //日历视图
        {path:'/Setting',component:()=>import('../compontents/Setting.vue'),meta:{hide:false}},           //设置
        {path:'/People',component:()=>import('../compontents/People.vue'),meta:{hide:false}},             //成员管理页
        {path:'/tzView',component:()=>import('../compontents/tzView.vue'),meta:{hide:false}},             //通知中心
        {path: '/:pathMatch(.*)*', component: () =>import('../compontents/NotFound.vue') }
    ]
})

router.beforeEach((to, from, next) => {
    // 如果目标页面是登录页，直接放行
    if (to.path === '/login') {
        next()
        return
    }
    
    // 检查是否需要认证
    if (!to.meta.hide) {
        const token = sessionStorage.getItem('token')
        if (!token) {
            // 未登录，跳转到登录页
            next('/login')
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router 
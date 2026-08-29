import { createRouter,createWebHistory } from "vue-router";

const router=createRouter({
    history:createWebHistory(),
    routes:[
        {path:'/',redirect:'/Login'},
        {path:'/Login',component:()=>import('../compontents/Login.vue')},               //登录页
        {path:'/home',component:()=>import('../compontents/Home.vue')},                 //首页
        {path:'/projectList',component:()=>import('../compontents/ProjectList.vue')},   //项目列表
        {path:'/rwView',component:()=>import('../compontents/rwView.vue')},             //任务看板
        {path:'/rwDetail',component:()=>import('../compontents/rwDetail.vue')},         //任务详情
        {path:'/rlView',component:()=>import('../compontents/rlView.vue')},             //日历视图
        {path:'/Setting',component:()=>import('../compontents/Setting.vue')},           //设置
        {path:'/People',component:()=>import('../compontents/People.vue')},             //成员管理页
        {path:'/tzView',component:()=>import('../compontents/tzView.vue')},             //通知中心
        {path: '/:pathMatch(.*)*', component: () =>import('../compontents/NotFound.vue') }
    ]

})
export default router
import VueRouter from "vue-router";
import Vue from "vue";


Vue.use(VueRouter);


//1、路由 route
//2、路由表 routes
const routes = [
    // {name:'login',path:"",component:LoginView},
    {name:'login',path:"",component:()=>import('@/views/UserLoginView.vue')},
    {name:'Regist',path:"/Regist",component:()=>import('@/views/RegistView.vue')},
    {name:'Reset',path:"/Reset",component:()=>import('@/views/ResetView.vue')},
    {name:'main',path:"/main",component:()=>import('@/views/MainView.vue'),
        children:[
            {name:'HomePage',path:"/HomePage",component:()=>import('@/views/HomePageView.vue')},
            {name:'PoorArea',path:"/PoorArea",component:()=>import('@/views/PoorAreaView.vue')},
            {name:'CountyDetailView',path:"/CountyDetailView",component:()=>import('@/views/CountyDetailView.vue')},
            {name:'Introduction',path:"/Introduction",component:()=>import('@/views/IntroductionView.vue')},
            {name:'UserCenter',path:"/UserCenter",component:()=>import('@/views/UserCenterView.vue')},
            {name:'Distribute',path:"/Distribute",component:()=>import('@/views/DistributeView.vue')},
            {name:'MessageCenter',path:"/MessageCenter",component:()=>import('@/views/MessageCenterView.vue')},
            {name:'Journal',path:"/Journal",component:()=>import('@/views/JournalView.vue')},
            {name:'JournalDetail',path:"/JournalDetail",component:()=>import('@/views/JournalDetailView.vue')},
            {name:'UserChatView',path:"/UserChatView",component:()=>import('@/views/UserChatView.vue')},
            {name:'RandomDIstribute',path:"/RandomDIstribute",component:()=>import('@/views/RandomDIstributeView.vue')},
            {name:'DistributeCenter',path:"/DistributeCenter",component:()=>import('@/views/DistributeCenterView.vue')}
        ]
        
    },
    //动态导入： 箭头函数
]
//3、路由器 router
const router = new VueRouter({
    mode:'hash',
    routes:routes
})

//4、拦截器【前置/后置】  路由守卫【前置/后置】
//to：到哪里去  from：从哪里来  next（）：放行


//后置守卫；一般是日志

//5、导出 router
export default router


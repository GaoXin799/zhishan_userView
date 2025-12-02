//1、导包
import Vuex from 'vuex'
import Vue from 'vue'
import orderModule from './modules/orderModule';
//2.Vue加载Vuex插件
Vue.use(Vuex)

//3.创建Store 【仓库】对象
const store = new Vuex.Store({
    modules:{
        orderModule,
    },
    state:{ //1、状态：定义状态
        count:0,
        name:'张三'  //取出来用的方式：this.$store.state.count {{ $store.state.count }}，{{ $store.state.name }}
        
    },
    getters:{ //2.1读取  this.$store.getters.方法名
        getCount(state){
            return state.count
        },
        getName(state){
            return state.name
        },
    },
    mutations:{ //3.定义修改的方法【同步代码】  //4.调用： this.$store.commit('方法名'，参数)
        setCount(state,val){
            state.count = val;
        },
        setName(state,val){
            state.name = val;
        }
    },
    // vue外面的框架：向vue-admin-template传参，若依等，所有axios请求，封装到vuex的action中  promise
    actions:{ //5.异步修改的方法【异步代码】 //6.调用： this.$store.dispatch('方法名',参数)
        setCountAsync(context,val){  //context：当前vuex的store对象
            //异步代码  axios或setTimeout
            setTimeout(()=>{
                //直接调用同步修改的方法
                context.commit("setCount",val)
            },1000)
        }

    },
});





//4.导出仓库store
export default store;










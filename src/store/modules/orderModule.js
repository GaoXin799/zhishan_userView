
//1.定义模块
const orderModule = {
    namespaced:true,
    state:{
        coupon: 0,  //优惠券  //1.状态：定义状态  //2.读取：this.$store.state.orderModuls.count
    },
    getters:{ //2.1读取 this.$store.getters["模块名/方法名"]
        getCoupon(state){
            return state.coupon
        }
    },
    mutations:{  //3.定义修改的方法【同步代码】  //4.调用： this.$store.commit('方法名'，参数)
        setCoupon(state,coupon){
            state.coupon = coupon
        }
    },
    actions:{  //5.异步修改的方法【异步代码】 //6.调用： this.$store.dispatch('方法名',参数)

    }
}

//2.导出模块
export default orderModule



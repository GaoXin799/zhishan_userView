import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import http from './utils/request'
//引入EmelentUI的JS（组件）
import ElementUI from 'element-ui';
//引入ElementUI的CSS（样式）
import 'element-ui/lib/theme-chalk/index.css';


Vue.prototype.$axios = http

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
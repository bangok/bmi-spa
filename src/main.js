import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//自己写的样式，修改框架的样式
import './assets/css/mycss.css';

Vue.use(ElementUI);

//配置axios跨域sessionId不丢失
axios.defaults.withCredentials=true;
//启用bootstrap
import "bootstrap"
import "bootstrap/dist/css/bootstrap.css"
//启用axios
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

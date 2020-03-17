import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import  './style/index.css'
import axios from 'axios'
Vue.prototype.$axios=axios
Vue.use(Element)
Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  router
}).$mount('#app')

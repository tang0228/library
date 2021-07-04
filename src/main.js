import Vue from 'vue'
import VCharts from 'v-charts'
import ECharts from "echarts"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import "./eventBus"

Vue.use(VCharts)
Vue.use(ElementUI)
Vue.prototype.$echarts = ECharts;

store.dispatch("user/whoAmI");

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

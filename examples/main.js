import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入
import ddPopup from '../packages/index'
Vue.use(ddPopup)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

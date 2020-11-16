import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'

Vue.config.productionTip = false
require('./helper/init')


export const bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
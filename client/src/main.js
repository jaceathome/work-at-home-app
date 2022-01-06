import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import * as Cookies from 'js-cookie'
// import 'bulma/css/bulma.css'

import '@/assets/fonts/css/icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


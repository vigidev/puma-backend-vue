// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/style.css'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// import VueAuth from '@websanova/vue-auth'
import VueResource from 'vue-resource'
import Notifications from 'vue-notification'
import vmodal from 'vue-js-modal'

// Vue.use(VueAxios, axios)
Vue.use(VueResource)
Vue.use(Notifications)
Vue.use(vmodal)

// axios.defaults.baseURL = ':https://api.pucomputing.org/api/'
// axios.defaults.baseURL = 'http://puma-backend.test/api/'
Vue.http.options.root = 'https://api.pucomputing.org/api/'
// Vue.http.options.root = 'http://puma-backend.test/api/'

// Vue.use(BootstrapVue);

// Vue.config.productionTip = false
Vue.router = router

Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  // token: {request: 'token', response: 'token', authType: 'bearer', foundIn: 'response'},
  // tokenDefaultName: 'sso_auth_token',
  // tokenStore: ['cookie']
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

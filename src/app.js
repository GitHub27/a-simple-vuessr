import Vue from 'vue'

import store from './store/index'

import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router/index'
import * as filters from './util/filters'
import titleMixin from './util/title'


Vue.mixin(titleMixin);

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

sync(store, router)

// const app = new Vue(Vue.util.extend({
//   router,
//   store
// }, App))

const app = new Vue({
  router,
  store,
  render: h => h(App)
})

if (module.hot) {
  module.hot.accept();
}

export { app, router, store }

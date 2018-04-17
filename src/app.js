import Vue from 'vue'

import store from './store/index'

import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router/index'
import * as filters from './util/filters'
import titleMixin from './util/title'
import { Button, Select, Input } from 'element-ui';


Vue.use(Button);
Vue.use(Select);
Vue.use(Input);
Vue.mixin(titleMixin);

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
//   next();
// })

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

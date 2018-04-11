import Vue from 'vue'
import Router from 'vue-router'

import Main from '../views/Main.vue'
import View1 from '../views/View1.vue'
import View2 from '../views/View2.vue'
import testview from '../views/testview.vue'
import _CreateListView from '../views/CreateListView.js'
import zdemo from '../views/zdemo.vue'

Vue.use(Router)


export default new Router({
  mode: 'history',

  fallback: false,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    { path: '/view1', component: View1 },
    { path: '/view2', component: View2 },
    { path: '/zdemo', component: zdemo },
    { path: '/top/:page(\\d+)?', component: _CreateListView('top') },
    { path: '/new/:page(\\d+)?', component: _CreateListView('new') },
    { path: '/show/:page(\\d+)?', component: _CreateListView('show') },
    { path: '/ask/:page(\\d+)?', component: _CreateListView('ask') },
    { path: '/job/:page(\\d+)?', component: _CreateListView('job') },
    { path: '/', component: _CreateListView('top') },    
  ]
})

//代码分割：https://ssr.vuejs.org/zh/routing.html
// //路由分割
// const zdemo3 = r => require.ensure([], () => r(require('../views/zdemo.vue')), 'zdemo')
// //异步组件分割
// const zdemo2 = () => import('../views/zdemo.vue')

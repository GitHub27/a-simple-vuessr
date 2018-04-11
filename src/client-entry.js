import Vue from 'vue'
require('./css/main.css')
require('./stylus/main.styl')
require('es6-promise').polyfill()
import { app, store, router} from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

console.log("window.__INITIAL_STATE__:", window.__INITIAL_STATE__);
// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}




router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
    // 在初始路由 resolve 后执行，
    // 以便我们不会二次预取(double-fetch)已有的数据。
    // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心之前没有渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        // 这里如果有加载指示器(loading indicator)，就触发
        // store.dispatch("requestStart");
        // console.log(store.state.test.loading);
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({
                    store,
                    route: router.currentRoute
                })
            }
        })).then(() => {
            // 停止加载指示器(loading indicator)
            console.log('client-entry.js resolve')

            next()
        }).catch(next)
    })
    // actually mount to DOM
    app.$mount('div')
})
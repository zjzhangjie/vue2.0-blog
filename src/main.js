// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueProgressBar from 'vue-progressbar'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import router from './router'
import store from './store'
import api from './api'
import './assets/global.css'

Vue.config.productionTip = false


localStorage.setItem('debug', 'leancloud*') // 开启调试模式
Vue.mixin({
  beforeCreate() {
    if (api && !this.$api) {
      this.$api = api;
    }
  }
});
//进度条
const options = {
  color: '#428bca',
  failedColor: '#428bca',
  thickness: '10px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
//全局保存用户
const user = api.SDK.User.current()
if (user) {
  store.commit('setUser', user);
}
//needlogin请先登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.needLogin)) {
    if (!store.state.user) {
      // Vue.prototype.$message.error("请先登录");
      app.$message.error("请先登录");
      next({
        path: '/signIn'
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})


Vue.use(VueProgressBar, options)
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

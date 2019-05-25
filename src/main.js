import Vue from 'vue'
import store from './store'
import router from './router'
import App from './App.vue'

import './assets/reset/reset.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Echarts from 'echarts'
import VueLazyload from 'vue-lazyload'//懒加载
import { Dialog, Toast, Notify } from 'vant';
import { isEmpty } from './utils'

Vue.config.productionTip = false;
Vue.prototype.echarts = Echarts;
Vue.prototype.isEmpty = isEmpty
Vue.use(VueAxios, axios);
Vue.use(Echarts);
Vue.use(VueLazyload);
Vue.use(Dialog);
Vue.use(Toast);
Vue.use(Notify);

Toast.allowMultiple(true)
Toast.setDefaultOptions({
  position: 'bottom'
})

;(function () {
  let instances = []
  Vue.prototype.$loading = function (message = '加载中...', duration = 5000, isFullscreen = false, otherOptions = {}) { // 默认加载中超时时间5秒; otherOptions 参数去看vant的toast文档
    let options = {
      type: 'loading',
      message,
      duration,
      mask: isFullscreen,
      position: 'middle',
    }
    instances.push(Toast(Object.assign(options, otherOptions)))
  }
  Vue.prototype.$loadingHide = function () {
    const instance = instances.shift()
    instance && instance.clear()
  }
})()


const main = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})

// TODO 删除测试用的window对象
window.vue = main
window.R = router
window.S = store

export default main

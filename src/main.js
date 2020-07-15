import Vue from "vue"
import App from "./App.vue"
import router from "@/router/index.js"
Vue.config.productionTip = false
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
//导入store
import store from "@/vuex/index.js"

Vue.use(ElementUI)

new Vue({
  //挂载到new vue
  store,
  router,
  render: (h) => h(App),
}).$mount("#app")

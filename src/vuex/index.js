// 导入vuex
import Vuex from "vuex"
//导入vue
import Vue from "vue"
// 注册
Vue.use(Vuex)
//实例化
const store = new Vuex.Store({
  state: {
    userList: "",
    quanxian: "超级管理员",
  },
})
//暴露出去
export default store

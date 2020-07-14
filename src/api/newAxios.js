//导入axios
import axios from "axios"
//导入router
import router from "@/router/index.js"

import { getItem, removeItem } from "@/utils/local.js"
//导入element-ui的弹出框
import { Message } from "element-ui"
let newAxios = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true,
})
newAxios.interceptors.request.use(
  function(config) {
    // window.console.log(config)
    //在请求拦截器里设置请求头   //如果在副本设置请求头 会有Bug 因为副本一导入就执行 永远记住那个token 无论怎么修改 一直都导入时记录的token
    config.headers.token = getItem()
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)
newAxios.interceptors.response.use(
  function(response) {
    if (response.data.code == 200) {
      return response.data
    } else if (response.data.code == 206) {
      //判断是否是没有token或者token超时的行为
      //删除token
      removeItem()
      //跳转到登录页
      //因为在js里 this.$router是在VUE实例对象里使用 这里不适用  因为this.$router=router
      router.push("./login")
      //返回错误  终止执行then
      return Promise.reject("请登录")
    } else {
      // window.console.log(response)
      //element-ui的弹出框
      Message.error(response.data.message)
      //返回的错误信息
      return Promise.reject(response.data.message)
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)
export default newAxios

import axios from "axios"
//导入element-ui的弹出框
import { Message } from "element-ui"
let newAxios = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true,
})
newAxios.interceptors.request.use(
  function(config) {
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
    } else {
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

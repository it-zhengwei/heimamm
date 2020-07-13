import axios from "axios"
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
      return response
    } else {
      return Promise.reject()
    }
  },
  function(error) {
    return Promise.reject(error)
  }
)
function getCaptcha(data) {
  return newAxios({
    method: "post",
    url: "/sendsms",
    data,
  })
}

function register(data) {
  return newAxios({
    method: "post",
    url: "/register",
    data,
  })
}
export { getCaptcha, register }

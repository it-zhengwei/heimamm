import axios from "axios"
let newAxios = axios.create({
  baseURL: process.env.VUE_APP_URL,
  withCredentials: true,
})

function getCaptcha(data) {
  return newAxios({
    method: "post",
    url: "/sendsms",
    data,
  })
}
export { getCaptcha }

import newAxios from "@/api/newAxios.js"
//获取用户列表
function user(params) {
  return newAxios({
    url: "/user/list",
    params,
  })
}
//暴露出去
export { user }

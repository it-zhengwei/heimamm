import newAxios from "./newAxios"

//获取用户信息
function getUser() {
  return newAxios({
    url: "/info",
    //因为每次调用接口都需要设置请求头  所以在请求拦截器设置请求头
    // headers: {
    //   token: getItem(),
    // },
  })
}
//退出
function exit() {
  return newAxios({
    url: "/logout",
  })
}
//获取学科列表
function subjectList() {
  return newAxios({
    url: "/subject/list",
  })
}
export { getUser, exit, subjectList }

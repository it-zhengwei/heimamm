import newAxios from "@/api/newAxios.js"
//获取用户列表
function user(params) {
  return newAxios({
    url: "/user/list",
    params,
  })
}
//设置状态
function update(data) {
  return newAxios({
    url: "/user/status",
    method: "post",
    data,
  })
}
//新增用户
function addUser(data) {
  return newAxios({
    url: "/user/add",
    method: "post",
    data,
  })
}
//编辑用户
function editUser(data) {
  return newAxios({
    url: "/user/edit",
    method: "post",
    data,
  })
}
//删除功能
function delUser(data) {
  return newAxios({
    url: "/user/remove",
    method: "post",
    data,
  })
}
//暴露出去
export { user, update, addUser, editUser, delUser }

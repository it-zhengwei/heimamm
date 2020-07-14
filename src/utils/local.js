//在locaStorage设置token
function setItem(value) {
  window.localStorage.setItem("token", value)
}
//获取token
function getItem() {
  return window.localStorage.getItem("token")
}
//删除token
function removeItem() {
  window.localStorage.removeItem("token")
}
//暴露出去
export { setItem, getItem, removeItem }

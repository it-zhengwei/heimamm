function setItem(value) {
  window.localStorage.setItem("token", value)
}
function getItem() {
  return window.localStorage.getItem("token")
}
function removeItem() {
  window.localStorage.removeItem("token")
}
export { setItem, getItem, removeItem }

function setItem(value) {
  window.localStorage.setItem("token", value)
}
function getItem() {
  return window.localStorage.getItem("token")
}
export { setItem, getItem }

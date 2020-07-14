import newAxios from "./newAxios"
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

function login(data) {
  return newAxios({
    url: "/login",
    method: "post",
    data,
  })
}
export { getCaptcha, register, login }

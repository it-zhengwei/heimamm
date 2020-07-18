import newAxios from "@/api/newAxios.js"
//获取企业列表
function getList(params) {
  return newAxios({
    url: "/enterprise/list",
    params,
  })
}
//改变状态接口
function setStatus(data) {
  return newAxios({
    url: "/enterprise/status",
    method: "post",
    data,
  })
}
//暴露出去
export { getList, setStatus }

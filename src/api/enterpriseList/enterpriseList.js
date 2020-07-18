import newAxios from "@/api/newAxios.js"
//获取企业列表
function getList(params) {
  return newAxios({
    url: "/enterprise/list",
    params,
  })
}
//暴露出去
export { getList }

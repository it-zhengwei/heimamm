import newAxios from "./newAxios"
//获取学科列表
function subjectList(params) {
  return newAxios({
    url: "/subject/list",
    params,
  })
}
//设置状态
function setStatus(data) {
  return newAxios({
    url: "/subject/status",
    data,
    method: "post",
  })
}
//暴露出去
export { subjectList, setStatus }

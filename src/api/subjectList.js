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
//新增学科
function addSubject(data) {
  return newAxios({
    url: "/subject/add",
    method: "post",
    data,
  })
}
//编辑学科
function editSubject(data) {
  return newAxios({
    url: "/subject/edit",
    method: "post",
    data,
  })
}
//暴露出去

export { subjectList, setStatus, addSubject, editSubject }

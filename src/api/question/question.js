import newAxios from "@/api/newAxios.js"
//获取题目列表
function questionList(params) {
  return newAxios({
    url: "/question/list",
    params,
  })
}
//设置题目状态
function setStatus(data) {
  return newAxios({
    url: "/question/status",
    data,
    method: "post",
  })
}
//新增题目
function add(data) {
  return newAxios({
    url: "/question/add",
    data,
    method: "post",
  })
}
//编辑题目
function edit(data) {
  return newAxios({
    url: "/question/edit",
    method: "post",
    data,
  })
}
//删除功能
function dele(data) {
  return newAxios({
    url: "/question/remove",
    method: "post",
    data,
  })
}
//暴露出去
export { questionList, setStatus, add, edit, dele }

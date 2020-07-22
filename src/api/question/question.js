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
//暴露出去
export { questionList, setStatus, add }

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
//添加企业功能
function addEnterpriseList(data) {
  return newAxios({
    url: "/enterprise/add",
    method: "post",
    data,
  })
}
//编辑功能
function editEnterpriseList(data) {
  return newAxios({
    url: "/enterprise/edit",
    method: "post",
    data,
  })
}
//删除功能
function delEnterpriseList(data) {
  return newAxios({
    url: "/enterprise/remove",
    method: "post",
    data,
  })
}
//暴露出去
export {
  getList,
  setStatus,
  addEnterpriseList,
  editEnterpriseList,
  delEnterpriseList,
}

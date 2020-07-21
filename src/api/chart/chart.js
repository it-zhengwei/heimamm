import newAxios from "@/api/newAxios.js"
//获取面板数据
function title(data) {
  return newAxios({
    url: "/data/title",
    method: "post",
    data,
  })
}
//获取企业名称和数量
function content(data) {
  return newAxios({
    url: "/data/statistics",
    method: "post",
    data,
  })
}
//暴露出去
export { title, content }

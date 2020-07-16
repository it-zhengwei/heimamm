import newAxios from "./newAxios"
//获取学科列表
function subjectList() {
  return newAxios({
    url: "/subject/list",
  })
}
export { subjectList }

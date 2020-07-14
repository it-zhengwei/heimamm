import VueRouter from "vue-router"
import Vue from "vue"
Vue.use(VueRouter)
import layout from "@/views/layout/layout.vue"
import login from "@/views/login/login.vue"
//导入组件
import data from "@/views/layout/children/data.vue"
import enterpriseList from "@/views/layout/children/enterpriseList.vue"
import questionList from "@/views/layout/children/questionList.vue"
import subject from "@/views/layout/children/subject.vue"
import userList from "@/views/layout/children/userList.vue"
const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: login,
    },
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/layout",
      component: layout,
      redirect: "/layout/data",
      children: [
        {
          path: "/layout/data", //如果不写/ 直接写名字 是相对模式 /layout/名字  如果是完整模式写 /layout/名字
          component: data,
        },
        {
          path: "enterpriseList",
          component: enterpriseList,
        },
        {
          path: "/layout/questionList",
          component: questionList,
        },
        {
          path: "subject",
          component: subject,
        },
        {
          path: "/layout/userList",
          component: userList,
        },
      ],
    },
  ],
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router

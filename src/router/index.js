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
//导入nprogress
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import nProgress from "nprogress"
const router = new VueRouter({
  //路由元信息 meta属性
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        title: "登录",
      },
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
          meta: {
            title: "数据概览",
          },
        },
        {
          path: "enterpriseList",
          component: enterpriseList,
          meta: {
            title: "企业列表",
          },
        },
        {
          path: "/layout/questionList",
          component: questionList,
          meta: {
            title: "问题列表",
          },
        },
        {
          path: "subject",
          component: subject,
          meta: {
            title: "学科列表",
          },
        },
        {
          path: "/layout/userList",
          component: userList,
          meta: {
            title: "用户列表",
          },
        },
      ],
    },
  ],
})
//导航守卫  其实就是路由的拦截器
//进入前导航守卫
router.beforeEach((to, from, next) => {
  //进度条开始
  NProgress.start()
  //运行通过
  next()
})

//进入后导航守卫
router.afterEach((to) => {
  //进度条结束
  nProgress.done()
  //在进入后的路由获取当前路由的元信息然后赋值给标题
  document.title = to.meta.title
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router

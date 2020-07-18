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
import store from "@/vuex/index.js"
import { Message } from "element-ui"
import { removeItem } from "@/utils/local.js"
const router = new VueRouter({
  //路由元信息 meta属性
  routes: [
    {
      path: "/login",
      component: login,
      meta: {
        title: "登录",
        quanxianList: ["超级管理员", "老师", "学生", "管理员"],
      },
    },
    {
      path: "*",
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
            quanxianList: ["超级管理员", "老师", "管理员"],
          },
        },
        {
          path: "enterpriseList",
          component: enterpriseList,
          meta: {
            title: "企业列表",
            quanxianList: ["超级管理员", "管理员", "老师"],
          },
        },
        {
          path: "/layout/questionList",
          component: questionList,
          meta: {
            title: "题库列表",
            quanxianList: ["超级管理员", "老师", "管理员"],
          },
        },
        {
          path: "subject",
          component: subject,
          meta: {
            title: "学科列表",
            quanxianList: ["超级管理员", "老师", "管理员"],
          },
        },
        {
          path: "/layout/userList",
          component: userList,
          meta: {
            title: "用户列表",
            quanxianList: ["超级管理员", "管理员"],
          },
        },
      ],
    },
  ],
})
//导航守卫  其实就是路由的拦截器
//进入前导航守卫
router.beforeEach((to, from, next) => {
  //判断目标路由是否可以访问
  if (!to.meta.quanxianList.includes(store.state.quanxian)) {
    //提示用户
    Message.error("您没有权限访问，请联系管理员")
    //删除token
    removeItem()
    //跳转到/login
    next("/login")
  }

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

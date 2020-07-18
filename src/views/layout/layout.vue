<template>
  <div>
    <el-container class="layout">
      <el-header class="header">
        <ul class="top">
          <li class="el-icon-s-fold menu" @click="fold = !fold"></li>
          <li class="layout_logo">
            <img src="@/assets/img/layout-logo.png" alt />
          </li>
          <li class="layout_title">黑马面面</li>
          <li class="layout_null"></li>
          <li class="layout_avatar">
            <img
              v-if="$store.state.userList != ''"
              :src="baseUrl + '/' + $store.state.userList.avatar"
              alt
            />
          </li>
          <li class="username">{{ $store.state.userList.username }},您好</li>
          <li class="layout_out">
            <el-button type="primary" @click="Exit">退出</el-button>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="auto" class="nav">
          <el-menu
            :default-active="$route.path"
            :router="true"
            class="el-menu-vertical-demo"
            :collapse="fold"
          >
            <el-menu-item index="/layout/data">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据概览</span>
            </el-menu-item>

            <el-menu-item index="/layout/userList">
              <i class="el-icon-user"></i>
              <span slot="title">用户列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/questionList">
              <i class="el-icon-edit-outline"></i>
              <span slot="title">题库列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/enterpriseList">
              <i class="el-icon-office-building"></i>
              <span slot="title">企业列表</span>
            </el-menu-item>
            <el-menu-item index="/layout/subject">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">学科列表</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
//导入删除token的方法
import { removeItem } from "@/utils/local.js";
import { getUser, exit } from "@/api/getUser.js";
export default {
  data() {
    return {
      fold: false,
      baseUrl: process.env.VUE_APP_URL,
      userList: ""
    };
  },
  methods: {
    //退出
    Exit() {
      //element-ui的弹框
      this.$confirm("你确定要退出", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          exit().then(() => {
            //提示用户
            this.$message.success("退出成功");
            //删除token
            removeItem();
            //跳转到登录页
            this.$router.push("/login");
          });
        })
        .catch(() => {});
    }
  },
  created() {
    getUser().then(res => {
      // window.console.log(res);
      //把获取的用户信息保存到vuex共享数据管理里  任何组件都可以使用
      //因为公用的用户信息放在数据共享管理里 可以减少服务器压力
      this.$store.state.userList = res.data;
      //获取用户信息的权限保存到vuex
      this.$store.state.quanxian = res.data.role;
      //因为获取用户信息权限是异步操作  可能还没有获取到就又跳转了  达不到拦截的效果 所以在这里再拦截一下
      if (!this.$route.meta.quanxianList.includes(this.$store.state.quanxian)) {
        //提示用户
        this.$message.error("您没有权限访问，请联系管理员");
        //删除token
        removeItem();
        //跳转到login
        this.$router.push("/login");
      }
      //判断账号是否被禁用了
      if (res.data.status == 0) {
        this.$message.warning("您账号已经被冻结，请联系管理员");
        removeItem();
        this.$router.push("/login");
      }
    });
  }
};
</script>

<style lang="less">
.layout {
  width: 100%;
  height: 100%;
  .header {
    height: 60px;

    .top {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      .layout_null {
        flex: 1;
      }
      .menu {
        width: 34px;
        height: 30px;
        font-size: 32px;
        margin: 0 7px 0 0;
      }
      .layout_logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
        img {
          width: 100%;
        }
      }
      .layout_title {
        font-size: 22px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #49a1ff;
        letter-spacing: 1px;
      }
      .layout_avatar {
        width: 43px;
        height: 43px;
        img {
          width: 100%;
          border-radius: 50%;
        }
      }
      .username {
        font-size: 14px;
        font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
        font-weight: bold;
        text-align: left;
        color: #636363;
        letter-spacing: 0px;
        margin: 0 38px 0 9px;
      }
    }
  }
  .nav {
    height: 769px;
    background-color: #ffffff;
  }
  .main {
    width: 100%;
    height: 769px;
    background-color: #e8e9ec;
  }
}
// 如果有.el-menu-vertical-demo这个类没有.el-menu--collapse这个类这个样式就生效  collapse控制着.el-menu--collapse
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

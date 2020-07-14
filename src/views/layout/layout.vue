<template>
  <div>
    <el-container class="layout">
      <el-header class="header">
        <ul class="top">
          <li class="el-icon-s-fold menu"></li>
          <li class="layout_logo">
            <img src="@/assets/img/layout-logo.png" alt />
          </li>
          <li class="layout_title">黑马面面</li>
          <li class="layout_null"></li>
          <li class="layout_avatar">
            <img v-if="userList!=''" :src="baseUrl+'/'+userList.avatar" alt />
          </li>
          <li class="username">{{userList.username}},您好</li>
          <li class="layout_out">
            <el-button type="primary">退出</el-button>
          </li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="200px" class="nav">Aside</el-aside>
        <el-main class="main">Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUser } from "@/api/getUser.js";
export default {
  data() {
    return {
      baseUrl: process.env.VUE_APP_URL,
      userList: ""
    };
  },
  created() {
    getUser().then(res => {
      // window.console.log(res);
      this.userList = res.data;
    });
  }
};
</script>

<style lang='less'>
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
        margin: 0 24px 0 15px;
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
    background-color: red;
  }
  .main {
    background-color: yellow;
  }
}
</style>
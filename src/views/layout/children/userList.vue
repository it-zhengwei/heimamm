<template>
  <div>
    <el-card>
      <el-form ref="form" :inline="true" :model="form" label-width="70px">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id">
          <el-select placeholder="请选择状态" v-model="form.role_id">
            <el-option value="1" label="超级管理员"></el-option>
            <el-option value="2" label="管理员"></el-option>
            <el-option value="3" label="老师"></el-option>
            <el-option value="4" label="学生"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary" @click="addUsername">+新增用户</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="footer">
      <el-table :data="userList">
        <el-table-column label="序号" width="70px">
          <template v-slot="scope">{{(pagination.page-1)*pagination.size+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="120px"></el-table-column>
        <el-table-column label="电话" prop="phone" width="170px"></el-table-column>
        <el-table-column label="邮箱" prop="email" width="170px"></el-table-column>
        <el-table-column label="角色" prop="role" width="150px"></el-table-column>
        <el-table-column label="备注" prop="remark" width="120px"></el-table-column>
        <el-table-column label="状态" prop="status" width="100px">
          <template v-slot="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==0?'禁用':'开启'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="editUser(scope.row)">编辑</el-button>
            <el-button @click="setStatus(scope.row.id)">{{scope.row.status==0?'开启':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagination.page"
        :page-sizes="[2,10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <userList ref="user" @search="search" mode="mode" @getData="getData"></userList>
  </div>
</template>

<script>
//导入组件
import userList from "@/components/addUser.vue";
//导入接口
import { user, update, delUser } from "@/api/user/userList.js";
export default {
  //注册
  components: {
    userList
  },
  data() {
    return {
      mode: "",
      total: 0,
      pagination: {
        size: 2,
        page: 1
      },
      userList: [],
      form: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //封装获取用户列表默认的信息
    getData() {
      let params = {
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.size
      };
      user(params).then(res => {
        // window.console.log(res);
        this.userList = res.data.items;
        //把当前总条数给total
        this.total = res.data.pagination.total;
      });
    },
    //页容量改变
    sizeChange(size) {
      // window.console.log(size);
      //获取当前页容量的信息
      this.pagination.size = size;
      this.getData();
    },
    //页码改变
    currentChange(page) {
      // window.console.log(page);
      //获取当前页码的数据
      this.pagination.page = page;
      this.getData();
    },
    //搜索功能
    search() {
      //默认搜索第一页的数据
      this.pagination.page = 1;
      this.getData();
    },
    //清除表单内容功能
    reset() {
      this.$refs.form.resetFields();
      //执行搜索功能
      this.search();
    },
    //设置状态
    setStatus(id) {
      update({ id }).then(() => {
        //提示用户
        this.$message.success("设置状态成功");
        //刷新默认数据
        this.getData();
      });
    },
    //新增用户
    addUsername() {
      //改变状态值
      this.mode = "add";
      //显示对话框
      this.$refs.user.isShow = true;
    },
    //编辑功能
    editUser(data) {
      //改变状态值
      this.mode = "edit";
      //把整行数据给子组件的form
      this.$refs.user.form = JSON.parse(JSON.stringify(data));
      if (this.$refs.user.form.status == 0) {
        this.$refs.user.form.status = "禁用";
      } else {
        this.$refs.user.form.status = "开启";
      }
      this.$refs.user.form.role_id = this.$refs.user.form.role;
      //显示对话框
      this.$refs.user.isShow = true;
    },
    //删除功能
    del(id) {
      this.$confirm("你确定要删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          delUser({ id }).then(() => {
            //提示用户
            this.$message.success("删除成功");
            //刷新数据
            this.search();
          });
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='less'>
.red {
  color: red;
}
</style>

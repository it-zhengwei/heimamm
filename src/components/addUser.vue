<template>
  <el-dialog :visible.sync="isShow" class="addUser" width="600px">
    <div slot="title" class="title">{{mode=='add'?'新增用户':'编辑用户'}}</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id">
        <el-select placeholder="请选择角色" v-model="form.role_id">
          <el-option value="3" label="老师"></el-option>
          <el-option value="2" label="管理员"></el-option>
          <el-option value="4" label="学生"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select placeholder="请选择状态" v-model="form.status">
          <el-option value="1" label="开启"></el-option>
          <el-option value="0" label="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" prop="remark">
        <el-input v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow=false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入接口
import { addUser, editUser } from "@/api/user/userList.js";
export default {
  props: ["mode"],
  watch: {
    //侦听器
    //侦听isShow的变化
    isShow(newVal) {
      if (newVal == false) {
        //因为编辑的整行数据如果不清空会影响新增  所以需要对form进行初始化
        (this.form = {
          username: "", //	是	string	用户名
          email: "", //	是	string	邮箱
          phone: "", //	是	string	手机号
          role_id: "", //	是	string	角色 、2 管理员、3 老师、4 学生
          status: "", //	否	string	1(启用)0(禁用)
          remark: "" //	否	string	备注
        }),
          this.$nextTick(() => {
            this.$refs.form.clearValidate();
          });
      }
    }
  },
  methods: {
    //提交功能
    submit() {
      //调用form表单的全局验证
      this.$refs.form.validate(v => {
        if (v) {
          //判断是编辑还是新增
          if (this.mode == "add") {
            addUser(this.form).then(() => {
              //提示用户
              this.$message.success("新增成功");
            });
          } else {
            editUser(this.form).then(() => {
              //提示用户
              this.$message.success("编辑成功");
            });
          }
          //刷新数据
          this.$emit("search");
          //关闭对话框
          this.isShow = false;
        } else {
          //提示用户
          this.$message.error("请完善信息");
        }
      });
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        username: "", //	是	string	用户名
        email: "", //	是	string	邮箱
        phone: "", //	是	string	手机号
        role_id: "", //	是	string	角色 、2 管理员、3 老师、4 学生
        status: "", //	否	string	1(启用)0(禁用)
        remark: "" //	否	string	备注
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "change" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "change" }],
        phone: [{ required: true, message: "请输入电话", trigger: "change" }],
        role_id: [{ required: true, message: "请输入角色", trigger: "change" }]
      }
    };
  }
};
</script>

<style lang='less'>
.addUser {
  .el-dialog__header {
    padding: 0;
  }
  .footer {
    text-align: right;
  }
}
</style>
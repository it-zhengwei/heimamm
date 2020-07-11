<template>
  <el-dialog :show-close="false" :visible="bol" width="600px" class="dialog">
    <div slot="title" class="title">用户注册</div>
    <el-form :model="register_form" label-width="80px" :rules="register_rules">
      <el-form-item label="昵称">
        <el-input v-model="register_form.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="register_form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="register_form.phone" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="register_form.password" show-password="true" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="图形码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="register_form.type" placeholder="请输入图形码"></el-input>
          </el-col>
          <el-col :span="8">
            <img src="@/assets/logo.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码">
        <el-row>
          <el-col :span="16">
            <el-input v-model="register_form.rcode" placeholder="请输入验证码"></el-input>
          </el-col>
          <el-col :span="8">
            <el-button>获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="bol=false">取消</el-button>
      <el-button type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      bol: false,
      register_form: {},
      register_rules: {}
    };
  }
};
</script>

<style lang='less'>
.dialog .el-dialog__header {
  padding: 0;
}
.title {
  width: 100%;
  height: 53px;
  text-align: center;
  color: #fff;
  line-height: 53px;
  background: linear-gradient(to right, #02c3fa, #1396fa);
}
.footer {
  text-align: center;
}
</style>
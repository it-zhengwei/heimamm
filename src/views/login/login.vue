<template>
  <div class="login">
    <div class="left">
      <div class="header">
        <img class="logo" src="@/assets/img/login_logo.png" alt />
        <span class="left_t1">黑马面面</span>
        <div class="left_border"></div>
        <span class="left_t2">用户登录</span>
      </div>
      <el-form ref="form" :rules="rules" :model="form" class="form">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" :show-password="true"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="8">
              <img class="captcha" @click="refresh" :src="captcha" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isTrue">
          <el-checkbox v-model="form.isTrue" label="勾选">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="btn" type="primary" @click="login">登录</el-button>
          <br />
          <el-button class="btn" type="primary" @click="register">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="@/assets/img/login_right.png" alt />
    <register ref="register"></register>
  </div>
</template>

<script>
import { setItem } from "@/utils/local.js";
import { login } from "@/api/getCaptcha.js";
import register from "@/components/register.vue";
export default {
  components: {
    register
  },
  data() {
    return {
      captcha: process.env.VUE_APP_URL + "/captcha?type=login",
      form: {
        phone: "",
        password: "",
        code: "",
        isTrue: ""
      },
      rules: {
        phone: [
          { required: "true", message: "请输入手机号", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                  value
                )
              ) {
                callback();
              } else {
                callback(new Error("请输入正确的手机号码"));
              }
            },
            trigger: "change"
          }
        ],
        password: [
          { required: "true", message: "请输入密码", trigger: "change" }
        ],
        code: [
          { required: "true", message: "请输入验证码", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (/^\d{4}$/.test(value)) {
                callback();
              } else {
                callback(new Error("请输入四个数字"));
              }
            },
            trigger: "change"
          }
        ],
        isTrue: [
          { required: "true", message: "请勾选协议", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              if (value == true) {
                callback();
              } else {
                callback(new Error("请勾选协议"));
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$refs.form.validate(v => {
        if (v) {
          login(this.form).then(res => {
            // window.console.log(res);
            setItem(res.data.token);
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/layout");
          });
        } else {
          this.$message({
            type: "error",
            message: "请完善信息"
          });
        }
      });
    },
    register() {
      this.$refs.register.bol = true;
    },
    refresh() {
      this.captcha =
        process.env.VUE_APP_URL + "/captcha?type=login&sadf=" + Date.now();
    }
  }
};
</script>

<style lang='less'>
.login {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(to right, #1493fa, #01c6fa);
  .left {
    width: 478px;
    height: 550px;
    padding: 48px;
    background: #f5f5f5;

    .header {
      display: flex;
      align-items: center;
      .logo {
        width: 22px;
        height: 17px;
      }
      .left_t1 {
        padding: 0 15px;
        font-size: 24px;
        font-family: SourceHanSansCN Regular, SourceHanSansCN Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
      .left_border {
        width: 1px;
        height: 28px;
        background: #c7c7c7;
      }
      .left_t2 {
        padding-left: 15px;
        font-size: 22px;
        font-family: PingFangSC Regular, PingFangSC Regular-Regular;
        font-weight: 400;
        text-align: left;
        color: #0c0c0c;
      }
    }
    .form {
      width: 100%;
      margin-top: 20px;
      .captcha {
        width: 100%;
        height: 40px;
      }
      .btn {
        width: 100%;
        height: 40px;
        margin-top: 20px;
      }
    }
  }
}
</style>
<template>
  <el-dialog :show-close="false" :visible="bol" width="600px" class="dialog">
    <div slot="title" class="title">用户注册</div>
    <el-form
      ref="form"
      :model="register_form"
      label-width="80px"
      :rules="rules"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="upload"
          :action="icon_url"
          name="image"
          :show-file-list="false"
          :before-upload="beforeupload"
          :on-success="success"
        >
          <img v-if="iconImage" :src="iconImage" alt />
          <i class="el-icon-folder-add upload_i" v-else></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" prop="username">
        <el-input
          v-model="register_form.username"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="register_form.email"
          placeholder="请输入邮箱"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input
          v-model="register_form.phone"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="register_form.password"
          :show-password="true"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item label="图形码" prop="type">
        <el-row>
          <el-col :span="14">
            <el-input
              v-model="register_form.type"
              placeholder="请输入图形码"
            ></el-input>
          </el-col>
          <el-col :span="8" :offset="1">
            <img class="type" @click="refresh" :src="type_icon" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" prop="rcode">
        <el-row>
          <el-col :span="14">
            <el-input
              v-model="register_form.rcode"
              placeholder="请输入验证码"
            ></el-input>
          </el-col>
          <el-col :span="8" :offset="1">
            <el-button @click="getRcode" :disabled="msg < 5"
              ><span v-if="msg == 5">获取用户验证码</span
              ><span v-else>{{ msg + 1 }}</span></el-button
            >
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="bol = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getCaptcha, register } from "@/api/getCaptcha.js"
export default {
  watch: {
    bol(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields()
        this.iconImage = ""
      }
    },
  },
  data() {
    return {
      something: "",
      msg: 5,
      type_icon: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      icon_url: process.env.VUE_APP_URL + "/uploads",
      iconImage: "",
      bol: false,
      register_form: {
        username: "",
        phone: "",
        email: "",
        type: "",
        password: "",
        rcode: "",

        avatar: "",
      },
      rules: {
        username: [{ required: true, message: "必填", trigger: "change" }],
        phone: [
          {
            validator: (rule, value, callback) => {
              if (
                /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                  value
                )
              ) {
                callback()
              } else {
                callback(new Error("请输入正确的手机号"))
              }
            },
            trigger: "change",
          },
          { required: true, message: "必填", trigger: "change" },
        ],
        email: [
          { required: true, message: "必填", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let guizhe = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/

              if (guizhe.test(value)) {
                callback()
              } else {
                callback(new Error("请输入正确的邮箱"))
              }
            },
            trigger: "change",
          },
        ],

        password: [{ required: true, message: "必填", trigger: "change" }],
        rcode: [{ required: true, message: "必填", trigger: "change" }],
        type: [
          {
            validator: (rule, value, callback) => {
              if (/^\d{4}$/.test(value)) {
                callback()
              } else {
                callback(new Error("请输入正确的图形码"))
              }
            },
            trigger: "change",
          },
          { required: true, message: "必填", trigger: "change" },
        ],
        avatar: [{ required: true, message: "必填", trigger: "change" }],
      },
    }
  },
  methods: {
    refresh() {
      this.type_icon =
        process.env.VUE_APP_URL +
        "/captcha?type=sendsms&asdfa=" +
        Math.random() * 888
    },
    getRcode() {
      let num = 0
      this.$refs.form.validateField(["phone", "type"], (error) => {
        if (error == "") {
          num++
        }
        if (num == 2) {
          this.msg--
          let timeId = setInterval(() => {
            this.msg--
            if (this.msg <= -1) {
              clearInterval(timeId)
              this.msg = 5
            }
          }, 1000)
          getCaptcha({
            code: this.register_form.type,
            phone: this.register_form.phone,
          })
            .then((res) => {
              // window.console.log("哈哈")
              //this.$message里的提示信息要字符串
              if (res.data.code == 200) {
                this.$message.success(res.data.data.captcha + "")
              }
            })
            .catch((error) => {
              window.console.log(error)
            })
        }
      })
    },

    beforeupload(file) {
      let size = file.size / 1024 / 1024 < 3
      let type = file.type == "image/jpeg" || file.type == "image/png"
      if (!size) {
        this.$message.error("不能大于3M")
      }
      if (!type) {
        this.$message.error("格式是jpg和png")
      }
      return size && type
    },
    success(res) {
      // window.console.log(res);
      this.register_form.avatar = res.data.file_path
      //手动触发验证   如果传了值 就验证通过 error是空  如果没有传值 验证不通过 error返回错误信息
      this.$refs.form.validateField(["avatar"], (error) =>
        window.console.log(error)
      )
      this.iconImage = process.env.VUE_APP_URL + "/" + res.data.file_path
    },
    submit() {
      this.$refs.form.validate((v) => {
        if (v) {
          register(this.register_form).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "注册成功",
              })
              this.bol = false
            }
          })
        } else {
          this.$message({
            type: "error",
            message: "请完善信息",
          })
        }
      })
    },
  },
}
</script>

<style lang="less">
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
.upload {
  width: 179px;
  height: 179px;
  background: #cecece;
  border: 1px solid #cecece;
  border-radius: 4px;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
  }
}
i.upload_i {
  font-size: 28px;
  color: #8c939d;

  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.type {
  width: 100%;
  height: 41px;
}
</style>

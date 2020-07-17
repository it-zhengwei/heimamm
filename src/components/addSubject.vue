<template>
  <el-dialog :visible.sync="isShow" width="600px" class="addSubject">
    <div slot="title" class="title">新增学科</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="学科编号" prop="rid">
        <el-input v-model="form.rid"></el-input>
      </el-form-item>
      <el-form-item label="学科名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="学科简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="学科简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="学科备注" prop="remark">
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
import { addSubject } from "@/api/subjectList.js";
export default {
  //设置侦听器
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        this.$refs.form.resetFields();
      }
    }
  },
  data() {
    return {
      form: {
        rid: "", //	是	string	学科编号
        name: "", //	是	string	学科名称
        short_name: "", //	否	string	学科简称
        intro: "", //	否	string	学科简介
        remark: "" //	否	string	备注
      },
      isShow: false,
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "change" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "change" }]
      }
    };
  },
  methods: {
    submit() {
      //使用form表单的validate方法全局验证
      this.$refs.form.validate(v => {
        if (v) {
          addSubject(this.form).then(() => {
            this.$message.success("新增学科成功");
            //关闭对话框
            this.isShow = false;
            //刷新数据  调用父组件的search方法 子传父  实际就是子调用父组件的方法
            this.$emit("search");
          });
        } else {
          this.$message.error("请完善信息");
        }
      });
    }
  }
};
</script>

<style lang='less'>
.addSubject {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
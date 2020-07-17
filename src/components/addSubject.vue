<template>
  <el-dialog :visible.sync="isShow" width="600px" class="addSubject">
    <div slot="title" class="title">{{mode=='edit'?'编辑学科':'新增学科'}}</div>
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
import { addSubject, editSubject } from "@/api/subjectList.js";
export default {
  //设置侦听器
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        //初始化表单数据    主要是避免编辑功能覆盖的数据影响新增操作
        (this.form = {
          rid: "", //	是	string	学科编号
          name: "", //	是	string	学科名称
          short_name: "", //	否	string	学科简称
          intro: "", //	否	string	学科简介
          remark: "" //	否	string	备注
        }),
          //移除表单的校验结果    resetFields()是移除校验结果和清空表单数据
          //因为上面初始化数据会触发表单验证的change 所以会有表单验证  所以有时清空了表单验证才触发change
          //所以给清除表单验证一个定时器的高级用法 让数据渲染了执行了change才清空表单验证
          this.$nextTick(() => {
            this.$refs.form.clearValidate();
          });
      }
    }
  },
  props: ["mode"],
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
          //判断状态值是新增还是编辑
          if (this.mode == "edit") {
            //编辑操作
            editSubject(this.form).then(() => {
              //提示用户
              this.$message.success("编辑成功");
              //调用父组件方法刷新数据
              this.$emit("getData");
              //隐藏对话框
              this.isShow = false;
            });
          } else {
            //新增操作
            addSubject(this.form).then(() => {
              this.$message.success("新增学科成功");
              //关闭对话框
              this.isShow = false;
              //刷新数据  调用父组件的search方法 子传父  实际就是子调用父组件的方法
              this.$emit("search");
            });
          }
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
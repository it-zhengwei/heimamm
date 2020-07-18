<template>
  <el-dialog :visible.sync="isShow" class="addEnterprise" width="600px">
    <div slot="title" class="title">{{mode=="add"?'新增企业':'编辑企业'}}</div>
    <el-form ref="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="企业编号" prop="eid">
        <el-input v-model="form.eid"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="form.short_name"></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="intro">
        <el-input v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
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
import {
  addEnterpriseList,
  editEnterpriseList
} from "@/api/enterpriseList/enterpriseList.js";
export default {
  props: ["mode"],
  //侦听器
  watch: {
    //侦听isShow的变化
    isShow(newVal) {
      if (newVal == false) {
        //因为编辑时的数据影响到了新增
        //所以进行表单初始化
        (this.form = {
          eid: "", //	是	string	企业编号
          name: "", //	是	string	企业名称
          short_name: "", //	是	string	简称
          intro: "", //	是	string	企业简介
          remark: "" //	否	string	备注
        }),
          //清空表单验证  因为初始化会导致表单的验证 所以等数据渲染完成再清除表单验证
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
            //发送请求
            addEnterpriseList(this.form).then(() => {
              //提示用户
              this.$message.success("新增成功");
              //刷新数据  调用父组件的搜索功能
              this.$emit("search");
              //关闭对话框
              this.isShow = false;
            });
          } else {
            //执行编辑功能
            editEnterpriseList(this.form).then(() => {
              //提示用户
              this.$message.success("编辑成功");
              //关闭对话框
              this.isShow = false;
              //刷新数据  调用父组件的默认获取列表功能
              this.$emit("getData");
            });
          }
        } else {
          this.$message.error("请完善信息");
        }
      });
    }
  },
  data() {
    return {
      isShow: false,
      form: {
        eid: "", //	是	string	企业编号
        name: "", //	是	string	企业名称
        short_name: "", //	是	string	简称
        intro: "", //	是	string	企业简介
        remark: "" //	否	string	备注
      },
      rules: {
        eid: [{ required: true, message: "请输入企业编号", trigger: "change" }],
        name: [
          { required: true, message: "请输入企业名称", trigger: "change" }
        ],
        short_name: [
          { required: true, message: "请输入企业简称", trigger: "change" }
        ],
        intro: [
          { required: true, message: "请输入企业简介", trigger: "change" }
        ]
      }
    };
  }
};
</script>

<style lang='less'>
.addEnterprise {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
}
</style>
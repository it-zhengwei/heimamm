<template>
  <el-dialog class="addQuestion" :visible.sync="isShow" :fullscreen="true">
    <div slot="title" class="title">{{mode=='add'?'新增题库测试':'编辑题库测试'}}</div>
    <el-form ref="form" class="form" :rules="rules" :model="form" label-width="100px">
      <el-form-item label="学科" prop="subject">
        <el-select v-model="form.subject" placeholder="请选择学科">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in $parent.subject"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step">
        <el-select v-model="form.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise">
        <el-select v-model="form.enterprise" placeholder="请选择企业">
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, index) in $parent.enterpriseList"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city">
        <!-- cascader级联选择器  options是数据  props是配置 把label的值当作value -->
        <el-cascader v-model="form.city" :options="options" :props="{ value: 'label' }"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio :label="index + 1" v-for="(item, index) in typeArr" :key="index">{{ item }}</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="难度" prop="difficulty">
        <el-radio-group v-model="form.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <hr />
      <el-form-item label="试题标题" prop="title">
        <quillEditor
          v-model="form.title"
          :options="{ placeholder: '请在这里输入.....' }"
          @change="validateField('title')"
        ></quillEditor>
      </el-form-item>
      <el-form-item :label="typeArr[form.type - 1]" :prop="obj[form.type]">
        <allSelect :form="form" @validateField="validateField"></allSelect>
      </el-form-item>
      <hr />
      <el-form-item label="解析视频">
        <!-- <el-button type="primary">点击上传</el-button> -->
        <upload id="hahah" v-model="form.video" type="video"></upload>
      </el-form-item>
      <hr />
      <el-form-item label="答案解析" prop="answer_analyze">
        <quillEditor
          v-model="form.answer_analyze"
          :options="{ placeholder: '请在这里输入....' }"
          @change="validateField('answer_analyze')"
        ></quillEditor>
      </el-form-item>
      <hr />
      <el-form-item label="答案备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入接口
import { add, edit } from "@/api/question/question.js";
//导入上传组件
import upload from "./upload";
//导入单选组件
import allSelect from "./allSelect";
//导入省市区数
import { regionData } from "element-china-area-data";
//导入富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
export default {
  //侦听器
  watch: {
    isShow(newVal) {
      if (newVal == false) {
        //初始化
        this.form = {
          title: "", //	是	string	标题
          subject: "", //	是	int	学科id标识
          step: "", //	是	int	阶段1、初级 2、中级 3、高级
          enterprise: "", //	是	int	企业id标识
          city: [], //	是	array	[省、市、区县]
          type: 1, //	是	string	题型 1单选 、2多选 、3简答
          difficulty: 1, //	是	int	题目难度 1简单 、2一般 、3困难
          single_select_answer: "", //	是	string	单选题答案
          multiple_select_answer: [], //	是	array	多选题答案
          short_answer: "", //	是	string	简答题答案
          video: "", //	否	string	解析视频地址
          answer_analyze: "", //	是	string	答案解析
          remark: "", //	是	string	答案备注
          select_options: [
            {
              label: "A",
              text: "",
              image: ""
            },
            {
              label: "B",
              text: "",
              image: ""
            },
            {
              label: "C",
              text: "",
              image: ""
            },
            {
              label: "D",
              text: "",
              image: ""
            }
          ] //	是	array	选项，介绍，图片介绍
        };
        //清除表单验证
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        });
      }
    }
  },
  //注册
  components: {
    quillEditor,
    allSelect,
    upload
  },
  props: ["typeArr", "mode"],
  methods: {
    //提交功能
    submit() {
      this.$refs.form.validate(v => {
        if (v) {
          if (this.mode == "add") {
            add(this.form).then(() => {
              //提示用户
              this.$message.success("新增成功");

              //刷新数据
              this.$emit("search");
              //关闭对话框
              this.isShow = false;
            });
          } else {
            edit(this.form).then(() => {
              //提示用户
              this.$message.success("编辑成功");
              //刷新数据
              this.$emit("getData");
              //关闭对话框
              this.isShow = false;
            });
          }
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    validateField(aaa) {
      this.$refs.form.validateField([aaa]);
    }
  },
  data() {
    return {
      isShow: false, //控制是否显示对话框
      options: regionData, //保存省市区的数据
      obj: {
        1: "single_select_answer",
        2: "multiple_select_answer",
        3: "short_answer"
      },
      form: {
        title: "", //	是	string	标题
        subject: "", //	是	int	学科id标识
        step: "", //	是	int	阶段1、初级 2、中级 3、高级
        enterprise: "", //	是	int	企业id标识
        city: [], //	是	array	[省、市、区县]
        type: 1, //	是	string	题型 1单选 、2多选 、3简答
        difficulty: 1, //	是	int	题目难度 1简单 、2一般 、3困难
        single_select_answer: "", //	是	string	单选题答案
        multiple_select_answer: [], //	是	array	多选题答案
        short_answer: "", //	是	string	简答题答案
        video: "", //	否	string	解析视频地址
        answer_analyze: "", //	是	string	答案解析
        remark: "", //	是	string	答案备注
        select_options: [
          {
            label: "A",
            text: "",
            image: ""
          },
          {
            label: "B",
            text: "",
            image: ""
          },
          {
            label: "C",
            text: "",
            image: ""
          },
          {
            label: "D",
            text: "",
            image: ""
          }
        ] //	是	array	选项，介绍，图片介绍
      },
      rules: {
        title: [{ required: true, message: "必填", trigger: "change" }], //	是	string	标题
        subject: [{ required: true, message: "必填", trigger: "change" }], //	是	int	学科id标识
        step: [{ required: true, message: "必填", trigger: "change" }], //	是	int	阶段1、初级 2、中级 3、高级
        enterprise: [{ required: true, message: "必填", trigger: "change" }], //	是	int	企业id标识
        city: [{ required: true, message: "必填", trigger: "change" }], //	是	array	[省、市、区县]
        type: [{ required: true, message: "必填", trigger: "change" }], //	是	string	题型 1单选 、2多选 、3简答
        difficulty: [{ required: true, message: "必填", trigger: "change" }], //	是	int	题目难度 1简单 、2一般 、3困难
        single_select_answer: [
          { required: true, message: "必填", trigger: "change" }
        ], //	是	string	单选题答案
        multiple_select_answer: [
          { required: true, message: "必填", trigger: "change" }
        ], //	是	array	多选题答案
        short_answer: [{ required: true, message: "必填", trigger: "change" }], //	是	string	简答题答案
        video: "", //	否	string	解析视频地址
        answer_analyze: [
          { required: true, message: "必填", trigger: "change" }
        ], //	是	string	答案解析
        remark: [{ required: true, message: "必填", trigger: "change" }] //	是	string	答案备注
      }
    };
  }
};
</script>

<style lang="less">
.addQuestion {
  .el-dialog__header {
    padding: 0;
  }
  .title {
    text-align: left;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .form {
    width: 850px;
    margin: 0 auto;
  }
  .el-form-item__label {
    text-align: left;
  }
  .quill-editor {
    margin-top: 60px;
    margin-left: 0;
  }
  .el-form-item__content {
    margin-left: 0 !important;
  }
}
</style>

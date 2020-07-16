<template>
  <div>
    <el-card>
      <el-form :model="form" label-width="70px" :inline="true">
        <el-form-item label="学科编号">
          <el-input v-model="form.rid" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item v-model="form.name" label="学科名称">
          <el-input class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="form.username" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="请选择状态" class="setWidth">
            <el-option value="1" label="禁用"></el-option>
            <el-option value="0" label="开启"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-table :data="subject">
        <el-table-column label="序号" prop="id">
          <template slot-scope="scope">
            <div>{{scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid"></el-table-column>
        <el-table-column label="学科名称" prop="name"></el-table-column>
        <el-table-column label="简称" prop="short_name"></el-table-column>
        <el-table-column label="创建者" prop="intro"></el-table-column>
        <el-table-column label="创建日期" prop="create_time"></el-table-column>
        <el-table-column label="状态" prop="status">
          <template slot-scope="scope">
            <div>{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//导入接口
import { subjectList } from "@/api/getUser.js";
export default {
  data() {
    return {
      subject: [],
      something: "",
      form: {
        name: "",
        // page: "",
        // limit: "",
        rid: "",
        username: "",
        status: ""
      }
    };
  },
  created() {
    subjectList().then(res => {
      // window.console.log(res);
      this.subject = res.data.items;
    });
  }
};
</script>

<style lang="less">
.setWidth .el-input__inner {
  width: 150px;
}
</style>

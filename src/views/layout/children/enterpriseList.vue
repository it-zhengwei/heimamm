<template>
  <div>
    <el-card class="top">
      <el-form :inline="true" :model="form" label-width="70px">
        <el-form-item label="企业编号" prop="eid">
          <el-input v-model="form.eid" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="form.name" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status" label-width="50px">
          <el-select placeholder="请选择状态" v-model="form.status">
            <el-option value="1" label="开启"></el-option>
            <el-option value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>清除</el-button>
          <el-button type="primary">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="footer">
      <el-table :data="tableList">
        <el-table-column label="序号" width="90px">
          <template v-slot="scope">{{scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid" width="120px"></el-table-column>
        <el-table-column label="企业名称" prop="name" width="170px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="170px"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="250px"></el-table-column>
        <el-table-column label="状态" prop="status" width="150px">
          <template v-slot="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==0?'禁用':'启用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button>编程</el-button>
            <el-button>{{scope.status==0?'启用':'禁用'}}</el-button>
            <el-button>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
//导入接口
import { getList } from "@/api/enterpriseList/enterpriseList.js";
export default {
  data() {
    return {
      tableList: [], //初始化一定要数组
      form: {
        name: "", //	否	string	企业名称
        page: "", //	否	string	页码 默认为1
        limit: "", //	否	string	页尺寸 默认为10
        eid: "", //	否	string	企业id
        username: "", //	否	string	用户名
        status: "" //	否	string	状态 1（启用） 0（禁用）
      }
    };
  },
  created() {
    //获取企业列表
    getList().then(res => {
      // window.console.log(res);
      this.tableList = res.data.items;
    });
  }
};
</script>

<style lang='less'>
.top {
  .setWidth .el-input__inner {
    width: 130px;
  }
}
.footer {
  margin-top: 20px;
}
</style>
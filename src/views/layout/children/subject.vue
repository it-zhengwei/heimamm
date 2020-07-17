<template>
  <div>
    <el-card>
      <el-form ref="form" :rules="rules" :model="form" label-width="70px" :inline="true">
        <el-form-item label="学科编号" prop="rid">
          <el-input v-model="form.rid" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="学科名称" prop="name">
          <el-input v-model="form.name" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="创建者" prop="username">
          <el-input v-model="form.username" class="setWidth"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" class="setWidth">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="开启"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="reset">清除</el-button>
          <el-button type="primary">+新增学科</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="subject">
      <el-table :data="subject" stripe>
        <el-table-column label="序号" prop="id" width="60">
          <template slot-scope="scope">
            <!-- 真实序号  (当前页-1)*页容量+scope.$index+1 -->
            <div>{{(pagination.page-1)*pagination.size+scope.$index+1}}</div>
          </template>
        </el-table-column>
        <el-table-column label="学科编号" prop="rid" width="120"></el-table-column>
        <el-table-column label="学科名称" prop="name" width="160"></el-table-column>
        <el-table-column label="简称" prop="short_name" width="130"></el-table-column>
        <el-table-column label="创建者" prop="intro" width="160"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="210"></el-table-column>
        <el-table-column label="状态" prop="status" width="100">
          <template slot-scope="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==1?'启用':'禁用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <div>
              <el-button>编辑</el-button>
              <el-button @click="status(scope.row.id)">{{scope.row.status==0?'启用':'禁用'}}</el-button>
              <el-button>删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @current-change="updateCurrent"
        @size-change="updateSize"
        class="pagination"
        background
        :current-page="pagination.page"
        :page-sizes="[1,2,10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
//导入接口
import { subjectList, setStatus } from "@/api/subjectList.js";
export default {
  data() {
    return {
      total: 0,
      subject: [],
      something: "",
      form: {
        name: "",
        // page: "",
        // limit: "",
        rid: "",
        username: "",
        status: ""
      },
      pagination: {
        page: 1,
        size: 2
      },
      rules: {
        name: [],
        // page: "",
        // limit: "",
        rid: [],
        username: [],
        status: []
      }
    };
  },
  methods: {
    //清除表单内容
    reset() {
      this.$refs.form.resetFields();
      //执行搜索
      this.search();
    },
    updateCurrent(page) {
      //页面改变就触发  page是当前页
      // window.console.log(page);
      this.pagination.page = page;
      this.getData();
    },
    updateSize(size) {
      //页容量改变就触发  size是当前页容量
      // window.console.log(size);
      this.pagination.size = size;
      //页容量改变就默认打开第一页
      this.pagination.page = 1;
      this.getData();
    },
    //获取数据
    getData() {
      let data = {
        //对象的展开语法
        ...this.form,
        limit: this.pagination.size,
        page: this.pagination.page
      };
      subjectList(data).then(res => {
        // window.console.log(res);
        this.subject = res.data.items;
        //获取数据总条数
        this.total = res.data.pagination.total;
      });
    },
    search() {
      //把默认页码改为第一页
      this.pagination.page = 1;
      this.getData();
    },
    //设置状态
    status(id) {
      setStatus({ id }).then(() => {
        //提示用户
        this.$message.success("状态切换成功");
        //更新数据
        this.getData();
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
.setWidth .el-input__inner {
  width: 150px;
}
.subject {
  margin-top: 20px;
}
.red {
  color: #ff3d3d;
}
.pagination {
  margin-top: 20px;
  text-align: center;
}
</style>

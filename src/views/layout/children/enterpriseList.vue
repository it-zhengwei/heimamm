<template>
  <div>
    <el-card class="top">
      <el-form ref="form" :inline="true" :model="form" label-width="70px">
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
          <el-button type="primary" @click="search">搜索</el-button>
          <el-button @click="delForm">清除</el-button>
          <el-button type="primary" @click="addE">+新增企业</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="footer">
      <el-table :data="tableList">
        <el-table-column label="序号" width="90px">
          <template v-slot="scope">{{(pagination.page-1)*pagination.size+scope.$index+1}}</template>
        </el-table-column>
        <el-table-column label="企业编号" prop="eid" width="120px"></el-table-column>
        <el-table-column label="企业名称" prop="name" width="200px"></el-table-column>
        <el-table-column label="创建者" prop="username" width="170px"></el-table-column>
        <el-table-column label="创建日期" prop="create_time" width="250px"></el-table-column>
        <el-table-column label="状态" prop="status" width="150px">
          <template v-slot="scope">
            <div :class="{red:scope.row.status==0}">{{scope.row.status==0?'禁用':'启用'}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button @click="edit(scope.row)">编辑</el-button>
            <el-button @click="updateStatus(scope.row.id)">{{scope.status==0?'启用':'禁用'}}</el-button>
            <el-button @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="pagination.page"
        :page-sizes="[2,10, 20, 30, 40]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <addEnterprise ref="son" @search="search" :mode="mode" @getData="getData"></addEnterprise>
  </div>
</template>

<script>
//导入组件
import addEnterprise from "@/components/addEnterprise.vue";
//导入接口
import {
  getList,
  setStatus,
  delEnterpriseList
} from "@/api/enterpriseList/enterpriseList.js";
export default {
  //注册
  components: {
    addEnterprise
  },
  data() {
    return {
      mode: "add",
      total: 0,
      pagination: {
        page: 1,
        size: 2
      },
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
  methods: {
    //页容量改变执行的回调函数
    sizeChange(size) {
      //把默认的页容量改变为当前页容量
      this.pagination.size = size;
      //获取第一页的数据
      this.pagination.page = 1;
      //获取数据
      this.getData();
    },
    //页码改变执行的回调函数
    currentChange(page) {
      //把默认的页码改变为当前页码
      (this.pagination.page = page),
        //获取数据
        this.getData();
    },
    //获取列表数据的方法
    getData() {
      //获取企业列表
      //默认获取第一页 页容量为2的企业列表
      let params = {
        //把搜索栏的参数也作为接口参数
        ...this.form,
        page: this.pagination.page,
        limit: this.pagination.size
      };
      getList(params).then(res => {
        // window.console.log(res);
        //把响应的数据保存起来
        this.tableList = res.data.items;
        //保存总条数
        this.total = res.data.pagination.total;
      });
    },
    //搜索功能
    search() {
      //默认搜索第一页的数据
      this.pagination.page = 1;
      //获取数据
      this.getData();
    },
    //清除表单内容功能
    delForm() {
      //获取form的this并且调用它的resetFields()清空并且清除表单验证方法
      this.$refs.form.resetFields();
      //获取第一页的数据
      this.search();
    },
    //修改状态
    updateStatus(id) {
      //发送请求
      setStatus({ id }).then(() => {
        //提示用户
        this.$message.success("设置状态成功");
        //刷新数据
        this.getData();
      });
    },
    // 新增企业功能
    addE() {
      //改变状态为add
      this.mode = "add";
      //获取子组件的isShow 父传子
      this.$refs.son.isShow = true;
    },
    //编辑功能
    edit(data) {
      //因为跟新增公用一个页面 所以要区分是编辑还是新增
      //所以改变状态为edit
      this.mode = "edit";
      //把整行数据赋值给form表单数据   因为对象赋值会相互影响  所以深拷贝就是完全两个不同地址的值了
      this.$refs.son.form = JSON.parse(JSON.stringify(data));
      //显示对话框
      this.$refs.son.isShow = true;
    },
    //删除功能
    del(id) {
      this.$confirm("你确定要删除", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          delEnterpriseList({ id }).then(() => {
            //提示用户
            this.$message.success("删除成功");
            //执行搜索功能
            this.search();
          });
        })
        .catch(() => {});
    }
  },
  created() {
    this.getData();
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
<template>
  <div class="questionList">
    <el-card>
      <el-form ref="form" :model="form" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subject">
              <el-select v-model="form.subject">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in subject"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="阶段" prop="step">
              <el-select v-model="form.step">
                <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="企业" prop="enterprise">
              <el-select v-model="form.enterprise">
                <el-option
                  :label="item.name"
                  :value="item.id"
                  v-for="(item, index) in enterpriseList"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="题型" prop="type">
              <el-select v-model="form.type">
                <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
                <el-option label="简答" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select v-model="form.difficulty">
                <el-option label="简单" :value="1"></el-option>
                <el-option label="一般" :value="2"></el-option>
                <el-option label="困难" :value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="作者" prop="username">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status">
                <el-option label="禁用" :value="0"></el-option>
                <el-option label="启用" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="日期" prop="create_date">
              <el-date-picker
                v-model="form.create_date"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="标题" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11" :offset="1">
            <el-button type="primary" @click="search">搜索</el-button>
            <el-button @click="reset">清除</el-button>
            <el-button type="primary">+新增试题</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="table">
      <el-table :data="tableList" border>
        <el-table-column label="序号" width="70px">
          <template v-slot="scope">
            {{ (page - 1) * size + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column label="题目" width="250px">
          <template v-slot="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>
        <el-table-column label="学科.阶段" width="180px">
          <template v-slot="scope">
            <div>
              {{ scope.row.subject_name }}.{{ stepObj[scope.row.step] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="题型" width="120px">
          <template v-slot="scope">
            {{ difficultyArr[scope.row.difficulty] }}
          </template>
        </el-table-column>
        <el-table-column label="企业" prop="enterprise_name" width="120px">
        </el-table-column>
        <el-table-column label="创建者" prop="username" width="120px">
        </el-table-column>
        <el-table-column label="状态" width="120px">
          <template v-slot="scope">
            {{ scope.row.status == 0 ? "禁用" : "开启" }}
          </template>
        </el-table-column>
        <el-table-column label="访问量" prop="reads" width="120px">
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="update(scope.row.id)">{{
              scope.row.status == 0 ? "开启" : "禁用"
            }}</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="page"
        :page-sizes="[1, 2, 10, 20, 30, 40]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
//导入学科接口
import { subjectList } from "@/api/subjectList.js"
//导入企业接口
import { getList } from "@/api/enterpriseList/enterpriseList.js"
//导入题库列表接口、设置状态接口
import { questionList, setStatus } from "@/api/question/question.js"
export default {
  data() {
    return {
      //题库列表
      tableList: [],
      //阶段数组
      stepObj: ["初级", "中级", "高级"],
      //难度数组
      difficultyArr: ["简单", "一般", "困难"],
      //学科列表
      subject: [],
      //企业列表
      enterpriseList: [],
      //默认页码
      page: 1,
      //默认页容量
      size: 1,
      //默认总条数
      total: 0,
      form: {
        title: "", //	否	string	标题名称
        subject: "", //	否	int	学科id
        enterprise: "", //	否	int	企业id
        type: "", //	否	int	题目类型:1(单选),2(多选),3(简答)
        step: "", //	否	string	题目阶段:1(初级),2(中级),3(高级)
        username: "", //	否	string	作者
        status: "", //	否	int	状态:0(禁用),1(启用)
        difficulty: "", //	否	int	题目难度: 1(简单),2(一般),3(困难)
        create_date: "", //	否	string	创建日期
        page: "", //	否	string	页码 默认为1
        limit: "", //	否	string	页尺寸 默认为10
      },
    }
  },
  methods: {
    //页容量改变就执行的函数
    sizeChange(size) {
      // window.console.log(size)
      //获取当前页容量
      this.size = size
      //默认获取第一页数据
      this.page = 1
      this.getData()
    },
    //页码改变就执行的函数
    currentChange(page) {
      // window.console.log(page)
      //获取当前页码的数据
      this.page = page
      this.getData()
    },
    //获取题库列表
    getData() {
      let data = {
        ...this.form,
        page: this.page,
        limit: this.size,
      }
      questionList(data).then((res) => {
        // window.console.log(res)
        //保存题库信息
        this.tableList = res.data.items
        //保存总条数
        this.total = res.data.pagination.total
      })
    },
    //搜索功能
    search() {
      //默认第一页数据
      this.page = 1
      this.getData()
    },
    //清除功能
    reset() {
      //调用form的resetFields()清空表单和表单验证的方法
      this.$refs.form.resetFields()
      //默认搜索第一页的数据
      this.search()
    },
    //设置状态功能
    update(id) {
      setStatus({ id }).then(() => {
        //提示用户
        this.$message.success("设置状态成功")
        //刷新数据
        this.getData()
      })
    },
  },
  created() {
    //获取学科列表
    subjectList().then((res) => {
      // window.console.log(res)
      //保存学科信息
      this.subject = res.data.items
    })
    //获取企业列表
    getList().then((res) => {
      // window.console.log(res)
      //保存企业信息
      this.enterpriseList = res.data.items
    })
    //获取题库列表
    this.getData()
  },
}
</script>

<style lang="less">
.pagination {
  text-align: center;
}
.table {
  margin-top: 20px;
}
</style>

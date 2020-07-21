<template>
  <div class="data">
    <el-card class="top">
      <ul>
        <li>
          <div>{{ top.increment_users }}</div>
          <p>今日新增用户</p>
        </li>
        <li>
          <div>{{ top.total_users }}</div>
          <p>总用户量</p>
        </li>
        <li>
          <div>{{ top.increment_questions }}</div>
          <p>新增试题</p>
        </li>
        <li>
          <div>{{ top.total_questions }}</div>
          <p>总试题量</p>
        </li>
        <li>
          <div>{{ top.total_done_questions }}</div>
          <p>总刷题量</p>
        </li>
        <li>
          <div>{{ top.personal_questions }}</div>
          <p>人均刷题量</p>
        </li>
      </ul>
    </el-card>
    <el-card>
      <p class="text">整体数据</p>
      <div ref="echarts" class="echart"></div>
    </el-card>
  </div>
</template>

<script>
//导入echart
import echarts from "echarts"
//导入接口
import { title, content } from "@/api/chart/chart.js"
export default {
  data() {
    return {
      //面板数据
      top: [],
      list: [],
      name: [],
    }
  },
  created() {
    //获取面版数据
    title().then((res) => {
      // window.console.log(res);
      this.top = res.data
    })
    //获取可视化数据
    content().then((res) => {
      // window.console.log(res)
      this.list = res.data
      //数据的提取
      let nameList = this.list.map((v) => {
        return v.name
      })
      this.name = nameList
      //因为获取数据是异步 不能保证获取到了数据  所以再执行一次echart的方法
      this.echarts()
    })
  },
  methods: {
    echarts() {
      let myChart = echarts.init(this.$refs.echarts)
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",

          right: 20,
          data: this.name,
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.list,
          },
        ],
      }
      myChart.setOption(option)
    },
  },
  mounted() {
    this.echarts()
  },
}
</script>

<style lang="less">
.data .top {
  margin-bottom: 20px;
  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
    li {
      div {
        width: 99px;
        height: 99px;
        text-align: center;
        line-height: 99px;
        border-radius: 50%;
        border: 2px solid #f76137;
      }
      p {
        text-align: center;
      }
    }
  }
}
.echart {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}
.text {
  font-size: 21px;
  font-family: Microsoft YaHei Regular, Microsoft YaHei Regular-Regular;
  font-weight: 400;

  color: #666666;
}
</style>

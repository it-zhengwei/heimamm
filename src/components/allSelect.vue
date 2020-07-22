<template>
  <div class="allSelect">
    <div v-if="form.type == 1">
      <div
        v-for="(item, index) in form.select_options"
        :key="index"
        class="item"
        @change="haha('single_select_answer')"
      >
        <el-radio v-model="form.single_select_answer" :label="item.label">{{
          item.label
        }}</el-radio>
        <el-input v-model="item.text">{{ item.text }}</el-input>
        <upload v-model="item.image"></upload>
      </div>
    </div>
    <div v-if="form.type == 2">
      <div
        v-for="(item, index) in form.select_options"
        :key="index"
        class="item"
        @change="haha('multiple_select_answer')"
      >
        <el-checkbox
          v-model="form.multiple_select_answer"
          :label="item.label"
          >{{ item.label }}</el-checkbox
        >
        <el-input v-model="item.text">{{ item.text }}</el-input>
        <upload v-model="item.image"></upload>
      </div>
    </div>
    <div v-if="form.type == 3">
      <el-input
        type="textarea"
        rows="10"
        v-model="form.short_answer"
        @change="haha('short_answer')"
      ></el-input>
    </div>
  </div>
</template>

<script>
//导入上传组件
import upload from "./upload"
export default {
  props: ["form"],
  components: {
    upload,
  },
  methods: {
    haha(aaa) {
      this.$emit("validateField", aaa)
    },
  },
}
</script>

<style lang="less">
.allSelect {
  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
</style>

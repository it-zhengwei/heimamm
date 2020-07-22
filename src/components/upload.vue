<template>
  <el-upload
    class="avatar-uploader"
    :action="baseURL + '/uploads'"
    name="image"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <div v-if="type == 'video'">
      <video
        controls
        autoplay
        v-if="value"
        :src="baseURL + '/' + value"
        class="avatar"
      />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <div v-else>
      <img v-if="value" :src="baseURL + '/' + value" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
  </el-upload>
</template>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<script>
export default {
  props: ["value", "type"],
  data() {
    return {
      baseURL: process.env.VUE_APP_URL,
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      // window.console.log(res);
      // this.imageUrl = URL.createObjectURL(file.raw);
      this.$emit("input", res.data.file_path)
    },
    beforeAvatarUpload(file) {
      if (this.type == "video") {
        // window.console.log(file)

        const isJPG =
          file.type === "video/x-ms-wmv" || file.type === "video/mp4"
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error("上传视频格式只能是 mp4或者wmv 格式!")
        }
        if (!isLt2M) {
          this.$message.error("上传视频大小大小不能超过 2MB!")
        }
        return isJPG && isLt2M
      } else {
        const isJPG = file.type === "image/jpeg" || file.type === "image/png"
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!")
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!")
        }
        return isJPG && isLt2M
      }
    },
  },
}
</script>

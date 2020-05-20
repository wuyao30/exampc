<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="form">
        <el-form-item lable="上传文件" :label-width="fromLabelWidth">
          <el-upload
            ref="uploadExecl"
            action="http://139.224.135.165:8080/exam/filename"
            :limit=limitNum
            :multiple="false"
            :auto-upload="false"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
            class="image-uploader"
          >
            <el-button  v-waves style="width: 160px" icon="el-icon-search" class="filter-item">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传Excel文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button  :loading="downloadLoading" class="filter-item" type="primary" style="width: 160px" icon="el-icon-upload"  @click="uploadFile">立即上传</el-button>
          <el-button  :loading="downloadLoading" class="filter-item" type="primary" style="width: 160px" icon="el-icon-error"  @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="download-demo">
      <a href="http://www.huateshangmao.top:8080/download/demo.xlsx">
        <el-tag type="info">下载题库模板</el-tag>
      </a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'UploadExcel',
  data() {
    return {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      },
      fileList: [],
      limitNum: 1
    }
  },
  methods: {
    cancel() {
      this.fileList = []
    },
    beforeUploadFile(file) {
      const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
      console.log('extensions is:' + extension)
      if (!extension.includes('xlsx') && (!extension.includes('xls')) && (!extension.includes('csv'))) {
        this.$message.error('只能上传excel文件')
        return false
      }
    },
    fileChange(file, fileList) {
      this.form.file = file.raw
    },
    exceedFile(file, fileList) {
      this.$message.error('只能选单个文件')
      return false
    },
    handleSuccess(res, file, fileList) {
      this.$message('上传成功')
      console.log(res)
    },
    handleError(err, file, fileList) {
      console.log(err)
      this.$message.error('上传失败')
    },
    uploadFile() {
      this.$refs.uploadExecl.submit()
      console.log('submit!!')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>

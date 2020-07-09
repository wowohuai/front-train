<template>
  <div ref="wrapper" class="wrapper">
    <el-form ref="form" :model="postForm" :rules="rules">
      <sticky :sticky-top="stickyTop" :class-name="'sub-navbar'">
        <el-button
          v-loading="loading"
          :disabled="isEdit ? false: disabled"
          type="success"
          style="margin-left:10px"
          class="submit-btn"
          @click="submitForm"
        >
          {{ isEdit ? '编辑图书' : '新增图书' }}
        </el-button>
      </sticky>
      <div class="detail-container">
        <el-row>
          <warning v-if="!isEdit" />
          <el-col :span="24">
            <!-- 上传图示时可用， 编辑图书时隐藏 -->
            <ebook-upload
              v-if="!isEdit"
              id="el-upload-dragger"
              :file-list="fileList"
              @onSuccess="uploadSuccess"
              @onRemove="uploadRemove"
            />
          </el-col>
          <el-col :span="24">
            <!-- 根据上传的电子书 解析 出相应的信息组成表单数据进行提交 -->
            <el-form-item prop="title">
              <md-input v-model="postForm.title" type="text"> 书名</md-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="author" class="form-item-author">
              <md-input v-model="postForm.author" type="text"> 作者</md-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="publisher">
              <md-input v-model="postForm.publisher" type="text"> 出版社</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="language">
              <md-input v-model="postForm.language" type="text"> 语言</md-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="rootFile">
              <md-input v-model="postForm.rootFile" type="text" disabled :required="false"> 根文件</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="filePath">
              <md-input v-model="postForm.filePath" type="text" disabled :required="false"> 文件路径</md-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="unzipPath">
              <md-input v-model="postForm.unzipPath" type="text" disabled :required="false"> 解压路径</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="coverPath">
              <md-input v-model="postForm.coverPath" type="text" disabled :required="false"> 封面路径</md-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="originalName">
              <md-input v-model="postForm.originalName" type="text" disabled :required="false"> 文件名称</md-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item prop="cover" label="封面" class="cover">
            <a v-if="postForm.cover" :href="postForm.cover" target="_blank">
              <img :src="postForm.cover" class="preview-img">
            </a>
            <span v-else>无</span>
          </el-form-item>
        </el-row>
        <!-- 目录展示 -->
        <el-row>
          <el-form-item prop="contents" label="目录" class="cover">
            <el-col :span="24">
              <el-tree
                :data="postForm.contents"
                accordion
                @node-click="handleNodeClick"
              />
            </el-col>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
const defaultForm = {
  title: '',
  author: '',
  publisher: '',
  language: '',
  rootFile: '',
  filePath: '',
  unzipPath: '',
  fileName: '',
  originalName: '',
  cover: '',
  coverPath: '',
  contents: []
}
const map = {
  title: '书名',
  author: '作者',
  publisher: '出版社',
  language: '语言'
}
export default {
  name: 'Detail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validator = (rule, value, cb) => {
      if (value.trim().length === 0) {
        cb(new Error(`${map[rule.field]}不能为空！`))
      } else {
        cb()
      }
    }
    return {
      stickyTop: 0,
      loading: false,
      postForm: defaultForm,
      fileList: [],
      disabled: true,
      rules: {
        title: [{ required: true, trigger: 'change', validator }],
        publisher: [{ required: true, trigger: 'change', validator }],
        author: [{ required: true, trigger: 'change', validator }],
        language: [{ required: true, trigger: 'change', validator }]
      },
      categories: [],
      driver: null
    }
  },
  created() {
    // 在params中获取动态路由参数
    if (this.isEdit) {
      const { fileName } = this.$route.params
      this._getBook(fileName)
    }
  },
  mounted() {
  },
  methods: {
    submitForm() {
    },
    uploadSuccess(data, file, fileList) {
    },
    uploadRemove(file) {
    },
    reset() {
      this.$refs.form.resetFields()
      this.fileList = []
      this.disabled = true
    },
    handleNodeClick(data) {
      if (data.text) {
        window.open(data.text)
      }
    },
    _getBook(fileName) {
    }
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  padding: 40px 50px 20px;
  .cover{
    margin-left: 20px;
  }
  .preview-img{
    width: 270px;
    height: 270px;
  }
}
</style>

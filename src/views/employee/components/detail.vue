<template>
  <div ref="wrapper" class="wrapper">
    <el-form ref="form" :model="postForm">
      <el-row>
        {{ isEdit ? '编辑员工信息' : '新增员工' }}
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="员工名">
            <el-input v-model="postForm.username" width="" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="年龄">
            <el-input v-model="postForm.age" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="职称">
            <el-input v-model="postForm.position" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="初始密码">
            <el-input v-model="postForm.password" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="部门名">
        <el-select v-model="postForm.deptId" placeholder="请选择部门名称">
          <el-option label="销售部" value="1" />
          <el-option label="研发部" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="postForm.role" placeholder="请选择角色">
          <el-option label="管理员" value="0" />
          <el-option label="用户" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-show="!isEdit" type="primary" @click="submitForm">创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { add, getById } from '@/api/user'

export default {
  name: 'Detail',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: {
        username: '',
        age: '',
        deptId: '',
        position: '',
        password: '',
        role: ''
      }
    }
  },
  mounted() {
    // 处于编辑状态下
    if (this.isEdit) {
      this._getById(this.$route.params.id)
    }
  },
  methods: {
    _getById(id) {
      getById({ id }).then(res => {
      })
    },
    submitForm() {
      console.log(this.postForm)
      add(this.postForm).then(res => {
        this.$router.push({ path: '/employee/list' })
      })
    },
    onCancel() {

    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
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

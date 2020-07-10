<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="员工名" width="100">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="员工职称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工所属部门" align="center">
        <template slot-scope="scope">{{ scope.row.department }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary " size="mini" @click="handleClickEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteUserInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { list, remove } from '@/api/user'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: [],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      list().then(response => {
        this.list = response.data.list
        this.listLoading = false
      })
    },
    deleteUserInfo(id) {
      this.$confirm('此操作将永久删除该员工， 是否继续？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(id).then(res => {
          const { msg } = res
          this.$message({
            message: msg,
            type: 'success'
          })
        })
      })
    },
    handleClickEdit(row) {
      this.$router.push(`/employee/edit/${row.id}`)
    }
  }
}
</script>

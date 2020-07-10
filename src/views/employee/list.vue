<template>
  <div class="app-container">
    <div ref="filter-container" class="filter-container">
      <el-input
        v-model="listQuery.username"
        class="filter-item"
        placeholder="员工名"
        style="width: 200px"
        clearable
        @keydown.enter.native="handleFilter"
        @clear="handleFilter"
        @blur="handleFilter"
        @input="handleFilter"
      />

      <el-select v-model="listQuery.depart_id" style="margin-left: 20px" placeholder="分类" class="filter-item" @change="handleSelect">
        <el-option
          v-for="item in categories"
          :key="item.depart_id"
          :label="item.depart_name"
          :value="item.depart_id"
        />
      </el-select>
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-search"
        style="margin-left: 20px"
        @click="handleFilter"
      >查询</el-button>
      <el-button
        type="primary"
        class="filter-item"
        icon="el-icon-edit"
        style="margin-left: 20px"
        @click="handleCreate"
      >新增</el-button>

    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      class="table-container"
    >
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">{{ scope.row.id }}</template>
      </el-table-column>
      <el-table-column label="员工名">
        <template slot-scope="scope">{{ scope.row.username }}</template>
      </el-table-column>
      <el-table-column label="员工职称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.position }}</span>
        </template>
      </el-table-column>
      <el-table-column label="员工所属部门" align="center">
        <template slot-scope="scope">{{ scope.row.depart_name }}</template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" align="center" width="200">
        <template slot-scope="scope">
          <el-button type="primary " size="mini" @click="handleClickEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.curPage"
      :limit.sync="listQuery.limit"
      @pagination="pagination"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { list, remove } from '@/api/user'
import { getList } from '@/api/department'

export default {
  components: {
    Pagination
  },
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
      listLoading: true,
      categories: [],
      listQuery: {
        username: '',
        depart_id: '',
        curPage: 1,
        limit: 10,
        sort: '-id'
      },
      total: 0,
      defaultSort: {
        prop: 'id',
        order: 'descending'
      }
    }
  },
  created() {
    // 获取列表数据
    this.getList()
    // 获取部门类别
    this.getPartCategory()

    this.parseQuery()
  },
  methods: {
    parseQuery() {
      const query = Object.assign({
        sort: '-id'
      }, this.$route.query)
      if (query) {
        query.curPage && (query.curPage = +query.curPage)
        query.limit && (query.limit = +query.limit)
      }
      const symbol = query.sort[0]
      const column = query.sort.slice(1)
      this.defaultSort = {
        prop: column,
        order: symbol === '-' ? 'descending' : 'ascending'
      }
      this.listQuery = {
        ...this.listQuery,
        ...query
      }
    },
    getList() {
      this.listLoading = true
      list(this.listQuery).then(response => {
        const { list, total } = response.data
        this.list = list
        this.total = total
        this.listLoading = false
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该员工， 是否继续？', '提示', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        remove(id).then(res => {
          const { msg } = res
          // refresh list
          this.getList()
          this.$message({
            message: msg,
            type: 'success'
          })
        })
      })
    },
    refresh() {
      this.$router.push({
        path: '/employee/list',
        query: this.listQuery
      })
    },
    handleFilter() {
      this.listQuery.curPage = 1
      this.getList()
      this.refresh()
    },
    handleSelect() {
      this.handleFilter()
    },
    handleClickEdit(row) {
      this.$router.push(`/employee/edit/${row.id}`)
    },
    handleCreate() {
      this.$router.push({
        path: '/employee/create'
      })
    },
    getPartCategory() {
      getList().then(res => {
        this.categories = res.data
      })
    },
    pagination(data) {
      const { page, limit } = data
      this.listQuery.curPage = page
      this.listQuery.limit = limit
      this.refresh()
    }

  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .table-container {
    margin-top: 20px;
  }
}
</style>

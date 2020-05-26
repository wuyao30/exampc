<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.loginName" placeholder="员工工号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
      <!--<el-button :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @change="handleDownload">下载明细</el-button>-->
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工号" align="center">
        <template slot-scope="{row}">
          <span>{{ row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="部门" align="center">
        <template slot-scope="{row}">
          <span>{{ row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工种" align="center">
        <template slot-scope="{row}">
          <span>{{ row.industryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="积分" align="center">
        <template slot-scope="{row}">
          <template v-if="row.edit">
            <el-input v-model="row.score" class="edit-input" size="small"></el-input>
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </template>
          <span v-else>{{ row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check-outline"
            @click="confirmEdit(row)"
          >
            确认
          </el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="row.edit=!row.edit"
          >
            修改积分
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--<el-dialog :visible.sync="dialogFormVisible" title="编辑">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID">
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { queryUserScore, updateUserScore } from '@/api/user'
export default {
  name: 'Dashboard',
  directives: { waves },
  data() {
    return {
      downloadLoading: false,
      dialogFormVisible: false,
      listQuery: {
        loginName: undefined
      },
      tableKey: 0,
      listLoading: false,
      list: [],
      temp: undefined
    }
  },
  computed: {
  },
  methods: {
    handleFilter() {
      queryUserScore({ loginName: this.listQuery.loginName }).then(res => {
        const { data } = res
        console.log(data)
        data.edit = false
        data.originalScore = data.score
        this.list = []
        this.list.push(data)
        console.log(this.list)
      })
    },
    cancelEdit(row) {
      row.score = row.originalScore
      row.edit = false
      this.$message({
        message: '取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      updateUserScore({
        loginName: row.loginName,
        score: row.score
      }).then(res => {
        const { errno } = res
        if (errno === 0) {
          this.$message.success('修改积分成功')
        } else {
          this.$message.error('修改积分失败')
        }
        this.handleFilter()
      })
    }
  }
}
</script>

<style scoped>
  .filter-container{
    margin-bottom: 15px;
  }
  .edit-input {
    padding-right: 100px;
  }
  .cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
  }
</style>

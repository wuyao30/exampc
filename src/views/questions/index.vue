<template>
  <div class="app-container">
    <div class="filter-container" style="margin-bottom: 8px;">
      <el-select v-model="listQuery.industryName" placeholder="请选择工种" clearable style="width: 200px" class="filter-item">
        <el-option v-for="item in industryOptions" :key="item" :label="item" :value="item"></el-option>
      </el-select>
      <el-input v-model="listQuery.content" placeholder="请输入题目内容" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter">
      </el-input>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
    </div>

    <el-table
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" align="center" width="100x">
        <template slot-scope="{row}">
          <span>{{ row.queId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目内容" align="center">
        <template slot-scope="{row}">
          <span>{{ row.queContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="题目类型" align="center">
        <template slot-scope="{row}">
          <span>{{ row.queType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项A" align="center">
        <template slot-scope="{row}">
          <span>{{ row.choiceA }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项B" align="center">
        <template slot-scope="{row}">
          <span>{{ row.choiceB }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项C" align="center">
        <template slot-scope="{row}">
          <span>{{ row.choiceC }}</span>
        </template>
      </el-table-column>
      <el-table-column label="选项D" align="center">
        <template slot-scope="{row}">
          <span>{{ row.choiceD }}</span>
        </template>
      </el-table-column>
      <el-table-column label="答案" align="center">
        <template slot-scope="{row}">
          <span>{{ row.queAnswer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工种" align="center">
        <template slot-scope="{row}">
          <span>{{ row.industryName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            Edit
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="handleFilter" />

    <el-dialog title="修改" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="ID">
          <el-input v-model="temp.queId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="题目类型">
          <el-select v-model="temp.queType" class="filter-item">
            <el-option label="单选题" value="单选题"></el-option>
            <el-option label="判断题" value="判断题"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="题目内容">
          <el-input v-model="temp.queContent"></el-input>
        </el-form-item>
        <el-form-item label="选项A">
          <el-input v-model="temp.choiceA"></el-input>
        </el-form-item>
        <el-form-item label="选项B">
          <el-input v-model="temp.choiceB"></el-input>
        </el-form-item>
        <el-form-item label="选项C">
          <el-input v-model="temp.choiceC"></el-input>
        </el-form-item>
        <el-form-item label="选项D">
          <el-input v-model="temp.choiceD"></el-input>
        </el-form-item>
        <el-form-item label="答案">
          <el-input v-model="temp.queAnswer"></el-input>
        </el-form-item>
        <el-form-item label="工种">
          <el-select v-model="temp.industryName" class="filter-item">
            <el-option v-for="item in industryOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="updateData">
          Confirm
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryIndustryNames, queryQuestions, updateQuestion } from '@/api/user'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination'
export default {
  name: 'Index',
  directives: { waves },
  components: { Pagination },
  data() {
    return {
      listQuery: {
        industryName: '',
        content: '',
        pageNum: 1,
        pageSize: 20
      },
      total: 0,
      industryOptions: [],
      list: [],
      dialogFormVisible: false,
      temp: {}
    }
  },
  created() {
    queryIndustryNames().then(res => {
      const { errno, data } = res
      if (errno === 0) {
        this.industryOptions = data.message
      }
    })
  },
  methods: {
    handleFilter() {
      queryQuestions(this.listQuery).then(res => {
        const { errno, data } = res
        if (errno === 0) {
          this.list = data.queList.list
          this.total = data.queList.total
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      updateQuestion(this.temp).then(res => {
        const { errno, data } = res
        if (errno === 0 ){
          this.$message.success(`${data.message}`)
        }
      })
    },
    handleDelete(row) {

    }
  }
}
</script>

<style scoped>

</style>

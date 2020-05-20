<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="listQuery.prizeId" placeholder="奖项名称" clearable class="filter-item" style="width: 250px">
        <el-option v-for="item in prizeNameOptions" :key="item.prizeId" :label="item.prizeName" :value="item.prizeId" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        查询
      </el-button>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
export default {
  name: 'Dashboard',
  directives: { waves },
  data() {
    return {
      listQuery: {}
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>

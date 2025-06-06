<template>
  <div class="note-book">
    <p>分析过程: 上下布局 ,上面展示搜索、 添加， 下面展示表格 <br>
      添加类别和内容的模糊搜索 <br>
      表格里面有各项内容以及操作（编辑，查看，删除）<br>
      编辑，查看打开弹框，显示表单，添加对类别的认证校验， 删除添加二次确认，成功之后给出提示<br>
      添加表格分页功能<br>
      数据持久化放到localStorage</p>
    <div class="opation">
      <el-input v-model="searchValue" placeholder="请输入搜索内容" @input="handleSearch"></el-input>
      <el-button type="primary" @click="handleAddEDitBook('add', {})">添加</el-button>
    </div>
    <div class="book-content">
      <el-table :data="currentTableData" stripe style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="date" label="日期" width="200px" sortable>
        </el-table-column>
        <el-table-column prop="category" label="类别">
        </el-table-column>
        <el-table-column prop="abstract" label="摘要">
        </el-table-column>
        <el-table-column prop="opation" label="操作" width="200px">
          <template scope="scope">
            <div class="opation-all">
              <p @click="handleAddEDitBook('edit', scope.row)">编辑</p>
              <p @click="handleAddEDitBook('look', scope.row)">查看</p>
              <p @click="handleDelete(scope.row)">删除</p>
            </div>
          </template>

        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize">
      </el-pagination>
    </div>
    <NoteBookAddEDit :dialogVisible="dialogVisible" @handleCloseDialog="handleCloseDialog" v-if="dialogVisible"
      :type="type" :currentBook="currentBook"></NoteBookAddEDit>

  </div>
</template>

<script>
import NoteBookAddEDit from './NoteBookAddEDit.vue'
export default {
  name: 'NoteBook',
  data() {
    return {
      searchValue: '',
      tableData: [],
      searchData: [],
      dialogVisible: false,
      type: '',
      currentBook: {},
      currentPage: 1,
      pageSize: 10,
      currentTableData: []
    }
  },
  components: {
    NoteBookAddEDit
  },
  watch: {
    tableData: {
      handler(newVal) {
        // 搜索中添加删除编辑 特殊处理
        if (this.searchValue.length > 0) {
          this.searchData = []
          newVal.forEach(item => {
            if (item.category.includes(this.searchValue) || item.abstract.includes(this.searchValue)) {
              this.searchData.push(item)
            }
          });
          this.getTableData()
        }
      },
      deep: true // 启用深度监听
    }
  },
  computed: {
    totalSize() {
      // 查看禁止输入
      return this.searchValue ? this.searchData.length : this.tableData.length
    }
  },
  methods: {
    handleAddEDitBook(type, currentContent) {
      this.dialogVisible = true
      this.type = type
      this.currentBook = currentContent
    },
    handleCloseDialog(type, currentContent) {
      this.dialogVisible = false
      if (type == "add") {
        // 添加id， 用当前时间戳
        currentContent.id = Date.now()
        this.tableData.push(currentContent)
        this.handleSuccessResult('添加成功')
      } else if (type == "edit") {
        const currentIdIndex = this.tableData.findIndex(item => item.id === currentContent.id);
        if (currentIdIndex !== -1) {
          this.tableData[currentIdIndex].category = currentContent.category
          this.tableData[currentIdIndex].abstract = currentContent.abstract
          this.handleSuccessResult('修改成功')
        }
      }
    },
    handleDelete(currentContent) {
      this.$confirm('是否确认删除')
        .then(() => {
          const currentIdIndex = this.tableData.findIndex(item => item.id === currentContent.id);
          if (currentIdIndex !== -1) {
            this.tableData.splice(currentIdIndex, 1);
            this.handleSuccessResult('删除成功')
          }
        }).catch(() => {
        })
    },
    handleSuccessResult(info) {
      localStorage.setItem('tableData', JSON.stringify(this.tableData));
      this.getTableData()
      this.$message({
        type: 'success',
        message: info
      });
    },
    getTableData() {
      // 搜索的分页处理
      let currentData = this.searchValue.length > 0 ? this.searchData : this.tableData
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.currentTableData = currentData.slice(startIndex, endIndex);
    },
    handleSizeChange(val) {
      // 前端做分页处理
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getTableData()
    },
    handleSearch() {
      this.searchData = []
      this.currentPage = 1
      this.pageSize = 10
      this.tableData.forEach(item => {
        if (item.category.includes(this.searchValue) || item.abstract.includes(this.searchValue)) {
          this.searchData.push(item)
        }

      });
      this.getTableData()
    }
  },
  mounted() {
    this.tableData = JSON.parse(localStorage.getItem('tableData')) || [];
    this.getTableData()
  }
}
</script>


<style scoped lang="less">
.note-book {
  text-align: left;
  border-top: 1px solid #000;
  padding: 20px 10px 30px;

  .opation {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-top: 20px;

    /deep/ .el-input__inner {
      width: 240px;
    }
  }

  .book-content {
    border-top: 1px solid #EBEEF5;
    margin-top: 20px;

    /deep/ .el-table th.el-table__cell>.cell {
      color: #555;
    }

    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
      background: #fff;
    }

    /deep/ .el-table .el-table__cell {
      padding: 0;
    }

    /deep/ .el-pagination {
      text-align: center;
      margin: 20px 0;
    }

    .opation-all {
      display: flex;
      justify-content: flex-start;

      >p {
        margin-right: 20px;

        &:hover {
          color: #409EFF;
          cursor: pointer;
        }
      }
    }
  }
}
</style>

<template>
  <div class="note-book-addEDit">
    <el-dialog :title="typeTitle[type]" :visible="true" :before-close="handleClose" width="40%">
      <el-form ref="bookContent" :model="bookContent" label-width="80px" :rules="rules">
        <el-form-item label="类别" prop="category">
          <el-input v-model="bookContent.category" placeholder="请输入类别" :disabled="disabledFlag"></el-input>
        </el-form-item>
        <el-form-item label="内容" class="content">
          <el-input type="textarea" placeholder="请输入内容" v-model="bookContent.abstract" maxlength="30" show-word-limit
            :disabled="disabledFlag">
          </el-input>
        </el-form-item>

        <el-form-item>

          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>


export default {
  name: 'NoteBookAddEDit',
  data() {
    return {
      typeTitle: {
        'add': '添加笔记本内容',
        'edit': '编辑当前笔记',
        'look': '查看当前笔记'
      },
      bookContent: {
        category: '',
        abstract: ''
      },
      rules: {
        category: [
          { required: true, message: '请输入类别', trigger: 'blur' },
          { min: 0, max: 10, message: '类别最多输入10个字符', trigger: 'change' }
        ]
      }

    }
  },
  computed: {
    disabledFlag() {
      // 查看禁止输入
      return this.type == 'look'
    }
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    },
    currentBook: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleCloseDialog')
    },
    handleSubmit() {
      this.$refs.bookContent.validate((valid) => {
        if (valid) {
          this.bookContent.date = this.getDate()
          this.$emit('handleCloseDialog', this.type, this.bookContent)
        }
      });

    },
    getDate() {
      const currentDate = new Date()
      const year = currentDate.getFullYear()
      const month = String(currentDate.getMonth() + 1).padStart(2, '0')
      const day = String(currentDate.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }
  },
  mounted() {
    this.bookContent = JSON.parse(JSON.stringify(this.currentBook))
  }
}
</script>


<style scoped lang="less">
.note-book-addEDit {
  /deep/ .el-form-item__label {
    text-align: left;
  }

  /deep/ .content .el-form-item__label {
    padding-left: 10px;
  }

  /deep/ .el-form-item__content {
    text-align: right;
  }

  /deep/.el-textarea__inner {
    resize: none !important;
  }

  /deep/ .el-textarea .el-input__count {
    background: none;
    right: 2px;
    bottom: -10px;
  }
}
</style>

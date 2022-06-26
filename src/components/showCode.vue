<template>
  <div>
    <div class="unify-title">
      {{ title }}
    </div>
    <div class="codemirror">
      <div class="codemirror-box">
        <div class="code-pre">
          <template v-if="isExecute">
            <el-button type="primary" @click="executeCode">执行代码</el-button>
            （打开浏览器开发者工具查看执行结果）
          </template>
          <!-- <codemirror v-model="innerCode" :options="cmOptions"></codemirror> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// // language js
// import 'codemirror/mode/javascript/javascript.js'
// // theme css
// import 'codemirror/theme/monokai.css'
export default {
  name: 'showCode',
  props: {
    title: {
      type: String,
      default: '需要自定义标题'
    },
    code: {
      type: String,
      default: 'const a = 0'
    },
    isExecute: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      cmOptions: {
        // codemirror options
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'monokai',
        lineNumbers: true,
        line: true
        // more codemirror options, 更多 codemirror 的高级配置...
      },
      resCode: ''
    }
  },
  computed: {
    innerCode: {
      get () {
        return this.code
      },
      set (val) {
        this.$emit('update:code', val)
      }
    }
  },
  methods: {
    executeCode () {
      // 第一种
      // eslint-disable-next-line no-new-func
      const func = new Function(this.innerCode)
      func()
    }
  }
}
</script>
<style lang='scss' scoped>
.unify-title {
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
  padding-top: 10px;
}

.codemirror-box {
  display: flex;
  > div {
    width: 62%;
    .el-button {
      margin-bottom: 5px;
    }
  }
  .code-res {
    margin-left: 20px;
  }
}
</style>

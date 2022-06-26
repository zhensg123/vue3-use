<template>
  <el-link
          :type="link.type"
          :underline="link.underline"
          :disabled="link.disabled"
          :href="link.href"
          :icon="link.icon"
          :target="link.target"
          @click="handleClick"
  >{{link.text}}<template v-if="link.iconRight"><i :class="{'el-icon--right':true,[link.iconRight]:true}"></i></template>
  </el-link>
</template>

<script>
/*
  config: {
    type: 'link', click:FUNCTION ,format: data => data// {href,text} //type,icon,disabled,underline
  }
  */
import { isFunction, isObject } from '@/util/types'
import { getObjValue } from '@/util/data-transition'

export default {
  name: 'table-cell-link',
  props: {
    index: { type: Number, required: true },
    column: { type: Object, required: true },
    row: { type: Object, required: true }
  },
  mounted () {
    const { prop, config } = this.column
    const { format, click } = config
    let data = getObjValue(this.row, prop)
    if (format) data = format(data, this.row)
    else if (!isObject(data)) data = { text: data }
    this.link = Object.assign({ type: 'primary', underline: true, disabled: false, icon: '', target: '_blank' }, data)
    if (isFunction(click)) this.click = click
  },
  data () {
    return { link: {}, click: null }
  },
  methods: {
    handleClick () {
      if (this.click) this.click(this.row, this.column, this.index)
    }
  }
}
</script>

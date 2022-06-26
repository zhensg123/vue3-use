<template>
  <div>
    <template :key="tag.key" v-for="tag in tags">
      <el-tag  :type="tag.type" :color="tag.color" :size="tag.size" :effect="tag.effect">{{tag.label}}</el-tag>
    </template>
  </div>
</template>

<script>
import {  isArray } from '@/util/types'
import { getObjValue } from '@/util/data-transition'

/*
  config: {
    type: 'tags', format: (data,row) => data// {label} //type, color, size, effect
  }
  */
export default {
  name: 'table-cell-tags',
  props: {
    index: { type: Number, required: true },
    column: { type: Object, required: true },
    row: { type: Object, required: true }
  },
  watch: {
    row: 'update'
  },
  data () {
    return { tags: [] }
  },
  mounted () {
    this.update()
  },
  methods: {
    update () {
      this.tags = []
      const data = getObjValue(this.row, this.column.prop)
      if (data === null) return
      const format = this.column.config.format
      const formatData = (data, key) => {
        if (format) data = format(data, this.row)
        return Object.assign({ key, type: '', size: 'mini', effect: 'light' }, data)
      }
      if (isArray(data)) this.tags = data.map(formatData)
      else this.tags.push(formatData(data))
    }
  }
}
</script>

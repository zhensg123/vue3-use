<template>
  <div>
    <template v-for="(button, i) in buttons">
      <template v-if="button.tooltip">
        <el-tooltip
          class="item"
          effect="dark"
          :content="button.content"
          placement="top"
          :key="i"
        >
          <el-button
            type="text"
            :class="[button.label.includes('删除') ? 'xone-del-text' : '']"
            :key="i"
            v-show="getIsShow(button.isshow)"
            :loading="getBtnLoading(button.loading)"
            :disabled="getBtnDisabled(button.disabled)"
            @click="handleClick(button.click)"
            >{{ button.label }}</el-button
          >
        </el-tooltip>
      </template>
      <template v-else>
        <el-button
          type="text"
          :class="[button.label.includes('删除') ? 'xone-del-text' : '']"
          :key="i"
          v-show="getIsShow(button.isshow)"
          :loading="getBtnLoading(button.loading)"
          :disabled="getBtnDisabled(button.disabled)"
          @click="handleClick(button.click)"
          >{{ button.label }}</el-button
        >
      </template>
    </template>
    <el-dropdown
      v-if="dropdown.length > 0"
      @command="handleClick"
      trigger="click"
    >
      <el-button type="text" style="margin-left: 10px"
        >更多<i class="el-icon-arrow-down el-icon--right"></i
      ></el-button>
      <el-dropdown-menu name="dropdown">
        <template :key="i" v-for="(button, i) in dropdown">
          <el-dropdown-item
            v-show="getIsShow(button.isshow)"
            :loading="getBtnLoading(button.loading)"
            :disabled="getBtnDisabled(button.disabled)"
            :command="button.click"
            >{{ button.label }}</el-dropdown-item
          >
        </template>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { isString, isFunction } from "@/util/types";

/*
  config: {
    type: 'buttons',
    // more:4,
    value: [
      {label: '编辑', disabled: (row) => !row.editable},
      {label: '删除', disabled: false, click:this.toDelete}
    ]
  }
  */
export default {
  name: "table-cell-buttons",
  props: {
    index: { type: Number, required: true },
    column: { type: Object, required: true },
    row: { type: Object, required: true },
  },
  inject: ["table"],
  watch: {
    column: {
      handler: "init",
      deep: true,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      buttons: [],
      dropdown: [],
    };
  },
  methods: {
    init() {
      const { value, more = 4 } = this.column.config;
      if (value.length > more) {
        const i = more - 1;
        this.buttons = value.slice(0, i);
        this.dropdown = value.slice(i);
      } else this.buttons = value;
    },
    getIsShow(isshow) {
      if (isFunction(isshow)) return isshow(this.row, this.column, this.index);
      return true;
    },
    getBtnDisabled(disabled) {
      if (isFunction(disabled)) {
        return disabled(this.row, this.column, this.index);
      }
      return disabled;
    },
    getBtnLoading(loading) {
      if (isFunction(loading)) {
        return loading(this.row, this.column, this.index);
      }
      return loading;
    },
    handleClick(click) {
      if (isFunction(click)) click(this.row, this.column, this.index);
      else if (isString(click)) this.table.handleClick(click, this.row);
    },
  },
};
</script>
<style lang='scss' scoped>
// /deep/ .button-hover:hover {
//   opacity: 0.8;
// }
// /deep/ .el-button.el-button--text.is-disabled {
//   color: #C0C4CC !important;
// }
</style>

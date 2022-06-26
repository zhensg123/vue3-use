<template>
  <div class="table-wrap">
    <div class="table-wrap__header box-header" v-if="$slots['table-header']">
      <slot name="table-header"></slot>
    </div>

    <div
      class="table-wrap__header box-header"
      v-else-if="
        table.total || table.columnFilter || $slots['header'] || $slots['tools']
      "
    >
      <div class="box-header__left">
        <el-dropdown
          v-if="table.columnFilter"
          style="margin-right: 5px"
          trigger="click"
          :hide-on-click="false"
          placement="bottom-start"
        >
          <el-button size="mini"
            >筛选列<i class="el-icon-arrow-down el-icon--right"></i
          ></el-button>
          <template #dropdown>
            <el-dropdown-menu style="max-height: 350px; overflow-y: auto">
              <el-dropdown-item
                v-for="(column, i) in columns"
                :key="column.prop"
              >
                <el-checkbox
                  v-model="column.enabled"
                  @change="columnsChange(i, column)"
                  style="width: 100%"
                  >{{ column.label }}</el-checkbox
                >
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <slot name="header"></slot>

        <el-pagination
          v-if="table.total && !table.footerDisabled"
          layout="total"
          style="margin-left: 5px"
          :total="pagination.total"
        ></el-pagination>
      </div>
      <div
        class="box-header__right"
        v-if="(table.total && !table.footerDisabled) || $slots['tools']"
      >
        <!-- <el-pagination  layout="total" :total="pagination.total"></el-pagination> -->
        <slot name="tools"></slot>
      </div>
    </div>
    <div class="table-wrap_filter" v-if="$slots['filter'] && table.filter">
      <slot name="filter"> </slot>
    </div>
    <el-table
      ref="table"
      v-loading="loading"
      :data="data"
    >
      <el-table-column
        v-if="table.selectable"
        type="selection"
        width="40"
        :selectable="selectEvent"
        align="center"
      ></el-table-column>
      <el-table-column v-if="table.expand" type="expand">
        <template v-slot="scope">
          <slot name="expand" :row="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 自定义每一行数据 -->
      <template v-for="column in columns">
        <TableColumn
          v-if="column.enabled"
          :key="column.prop"
          :column="column"
          :tableSlots="$slots"
        ></TableColumn>
      </template>
    </el-table>
    <slot name="table-footer"></slot>
    <div class="table-wrap__footer" v-if="!table.footerDisabled">
      <el-pagination
        :small="psmall"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :current-page="pagination.page"
        :total="pagination.total"
        background
        :layout="table.footerLayout"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import TableColumn from "./table-wrap/table-column";
import { getObjValue } from "@/util/data-transition";
// import hoc from './hoc'
// const TableColumnWrap = hoc(TableColumn)
const defaultColumn = {
  enabled: true,
  sortable: true,
  editable: false,
  align: "left",
  fixed: false,
  minWidth: 60,
  width: undefined,
  prop: undefined,
  "show-overflow-tooltip": true, // 当超过宽度时候显示tooltip
};

export default {
  name: "xoneTableWrap",
  components: { TableColumn },
  props: {
    loading: { type: Boolean, default: false },
    props: {
      type: Object,
      default() {
        return {};
      },
    },
    psmall: { type: Boolean, default: false },
    tree: {
      type: Object,
      default: () => {
        return { children: "children", hasChildren: "hasChildren" };
      },
    },
    sort: { type: Object },
    showSummary: { type: Boolean, default: false },
    summaryMethod: { type: Function },
    cellStyle: { type: Function },
    spanMethod: { type: Function },
    headerClassName: { type: Function },
    rowClassName: [String, Function],
    rowClickExclude: { type: Array },
    page: {
      type: Object,
      default: () => {
        return { sizes: [10, 20, 50, 100], size: 10, page: 1, total: 0 };
      },
    },
    columns: { type: Array, required: true },
    outerSelectEvent: { type: Function, default: () => true },
    data: {
      type: Array,
      default() {
        return [{

        }];
      },
    },
  },
  watch: {
    columns() {
      this.initColumns();
    },
  },
  provide() {
    return {
      table: this,
    };
  },
  created() {
    this.initColumns();
  },
  computed: {
    table() {
      return Object.assign(this.defaultProps, this.props);
    },
    pagination() {
      return Object.assign(this.defaultPagination, this.page);
    },
    rowClickExcludeList() {
      let list = ["operate"];
      if (this.rowClickExclude) list = list.concat(this.rowClickExclude);
      return list;
    },
  },
  data() {
    return {
      defaultProps: {
        footerDisabled: false,
        selectable: false,
        footerLayout: "total,prev,pager,next,sizes,jumper",
        columnFilter: true,
        stripe: false,
        border: false,
        size: "mini",
        key: "id",
        total: true,
        small: false,
        filter: false,
      },
      defaultPagination: {
        sizes: [10, 20, 50, 100],
        size: 10,
        page: 1,
        total: 0,
      },
    };
  },
  methods: {
    columnsChange(i, column){
      // eslint-disable-next-line vue/no-mutating-props
      this.columns[i] = column
    },
    initColumns() {
      console.log(this.columns, 'this.columns.length')
      const len = this.columns.length;
      for (let i = 0; i < len; i++) {
        for (const key in defaultColumn) {
          if (key === "prop" && this.columns[i][key] === "operate") {
            continue;
          }
          if (
            key === "width" &&
            (this.columns[i].minWidth || this.columns[i].width)
          ) {
            // eslint-disable-next-line vue/no-mutating-props
            this.columns[i].minWidth =
              this.columns[i].width || this.columns[i].minWidth;
            if (this.columns[i].width) {
              delete this.columns[i].width;
            }
            continue;
          }
          if (this.columns[i][key] === undefined) {
            // eslint-disable-next-line vue/no-mutating-props
            this.columns[i][key] = defaultColumn[key];
          }
        }
      }
    },
    selectEvent(row, index) {
      return this.outerSelectEvent(row, index);
    },
    handleClick(type, row) {
      switch (type) {
        case "edit":
          // eslint-disable-next-line no-case-declarations
          const obj = {};
          this.columns.forEach((colume) => {
            const { editable, prop } = colume;
            if (editable) obj[prop] = getObjValue(row, prop);
          });
          row.__edit = obj;
          row.__editing = false;
          break;
        case "cancel":
          delete row.__edit;
          delete row.__editing;
          break;
        case "save":
          row.__editing = true;
          this.$emit("save", {
            row,
            edit: row.__edit,
            finish: (s) => {
              if (s) {
                for (const prop in row.__edit) {
                  row.prop = row.__edit[prop]
                }
              }
              this.handleClick("cancel", row);
            },
          });
          break;
      }
    },
    setCurrentRow(row) {
      this.$refs.table.setCurrentRow(row);
    },
    clearSelection() {
      this.$refs.table.clearSelection();
    },
    toggleRowSelection(row) {
      this.$refs.table.toggleRowSelection(row);
    },
    toggleRowExpansion(row, expanded) {
      this.$refs.table.toggleRowExpansion(row, expanded);
    },
    handleRowClick(row, column, event) {
      if (column && !this.rowClickExcludeList.includes(column.property)) {
        this.$emit("row-click", row, column, event);
      }
    },
    handleSizeChange(value) {
      this.pagination.size = value;
      this.$emit("change", this.pagination);
    },
    handleCurrentChange(value) {
      this.pagination.page = value;
      this.$emit("change", this.pagination);
    },
  },
};
</script>
<style lang='scss' scoped>
.table-wrap_filter {
  border-top: 1px solid #ebeef5;
  padding-top: 18px;
}
</style>

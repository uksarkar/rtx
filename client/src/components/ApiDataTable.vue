<template>
  <el-table :data="data" stripe style="width: 100%" v-loading="isLoading">
    <el-table-column
      v-for="(column, i) in columns"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      :key="i"
    />
    <el-table-column fixed="right" label="Operations" width="240">
      <template #default="scope">
        <slot name="actions" v-bind="scope"></slot>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    class="alignments"
    background
    :page-sizes="pageSizes"
    layout="sizes, prev, pager, next, total"
    :total="total"
    v-model:current-page="currentPage"
    v-model:page-size="perPage"
    @current-change="updateCaller"
    @size-change="updateCaller"
  />
</template>

<script lang="ts" setup>
import { ElTable, ElTableColumn, ElPagination } from "element-plus";
import { debounce } from "lodash";
import { ref, type PropType } from "vue";

interface Emits {
  (eventName: "triggerUpdate", page: number, limit: number): void;
}

interface IColumn {
  prop: string;
  label: string;
  width?: number;
}

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array as PropType<Array<IColumn>>,
    required: true,
  },
  pageSizes: {
    type: Array as PropType<Array<number>>,
    default: () => [10, 20, 30, 50],
  },
  total: {
    type: Number,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<Emits>();

const currentPage = ref<number>(1);
const perPage = ref<number>(props.pageSizes.at(0) || 10);

const updateCaller = debounce(triggerUpdate, 100, {
  leading: false,
  trailing: true,
});

function triggerUpdate() {
  emit("triggerUpdate", currentPage.value, perPage.value);
}
</script>

<style scoped>
.alignments {
  width: max-content;
  margin: auto;
  margin-top: 20px;
}
</style>

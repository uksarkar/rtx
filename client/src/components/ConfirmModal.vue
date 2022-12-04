<template>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <span>{{ content }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="emit('onConfirm')">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "Are you sure?",
  },
});

const dialogVisible = computed({
  get: () => props.show,
  set: (v: boolean) => emit("update:show", v),
});

const emit = defineEmits<{
  (emitName: "onConfirm"): void;
  (emitName: "update:show", v: boolean): void;
}>();
</script>

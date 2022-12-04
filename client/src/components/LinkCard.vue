<template>
  <el-card class="box-card" @click="$router.push(to)">
    <el-row>
      <el-col :span="12">
        <div class="icon">
          <slot name="icon"></slot>
        </div>
      </el-col>
      <el-col :span="12" alignment="flex-center">{{ title }}</el-col>
    </el-row>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard, ElRow, ElCol } from "element-plus";

defineProps({
  title: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.box-card {
  cursor: pointer;
}

.icon,
.icon svg {
  max-width: 200px;
  max-height: 200px;
}
</style>

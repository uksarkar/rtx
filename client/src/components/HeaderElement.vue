<template>
  <el-page-header @back="back" :icon="icon" :title="buttonText">
    <template #content>
      <span class="text-large font-600 mr-3">{{ title }}</span>
    </template>
  </el-page-header>
</template>

<script lang="ts" setup>
import { ElPageHeader } from "element-plus";
import { House } from "@element-plus/icons-vue";
import { title } from "../compositions/header-composition";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const buttonText = ref("Home");

const icon = computed(() => (buttonText.value === "Home" ? House : undefined));

watch(route, (to) => {
  buttonText.value = to.name === "home" || to.path === "/404" ? "Home" : "Back";
});

function back() {
  if (route.path === "/404") return router.push("/");
  router.back();
}
</script>

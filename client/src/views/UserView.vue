<template>
  <h1>User</h1>
  <ElCard>
    <template #header>
      <div class="card-header">
        <ElRow justify="between">
          <ElCol :span="12"> {{ user?.firstname }} {{ user?.lastname }} </ElCol>
          <ElCol :span="12">
            <el-space alignment="flex-end">
              <el-button
                class="button"
                type="danger"
                @click="dialogVisible = true"
                >Delete</el-button
              >
              <el-button
                v-if="user"
                class="button"
                type="primary"
                @click="$router.push(`/users/${user!.id}/view`)"
                >Edit</el-button
              >
            </el-space>
          </ElCol>
        </ElRow>
      </div>
    </template>

    <strong>Address:</strong>
    <address>{{ user?.address }}</address>
  </ElCard>
  <ConfirmModal
    v-model:show="dialogVisible"
    content="The user will be deleted from the database."
    @on-confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import { deleteUser, getUser } from "@/api/user";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { title } from "@/compositions/header-composition";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type User from "@/interfaces/User";
import {
  ElCard,
  ElButton,
  ElRow,
  ElCol,
  ElSpace,
  ElNotification,
} from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const user = ref<User>();
const dialogVisible = ref(false);

function handleConfirm() {
  dialogVisible.value = false;

  if (!user.value) return;

  fullscreenLoading.value = true;

  deleteUser(user.value!.id)
    .then(() => {
      router.replace("/users");
      ElNotification({
        type: "success",
        message: "User deleted successfully.",
        title: "Deleted",
      });
    })
    .catch(handleResponseError)
    .finally(() => {
      fullscreenLoading.value = false;
    });
}

onMounted(() => {
  if (!(route.params.id as string).trim()) router.push(`/404`);
  getUser(Number(route.params.id))
    .then((res) => {
      user.value = res.data;
      title.value = `${res.data.firstname} ${res.data.lastname}`;
    })
    .catch(handleResponseError)
    .finally(() => {});
});
</script>

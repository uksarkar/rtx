<template>
  <ElRow>
    <ElCol><h1>Users list</h1></ElCol>
    <ElCol>
      <el-button
        class="button"
        type="primary"
        @click="$router.push(`/users/create`)"
        >Create User</el-button
      ></ElCol
    >
  </ElRow>
  <ApiDataTable
    :columns="columns"
    :data="users"
    :total="total"
    :is-loading="isLoading"
    @trigger-update="updateUserData"
  >
    <template #actions="scope">
      <el-button
        type="primary"
        size="small"
        plain
        @click="$router.push(`/users/${scope.row.id}/view`)"
        >Detail</el-button
      >
      <el-button
        type="success"
        size="small"
        plain
        @click="$router.push(`/users/${scope.row.id}/edit`)"
        >Edit</el-button
      >
      <el-button
        type="danger"
        size="small"
        plain
        @click="deleteAction(scope.row.id)"
        >Delete</el-button
      >
    </template>
  </ApiDataTable>
  <ConfirmModal
    v-model:show="dialogVisible"
    content="The user will be deleted from the database."
    @on-confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import ApiDataTable from "@/components/ApiDataTable.vue";
import type User from "@/interfaces/User";
import { onMounted, ref } from "vue";
import { deleteUser, fetchUsers } from "@/api/user";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { ElRow, ElCol, ElButton, ElNotification } from "element-plus";
import { handleResponseError } from "@/helpers";

const columns = [
  {
    prop: "firstname",
    label: "Firstname",
  },
  {
    prop: "lastname",
    label: "Lastname",
  },
  {
    prop: "address",
    label: "Address",
  },
];

const users = ref<Array<User>>([]);
const isLoading = ref<boolean>(false);
const total = ref<number>(0);
const dialogVisible = ref(false);

const deleteUserId = ref<number>();

function updateUserData(page: number = 1, limit: number = 10) {
  isLoading.value = true;

  fetchUsers(page, limit)
    .then((res) => {
      users.value = res.data.data;
      total.value = res.data.total;
    })
    .catch(handleResponseError)
    .finally(() => {
      isLoading.value = false;
    });
}

function handleConfirm() {
  dialogVisible.value = false;

  if (!deleteUserId.value) return;

  fullscreenLoading.value = true;

  deleteUser(deleteUserId.value)
    .then(() => {
      ElNotification({
        type: "success",
        message: "User deleted successfully.",
        title: "Deleted",
      });
    })
    .catch(handleResponseError)
    .finally(() => {
      deleteUserId.value = undefined;
      fullscreenLoading.value = false;
      updateUserData();
    });
}

function deleteAction(id: number) {
  deleteUserId.value = id;
  dialogVisible.value = true;
}

onMounted(updateUserData);
</script>

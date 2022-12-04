<template>
  <ElRow>
    <ElCol><h1>Posts list</h1></ElCol>
    <ElCol>
      <el-button
        class="button"
        type="primary"
        @click="$router.push(`/posts/create`)"
        >Create Post</el-button
      ></ElCol
    >
  </ElRow>
  <ApiDataTable
    :columns="columns"
    :data="posts"
    :total="total"
    :is-loading="isLoading"
    @trigger-update="updatePostData"
  >
    <template #actions="scope">
      <el-button
        type="primary"
        size="small"
        plain
        @click="$router.push(`/posts/${scope.row.id}/view`)"
        >Detail</el-button
      >
      <el-button
        type="success"
        size="small"
        plain
        @click="$router.push(`/posts/${scope.row.id}/edit`)"
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
    content="The post will be deleted from the database."
    @on-confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import ApiDataTable from "@/components/ApiDataTable.vue";
import { onMounted, ref } from "vue";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { fullscreenLoading } from "@/compositions/loading-composition";
import type Post from "@/interfaces/Post";
import { deletePost, fetchPosts } from "@/api/post";
import { ElCol, ElRow, ElButton, ElNotification } from "element-plus";
import { handleResponseError } from "@/helpers";

const columns = [
  {
    prop: "title",
    label: "Title",
  },
  {
    prop: "preview",
    label: "Preview",
  },
];

const posts = ref<Array<Post>>([]);
const isLoading = ref<boolean>(false);
const total = ref<number>(0);
const dialogVisible = ref(false);

const deletePostId = ref<number>();

function updatePostData(page: number = 1, limit: number = 10) {
  isLoading.value = true;

  fetchPosts(page, limit)
    .then((res) => {
      posts.value = res.data.data.map((p) => {
        p.preview =
          p.description.substring(0, 20) +
          (p.description.length > 20 ? "..." : "");
        return p;
      });
      total.value = res.data.total;
    })
    .catch(handleResponseError)
    .finally(() => {
      isLoading.value = false;
    });
}

function handleConfirm() {
  dialogVisible.value = false;

  if (!deletePostId.value) return;

  fullscreenLoading.value = true;

  deletePost(deletePostId.value)
    .then(() => {
      ElNotification({
        type: "success",
        message: "The post was deleted.",
        title: "Deleted",
      });
    })
    .catch(handleResponseError)
    .finally(() => {
      deletePostId.value = undefined;
      fullscreenLoading.value = false;
      updatePostData();
    });
}

function deleteAction(id: number) {
  deletePostId.value = id;
  dialogVisible.value = true;
}

onMounted(updatePostData);
</script>

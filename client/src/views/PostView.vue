<template>
  <h1>Post</h1>
  <ElCard>
    <template #header>
      <ElRow justify="space-between">
        <ElCol :span="12">
          {{ post?.title }} <br />
          <small
            >Author: {{ post?.user.firstname }} {{ post?.user.lastname }}</small
          >
        </ElCol>
        <ElCol :span="12">
          <el-space alignment="flex-end">
            <el-button
              class="button"
              type="danger"
              @click="dialogVisible = true"
              >Delete</el-button
            >
            <el-button
              v-if="post"
              class="button"
              type="primary"
              @click="$router.push(`/posts/${post!.id}/edit`)"
              >Edit</el-button
            >
          </el-space>
        </ElCol>
      </ElRow>
    </template>

    <strong>Description:</strong>
    <article v-html="post?.description"></article>
  </ElCard>
  <ConfirmModal
    v-model:show="dialogVisible"
    content="The post will be deleted from the database."
    @on-confirm="handleConfirm"
  />
</template>

<script lang="ts" setup>
import { deletePost, getPost } from "@/api/post";
import ConfirmModal from "@/components/ConfirmModal.vue";
import { title } from "@/compositions/header-composition";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type Post from "@/interfaces/Post";
import { ElCard, ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const post = ref<Post>();
const dialogVisible = ref(false);

function handleConfirm() {
  dialogVisible.value = false;

  if (!post.value) return;

  fullscreenLoading.value = true;

  deletePost(post.value!.id)
    .then(() => {
      ElNotification({
        type: "success",
        message: "Post deleted successfully.",
        title: "Deleted",
      });
      router.replace("/posts");
    })
    .catch(handleResponseError)
    .finally(() => {
      fullscreenLoading.value = false;
    });
}

onMounted(() => {
  if (!(route.params.id as string).trim()) router.push(`/404`);
  getPost(Number(route.params.id))
    .then((res) => {
      post.value = res.data;
      title.value = `A post by ${res.data.user.firstname} ${res.data.user.lastname}`;
    })
    .catch(handleResponseError)
    .finally(() => {});
});
</script>

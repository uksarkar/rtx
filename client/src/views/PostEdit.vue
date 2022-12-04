<template>
  <h1>Edit Post</h1>
  <div v-if="post" style="max-width: 50vw; margin: auto">
    <PostForm
      :title="post.title"
      :description="post.description"
      @on-submit="submit"
    />
  </div>
</template>

<script lang="ts" setup>
import { getPost, editPost } from "@/api/post";
import PostForm from "@/components/PostForm.vue";
import { title } from "@/compositions/header-composition";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type Post from "@/interfaces/Post";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const post = ref<Post>();

function submit(data: Omit<Post, "id" | "user">) {
  fullscreenLoading.value = true;

  editPost(post.value!.id, data)
    .then(() => {
      ElNotification({
        type: "success",
        message: "The post updated.",
        title: "Updated",
      });
      router.replace(`/posts/${post.value!.id}/view`);
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
      title.value = `Edit ${res.data.title}`;
    })
    .catch(handleResponseError)
    .finally(() => {});
});
</script>

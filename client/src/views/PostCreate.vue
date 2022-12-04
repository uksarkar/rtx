<template>
  <h1>Create Post</h1>
  <div style="max-width: 50vw; margin: auto">
    <PostForm @on-submit="submit" />
  </div>
</template>

<script lang="ts" setup>
import { createPost } from "@/api/post";
import PostForm from "@/components/PostForm.vue";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type Post from "@/interfaces/Post";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

function submit(data: Omit<Post, "id" | "user">) {
  fullscreenLoading.value = true;

  createPost(data)
    .then((r) => {
      ElNotification({
        type: "success",
        message: "Post created.",
        title: "Created",
      });
      router.replace(`/posts/${r.data.id}/view`);
    })
    .catch(handleResponseError)
    .finally(() => {
      fullscreenLoading.value = false;
    });
}
</script>

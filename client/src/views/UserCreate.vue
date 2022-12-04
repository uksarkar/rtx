<template>
  <h1>Create User</h1>
  <div style="max-width: 50vw; margin: auto">
    <UserForm @on-submit="submit" />
  </div>
</template>

<script lang="ts" setup>
import { createUser } from "@/api/user";
import UserForm from "@/components/UserForm.vue";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type User from "@/interfaces/User";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

function submit(data: Omit<User, "id" | "address">) {
  fullscreenLoading.value = true;

  createUser(data)
    .then((r) => {
      ElNotification({
        type: "success",
        message: "User created.",
        title: "Created",
      });
      router.replace(`/users/${r.data.id}/view`);
    })
    .catch(handleResponseError)
    .finally(() => {
      fullscreenLoading.value = false;
    });
}
</script>

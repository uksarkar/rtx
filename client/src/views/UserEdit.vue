<template>
  <h1>Edit User</h1>
  <div v-if="user" style="max-width: 50vw; margin: auto">
    <UserForm
      :firstname="user.firstname"
      :lastname="user.lastname"
      @on-submit="submit"
    />
  </div>
</template>

<script lang="ts" setup>
import { getUser, editUser } from "@/api/user";
import UserForm from "@/components/UserForm.vue";
import { title } from "@/compositions/header-composition";
import { fullscreenLoading } from "@/compositions/loading-composition";
import { handleResponseError } from "@/helpers";
import type User from "@/interfaces/User";
import { ElNotification } from "element-plus";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const user = ref<User>();

function submit(data: Omit<User, "id" | "address">) {
  fullscreenLoading.value = true;

  editUser(user.value!.id, data)
    .then(() => {
      ElNotification({
        type: "success",
        message: "The user updated.",
        title: "Updated",
      });
      router.replace(`/users/${user.value!.id}/view`);
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
      title.value = `Edit ${res.data.firstname} ${res.data.lastname}`;
    })
    .catch(handleResponseError)
    .finally(() => {});
});
</script>

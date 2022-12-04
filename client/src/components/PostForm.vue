<template>
  <el-form
    ref="ruleFormRef"
    :model="formData"
    status-icon
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="Title" prop="title">
      <el-input
        v-model="formData.title"
        placeholder="type title..."
        :suffix-icon="EditPen"
      />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input
        v-model="formData.description"
        placeholder="type description..."
        type="textarea"
      />
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-select
        v-model="formData.user_id"
        filterable
        remote
        reserve-keyword
        placeholder="Search by user's name"
        remote-show-suffix
        :remote-method="searchUsers"
        :loading="loadingUsers"
      >
        <el-option
          v-for="user in users"
          :key="user.id"
          :label="user.firstname + ' ' + user.lastname"
          :value="user.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import type { FormInstance, ElInput } from "element-plus";
import type Post from "@/interfaces/Post";
import { fetchUsers } from "@/api/user";
import type User from "@/interfaces/User";
import { handleResponseError } from "@/helpers";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  userId: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits<{
  (emitName: "onSubmit", data: Omit<Post, "id" | "user">): void;
}>();

const ruleFormRef = ref<FormInstance>();
const loadingUsers = ref(true);
const users = ref<User[]>([]);

const formData = reactive({
  title: props.title,
  description: props.description,
  user_id: props.userId,
});

const rules = reactive({
  title: [
    {
      validator: (_: undefined, __: undefined, cb: (err?: Error) => void) =>
        nameValidator(formData.title, 4, cb),
      trigger: "blur",
    },
  ],
  description: [
    {
      validator: (_: undefined, __: undefined, cb: (err?: Error) => void) =>
        nameValidator(formData.description, 10, cb),
      trigger: "blur",
    },
  ],
  userId: [
    {
      validator: (_: undefined, __: undefined, cb: (err?: Error) => void) => {
        if (!formData.user_id) return cb(new Error("Please select a User"));
        cb();
      },
      trigger: "blur",
    },
  ],
});

function nameValidator(
  value: string | undefined,
  length: number,
  callback: (err?: Error) => void
) {
  if (!value || value.length < length) {
    callback(new Error(`Please provide at ${length} characters.`));
    return;
  }
  callback();
}

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (!valid) return;

    emit("onSubmit", formData);
  });
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.resetFields();
}

function searchUsers(query?: string) {
  if (!query) return;

  loadingUsers.value = true;
  fetchUsers(1, 10, query)
    .then((res) => {
      users.value = res.data.data;
    })
    .catch(handleResponseError)
    .finally(() => {
      loadingUsers.value = false;
    });
}

onMounted(() => {
  loadingUsers.value = true;
  fetchUsers()
    .then((res) => {
      users.value = res.data.data;
    })
    .finally(() => {
      loadingUsers.value = false;
    });
});
</script>

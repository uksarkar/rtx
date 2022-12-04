<template>
  <el-form
    ref="ruleFormRef"
    :model="formData"
    status-icon
    :rules="rules"
    label-width="120px"
  >
    <el-form-item label="Firstname" prop="firstname">
      <el-input
        v-model="formData.firstname"
        placeholder="type firstname..."
        :suffix-icon="EditPen"
      />
    </el-form-item>
    <el-form-item label="Lastname" prop="lastname">
      <el-input
        v-model="formData.lastname"
        placeholder="type lastname..."
        :suffix-icon="EditPen"
      />
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
import { reactive, ref } from "vue";
import { EditPen } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import type User from "@/interfaces/User";

const props = defineProps({
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
});

const emit = defineEmits<{
  (emitName: "onSubmit", data: Omit<User, "id" | "address">): void;
}>();

const ruleFormRef = ref<FormInstance>();

const formData = reactive({
  firstname: props.firstname,
  lastname: props.lastname,
});

const rules = reactive({
  firstname: [
    {
      validator: (_: undefined, __: undefined, cb: (err?: Error) => void) =>
        nameValidator(formData.firstname, cb),
      trigger: "blur",
    },
  ],
  lastname: [
    {
      validator: (_: undefined, __: undefined, cb: (err?: Error) => void) =>
        nameValidator(formData.lastname, cb),
      trigger: "blur",
    },
  ],
});

function nameValidator(
  value: string | undefined,
  callback: (err?: Error) => void
) {
  if (!value || value.length < 4) {
    callback(new Error("Please provide at 4 characters."));
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
</script>

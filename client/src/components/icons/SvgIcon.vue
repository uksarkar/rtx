<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width"
    :height="height"
    viewBox="0 0 24 24"
    :aria-labelledby="iconName"
    role="presentation"
  >
    <title :id="iconName" lang="en">{{ iconName }} icon</title>
    <g :fill="iconColor">
      <slot />
    </g>
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  width: {
    type: Number,
    default: 30,
  },
  height: {
    type: Number,
    default: 30,
  },
  iconName: {
    type: String,
    required: true,
  },
  iconColor: {
    type: String,
    default: "#000",
  },
});
</script>

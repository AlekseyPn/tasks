<template>
  <button class="focus:outline-none"
          v-bind="$attrs"
          :class="{
            ['py-1 px-4 ']: !rounded && !icon,
            [`text-white rounded transition ${color}`]: !icon,
          }"
          v-on="$listeners">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Btn",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "bg-blue-500 hover:bg-blue-600",
    },
  },
};
</script>
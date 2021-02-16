<template>
  <div class="flex flex-col">
    <label v-show="$slots.default" :for="$attrs.id" class="text-gray-400"><slot></slot></label>
    <template>
      <input v-if="inputType === 'input'" v-model="inputVal" :class="classes" v-bind="$attrs">
      <textarea v-if="inputType === 'textarea'" v-model="inputVal" :class="classes" cols="30" rows="5"></textarea>
    </template>
  </div>
</template>

<script>
export default {
  name: "FormInput",
  inheritAttrs: false,
  props: {
    value: {},
    inputType: {
      type: String,
      default: "input",
    },
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit("input", value);
      },
    },
    classes() {
      return "p-1 border rounded border-gray-400 mt-1 focus:border-blue-500 focus:outline-none";
    },
  },
};
</script>
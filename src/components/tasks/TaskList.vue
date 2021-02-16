<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
    <task v-for="task in tasks"
          :key="task.id"
          :task="task"
          v-on="$listeners"
          />
  </div>
</template>

<script>
import Task from "@/components/tasks/Task";

export default {
  name: "TaskList",
  components: {
    Task,
  },
  inheritAttrs: false,
  props: {
    tasks: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
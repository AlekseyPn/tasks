<template>
  <div class="relative flex flex-col bg-white rounded-md p-4 pt-7 task">
    <span class="text-2xl font-semibold">{{task.title}}</span>
    <span class="text-md mb-4 text-gray-400">Статус: {{task.complete ? "Выполнена" : "В процессе"}}</span>
    <span class="text-md mb-4">{{task.description}}</span>
    <div class="flex justify-between items-center mt-auto">
      <btn
      :color="task.complete ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'"
      @click="$emit('toggle-task-complete', task)">
        {{task.complete ? 'Возобновить' : "Завершить"}}
      </btn>
      <span v-if="daysToFinish && !task.complete" :class="{
        'text-gray-500 text-sm': daysToFinish > 0,
        'text-red-500 text-md': daysToFinish === 0
      }">{{daysToFinishText}}</span>
    </div>
    <btn icon class="task__remove absolute top-1.5 right-1.5" @click="$emit('remove-task', task.id)"></btn>
  </div>
</template>

<script>
import Btn from "@/components/ui/Btn";

const DAYS_PLURALS = {
  "zero": "дней",
  "one": "день",
  "few": "дня",
  "many": "дней",
};

export default {
  name: "Task",
  components: {
    Btn,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    daysToFinish() {
      if (!this.task.finishDate) return null;
      const diff = Math.abs(new Date(this.task.finishDate).getTime() - new Date().getTime());
      return Math.floor(diff / (3600 * 24 * 1000));
    },
    daysToFinishText() {
      if (!this.daysToFinish) return "";
      const pluralsKey = new Intl.PluralRules("ru-Ru").select(this.daysToFinish);
      return `До завершения: ${this.daysToFinish} ${DAYS_PLURALS[pluralsKey]}`;
    },
  },
};
</script>

<style scoped>
.task__remove {
  width: 24px;
  height: 24px;
  background: url("~@/assets/icons/remove.svg");
}
</style>
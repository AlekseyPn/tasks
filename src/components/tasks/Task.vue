<template>
  <div class="relative flex flex-col bg-white rounded-md p-4 pt-7 task">
    <span class="text-xl md:text-2xl font-semibold">{{task.title}}</span>
    <span class="text-sm md:text-md mb-1 text-gray-400">Статус: {{task.complete ? "Выполнена" : "В процессе"}}</span>
    <span v-if="hasFinishDate && !task.complete" class="mb-4" :class="{
        'text-sm md:text-md text-gray-400': daysToFinish > 0,
        'text-red-500 text-md': daysToFinish === 0
      }">{{daysToFinishText}}</span>
    <p class="text-md mb-4 whitespace-pre-line break-words">{{task.description}}</p>
    <div class="flex justify-between items-center mt-auto">
      <btn
      :color="task.complete ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'"
      @click="$emit('toggle-task-complete', task)">
        {{task.complete ? 'Возобновить' : "Завершить"}}
      </btn>
    </div>
    <btn icon class="task__remove absolute top-1.5 right-1.5" @click="$emit('remove-task', task.id)"></btn>
  </div>
</template>

<script>
import Btn from "@/components/ui/buttons/Btn";

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
    hasFinishDate() {
      return this.daysToFinish !== null;
    },
    daysToFinish() {
      if (!this.task.finishDate) return null;
      const diff = Math.abs(new Date(this.task.finishDate).setHours(0,0,0,0) - new Date().setHours(0,0,0,0));
      return Math.floor(diff / (3600 * 24 * 1000));
    },
    daysToFinishText() {
      if (!this.hasFinishDate) return "";
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
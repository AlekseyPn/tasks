<template>
  <div class="fixed create-task-form flex justify-center items-center w-full h-full">
    <div class="bg-black opacity-50 absolute w-full h-full" @click="close"></div>
    <form class="z-10 flex flex-col p-4 rounded-xl bg-white relative w-full max-w-md" @submit.prevent="submitHandler">
      <btn class="absolute right-1.5 top-1.5 w-5 h-5" icon type="button" @click="close">
        <img src="@/assets/icons/close.svg" alt="Закрыть">
      </btn>
      <span class="mb-2 text-xl font-semibold">Создание новой задачи</span>
      <label class="mt-1 text-gray-400" for="title">Заголовок(обязательное)</label>
      <input id="title" v-model="task.title" autocomplete="off" class="p-1 border rounded border-gray-400 mt-1 focus:border-blue-500 focus:outline-none" type="text">
      <label class="mt-1 text-gray-400" for="description">Описание</label>
      <textarea id="description" v-model="task.description" class="p-1 border rounded border-gray-400 mt-1 focus:border-blue-500 focus:outline-none" name="description" cols="30" rows="5"></textarea>
      <label class="mt-1 text-gray-400" for="date">Дата завершения</label>
      <input id="date" v-model="task.finishDate" type="date" class="p-1 border rounded border-gray-400 mt-1 focus:border-blue-500 focus:outline-none">
      <span v-show="error" class="text-sm text-red-500">{{error}}</span>
      <btn class="mt-7" type="submit">Добавить</btn>
    </form>
  </div>
</template>

<script>
import Btn from "@/components/ui/Btn";

export default {
  name: "TaskCreateModal",
  components: {
    Btn,
  },
  data() {
    return {
      task: {
        title: "",
        description: "",
        finishDate: "",
        complete: false,
      },
      error: "",
    };
  },
  methods: {
    submitHandler() {
      this.error = "";
      if (!this.task.title) {
        this.error = "Заполните поле заголовок";
        return;
      }

      if (this.task.finishDate && !this.checkDate(this.task.finishDate)) {
        this.error = "Дата должна быть позже либо равна текущей";
        return;
      }
      this.$emit("add-task", this.task);
      this.close();
      this.task = {
        title: "",
        description: "",
        finishDate: "",
        complete: false,
      };
    },
    close() {
      this.$emit("close");
    },
    checkDate(date) {
      const now = new Date().setHours(0,0,0,0);
      const selectedDate = new Date(date);
      return now <= selectedDate;
    },
  },
};
</script>
<style>
.create-task-form {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
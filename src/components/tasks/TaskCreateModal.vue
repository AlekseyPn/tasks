<template>
  <div class="fixed create-task-form flex justify-center items-center w-full h-full">
    <div class="bg-black opacity-50 absolute w-full h-full" @click="close"></div>
    <form class="z-10 flex flex-col p-4 rounded-xl bg-white relative w-full max-w-md" @submit.prevent="submitHandler">
      <btn class="absolute right-1.5 top-1.5 w-5 h-5" icon type="button" @click="close">
        <img src="@/assets/icons/close.svg" alt="Закрыть">
      </btn>
      <span class="mb-2 text-xl font-semibold">Создание новой задачи</span>
      <form-input id="title" v-model="task.title" class="mt-1" autocomplete="off" type="text">Заголовок(обязательное)</form-input>
      <form-input id="description" v-model="task.description" class="mt-1" input-type="textarea" name="description">Описание</form-input>
      <form-input id="date" v-model="task.finishDate" class="mt-1" type="date">Дата завершения</form-input>
      <span v-show="error" class="text-sm text-red-500">{{error}}</span>
      <btn class="mt-7" type="submit">Добавить</btn>
    </form>
  </div>
</template>

<script>
import Btn from "@/components/ui/buttons/Btn";
import FormInput from "@/components/ui/forms/FormInput";

export default {
  name: "TaskCreateModal",
  components: {
    Btn,
    FormInput,
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
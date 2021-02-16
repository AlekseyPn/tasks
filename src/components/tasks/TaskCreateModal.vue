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
      <date-picker v-model="task.finishDate" :masks="masks" :min-date="minDate">
        <template #default="{inputValue, inputEvents}">
          <div class="flex flex-col mt-1">
            <label for="date" class="text-gray-400">Дата завершения</label>
            <input id="date" class="w-full p-1 border rounded border-gray-400 mt-1 focus:border-blue-500 focus:outline-none" :value="inputValue" readonly v-on="inputEvents">
          </div>
        </template>
      </date-picker>
      <span v-show="error" class="text-sm text-red-500">{{error}}</span>
      <div class="flex justify-between">
        <btn class="mt-7" color="bg-red-500 hover:bg-red-600" type="button" @click="close">Отменить</btn>
        <btn class="mt-7" type="submit">Добавить</btn>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from "v-calendar/lib/components/date-picker.umd";
import Btn from "@/components/ui/buttons/Btn";
import FormInput from "@/components/ui/forms/FormInput";

export default {
  name: "TaskCreateModal",
  components: {
    Btn,
    FormInput,
    DatePicker,
  },
  data() {
    return {
      task: {
        title: "",
        description: "",
        finishDate: new Date(),
        complete: false,
      },
      error: "",
      masks: {
        input: "YYYY-MM-DD",
      },
      minDate: new Date().setHours(0,0,0,0),
    };
  },
  methods: {
    submitHandler() {
      this.error = "";
      if (!this.task.title) {
        this.error = "Заполните поле заголовок";
        return;
      }

      this.$emit("add-task", this.task);
      this.close();
      this.task = {
        title: "",
        description: "",
        finishDate: new Date().setHours(0,0,0,0),
        complete: false,
      };
    },
    close() {
      this.$emit("close");
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
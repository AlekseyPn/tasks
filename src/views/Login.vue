<template>
  <div class="h-full flex justify-center items-center">
    <form class="flex flex-col mx-2 md:mx-0 p-4 rounded-xl bg-white relative w-full max-w-sm shadow" @submit.prevent="login">
      <div class="flex flex-col">
        <form-input id="login" v-model="loginVal" class="mt-1">
          Логин
        </form-input>
        <form-input id="password" v-model="passwordVal" type="password" class="mt-1">
          Пароль
        </form-input>
        <span v-show="errorMessage" class="text-red-500 text-sm mt-4">{{errorMessage}}</span>
      </div>
      <btn :disabled="pending" type="submit" class="self-center mt-9">Войти</btn>
    </form>
  </div>
</template>
<script>
import {user} from "@/store/store.namespaces";
import {mapActions} from "vuex";
import Btn from "@/components/ui/buttons/Btn";
import FormInput from "@/components/ui/forms/FormInput";

const ErrorType = {
  NotEnoughLogin: "NotEnoughLogin",
  NotEnoughPass: "NotEnoughPass",
  IncorrectCredentials: "IncorrectCredentials",
};

const ERROR_MESSAGES = {
  [ErrorType.NotEnoughLogin]: "Введите Логин",
  [ErrorType.NotEnoughPass]: "Введите Пароль",
  [ErrorType.IncorrectCredentials]: "Вы ввели некорректные данные",
};

export default {
  name: "Login",
  components: {
    Btn,
    FormInput,
  },
  data() {
    return {
      loginVal: "",
      passwordVal: "",
      errorType: "",
      pending: false,
    };
  },
  computed: {
    errorMessage() {
      return ERROR_MESSAGES[this.errorType];
    },
  },
  methods: {
    ...mapActions(user, {
      loginAction: "login",
    }),
    async login() {
      this.pending = true;
      this.errorType = "";
      if (!this.loginVal) {
        this.errorType = ErrorType.NotEnoughLogin;
        this.pending = false;
        return;
      }
      if (!this.passwordVal) {
        this.errorType = ErrorType.NotEnoughLogin;
        this.pending = false;
        return;
      }
      try {
        await this.loginAction({login:this.loginVal, password: this.passwordVal});
        this.$router.push("task-board");
      } catch (e) {
        this.errorType = ErrorType.IncorrectCredentials;
      } finally {
        this.pending = false;
      }
    },
  },
};
</script>
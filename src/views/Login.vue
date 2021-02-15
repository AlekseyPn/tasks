<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="login">Логин</label>
        <input id="login" v-model="loginVal" type="text">
        <label for="password">Пароль</label>
        <input id="password" v-model="passwordVal" type="password">
        <span v-show="errorMessage">{{errorMessage}}</span>
      </div>
      <button :disabled="pending" type="submit">Войти</button>
    </form>
  </div>
</template>
<script>
import {user} from "@/store/store.namespaces";
import {mapActions} from "vuex";

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
        return;
      }
      if (!this.passwordVal) {
        this.errorType = ErrorType.NotEnoughLogin;
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
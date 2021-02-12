<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import api from "@/api";
  export default {
    async created() {
      const user = await api.users.login({login: "test_user", password: 1111 });
      const tasks = await api.tasks.getAllByUserId(user.id);
      console.log(tasks);
    },
  };
</script>

<style>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

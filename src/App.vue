<template>
  <div id="app" class="h-full flex flex-col overflow-hidden">
    <header class="p-4 flex justify-between items-center shadow-md relative">
        <img src="@/assets/logo.svg" alt="Todooka">
      <div v-if="user" class="flex items-center">
        <h1 class="text-md md:text-xl mr-2 hidden sm:block">Привет, {{ user.login }}</h1>
        <btn class="flex items-center" @click="logoutClickHandler">
          Выход
          <img src="@/assets/icons/logout.svg" class="w-5 h-5 ml-2">
        </btn>
      </div>
    </header>
    <main class="flex flex-col flex-auto bg-gray-50 overflow-hidden">
        <router-view></router-view>
    </main>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {user} from "@/store/store.namespaces";
import Btn from "@/components/ui/buttons/Btn";

export default {
  name: "App",
  components: {
    Btn,
  },
  computed: mapState(user, ["user"]),
  methods: {
    ...mapActions(user, ["logout"]),
    logoutClickHandler() {
      this.logout();
      this.$router.replace("/");
    },
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

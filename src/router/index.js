import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import {user} from "@/store/store.namespaces";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/",
    component: () => import(/* webpackChunkName="Login" */ "@/views/Login"),
  },
  {
    name: "task-board",
    path: "/task-board",
    component: () => import(/* webpackChunkName="Login" */ "@/views/Tasks"),
    meta: {
      requireAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const sessionToken = store.state.user.sessionToken;
  if (to.meta.requireAuth && !sessionToken) {
    return next("/");
  }
  if (sessionToken && !store.state.user.user) {
    await store.dispatch(`${user}/getUserByToken`, sessionToken);
  }

  next();
});

export default router;

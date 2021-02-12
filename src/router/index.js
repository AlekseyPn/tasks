import Vue from "vue";
import VueRouter from "vue-router";

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
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach();

export default router;

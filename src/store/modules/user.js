import {SESSION_TOKEN} from "@/const/user-consts";

const state = {
  user: null,
  isLoggedIn: !!localStorage.getItem(SESSION_TOKEN),
};

const mutations = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
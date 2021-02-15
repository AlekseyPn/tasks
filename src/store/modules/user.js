import {SESSION_TOKEN} from "@/const/user-consts";
import api from "@/api";

const state = {
  user: null,
  sessionToken: localStorage.getItem(SESSION_TOKEN),
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setToken(state, token) {
    state.sessionToken = token;
  },
};

const actions = {
  async getUserByToken({commit}, token) {
    const user = await api.user.getUserByToken(token);
    commit("setUser", user);
    return user;
  },
  async login({commit}, user) {
    const loggedUser = await api.user.login(user);
    commit("setUser", loggedUser);
    commit("setToken", loggedUser.id);
  },
  logout({commit}) {
    api.user.logout();
    commit("setUser", null);
    commit("setToken", null);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
import api from "@/api";

const state = {
  tasks: [],
};

const mutations = {
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  setTask(state, task) {
    state.tasks = [...state.tasks, task];
  },
  updateTask(state, task) {
    const foundTaskIdx = state.tasks.findIndex(innerTask => innerTask.id === task.id);
    if (foundTaskIdx >= 0) {
      state.tasks = [...state.tasks.slice(0, foundTaskIdx), task, ...state.tasks.slice(foundTaskIdx + 1)];
    }
  },
  removeTask(state, taskId) {
    state.tasks = state.tasks.filter(task => task.id !== taskId);
  },
};

const actions = {
  async getTasks({commit, rootState}) {
    const tasks = await api.tasks.getAllByUserId(rootState.user.user.id);
    commit("setTasks", tasks);
  },
  async createTask({commit, rootState}, task) {
    const newTask = await api.tasks.create(task, rootState.user.user.id);
    commit("setTask", newTask);
  },
  async updateTask({commit}, task) {
    await api.tasks.update(task);
    commit("updateTask", task);
  },

  async removeTask({commit, rootState}, taskId) {
    await api.tasks.remove(taskId, rootState.user.user.id);
    commit("removeTask", taskId);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
<template>
  <loader v-if="loading" />
  <div v-else class="relative pb-4 h-full overflow-auto">
    <div class="flex p-4 items-center">
      <h1 class="font-semibold text-3xl mr-4">Ваши задачи</h1>
      <btn class="w-8 h-8 text-2xl rounded-full" rounded @click="createTaskFormVisible=true">+</btn>
    </div>
    <div class="p-4">
      <h2 v-show="taskInProgress.length" class="font-semibold text-2xl">В процессе</h2>
      <task-list :tasks="taskInProgress"
                 @remove-task="removeTaskHandler"
                 @toggle-task-complete="toggleTaskCompleteHandler"/>
      <h2 v-show="taskFinished.length" class="font-semibold text-2xl mb-4 mt-8">Завершенные</h2>
      <task-list :tasks="taskFinished"
                 @remove-task="removeTaskHandler"
                 @toggle-task-complete="toggleTaskCompleteHandler"/>
    </div>
    <task-create-modal v-show="createTaskFormVisible" @add-task="addTask" @close="createTaskFormVisible = false"></task-create-modal>
  </div>
</template>
<script>
import {tasks} from "@/store/store.namespaces";
import {mapActions, mapState} from "vuex";
import TaskCreateModal from "@/components/tasks/TaskCreateModal";
import Loader from "@/components/ui/Loader";
import Btn from "@/components/ui/Btn";
import TaskList from "@/components/tasks/TaskList";

export default {
  name: "Tasks",
  components: {
    TaskCreateModal,
    Loader,
    Btn,
    TaskList,
  },
  data() {
    return {
      loading: true,
      createTaskFormVisible: false,
    };
  },
  computed: {
    ...mapState(tasks, ["tasks"]),
    taskInProgress() {
      return this.tasks.filter(task => !task.complete);
    },
    taskFinished() {
      return this.tasks.filter(task => task.complete);
    },
  },
  async created() {
    try {
      await this.getTasks();
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(tasks, ["createTask", "getTasks", "removeTask", "updateTask"]),
    async addTask(task) {
      await this.createTask(task);
    },
    async removeTaskHandler(taskId) {
      await this.removeTask(taskId);
    },
    async toggleTaskCompleteHandler(task) {
      const candidate = {...task};
      candidate.complete = !candidate.complete;
      await this.updateTask(candidate);
    },
  },
};
</script>

<style>
</style>
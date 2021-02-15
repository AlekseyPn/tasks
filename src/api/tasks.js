import {nanoid} from "nanoid";

export default class Tasks {
  constructor(api) {
    this.api = api;
  }

  async getAllByUserId(userId) {
    const userTasksSnap = await this.api.ref(`testDb/users/${userId}/tasks`).get();

    if (userTasksSnap) {
      const ids = [];
      userTasksSnap.forEach(child => {
        ids.push(child.key);

      });
      const tasks = await Promise.all(ids.map(async(id) => {
        const snap = await this.api.ref(`testDb/tasks/${id}`).get();
        return snap.toJSON();
      }));
      return tasks;
    } else {
      throw "failed";
    }
  }
  async create(task, userId) {
    const newTask = {
      id: nanoid(8),
      ...task,
    };
    const userRef = await this.api.ref(`testDb/users/${userId}`);
    await userRef.child("tasks").child(newTask.id).set(true);

    const ref = await this.api.ref("testDb");
    await ref.child("tasks").child(newTask.id).set(newTask);

    return newTask;
  }

  async update(task) {
    const taskRef = await this.api.ref(`testDb/tasks/${task.id}`);
    await taskRef.update(task);
  }

  async remove(id, userId) {
    const userTasksRef = await this.api.ref(`testDb/users/${userId}/tasks/${id}`);
    const tasksRef = await this.api.ref(`testDb/tasks/${id}`);
    await userTasksRef.remove();
    await tasksRef.remove();
  }
}
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
}
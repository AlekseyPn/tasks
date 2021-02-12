import {SESSION_TOKEN} from "@/const/user-consts";

export default class Users {
  constructor(api) {
    this.api = api;
  }

  async login(user) {
    const snapshot = await this.api.ref("testDb/users").once("value");
    const users = Object.values(snapshot.toJSON());
    let loggedInUser = users.find((candidate) => {
        if (candidate.login === user.login && candidate.password === user.password) {
          localStorage.setItem(SESSION_TOKEN, candidate.id);
          return candidate;
        }
      });
      if (loggedInUser) {
        return loggedInUser;
      } else {
        throw "failed";
      }
  }

  async getById(id) {
    return id;
  }
}
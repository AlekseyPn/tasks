import {SESSION_TOKEN} from "@/const/user-consts";

export default class User {
  constructor(api) {
    this.api = api;
  }

  async login(user) {
    const snapshot = await this.api.ref("testDb/users").get();
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

  async getUserByToken(token) {
    const snapshot = await this.api.ref(`testDb/users/${token}`).get();
    return snapshot.toJSON();
  }

  logout() {
    localStorage.removeItem(SESSION_TOKEN);
  }
}
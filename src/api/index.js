import Users from "./users";
import Tasks from "./tasks";
import database from "@/config/firebase";

export default {
  users: new Users(database),
  tasks: new Tasks(database),
};
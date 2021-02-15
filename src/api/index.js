import Users from "./user";
import Tasks from "./tasks";
import database from "@/config/firebase";

export default {
  user: new Users(database),
  tasks: new Tasks(database),
};
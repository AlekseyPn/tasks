import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URL,
  storageBucket: process.env.VUE_APP_STORAGE,
};

firebase.initializeApp(config);

export default firebase.database();
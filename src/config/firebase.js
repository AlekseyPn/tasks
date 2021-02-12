import firebase from "firebase/app";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBafg4iweWM9Ss0G7vEXiIHQmTemVOkzDw",
  authDomain: "itquick-test.firebaseapp.com",
  databaseURL: "https://itquick-test-default-rtdb.firebaseio.com",
  storageBucket: "itquick-test.appspot.com",
};

firebase.initializeApp(config);

export default firebase.database();
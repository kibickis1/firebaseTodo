import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-rJwGEIi78P2z3zTFSv8EemMJtjKtcSk",
  authDomain: "todo2023-98c46.firebaseapp.com",
  projectId: "todo2023-98c46",
  storageBucket: "todo2023-98c46.appspot.com",
  messagingSenderId: "888631006418",
  appId: "1:888631006418:web:063cd48ce41f04c2a5890b",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };

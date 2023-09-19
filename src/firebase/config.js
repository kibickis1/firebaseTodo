import firebase from "firebase/app";
import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyD-rJwGEIi78P2z3zTFSv8EemMJtjKtcSk",
//   authDomain: "todo2023-98c46.firebaseapp.com",
//   projectId: "todo2023-98c46",
//   storageBucket: "todo2023-98c46.appspot.com",
//   messagingSenderId: "888631006418",
//   appId: "1:888631006418:web:063cd48ce41f04c2a5890b",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBxYyx82db2ONmA5WModwJgjaUoChiJSP8",
  authDomain: "todo2023-bcea2.firebaseapp.com",
  projectId: "todo2023-bcea2",
  storageBucket: "todo2023-bcea2.appspot.com",
  messagingSenderId: "191386737141",
  appId: "1:191386737141:web:97db63bae5658085e828bc",
};

// init firebase
firebase.initializeApp(firebaseConfig);

//init services
const projectFirestore = firebase.firestore();

export { projectFirestore };

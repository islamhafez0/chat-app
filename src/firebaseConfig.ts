import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDuiMR3LsPCbHs_kMrNSAyiLmekZCfzmNU",
  authDomain: "chat-app-557fc.firebaseapp.com",
  projectId: "chat-app-557fc",
  storageBucket: "chat-app-557fc.appspot.com",
  messagingSenderId: "887745520611",
  appId: "1:887745520611:web:ab54f184ad3c61620cb6d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const firestore = getFirestore(app);

export { auth, firestore };
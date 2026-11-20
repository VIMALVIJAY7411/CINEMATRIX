// www/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Replace with your Firebase Console config values
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const moviesCol = collection(db, "cinematrix_movies");

window.CinematrixCloud = {
  listenMovies(callback) {
    const q = query(moviesCol, orderBy("createdAt", "desc"));
    return onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(list);
    });
  },
  async saveMovie(movieObj) {
    const ref = doc(db, "cinematrix_movies", movieObj.id);
    await setDoc(ref, { ...movieObj, createdAt: movieObj.createdAt || Date.now() }, { merge: true });
  },
  async removeMovie(id) {
    await deleteDoc(doc(db, "cinematrix_movies", id));
  }
};

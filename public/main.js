// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";


const firebaseConfig = {
  //Please page your config
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


const usernameSpan = document.getElementById('username');


onAuthStateChanged(auth, async (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const userData = docSnap.data();
      usernameSpan.textContent = userData.name || "User";
    } else {
      usernameSpan.textContent = "User";
    }
  } else {
   
    window.location.href = "login.html";
  }
});


import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
 // Your config
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

document.getElementById('showSignup').addEventListener('click', () => {
  document.getElementById('login-container').style.display = 'none';
  document.getElementById('signup-container').style.display = 'block';
});
document.getElementById('showLogin').addEventListener('click', () => {
  document.getElementById('signup-container').style.display = 'none';
  document.getElementById('login-container').style.display = 'block';
});


function showMessage(message, elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  } else {
    alert(message);
  }
}


document.getElementById('signup_but').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const name = document.getElementById('rName').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), { name, email });

    showMessage('Account Created Successfully', 'signUpMessage');
    window.location.href = 'login.html';
  } catch (error) {
    const code = error.code;
    if (code === 'auth/email-already-in-use') {
      showMessage("Email already in use", 'signUpMessage');
    } else {
      showMessage("Error: " + error.message, 'signUpMessage');
    }
  }
});


document.getElementById('login_but').addEventListener('click', async (event) => {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    showMessage('Login successful!', 'loginMessage');
    window.location.href = 'main.html';
  } catch (error) {
    showMessage("Login failed: " + error.message, 'loginMessage');
  }
});

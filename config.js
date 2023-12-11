// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFqqXQTcWYPpOATD9HTNdjw9VBlWxSyKU",
  authDomain: "hiar-74d1e.firebaseapp.com",
  databaseURL:
    "https://hiar-74d1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hiar-74d1e",
  storageBucket: "hiar-74d1e.appspot.com",
  messagingSenderId: "404361333109",
  appId: "1:404361333109:web:4857ac941333f45c126b3c",
  measurementId: "G-ZFQF3RD0XZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(typeof initializeApp);
const analytics = getAnalytics(app);

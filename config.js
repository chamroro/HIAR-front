// config.js
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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // 이미 초기화된 Firebase 앱이 있으면 재사용
}

const db = firebase.firestore();
const storageRef = firebase.storage().ref();

export { db, storageRef };

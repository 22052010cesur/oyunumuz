// Firebase Console > Project settings > Your apps məlumatlarını buraya yaz.
export const firebaseConfig = {
  apiKey: "AIzaSyDVx7m5qfvXjBCrZQZtKLF10vU8vrxYPL4",
  authDomain: "menim-serverim.firebaseapp.com",
  databaseURL: "https://menim-serverim-default-rtdb.firebaseio.com",
  projectId: "menim-serverim",
  storageBucket: "menim-serverim.firebasestorage.app",
  messagingSenderId: "595534823096",
  appId: "1:595534823096:web:075b1e8e4f305a837ffe4"
};

export const isFirebaseConfigured = !firebaseConfig.apiKey.startsWith("PASTE_") && !firebaseConfig.databaseURL.includes("PASTE_");

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHcCrzS3TfDJPe-Q7eIfkgXqKaLlb76YY",
  authDomain: "artquackkkk.firebaseapp.com",
  projectId: "artquackkkk",
  storageBucket: "artquackkkk.appspot.com",
  messagingSenderId: "541431749630",
  appId: "1:541431749630:web:a517b7b1d56c5094cd3eaf",
  measurementId: "G-FDHEBNF9MF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
export { app, storage };

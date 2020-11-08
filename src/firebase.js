import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCEAAPPbWIBkUor55JW_mKjSLIx8cYzpTw",
  authDomain: "japan-queen2.firebaseapp.com",
  databaseURL: "https://japan-queen2.firebaseio.com",
  projectId: "japan-queen2",
  storageBucket: "japan-queen2.appspot.com",
  messagingSenderId: "33480911073",
  appId: "1:33480911073:web:f4350b5580b413c0586fa0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
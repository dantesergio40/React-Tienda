//import * as firebase from 'firebase/firebase-app';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCgSKMLbXLQRZ1kv7aB1ZXeprBuTKbriMo",
    authDomain: "tiendaonline-62d51.firebaseapp.com",
    databaseURL: "https://tiendaonline-62d51.firebaseio.com",
    projectId: "tiendaonline-62d51",
    storageBucket: "tiendaonline-62d51.appspot.com",
    messagingSenderId: "494828793919",
    appId: "1:494828793919:web:75b5b265011d1deb4d888a",
    measurementId: "G-C77JV26EN5"
};

// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);

//const auth = fb.auth();
const db = fb.firestore();

export {db, fb};

//export {firebase};
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyChnTdGFpuG3kGnj-NEIma2EfdEEcxZQE8",
    authDomain: "voice-chat-fe223.firebaseapp.com",
    databaseURL: "https://voice-chat-fe223.firebaseio.com",
    projectId: "voice-chat-fe223",
    storageBucket: "voice-chat-fe223.appspot.com",
    messagingSenderId: "406336306112",
    appId: "1:406336306112:web:86def4dfebffc35eb52625",
    measurementId: "G-DDCQKSBKSL"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

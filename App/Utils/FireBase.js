import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "xxxxxxxxxxx",
    authDomain: "mad-dt.firebaseapp.com",
    databaseURL: "https://mad-dt.firebaseio.com",
    projectId: "mad-dt",
    storageBucket: "mad-dt.appspot.com",
    messagingSenderId: "448162251403",
    appId: "1:448162251403:web:ccab831ee6e4c917660a8e",
    measurementId: "G-WX7QCVJ9G9"
};



export const firebaseApp = firebase.initializeApp(firebaseConfig);

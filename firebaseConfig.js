import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"

import { showError, hideError } from './login.js';
const firebaseConfig = {
    apiKey: "AIzaSyBEGRMIfeiiDpgSY8jR2NFztFculPGgoD4",
    authDomain: "spotify-abf2e.firebaseapp.com",
    projectId: "spotify-abf2e",
    storageBucket: "spotify-abf2e.appspot.com",
    messagingSenderId: "308275337610",
    appId: "1:308275337610:web:34d392589d74d30679d073",
    measurementId: "G-ZFDXV1MQD6"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();


export const dangNhap = (auth, email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
            alert("Dang nhaap thanh cong")
            hideError();
            location.href = "index.html";
            localStorage.setItem("id", email)
        })
        .catch((err) => {
            console.log(err.code)
            showError(err.code)
        })
}


export const dangKy = (auth, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
            alert("Dang ky thanh cong")
            hideError();
            location.href = "index.html";
            localStorage.setItem("id", email)
        })
        .catch((err) => {
            console.log(err.code)
            showError(err.code)
        })
}


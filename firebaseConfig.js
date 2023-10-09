import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,

} from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"

// import { showError, hideError } from './login.js';
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


export const dangNhap = async(auth, email, password) => {
    let info;
    let isChecked;
    try {
        const user = await signInWithEmailAndPassword(auth, email, password)
        info = user;
        isChecked = true;
      }
    catch(err) {
            console.log(err.code)
            info = err.code;
        isChecked = false;

        }
    return {
        isChecked,
        info};
}


export const dangKy = async(auth, email, password) => {
    let info;
    let isChecked;
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password)
        info = user;
        isChecked = true;
    }  
    catch(err){
            console.log(err.code)
            info = err.code;
        isChecked = false;
        }
        return {
            isChecked,
        info
        };
}


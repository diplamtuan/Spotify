import { auth, dangNhap, dangKy } from './firebaseConfig.js'

const btnLogin = document.querySelector(".btnLogin")
const btnSignUp = document.querySelector(".btnSignUp")
btnLogin.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#form2Example17").value;
    const pass = document.querySelector("#form2Example27").value;
    dangNhap(auth, email, pass);
})

btnSignUp.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.querySelector("#form2Example17").value;
    const pass = document.querySelector("#form2Example27").value;
    dangKy(auth, email, pass);
})


export const showError = (error) => {
    const errorMessage = document.querySelectorAll(".errorMessage");
    const emailMessage = errorMessage[0]
    const passMessage = errorMessage[1]
    const email = document.querySelector("#form2Example17");
    const pass = document.querySelector("#form2Example27");
    // Email khong hop le (auth/invalid-email)
    if (error == 'auth/invalid-email') {
        emailMessage.innerText = 'Email chưa điền hoặc không chính xác'
        emailMessage.style.color = 'red'
        // email.style.border = '1px solid red'
        email.style.backgroundColor = '#d69191'
    } else if (error == 'auth/missing-password') {
        passMessage.innerText = 'Chưa điền mật khẩu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == 'auth/wrong-password') {
        passMessage.innerText = 'Sai mật khẩu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == 'auth/weak-password') {
        passMessage.innerText = 'Mật khẩu yếu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == `auth/email-already-in-use`) {
        emailMessage.innerText = 'Email đã đăng ký'
        emailMessage.style.color = 'red'
        email.style.backgroundColor = '#d69191'
    }
}

const showLogged = (data) => {
    document.querySelector(".header-control").innerHTML = `
    <div class="header-control-logged">
                    <i class="fa-solid fa-user"></i>
                    <span class="header-control-name">${data}</span>
                    <ul>
                        <li>Thông tin cá nhân</li>
                        <li class="btnLogout">Đăng xuất</li>
                    </ul>
                </div>`
}

const showFormLogin = () => {
    document.querySelector(".header-control").innerHTML = `
    <a href="login.html" class="header-control-signup">Sign up</a>
    <a href="login.html" class="header-control-login">Login</a>
    `
}



export const hideError = () => {
    const errorMessage = document.querySelectorAll(".errorMessage");
    const emailMessage = errorMessage[0]
    const passMessage = errorMessage[1]
    const email = document.querySelector("#form2Example17");
    const pass = document.querySelector("#form2Example27");
    emailMessage.innerText = ''
    passMessage.innerText = ''
    email.style.border = 'border: 1px solid #fff';
    pass.style.border = 'border: 1px solid #fff';
    email.style.backgroundColor = '#fff';
    pass.style.backgroundColor = '#fff';
}
if (localStorage.getItem('id')) {
    showLogged(localStorage.getItem('id'));
} else {
    showFormLogin();
}
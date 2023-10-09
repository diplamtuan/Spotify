import { auth, dangNhap, dangKy } from './firebaseConfig.js'
import { logout } from "./logout.js";
import { loadApp } from './index.js';


export const loadLoginForm= ()=>{
    const content= document.querySelector(".content-body");
    content.innerHTML = ` <section class="vh-100" style="background-color: #9A616D;">
    <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-xl-10">
                <div class="card" style="border-radius: 1rem;">
                    <div class="row g-0">
                        <div class="col-md-6 col-lg-5 d-none d-md-block">
                            <img src="https://cdn.tgdd.vn/Files/2018/03/16/1074940/ung-dung-spotify-co-gi-ma-hot-den-vay-8.jpg"
                                alt="login form" class="img-fluid" style="border-radius: 1rem 0 0 1rem;" />
                        </div>
                        <div class="col-md-6 col-lg-7 d-flex align-items-center">
                            <div class="card-body p-4 p-lg-5 text-black">

                                <form>

                                    <div class="d-flex align-items-center mb-3 pb-1">
                                        <i class="fa-brands fa-spotify fa-2x me-3" style="color: #1ad861;"></i>
                                        <span class="h1 fw-bold mb-0">Logo</span>
                                    </div>

                                    <h5 class="fw-normal mb-3 pb-3" style="letter-spacing: 1px;">Sign into your
                                        account</h5>

                                    <div class="form-outline mb-4">
                                        <input type="email" id="form2Example17"
                                            class="form-control form-control-lg" />
                                        <label class="form-label" for="form2Example17">Email address</label>
                                        <p class="errorMessage"></p>
                                    </div>

                                    <div class="form-outline mb-4">
                                        <input type="password" id="form2Example27"
                                            class="form-control form-control-lg" />
                                        <label class="form-label" for="form2Example27">Password</label>
                                        <p class="errorMessage"></p>

                                    </div>

                                    <div class="d-flex justify-content-around">
                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-dark btn-lg btn-block btnLogin"
                                                type="button">Login</button>
                                        </div>
                                        <div class="pt-1 mb-4">
                                            <button class="btn btn-dark btn-lg btn-block btnSignUp"
                                                type="button">Sign up</button>
                                        </div>
                                    </div>
                                    <a class="small text-muted" href="#!">Forgot password?</a><br>
                                    <a href="#!" class="small text-muted">Terms of use.</a>
                                    <a href="#!" class="small text-muted">Privacy policy</a>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>`;
const btnLogin = document.querySelector(".btnLogin")
const btnSignUp = document.querySelector(".btnSignUp")
btnLogin.addEventListener("click", async(e) => {
    e.preventDefault();
    const email = document.querySelector("#form2Example17").value;
    const pass = document.querySelector("#form2Example27").value;
    const isSuccess = await dangNhap(auth, email, pass);
    if(isSuccess.isChecked){
        localStorage.setItem('name',email)
        // location.href='index.html'
        loadApp();
        checkLogin();
    }else {
        showError(isSuccess.info)
    }
})

btnSignUp.addEventListener("click", async(e) => {
    e.preventDefault();
    const email = document.querySelector("#form2Example17").value;
    const pass = document.querySelector("#form2Example27").value;
    const isSuccess = await dangKy(auth, email, pass);
    if(isSuccess.isChecked){
        localStorage.setItem('name',email)
        // location.href='index.html'
        loadApp();
        checkLogin();
    }else {
        showError(isSuccess.info)
    }
})


 const showError = (error) => {
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
        passMessage.innerText = ''
        pass.style.backgroundColor='#fff'
    } else if (error == 'auth/missing-password') {
        emailMessage.innerText=''
        email.style.backgroundColor='#fff'
        passMessage.innerText = 'Chưa điền mật khẩu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == 'auth/wrong-password') {
        emailMessage.innerText=''
        email.style.backgroundColor='#fff'
        passMessage.innerText = 'Sai mật khẩu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == 'auth/weak-password') {
        emailMessage.innerText=''
        email.style.backgroundColor='#fff'
        passMessage.innerText = 'Mật khẩu yếu'
        passMessage.style.color = 'red'
        pass.style.backgroundColor = '#d69191'
    } else if (error == `auth/email-already-in-use`) {
        emailMessage.innerText = 'Email đã đăng ký'
        emailMessage.style.color = 'red'
        email.style.backgroundColor = '#d69191'
        passMessage.innerText =''
        pass.style.backgroundColor='#fff'
    }
}

}


export const checkLogin = () => {
    if (localStorage.getItem('name')) {
        showLogged(localStorage.getItem('name'));
    } else {
        showFormLogin();
    }
}
export const showLogged = (data) => {
    document.querySelector(".header-control").innerHTML = `
    <div class="header-control-logged">
                    <i class="fa-solid fa-user"></i>
                    <span class="header-control-name">${data}</span>
                    <ul>
                        <li>Thông tin cá nhân</li>
                        <li class="btnLogout">Đăng xuất</li>
                    </ul>
                </div>`
    const btnLogout = document.querySelector('.btnLogout');
    btnLogout.addEventListener('click',()=>{
        logout();
    })
}

export const showFormLogin = () => {
    document.querySelector(".header-control").innerHTML = `
    <a href="#" class="header-control-signup">Sign up</a>
    <a href="#" class="header-control-login">Login</a>
    `
    const btnSignUp=document.querySelector(".header-control-signup");
    btnSignUp.addEventListener("click",()=>{
        loadLoginForm();
    })
}
import { checkLogin } from "./login.js"

export const logout = () => {
    if (localStorage.getItem('name')) {
        localStorage.removeItem('name')
        // location.href = "index.html"
        checkLogin();
    }
}
import { showPanel } from "./messages.js";

const authBtn = document.getElementById("authBtn");
const authBtnMobile = document.getElementById("authBtnMobile");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function updateAuthButton() {
  if (currentUser) {
    authBtn.textContent = "Выйти";
    authBtnMobile.textContent = "Выйти";
  } else {
    authBtn.textContent = "Войти";
    authBtnMobile.textContent = "Войти";
  }
}

updateAuthButton();

authBtn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    localStorage.removeItem("currentUser");
    showPanel("Вы вышли из системы");
  } 

});


authBtnMobile.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    localStorage.removeItem("currentUser");
    showPanel("Вы вышли из системы");
  } 

});

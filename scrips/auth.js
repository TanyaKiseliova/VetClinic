
const authBtn = document.getElementById("authBtn");
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function updateAuthButton() {
  if (currentUser) {
    authBtn.textContent = "Выйти";
  } else {
    authBtn.textContent = "Войти";
  }
}

updateAuthButton();

authBtn.addEventListener("click", () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (user) {
    localStorage.removeItem("currentUser");
    alert("Вы вышли из системы");
  } 

});

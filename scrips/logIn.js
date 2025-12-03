import { supabase } from "./dbInfo.js";

document.getElementById("logInBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", email)
    .single();

  if (error) {
    alert("Ошибка, возможно, таких данных нет");
    console.log("Ошибка запроса: " + error.message);
    return;
  }

  if (!user) {
    alert("Пользователь не найден");
    return;
  }

  if (user.password !== password) {
    alert("Неверный пароль");
    return;
  }

  if (user.role === "admin") {
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        username: user.username,
        role: user.role,
      })
    );
    alert("Добро пожаловать, администратор!");
    window.location.href = "../doctorsPage.html";
  } else {
    alert("Нет доступа.");
  }
});

function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password-input');
    const eyeIcon = document.querySelector('.password-control i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}


document.querySelector('.password-control').addEventListener('click', togglePasswordVisibility);
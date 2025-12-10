const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');

function toggleTheme() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
 closeMobileMenu();
   updateThemeIcons(isDark);
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  let isDark = false;
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    document.documentElement.classList.add("dark");
    isDark = true;
  } else {
    document.documentElement.classList.remove("dark");
    isDark = false;
  }

  
  updateThemeIcons(isDark);
}

function updateThemeIcons(isDark) {
  const themeToggles = document.querySelectorAll(".theme-toggle");
  
  themeToggles.forEach(toggle => {
    const img = toggle.querySelector("img");
    if (img) {
      if (isDark) {
        img.src = "img/icons/moonIcon.png";
      } else {
        img.src = "img/icons/sunIcon.png";
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  loadTheme();
  const themeToggle = document.querySelectorAll(".theme-toggle");
  themeToggle.forEach((toggle) => {
    toggle.addEventListener("click", toggleTheme);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) loadTheme();
    });
});

function closeMobileMenu() {
  burger.classList.remove('active-burger');
  mobileMenu.classList.add('hidden');
  mobileMenu.classList.remove('active-navList');
}


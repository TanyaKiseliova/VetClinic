function toggleTheme() {
    const html = document.documentElement
    html.classList.toggle('dark')
    const isDark = html.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    updateThemeIcon(isDark)
}

function updateThemeIcon(isDark) {
    const themeIcons = document.querySelectorAll('.theme-icon')
    themeIcons.forEach(icon => {
        icon.classList.toggle('hidden', !isDark)
        icon.classList.toggle('block', isDark)
    })
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark')
        updateThemeIcon(true)
    } else {
        document.documentElement.classList.remove('dark')
        updateThemeIcon(false)
    }
}

function initBurgerMenu() {
    const burgerButton = document.getElementById('burger')
    if (burgerButton) {
        burgerButton.addEventListener('click', function() {
            const mobileMenu = document.querySelector('.md\\:flex')
            if (mobileMenu) {
                mobileMenu.classList.toggle('hidden')
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadTheme()
    const themeToggle = document.getElementById('theme-toggle')
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme)
    }
    initBurgerMenu()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) loadTheme()
    })
})
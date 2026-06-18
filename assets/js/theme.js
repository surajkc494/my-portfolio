/* Theme toggle and localStorage persistence. */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeIcon) {
      themeIcon.className = theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    }
  }

  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }
});

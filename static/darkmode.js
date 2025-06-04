document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.createElement("button");
  toggle.id = "dark-mode-toggle";
  document.body.insertBefore(toggle, document.body.firstChild);

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedPreference = localStorage.getItem("darkMode");

  const html = document.documentElement;

  const setTheme = (isDark) => {
    html.classList.toggle("dark", isDark);
    toggle.innerHTML = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  };
  
  // Use stored preference, or fall back to system
  const useDark = storedPreference !== null ? storedPreference === "true" : prefersDark;
  setTheme(useDark);

  toggle.addEventListener("click", () => {
    const isNowDark = !html.classList.contains("dark");
    setTheme(isNowDark);
  });
});

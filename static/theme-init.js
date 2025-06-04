// Used only to apply dark mode class early
(function () {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const storedPreference = localStorage.getItem("darkMode");
  
    if (storedPreference === "true" || (storedPreference === null && prefersDark)) {
      document.documentElement.classList.add("dark");
    }
  })();
  
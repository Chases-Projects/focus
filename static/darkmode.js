// Run this script after the page has fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create the toggle button element
  const toggle = document.createElement("button");
  toggle.id = "dark-mode-toggle"; // Assign an ID for styling and access
  document.body.insertBefore(toggle, document.body.firstChild); // Add it to the top of the body

  // Check if the user's system prefers dark mode
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Check if there's a saved dark mode preference in localStorage
  const storedPreference = localStorage.getItem("darkMode");

  // Reference the root <html> element (not <body>)
  const html = document.documentElement;

  // Function to set the theme and update the toggle icon
  const setTheme = (isDark) => {
    html.classList.toggle("dark", isDark); // Add or remove the .dark class
    toggle.innerHTML = isDark ? "☀️" : "🌙"; // Change the button icon accordingly
    localStorage.setItem("darkMode", isDark); // Save the preference
  };

  // Decide whether to enable dark mode:
  // Use stored preference if it exists, otherwise use system preference
  const useDark = storedPreference !== null
    ? storedPreference === "true"
    : prefersDark;

  // Apply the selected theme immediately
  setTheme(useDark);

  // Listen for user clicks to toggle dark mode
  toggle.addEventListener("click", () => {
    const isNowDark = !html.classList.contains("dark"); // Invert current state
    setTheme(isNowDark); // Apply new state
  });
});

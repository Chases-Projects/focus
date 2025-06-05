// Wait for the DOM to finish loading
document.addEventListener("DOMContentLoaded", function () {
  // Select the toggle button by its ID
  const toggleBtn = document.getElementById("toggle-completed");
  if (!toggleBtn) return; // Exit if the button doesn't exist

  // When the button is clicked, toggle the visibility of completed tasks
  toggleBtn.addEventListener("click", function () {
    // Select all completed items
    const completedItems = document.querySelectorAll(".completed-item");

    // Toggle the 'hidden' class on each completed item
    completedItems.forEach(task => task.classList.toggle("hidden"));

    // Update the button text to match the current state
    const showing = toggleBtn.textContent.includes("Show");
    toggleBtn.textContent = showing ? "Hide Completed" : "Show Completed";
  });
});

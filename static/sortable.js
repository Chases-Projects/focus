// Wait for the document to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Loop through each task category section
    ['top3', 'todo', 'distractions'].forEach(section => {
      // Select the corresponding <ul> element by ID
      const list = document.querySelector(`#${section}-list`);
      if (!list) return; // Skip if the list doesn't exist
  
      // Create a Sortable instance for drag-and-drop functionality
      new Sortable(list, {
        animation: 150,           // Smooth animation on drag
        handle: '.drag-handle',   // Only allow dragging by handle element
        onEnd: function (evt) {
          // Get the reordered list of task IDs
          const ids = Array.from(list.children).map(li => li.dataset.id);
  
          // Send the new order to the Flask back-end
          fetch("/reorder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: ids })
          });
        }
      });
    });
  });
  
function toggleCompleted(button) {
    document.querySelectorAll('.completed-item').forEach(task => task.classList.toggle('hidden'));
    button.textContent = button.textContent.includes('Show') ? 'Hide Completed' : 'Show Completed';
  }
  
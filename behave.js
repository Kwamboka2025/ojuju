// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
  // Handle dropdown toggling
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach((dropdown) => {
    const dropdownBtn = dropdown.querySelector('.dropdown-btn');
    const dropdownMenu = dropdown.querySelector('.dropdown-menu');

    dropdownBtn.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default anchor behavior
      // Close other dropdowns
      closeAllDropdowns();
      // Toggle the clicked dropdown
      dropdownMenu.style.display =
        dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
  });

  // Close all dropdowns
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu').forEach((menu) => {
      menu.style.display = 'none';
    });
  }

  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
      closeAllDropdowns();
    }
  });

  // Handle user profile button click (example interaction)
  const userProfileBtn = document.getElementById('user-profile-btn');
  userProfileBtn.addEventListener('click', () => {
    alert('User Profile button clicked! Implement specific functionality here.');
  });
});
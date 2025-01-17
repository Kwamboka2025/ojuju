document.addEventListener("DOMContentLoaded", () => {
  // Fetch the currently logged-in user from local storage
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || null; // Fetch user object or null if not logged in
  const usernameDisplay = document.getElementById("username-display");

  // Display the welcome message if user is logged in
  if (currentUser) {
    usernameDisplay.textContent = currentUser.username; // Display the username
  } else {
    usernameDisplay.textContent = "Guest"; // Fallback if no user is logged in
  }

  // Add an event listener to the profile button for logout
  const userProfileButton = document.getElementById("user-profile-btn");
  userProfileButton.addEventListener("click", () => {
    // Prompt the user to confirm logout
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear the logged-in user data from local storage
      localStorage.removeItem("currentUser");

      // Redirect to the login page (index.html)
      window.location.href = "index.html";
    }
  });
});
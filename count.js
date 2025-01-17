// Function to count records and display in cards with icons
function countRecordsAndDisplay() {
  const confirmedDonations = JSON.parse(localStorage.getItem("confirmedDonations")) || [];
  const requestedDonations = JSON.parse(localStorage.getItem("requestedDonations")) || [];
  const pickedUpDonations = JSON.parse(localStorage.getItem("pickedUpDonations")) || [];

  // Get the container to display the cards
  const recordsContainer = document.getElementById("records-container");
  recordsContainer.innerHTML = ""; // Clear any existing content

  // Helper function to create a card
  function createCard(title, count, iconClass) {
    const card = document.createElement("div");
    card.classList.add("record-card");
    card.innerHTML = `
      <div class="record-icon"><i class="${iconClass}"></i></div>
      <div class="record-info">
        <strong>${title}</strong>
        <p>${count} Units</p>
      </div>
    `;
    return card;
  }

  // Add cards for each category
  recordsContainer.appendChild(createCard("Pending Requests", confirmedDonations.length, "fas fa-check-circle"));
  recordsContainer.appendChild(createCard("Approved Requests ", requestedDonations.length, "fas fa-exclamation-circle"));
  recordsContainer.appendChild(createCard("Completed Requests ", pickedUpDonations.length, "fas fa-truck"));
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  countRecordsAndDisplay(); // Call the function to count and display records on page load
});

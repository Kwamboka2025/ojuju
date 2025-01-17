// Function to display requested donations
function displayRequestedDonations() {
  const requestedDonations = JSON.parse(localStorage.getItem("requestedDonations")) || [];
  const requestedDonationsTable = document.querySelector("#requestedDonationsTable tbody");

  requestedDonationsTable.innerHTML = ""; // Clear previous content

  if (requestedDonations.length === 0) {
    requestedDonationsTable.innerHTML = '<tr><td colspan="5">No requested donations yet.</td></tr>';
  } else {
    requestedDonations.forEach((request, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${request.unitNumber}</td>
        <td>${request.bloodGroup}</td>
        <td>${request.componentType}</td>
        <td><button class="pickup-btn" data-id="${index}">Pickup</button></td>
      `;
      requestedDonationsTable.appendChild(row);
    });

    // Add event listeners for the pickup buttons
    const pickupButtons = document.querySelectorAll(".pickup-btn");
    pickupButtons.forEach(button => {
      button.addEventListener("click", handlePickup);
    });
  }
}

// Function to handle pickup action
function handlePickup(event) {
  const donationIndex = event.target.getAttribute("data-id");
  const requestedDonations = JSON.parse(localStorage.getItem("requestedDonations")) || [];
  const pickedUpDonations = JSON.parse(localStorage.getItem("pickedUpDonations")) || [];
  const donation = requestedDonations[donationIndex];

  // Add the current date as the pickup date
  const pickupDate = new Date().toLocaleDateString();
  donation.pickupDate = pickupDate;

  // Add donation to the picked up donations list
  pickedUpDonations.push(donation);
  localStorage.setItem("pickedUpDonations", JSON.stringify(pickedUpDonations));

  // Remove donation from requested donations list
  requestedDonations.splice(donationIndex, 1);
  localStorage.setItem("requestedDonations", JSON.stringify(requestedDonations));

  alert(`Donation ${donation.unitNumber} has been picked up.`);

  // Refresh tables
  displayRequestedDonations();
  displayPickedUpDonations();
}

// Function to display picked up donations
function displayPickedUpDonations() {
  const pickedUpDonations = JSON.parse(localStorage.getItem("pickedUpDonations")) || [];
  const pickedUpDonationsTable = document.querySelector("#pickedUpDonationsTable tbody");

  pickedUpDonationsTable.innerHTML = ""; // Clear previous content

  if (pickedUpDonations.length === 0) {
    pickedUpDonationsTable.innerHTML = '<tr><td colspan="5">No picked-up donations yet.</td></tr>';
  } else {
    pickedUpDonations.forEach((donation, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.unitNumber}</td>
        <td>${donation.bloodGroup}</td>
        <td>${donation.componentType}</td>
        <td>${donation.pickupDate}</td>
      `;
      pickedUpDonationsTable.appendChild(row);
    });
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  createBloodCards();
  displayRequestedDonations(); // Display requested donations on page load
  displayPickedUpDonations(); // Display picked-up donations on page load
});

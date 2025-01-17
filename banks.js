// Function to calculate expiry date based on component type
function calculateExpiryDate(componentType, donationDate) {
  const expiryPeriods = {
    "Red Blood Cells": 42, // 42 days
    "Whole Blood": 42, // 42 days
    "Plasma": 365, // 1 year
    "Platelets": 7, // 7 days
    "Cryoprecipitate": 365, // 1 year
    "Granulocytes": 5, // 5 days
  };

  const shelfLifeDays = expiryPeriods[componentType] || 0;
  const donationDateObj = new Date(donationDate);
  donationDateObj.setDate(donationDateObj.getDate() + shelfLifeDays);

  return donationDateObj.toLocaleDateString(); // Return as MM/DD/YYYY format
}

// Function to display donations filtered by blood group
function showFilteredDonations(bloodGroup) {
  const confirmedDonations = JSON.parse(localStorage.getItem("confirmedDonations")) || [];
  const donationTable = document.querySelector("#donationTable tbody");

  // Filter donations based on blood group
  const filteredDonations = confirmedDonations.filter(
    (donation) => donation.bloodGroup === bloodGroup
  );

  donationTable.innerHTML = ""; // Clear previous table content

  if (filteredDonations.length === 0) {
    donationTable.innerHTML = '<tr><td colspan="7">No donations available for this blood group.</td></tr>';
  } else {
    filteredDonations.forEach((donation, index) => {
      const expiryDate = calculateExpiryDate(donation.componentType, donation.donationDate);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.unitNumber}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup}</td>
        <td>${donation.volumeCollected} mL</td>
        <td>${expiryDate}</td>
        <td><button class="request-btn" data-id="${index}">Make a Request</button></td>
      `;
      donationTable.appendChild(row);
    });

    // Add event listeners for the request buttons
    const requestButtons = document.querySelectorAll(".request-btn");
    requestButtons.forEach(button => {
      button.addEventListener("click", handleRequest);
    });
  }

  // Show the popup
  const popup = document.getElementById("details-popup");
  const title = document.getElementById("blood-group-title");
  title.textContent = bloodGroup;
  popup.classList.add("visible");
}

// Handle request action
function handleRequest(event) {
  const donationIndex = event.target.getAttribute("data-id");
  const confirmedDonations = JSON.parse(localStorage.getItem("confirmedDonations")) || [];
  const donation = confirmedDonations[donationIndex];

  // Remove donation from confirmed donations list
  confirmedDonations.splice(donationIndex, 1);
  localStorage.setItem("confirmedDonations", JSON.stringify(confirmedDonations));

  // Add to Requested Donations list
  const requestedDonations = JSON.parse(localStorage.getItem("requestedDonations")) || [];
  requestedDonations.push(donation);
  localStorage.setItem("requestedDonations", JSON.stringify(requestedDonations));

  alert("Request made for Unit " + donation.unitNumber);

  // Refresh both tables
  displayRequestedDonations();
  showFilteredDonations(donation.bloodGroup); // Re-display donations for the same blood group
}

// Close popup function
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("details-popup").classList.remove("visible");
});

// Function to initialize blood group cards
function createBloodCards() {
  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const confirmedDonations = JSON.parse(localStorage.getItem("confirmedDonations")) || [];
  const bloodCardsContainer = document.getElementById("blood-cards");

  bloodCardsContainer.innerHTML = ""; // Clear existing cards

  bloodGroups.forEach((group) => {
    const groupCount = confirmedDonations.filter((donation) => donation.bloodGroup === group).length;

    const card = document.createElement("div");
    card.classList.add("blood-card");
    card.innerHTML = `
      <div class="blood-icon"><i class="fas fa-tint"></i></div>
      <div class="blood-info">
        <strong>${group}</strong>
        <p>${groupCount} Units</p>
      </div>
    `;
    card.addEventListener("click", () => showFilteredDonations(group));
    bloodCardsContainer.appendChild(card);
  });
}

// Function to display requested donations
function displayRequestedDonations() {
  const requestedDonations = JSON.parse(localStorage.getItem("requestedDonations")) || [];
  const requestedDonationsTable = document.querySelector("#requestedDonationsTable tbody");

  requestedDonationsTable.innerHTML = ""; // Clear previous content

  if (requestedDonations.length === 0) {
    requestedDonationsTable.innerHTML = '<tr><td colspan="4">No requested donations yet.</td></tr>';
  } else {
    requestedDonations.forEach((request, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${request.unitNumber}</td>
        <td>${request.bloodGroup}</td>
        <td>${request.componentType}</td>
      `;
      requestedDonationsTable.appendChild(row);
    });
  }
}

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
  createBloodCards();
  displayRequestedDonations(); // Display requested donations on page load
});
















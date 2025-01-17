document.addEventListener("DOMContentLoaded", () => {
  // IDs for blood availability elements
  const bloodGroupIds = {
    "A+": "A-plus-units",
    "A-": "A-minus-units",
    "B+": "B-plus-units",
    "B-": "B-minus-units",
    "O+": "O-plus-units",
    "O-": "O-minus-units",
    "AB+": "AB-plus-units",
    "AB-": "AB-minus-units",
  };

  // Function to load cleared donations from localStorage
  const loadClearedDonations = () => {
    return JSON.parse(localStorage.getItem("clearedDonations")) || [];
  };

  // Function to calculate blood availability
  const calculateBloodAvailability = () => {
    const clearedDonations = loadClearedDonations();
    const bloodAvailability = {};

    // Initialize blood group counts
    for (const bloodGroup in bloodGroupIds) {
      bloodAvailability[bloodGroup] = 0;
    }

    // Count donations per blood group
    clearedDonations.forEach((donation) => {
      if (donation.bloodType && bloodAvailability.hasOwnProperty(donation.bloodType)) {
        bloodAvailability[donation.bloodType]++;
      }
    });

    return bloodAvailability;
  };

  // Function to render blood availability in the UI
  const renderBloodAvailability = () => {
    const bloodAvailability = calculateBloodAvailability();

    for (const bloodGroup in bloodGroupIds) {
      const elementId = bloodGroupIds[bloodGroup];
      const element = document.getElementById(elementId);

      if (element) {
        element.textContent = bloodAvailability[bloodGroup] || 0; // Set count or default to 0
      }
    }
  };

  // Function to filter and display donations for a specific blood group
  const showFilteredDonations = (bloodGroup) => {
    const clearedDonations = loadClearedDonations();
    const donationTable = document.querySelector("#donationTable tbody");

    // Filter donations based on blood group
    const filteredDonations = clearedDonations.filter(
      (donation) => donation.bloodType === bloodGroup
    );

    donationTable.innerHTML = ""; // Clear previous table content

    if (filteredDonations.length === 0) {
      donationTable.innerHTML =
        '<tr><td colspan="7">No donations available for this blood group.</td></tr>';
    } else {
      filteredDonations.forEach((donation, index) => {
        const expiryDate = calculateExpiryDate(
          donation.componentType,
          donation.donationDate
        );

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donation.unitNumber || "N/A"}</td>
          <td>${donation.donationDate || "N/A"}</td>
          <td>${donation.componentType || "N/A"}</td>
          <td>${donation.bloodType || "N/A"}</td>
          <td>${donation.volumeCollected || "N/A"} mL</td>
          <td>${expiryDate || "N/A"}</td>
        `;
        donationTable.appendChild(row);
      });
    }

    // Show the popup
    const popup = document.getElementById("details-popup");
    const title = document.getElementById("blood-group-title");
    title.textContent = bloodGroup;
    popup.classList.add("visible");
  };

  // Function to close the popup
  const closePopup = () => {
    const popup = document.getElementById("details-popup");
    popup.classList.remove("visible");
  };

  // Add event listener to the close button
  document.getElementById("close-popup").addEventListener("click", closePopup);

  // Add click events to dynamically created blood cards
  const addBloodCardClickEvents = () => {
    const bloodCards = document.querySelectorAll(".blood-card");
    bloodCards.forEach((card) => {
      const bloodGroup = card.querySelector("strong").textContent;
      card.addEventListener("click", () => showFilteredDonations(bloodGroup));
    });
  };

  // Initialize blood cards dynamically
  const createBloodCards = () => {
    const bloodGroups = Object.keys(bloodGroupIds);
    const bloodCardsContainer = document.getElementById("blood-cards");
    bloodCardsContainer.innerHTML = ""; // Clear existing cards

    // Create rows and cards
    bloodGroups.forEach((group) => {
      const card = document.createElement("div");
      card.classList.add("blood-card");
      card.innerHTML = `
        <div class="blood-icon"><i class="fas fa-tint"></i></div>
        <div class="blood-info">
          <strong>${group}</strong>
          <p id="${bloodGroupIds[group]}">0 Units</p>
        </div>
      `;
      bloodCardsContainer.appendChild(card);
    });

    addBloodCardClickEvents(); // Add interactivity to cards
  };

  // Function to calculate expiry date based on component type
  const calculateExpiryDate = (componentType, donationDate) => {
    const expiryPeriods = {
      "Red Blood Cells": 42,
      "Whole Blood": 42,
      Plasma: 365,
      Platelets: 7,
      Cryoprecipitate: 365,
      Granulocytes: 5,
    };

    const shelfLifeDays = expiryPeriods[componentType] || 0;
    const donationDateObj = new Date(donationDate);
    donationDateObj.setDate(donationDateObj.getDate() + shelfLifeDays);

    return donationDateObj.toLocaleDateString(); // Return as MM/DD/YYYY format
  };

  // Initialize the page
  createBloodCards();
  renderBloodAvailability();
});

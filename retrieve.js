let donorIdCounter = 1; // To generate unique donor IDs

// Function to retrieve and display donor data from local storage
function retrieveDonorData() {
  const donorDataContainer = document.getElementById('donorDataContainer');
  donorDataContainer.innerHTML = ''; // Clear the container before displaying new data

  // Retrieve all donor data (instead of one donor)
  const donors = JSON.parse(localStorage.getItem('donors')) || [];

  if (donors.length > 0) {
    const donorTable = document.createElement('table');
    donorTable.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Age</th>
          <th>Donor Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        ${donors.map((donor, index) => `
          <tr>
            <td>${String(donorIdCounter + index).padStart(5, '0')}</td>
            <td>${donor.firstName} ${donor.lastName}</td>
            <td>${donor.phone}</td>
            <td>${donor.age}</td>
            <td>${donor.donorType}</td>
            <td>
              <button onclick="showPopup(${index}, '${donor.firstName} ${donor.lastName}')">View Details</button>
              <button onclick="addDonationToUnprocessed(${index})">Add Donation</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    `;

    donorDataContainer.appendChild(donorTable);
  } else {
    donorDataContainer.innerHTML = '<p>No donor data found.</p>';
  }
}

// Function to add donation to unprocessed donations for a specific donor
function addDonationToUnprocessed(donorIndex) {
  const donors = JSON.parse(localStorage.getItem('donors')) || [];
  const donorData = donors[donorIndex];

  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];

  const donorId = String(donorIdCounter).padStart(5, '0');
  donorIdCounter++;

  unprocessedDonations.push({
    donorId: donorId,
    donorName: `${donorData.firstName} ${donorData.lastName}`,
    donorAge: donorData.age,
    donorType: donorData.donorType,
    donationDateTime: new Date().toLocaleString()
  });

  localStorage.setItem('unprocessedDonations', JSON.stringify(unprocessedDonations));

  alert(`Donation added with Donor ID: ${donorId}`);
  updateUnprocessedDonationsList();
}

// Function to update the unprocessed donations list in the UI
function updateUnprocessedDonationsList() {
  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];
  const unprocessedDonationsContainer = document.getElementById('unprocessedDonationsList');
  unprocessedDonationsContainer.innerHTML = ''; // Clear the existing list

  if (unprocessedDonations.length === 0) {
    unprocessedDonationsContainer.innerHTML = '<p>No unprocessed donations.</p>';
  } else {
    const unprocessedTable = document.createElement('table');
    unprocessedTable.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Donor Type</th>
          <th>Donation Date/Time</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;

    const tableBody = unprocessedTable.querySelector('tbody');
    unprocessedDonations.forEach((donation, index) => {
      const donationRow = document.createElement('tr');
      donationRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.donorName}</td>
        <td>${donation.donorAge}</td>
        <td>${donation.donorType}</td>
        <td>${donation.donationDateTime}</td>
      `;
      tableBody.appendChild(donationRow);
    });

    unprocessedDonationsContainer.appendChild(unprocessedTable);
  }
}

// Function to show the donor data in a popup
function showPopup(donorIndex, donorName) {
  const donors = JSON.parse(localStorage.getItem('donors')) || [];
  const donorData = donors[donorIndex];

  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML = `
    <div class="popup-content">
      <h2>Donor Information: ${donorName}</h2>
      <p><strong>Last Name:</strong> ${donorData.lastName}</p>
      <p><strong>First Name:</strong> ${donorData.firstName}</p>
      <p><strong>Phone:</strong> ${donorData.phone}</p>
      <p><strong>Date of Birth:</strong> ${donorData.dob}</p>
      <p><strong>Age:</strong> ${donorData.age}</p>
      <p><strong>Residence:</strong> ${donorData.residence}</p>
      <p><strong>Donor Type:</strong> ${donorData.donorType}</p>
      <p><strong>Medical Problems:</strong> ${donorData.medicalProblems}</p>
      <p><strong>Pregnancy:</strong> ${donorData.pregnancy}</p>
      <p><strong>Cancer Treatment:</strong> ${donorData.cancerTreatment}</p>
      <p><strong>Allergies:</strong> ${donorData.allergies}</p>
      <p><strong>Chronic Conditions:</strong> ${donorData.chronicConditions}</p>
      <p><strong>Recent Surgeries:</strong> ${donorData.recentSurgeries}</p>
      <p><strong>Blood Disorders:</strong> ${donorData.bloodDisorders}</p>
      <p><strong>Current Medications:</strong> ${donorData.currentMedications}</p>
      <p><strong>Organ Transplant:</strong> ${donorData.organTransplant}</p>
      <p><strong>Pregnant/Breastfeeding:</strong> ${donorData.pregnantBreastfeeding}</p>
      <p><strong>Recent Vaccinations:</strong> ${donorData.recentVaccinations}</p>
      <p><strong>HIV/Hepatitis:</strong> ${donorData.hivHepatitis}</p>
      <p><strong>Sexual Contact:</strong> ${donorData.sexualContact}</p>
      <p><strong>Illicit Drugs:</strong> ${donorData.illicitDrugs}</p>
      <p><strong>Contagious Contact:</strong> ${donorData.contagiousContact}</p>
      <p><strong>Previous Donation:</strong> ${donorData.previousDonation}</p>
      <p><strong>Donation Reactions:</strong> ${donorData.donationReactions}</p>
      <p><strong>Current Health Status:</strong> ${donorData.currentHealthStatus}</p>
      <p><strong>Voluntary Donation:</strong> ${donorData.voluntaryDonation}</p>
      <p><strong>Accuracy Confirmation:</strong> ${donorData.accuracyConfirmation}</p>
      <p><strong>Signature:</strong> ${donorData.signature}</p>
      <button onclick="closePopup()">Close</button>
    </div>
  `;
  document.body.appendChild(popup);
}

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

// Collapsible functionality
function setupCollapsible() {
  const collapsibles = document.querySelectorAll('.collapsible');
  collapsibles.forEach(button => {
    button.addEventListener('click', function() {
      this.classList.toggle('active');
      const content = this.nextElementSibling;
      content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
  });
}

// Initialize the page
window.onload = function() {
  retrieveDonorData();
  updateUnprocessedDonationsList();
  setupCollapsible();
};
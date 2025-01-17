// Function to update the dropdown with unprocessed donations
function updateDonorDropdown() {
  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];
  const donorSelect = document.getElementById('donorSelect');
  donorSelect.innerHTML = ''; // Clear previous options

  if (unprocessedDonations.length === 0) {
    donorSelect.innerHTML = '<option value="">No unprocessed donations available</option>';
    document.getElementById('processButton').disabled = true; // Disable button if no donations
  } else {
    unprocessedDonations.forEach((donation, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${donation.donorName} (Donor Type: ${donation.donorType}, Age: ${donation.donorAge})`;
      donorSelect.appendChild(option);
    });
    document.getElementById('processButton').disabled = false; // Enable button if donations exist
  }
}

// Function to start processing the selected donation
function startProcessing() {
  const donorSelect = document.getElementById('donorSelect');
  const selectedIndex = donorSelect.value;

  if (selectedIndex === '') {
    alert('Please select a donation to process.');
    return;
  }

  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];
  const selectedDonation = unprocessedDonations[selectedIndex];

  // Display processing form and pre-fill donor information
  const processingForm = document.getElementById('processingForm');
  processingForm.style.display = 'block';
  processingForm.dataset.selectedIndex = selectedIndex;

  // Optional: Display donor details (if needed in the form itself)
  alert(
    `Processing donation for:\n\nName: ${selectedDonation.donorName}\nAge: ${selectedDonation.donorAge}\nDonor Type: ${selectedDonation.donorType}`
  );
}

// Function to save processing details with blood component info
function saveProcessingDetails() {
  const selectedIndex = document.getElementById('processingForm').dataset.selectedIndex;
  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  const selectedDonation = unprocessedDonations[selectedIndex];

  // Get additional information
  const donationDate = document.getElementById('donationDate').value;
  const donationType = document.getElementById('donationType').value;

  // Get blood component details
  const componentType = document.getElementById('componentType').value;
  const bloodGroup = document.getElementById('bloodGroup').value;
  const rhFactor = document.getElementById('rhFactor').value;
  const volumeCollected = document.getElementById('volumeCollected').value;

  // Validate inputs
  if (!donationDate) {
    alert('Donation Date is required!');
    return;
  }
  if (!donationType) {
    alert('Please select a valid Donation Type.');
    return;
  }
  if (!componentType) {
    alert('Please select a valid Blood Component Type.');
    return;
  }
  if (!bloodGroup) {
    alert('Please select a valid Blood Group.');
    return;
  }
  if (!volumeCollected || isNaN(volumeCollected) || volumeCollected <= 0) {
    alert('Please enter a valid volume collected (in mL).');
    return;
  }

  // Auto-generate Unit Number in the format yyyyMMdd####
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const unitNumber = `${year}${month}${day}${String(processingList.length + 1).padStart(3, '0')}`;

  // Add details to the processing list
  const processedDonation = {
    ...selectedDonation,
    donationDate,
    donationType,
    componentType,
    bloodGroup,
    rhFactor,
    volumeCollected,
    unitNumber,
  };
  processingList.push(processedDonation);

  // Update local storage
  unprocessedDonations.splice(selectedIndex, 1); // Remove from unprocessed donations
  localStorage.setItem('unprocessedDonations', JSON.stringify(unprocessedDonations));
  localStorage.setItem('processingList', JSON.stringify(processingList));

  // Clear form and update dropdown
  document.getElementById('processingForm').style.display = 'none';
  document.getElementById('donationDate').value = '';
  document.getElementById('donationType').value = '';
  document.getElementById('componentType').value = '';
  document.getElementById('bloodGroup').value = '';
  document.getElementById('rhFactor').value = '';
  document.getElementById('volumeCollected').value = '';
  alert('Donation successfully added to the processing list!');
  updateDonorDropdown();
  displayProcessingList(); // Update processing list display
}

// Function to display the processing list with a "Test Results" button
function displayProcessingList() {
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  const processingTable = document.getElementById('processingTable');
  processingTable.innerHTML = ''; // Clear previous entries

  if (processingList.length === 0) {
    processingTable.innerHTML = '<tr><td colspan="9">No processed donations yet.</td></tr>'; // Adjusted column span
  } else {
    processingList.forEach((donation, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.donorName}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.donationType}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup} (${donation.rhFactor})</td>
        <td>${donation.volumeCollected} mL</td>
        <td>${donation.unitNumber}</td> <!-- Added Unit Number column -->
        <td><button onclick="showTestResults(${index})">Test Results</button></td>
      `;
      processingTable.appendChild(row);
    });
  }
}

// Function to show the test results (for now it will be a placeholder)
function showTestResults(index) {
  alert(`Test results for donation index ${index} will be displayed here.`);
}

// Initialize the page
window.onload = function() {
  updateDonorDropdown();
  displayProcessingList();
  document.getElementById('processButton').addEventListener('click', startProcessing);
  document.getElementById('saveProcessingDetails').addEventListener('click', saveProcessingDetails);
};








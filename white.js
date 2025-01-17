// Function to handle test results and confirm donation
function showTestResults(index) {
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  const donation = processingList[index];

  // Populate modal with donation details
  document.getElementById('testUnitNumber').innerText = donation.unitNumber;
  document.getElementById('testComponentType').innerText = donation.componentType;
  document.getElementById('testBloodGroup').innerText = `${donation.bloodGroup} (${donation.rhFactor})`;
  document.getElementById('testVolume').innerText = `${donation.volumeCollected} mL`;

  // Set initial values for dropdowns in modal
  document.getElementById('hivTest').value = 'Negative';
  document.getElementById('hbsAgTest').value = 'Negative';
  document.getElementById('hcvTest').value = 'Negative';
  document.getElementById('syphilisTest').value = 'Negative';
  document.getElementById('otherTests').value = 'None';

  // Display the modal
  const testModal = document.getElementById('testResultsModal');
  testModal.style.display = 'block';

  // Save the index for later use
  testModal.dataset.donationIndex = index;
}

// Function to confirm donation after collecting test results
function confirmTestResults() {
  const testModal = document.getElementById('testResultsModal');
  const index = testModal.dataset.donationIndex;
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  const confirmedDonations = JSON.parse(localStorage.getItem('confirmedDonations')) || [];
  const donation = processingList[index];

  // Collect test results from modal dropdowns
  const hiv = document.getElementById('hivTest').value;
  const hbsAg = document.getElementById('hbsAgTest').value;
  const hcv = document.getElementById('hcvTest').value;
  const syphilis = document.getElementById('syphilisTest').value;
  const otherTests = document.getElementById('otherTests').value;

  // Validate input
  if (![hiv, hbsAg, hcv, syphilis].every((test) => test === 'Negative')) {
    alert('Donation cannot be confirmed due to positive test results.');
    return;
  }

  // Determine storage temperature based on component type
  const storageInfo = getStorageInfo(donation.componentType);

  // Add to Confirmed Donations
  const confirmedDonation = {
    unitNumber: donation.unitNumber,
    donationDate: donation.donationDate,
    componentType: donation.componentType,
    bloodGroup: donation.bloodGroup,
    rhFactor: donation.rhFactor,
    volumeCollected: donation.volumeCollected,
    storageTemperature: storageInfo.temperature,
    testResults: { hiv, hbsAg, hcv, syphilis, otherTests },
  };
  confirmedDonations.push(confirmedDonation);

  // Update local storage for confirmed donations
  localStorage.setItem('confirmedDonations', JSON.stringify(confirmedDonations));

  // Remove the confirmed donation from processing list
  processingList.splice(index, 1);

  // Update local storage for processing list
  localStorage.setItem('processingList', JSON.stringify(processingList));

  // Close the modal and update displays
  testModal.style.display = 'none';
  alert('Donation successfully confirmed and added to the confirmed donations list!');

  // Refresh the displayed lists
  displayProcessingList();
  displayConfirmedDonations();
}

// Helper: Get storage info for blood components
function getStorageInfo(componentType) {
  const storageDetails = {
    'Red Blood Cells': { temperature: '1-6°C' },
    Plasma: { temperature: '-18°C or lower' },
    Platelets: { temperature: '20-24°C' },
    Cryoprecipitate: { temperature: '-18°C or lower' },
  };
  return storageDetails[componentType] || { temperature: 'Unknown' };
}

// Function to display Confirmed Donations
function displayConfirmedDonations() {
  const confirmedDonations = JSON.parse(localStorage.getItem('confirmedDonations')) || [];
  const confirmedTable = document.getElementById('confirmedTable');
  confirmedTable.innerHTML = ''; // Clear previous entries

  if (confirmedDonations.length === 0) {
    confirmedTable.innerHTML = '<tr><td colspan="8">No confirmed donations yet.</td></tr>';
  } else {
    confirmedDonations.forEach((donation, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.unitNumber}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup} (${donation.rhFactor})</td>
        <td>${donation.volumeCollected} mL</td>
        <td>${donation.storageTemperature}</td>
        <td>
          HIV: ${donation.testResults.hiv}, HBsAg: ${donation.testResults.hbsAg}, 
          HCV: ${donation.testResults.hcv}, TPHA: ${donation.testResults.syphilis}, 
          Other: ${donation.testResults.otherTests}
        </td>
      `;
      confirmedTable.appendChild(row);
    });
  }
}

// Function to display Processing Donations
function displayProcessingList() {
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  const processingTable = document.getElementById('processingTable');
  processingTable.innerHTML = ''; // Clear previous entries

  if (processingList.length === 0) {
    processingTable.innerHTML = '<tr><td colspan="7">No donations being processed.</td></tr>';
  } else {
    processingList.forEach((donation, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.unitNumber}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup} (${donation.rhFactor})</td>
        <td>${donation.volumeCollected} mL</td>
        <td><button onclick="showTestResults(${index})">Confirm Test</button></td>
      `;
      processingTable.appendChild(row);
    });
  }
}

// Use DOMContentLoaded to ensure this logic doesn't conflict with other window.onload handlers
document.addEventListener('DOMContentLoaded', function() {
  displayProcessingList();
  displayConfirmedDonations();
});
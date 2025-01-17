// Function to calculate expiry date based on component type
function calculateExpiryDate(componentType, donationDate) {
  const expiryPeriods = {
    'Red Blood Cells': 42,
    'Whole Blood': 35,
    'Platelets': 7,
    'Plasma': 365,
    'Cryoprecipitate': 365,
    'Granulocytes': 1,
  };

  const shelfLifeDays = expiryPeriods[componentType] || 0;
  const donationDateObj = new Date(donationDate);
  donationDateObj.setDate(donationDateObj.getDate() + shelfLifeDays);

  return donationDateObj.toLocaleDateString(); // Return as MM/DD/YYYY format
}

// Function to display the donation table
function displayDonationTable(filterOptions = {}) {
  const confirmedDonations = JSON.parse(localStorage.getItem('confirmedDonations')) || [];
  const donationTable = document.getElementById('donationTable').getElementsByTagName('tbody')[0];
  donationTable.innerHTML = ''; // Clear previous entries

  let filteredDonations = confirmedDonations;

  // Apply filters if any
  if (filterOptions.bloodGroup) {
    filteredDonations = filteredDonations.filter(donation => donation.bloodGroup === filterOptions.bloodGroup);
  }
  if (filterOptions.componentType) {
    filteredDonations = filteredDonations.filter(donation => donation.componentType === filterOptions.componentType);
  }

  // Sort by expiry date
  filteredDonations.sort((a, b) => {
    const expiryA = new Date(calculateExpiryDate(a.componentType, a.donationDate));
    const expiryB = new Date(calculateExpiryDate(b.componentType, b.donationDate));
    return expiryA - expiryB;
  });

  if (filteredDonations.length === 0) {
    donationTable.innerHTML = '<tr><td colspan="7">No matching donations found.</td></tr>';
  } else {
    filteredDonations.forEach((donation, index) => {
      const expiryDate = calculateExpiryDate(donation.componentType, donation.donationDate);

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${donation.unitNumber}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup} (${donation.rhFactor})</td>
        <td>${donation.volumeCollected} mL</td>
        <td>${expiryDate}</td>
      `;
      donationTable.appendChild(row);
    });
  }
}

// Function to apply filters
function applyFilters() {
  const bloodGroup = document.getElementById('filterBloodGroup').value;
  const componentType = document.getElementById('filterComponentType').value;
  displayDonationTable({ bloodGroup, componentType });
}

// Function to trigger print
function printTable() {
  const printContent = document.getElementById('donationTable').outerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Print Table</title></head><body>');
  printWindow.document.write(printContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();
}

// Event listener to ensure the table is populated after page load
document.addEventListener('DOMContentLoaded', function() {
  displayDonationTable();

  // Attach event listeners to filters and print button
  document.getElementById('filterButton').addEventListener('click', applyFilters);
  document.getElementById('printButton').addEventListener('click', printTable);
});
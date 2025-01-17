// Function to generate the filtered report
function generateFilteredReport() {
  const filterBloodGroup = document.getElementById('filterBloodGroup').value;
  const filterComponent = document.getElementById('filterComponent').value;

  // Get all donations from local storage or default to an empty array
  const confirmedDonations = JSON.parse(localStorage.getItem('confirmedDonations')) || [];

  // Filter donations based on selected criteria
  const filteredDonations = confirmedDonations.filter(donation => {
    const matchesBloodGroup = filterBloodGroup ? donation.bloodGroup === filterBloodGroup : true;
    const matchesComponent = filterComponent ? donation.componentType === filterComponent : true;
    return matchesBloodGroup && matchesComponent;
  });

  // Sort filtered donations by expiry date
  filteredDonations.sort((a, b) => {
    const expiryA = new Date(calculateExpiryDate(a.componentType, a.donationDate));
    const expiryB = new Date(calculateExpiryDate(b.componentType, b.donationDate));
    return expiryA - expiryB;
  });

  // Generate report preview (simple table)
  let reportContent = `
    <h2>Blood Donation Report</h2>
    <table border="1">
      <thead>
        <tr>
          <th>Unit Number</th>
          <th>Donation Date</th>
          <th>Component Type</th>
          <th>Blood Group</th>
          <th>Volume Collected (mL)</th>
          <th>Expiry Date</th>
        </tr>
      </thead>
      <tbody>
  `;

  // Add filtered and sorted donations to the report content
  filteredDonations.forEach(donation => {
    const expiryDate = calculateExpiryDate(donation.componentType, donation.donationDate);
    reportContent += `
      <tr>
        <td>${donation.unitNumber}</td>
        <td>${donation.donationDate}</td>
        <td>${donation.componentType}</td>
        <td>${donation.bloodGroup}</td>
        <td>${donation.volumeCollected}</td>
        <td>${expiryDate}</td>
      </tr>
    `;
  });

  reportContent += '</tbody></table>';

  // Create a new window for printing
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(reportContent);
  printWindow.document.close();
  printWindow.print();
}

// Function to calculate expiry date based on component type
function calculateExpiryDate(componentType, donationDate) {
  const expiryPeriods = {
    'Red Blood Cells': 42, // 42 days
    'Whole Blood': 42, // 42 days
    'Plasma': 365, // 1 year
    'Platelets': 7, // 7 days
    'Cryoprecipitate': 365, // 1 year
    'Granulocytes': 5, // 5 days
  };

  const shelfLifeDays = expiryPeriods[componentType] || 0;
  const donationDateObj = new Date(donationDate);
  donationDateObj.setDate(donationDateObj.getDate() + shelfLifeDays);

  return donationDateObj.toLocaleDateString(); // Return as MM/DD/YYYY format
}

// Event listener to ensure the table is populated after page load
document.addEventListener('DOMContentLoaded', function() {
  displayDonationTable();
});

// Function to display the donation table (populated with all donations)
function displayDonationTable() {
  const confirmedDonations = JSON.parse(localStorage.getItem('confirmedDonations')) || [];
  const donationTable = document.getElementById('donationTable').getElementsByTagName('tbody')[0];
  donationTable.innerHTML = ''; // Clear previous entries

  if (confirmedDonations.length === 0) {
    donationTable.innerHTML = '<tr><td colspan="7">No confirmed donations yet.</td></tr>';
  } else {
    confirmedDonations.forEach((donation, index) => {
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
document.addEventListener('DOMContentLoaded', () => {
  const requestList = document.querySelector('#requestList');
  const deniedList = document.querySelector('#deniedList'); // Denied requests table
  const hakikishaButton = document.getElementById('hakikishaButton'); // Hakikisha button
  const consolidatedTable = document.querySelector('#consolidatedTable'); // Table for matching requests and donations
  
  // Load recent requests and denied requests on page load
  loadRequests();

  // Add event listener to Hakikisha button
  hakikishaButton.addEventListener('click', () => consolidateMatches());

  function loadRequests() {
    const requests = getFromLocalStorage('bloodRequests');
    const deniedRequests = getFromLocalStorage('deniedRequests'); // Ensure denied requests are loaded

    // Add all recent requests to the 'requests' table
    requests.forEach((request) => addRequestToTable(request));

    // Add all denied requests to the 'denied' table
    deniedRequests.forEach((request) => addDeniedRequestToTable(request));
  }

  function addRequestToTable(request) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${request.recipientName}</td>
      <td>${request.bloodType}</td>
      <td>${request.units}</td>
      <td>
        <button class="view-btn">View</button>
      </td>
    `;

    // Event listener for the "View" button
    row.querySelector('.view-btn').addEventListener('click', () => showDetails(request));

    requestList.appendChild(row);
  }

  function addDeniedRequestToTable(request) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${request.recipientName}</td>
      <td>${request.bloodType}</td>
      <td>${request.units}</td>
      <td>${request.denyReasons.join(', ')}</td>
    `;
    deniedList.appendChild(row);
  }

  function showDetails(request) {
    alert(`
      Date: ${request.date}
      Recipient Name: ${request.recipientName}
      Recipient Age: ${request.age}
      Blood Type: ${request.bloodType}
      Units Needed: ${request.units}
      Gender: ${request.gender}
      Hospital: ${request.hospital}
      Doctor: ${request.doctor}
      Hospital Contact: ${request.contactHospital}
      Location: ${request.location}
      Urgency: ${request.urgency}
      Reason: ${request.reason}
    `);
  }

  // Function to save to localStorage
  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Function to get from localStorage
  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  // Function to consolidate matched requests and confirmed donations
  function consolidateMatches() {
    const confirmedDonations = getFromLocalStorage('confirmedDonations');
    const requests = getFromLocalStorage('bloodRequests');
    const consolidatedMatches = [];

    // Loop through confirmed donations
    confirmedDonations.forEach((donation) => {
      // Loop through requests and check if blood types match
      requests.forEach((request) => {
        if (donation.bloodGroup === request.bloodType) {
          // If there's a match, consolidate the data
          consolidatedMatches.push({
            recipientName: request.recipientName,
            bloodType: request.bloodType,
            unitsNeeded: request.units,
            donationUnitNumber: donation.unitNumber,
            donationDate: donation.donationDate,
            donationVolume: donation.volumeCollected,
            storageTemp: donation.storageTemperature
          });
        }
      });
    });

    // Clear existing consolidated table
    consolidatedTable.innerHTML = '';
    
    // If no matches, display a message
    if (consolidatedMatches.length === 0) {
      consolidatedTable.innerHTML = '<tr><td colspan="7">No matching donations found.</td></tr>';
    } else {
      // Add matched rows to the consolidated table
      consolidatedMatches.forEach((match) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${match.recipientName}</td>
          <td>${match.bloodType}</td>
          <td>${match.unitsNeeded}</td>
          <td>${match.donationUnitNumber}</td>
          <td>${match.donationDate}</td>
          <td>${match.donationVolume} mL</td>
          <td>${match.storageTemp}</td>
        `;
        consolidatedTable.appendChild(row);
      });
    }
  }

  // Display consolidated table
  const tableSection = document.createElement('section');
  tableSection.innerHTML = `
    <h2>Consolidated Blood Matches</h2>
    <table id="consolidatedTable">
      <thead>
        <tr>
          <th>Recipient Name</th>
          <th>Blood Type</th>
          <th>Units Needed</th>
          <th>Donation Unit</th>
          <th>Donation Date</th>
          <th>Donation Volume</th>
          <th>Storage Temp</th>
        </tr>
      </thead>
      <tbody>
        <!-- Matching rows will be dynamically added here -->
      </tbody>
    </table>
  `;
  document.body.appendChild(tableSection);
});
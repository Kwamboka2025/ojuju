document.addEventListener('DOMContentLoaded', () => {
  const requestList = document.querySelector('#requestList');
  const deniedList = document.querySelector('#deniedList'); // Denied requests table

  // Load recent requests and denied requests on page load
  loadRequests();

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

  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
});
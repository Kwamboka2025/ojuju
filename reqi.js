// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const requestList = document.querySelector('#requestList tbody');

  // Load recent requests on page load
  loadRecentRequests();

  // Handle form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = getFormData();

    // Validate form inputs
    if (!validateForm(formData)) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    // Add submission time
    formData.date = new Date().toLocaleString();

    // Save request to localStorage
    saveToLocalStorage('bloodRequests', formData);

    // Add request to the table
    addRequestToTable(formData);

    // Clear the form
    form.reset();
    alert('Request submitted successfully!');
  });

  // Load recent requests from localStorage
  function loadRecentRequests() {
    const requests = getFromLocalStorage('bloodRequests');
    requests.forEach((request) => addRequestToTable(request));
  }

  // Get form data
  function getFormData() {
    return {
      recipientName: document.getElementById('recipientName').value.trim(),
      age: document.getElementById('age').value.trim(),
      bloodType: document.getElementById('bloodType').value.trim(),
      units: document.getElementById('units').value.trim(),
      gender: document.getElementById('gender').value.trim(),
      hospital: document.getElementById('hospital').value.trim(),
      doctor: document.getElementById('doctor').value.trim(),
      contactHospital: document.getElementById('contactHospital').value.trim(),
      location: document.getElementById('location').value.trim(),
      urgency: document.getElementById('urgency').value.trim(),
      reason: document.getElementById('reason').value.trim(),
    };
  }

  // Validate form data
  function validateForm(formData) {
    return Object.values(formData).every((value) => value !== '');
  }

  // Add request to the "Recent Requests" table
  function addRequestToTable(request) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${request.recipientName}</td>
      <td>${request.bloodType}</td>
      <td>${request.units}</td>
      <td>
        <button class="view-btn">View</button>
        <button class="approve-btn">Approve</button>
        <button class="onhold-btn">On Hold</button>
      </td>
    `;

    // Add event listeners to buttons
    row.querySelector('.view-btn').addEventListener('click', () => showDetails(request));
    row.querySelector('.approve-btn').addEventListener('click', () => moveRequest(request, 'approvedRequests', row));
    row.querySelector('.onhold-btn').addEventListener('click', () => moveRequest(request, 'onholdRequests', row));

    requestList.appendChild(row);
  }

  // Show request details in an alert
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

  // Move a request to a different list
  function moveRequest(request, targetKey, row) {
    const requests = getFromLocalStorage('bloodRequests');
    const updatedRequests = requests.filter((r) => r.date !== request.date);

    // Save the updated pending requests and add the request to the target list
    saveToLocalStorage('bloodRequests', updatedRequests);
    saveToLocalStorage(targetKey, request);

    // Remove the request from the "Recent Requests" table
    row.remove();
    alert(`Request moved to ${targetKey === 'approvedRequests' ? 'Approved' : 'On Hold'} Requests.`);
  }

  // Save data to localStorage
  function saveToLocalStorage(key, data) {
    const existingData = getFromLocalStorage(key);
    existingData.push(data);
    localStorage.setItem(key, JSON.stringify(existingData));
  }

  // Retrieve data from localStorage
  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
});
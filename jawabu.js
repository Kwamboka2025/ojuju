// Listen for form submission
document.getElementById('bloodRequestForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Retrieve form data
  const name = document.getElementById('name').value.trim();
  const contact = document.getElementById('contact').value.trim();
  const email = document.getElementById('email').value.trim();
  const relationship = document.getElementById('relationship').value;
  const recipientName = document.getElementById('recipientName').value.trim();
  const age = document.getElementById('age').value.trim();
  const bloodType = document.getElementById('bloodType').value;
  const units = document.getElementById('units').value.trim();
  const gender = document.getElementById('gender').value;
  const hospital = document.getElementById('hospital').value.trim();
  const doctor = document.getElementById('doctor').value.trim();
  const contactHospital = document.getElementById('contactHospital').value.trim();
  const location = document.getElementById('location').value.trim();
  const urgency = document.getElementById('urgency').value;
  const reason = document.getElementById('reason').value.trim();

  // Validate fields
  if (
    !name ||
    !contact ||
    !email ||
    !relationship ||
    !recipientName ||
    !age ||
    !bloodType ||
    !units ||
    !gender ||
    !hospital ||
    !doctor ||
    !contactHospital ||
    !location ||
    !urgency ||
    !reason
  ) {
    alert('Please fill in all fields.');
    return;
  }

  // Create a request object
  const request = {
    name,
    contact,
    email,
    relationship,
    recipientName,
    age,
    bloodType,
    units,
    gender,
    hospital,
    doctor,
    contactHospital,
    location,
    urgency,
    reason,
    date: new Date().toLocaleString(), // Add current date and time
  };

  // Save to local storage
  let requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
  requests.push(request);
  localStorage.setItem('bloodRequests', JSON.stringify(requests));

  // Update request list
  updateRequestList();

  // Clear form
  document.getElementById('bloodRequestForm').reset();
});

// Function to update the request list and total count
function updateRequestList() {
  const requestList = document.getElementById('requestList');
  requestList.innerHTML = '';

  const requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];

  // Sort requests by date (latest first)
  requests.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Create table structure
  const table = document.createElement('table');
  table.classList.add('request-table');

  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
    <th>Date</th>
    <th>Requester</th>
    <th>Recipient</th>
    <th>Blood Type</th>
    <th>Urgency</th>
    <th>Actions</th>
  `;
  table.appendChild(headerRow);

  // Populate table with requests
  requests.forEach((request, index) => {
    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${request.date}</td>
      <td>${request.name}</td>
      <td>${request.recipientName}</td>
      <td>${request.bloodType}</td>
      <td>${request.urgency}</td>
      <td>
        <button class="details-btn" data-index="${index}">View</button>
        <button class="delete-btn" data-index="${index}">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });

  requestList.appendChild(table);

  // Update the total number of requests
  updateTotalRequests(requests.length);

  // Add event listeners to "View" buttons
  document.querySelectorAll('.details-btn').forEach((button) => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      showDetails(index);
    });
  });

  // Add event listeners to "Delete" buttons
  document.querySelectorAll('.delete-btn').forEach((button) => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      deleteRequest(index);
    });
  });
}

// Function to update total number of requests
function updateTotalRequests(total) {
  const totalRequestsElement = document.getElementById('totalRequests');
  totalRequestsElement.textContent = total;
}

// Function to display request details
function showDetails(index) {
  const requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
  const request = requests[index];

  // Format details as plain text
  const details = `
    Date: ${request.date}
    Requester Name: ${request.name}
    Contact: ${request.contact}
    Email: ${request.email}
    Relationship: ${request.relationship}
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
  `;

  // Display details in a modal-like alert
  alert(details);
}

// Function to delete a request
function deleteRequest(index) {
  let requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
  const confirmed = confirm('Are you sure you want to delete this request?');
  if (confirmed) {
    requests.splice(index, 1);
    localStorage.setItem('bloodRequests', JSON.stringify(requests));
    updateRequestList();
  }
}

// Initialize request list on page load
document.addEventListener('DOMContentLoaded', updateRequestList);
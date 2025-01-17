// Function to handle form submission
document.getElementById("bloodRequestForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Collect form data
  const recipientName = document.getElementById("recipientName").value;
  const age = document.getElementById("age").value;
  const bloodType = document.getElementById("bloodType").value;
  const units = document.getElementById("units").value;
  const gender = document.getElementById("gender").value;
  const hospital = document.getElementById("hospital").value;
  const doctor = document.getElementById("doctor").value;
  const contactHospital = document.getElementById("contactHospital").value;
  const location = document.getElementById("location").value;
  const urgency = document.getElementById("urgency").value;
  const reason = document.getElementById("reason").value;

  const requestData = {
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
    reason
  };

  // Get existing data from localStorage
  let recentRequests = JSON.parse(localStorage.getItem("recentRequests")) || [];

  // Add the new request to the recentRequests array
  recentRequests.push(requestData);

  // Save the updated array back to localStorage
  localStorage.setItem("recentRequests", JSON.stringify(recentRequests));

  // Clear the form after submission
  document.getElementById("bloodRequestForm").reset();

  // Update the recent requests table
  displayRecentRequests();
});

// Function to display recent requests in the table
function displayRecentRequests() {
  let recentRequests = JSON.parse(localStorage.getItem("recentRequests")) || [];
  const requestList = document.getElementById("requestList");

  requestList.innerHTML = "";

  recentRequests.forEach((request, index) => {
    const row = document.createElement("tr");

    const recipientCell = document.createElement("td");
    recipientCell.textContent = request.recipientName;
    row.appendChild(recipientCell);

    const bloodTypeCell = document.createElement("td");
    bloodTypeCell.textContent = request.bloodType;
    row.appendChild(bloodTypeCell);

    const unitsCell = document.createElement("td");
    unitsCell.textContent = request.units;
    row.appendChild(unitsCell);

    // Create the actions cell with an "Approve" button
    const actionsCell = document.createElement("td");

    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.onclick = function() {
      viewRequestDetails(request);
    };
    actionsCell.appendChild(viewButton);

    // "Approve" button
    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.onclick = function() {
      approveRequest(index);
    };
    actionsCell.appendChild(approveButton);

    row.appendChild(actionsCell);

    requestList.appendChild(row);
  });
}

// Function to view detailed information in a popup or alert
function viewRequestDetails(request) {
  let details = `
        Recipient Name: ${request.recipientName}
        \nAge: ${request.age}
        \nBlood Type: ${request.bloodType}
        \nUnits Needed: ${request.units}
        \nGender: ${request.gender}
        \nHospital: ${request.hospital}
        \nDoctor: ${request.doctor}
        \nHospital Contact: ${request.contactHospital}
        \nLocation: ${request.location}
        \nUrgency: ${request.urgency}
        \nReason: ${request.reason}
    `;
  alert(details);
}

// Function to approve a request (you will add further logic later)
function approveRequest(index) {
  alert("Request approved. Implement further actions here.");
}

// Call the function to display recent requests when the page loads
window.onload = displayRecentRequests;
document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector("form");
  const requestTableBody = document.querySelector("#requestList tbody");
  const recentRequestsSection = document.querySelector(".list-container");

  // Function to load data from localStorage into the table
  function loadRequests() {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    storedRequests.forEach(request => {
      addRequestToTable(request);
    });
    if (storedRequests.length > 0) {
      recentRequestsSection.hidden = false; // Show the table if there are stored requests
    }
  }

  // Function to add request data to the table
  function addRequestToTable(request) {
    const row = requestTableBody.insertRow();
    row.insertCell(0).textContent = request.recipientName;
    row.insertCell(1).textContent = request.bloodType;
    row.insertCell(2).textContent = request.unitsNeeded;

    const cellActions = row.insertCell(3);
    const viewButton = document.createElement("button");
    viewButton.textContent = "View";
    viewButton.addEventListener("click", function() {
      // Show all data in an alert
      alert(`Recipient: ${request.recipientName}\nAge: ${request.age}\nBlood Type: ${request.bloodType}\nUnits Needed: ${request.unitsNeeded}\nGender: ${request.gender}\nHospital: ${request.hospital}\nDoctor: ${request.doctor}\nContact: ${request.contactHospital}\nLocation: ${request.location}\nUrgency: ${request.urgency}\nReason: ${request.reason}`);
    });
    cellActions.appendChild(viewButton);
  }

  // Load stored requests when the page is loaded
  loadRequests();

  // Listen for form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from actually submitting

    // Capture all form data
    const request = {
      recipientName: document.getElementById("recipientName").value,
      age: document.getElementById("age").value,
      bloodType: document.getElementById("bloodType").value,
      unitsNeeded: document.getElementById("units").value,
      gender: document.getElementById("gender").value,
      hospital: document.getElementById("hospital").value,
      doctor: document.getElementById("doctor").value,
      contactHospital: document.getElementById("contactHospital").value,
      location: document.getElementById("location").value,
      urgency: document.getElementById("urgency").value,
      reason: document.getElementById("reason").value,
    };

    // Get existing requests from localStorage
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];

    // Add new request to the stored requests array
    storedRequests.push(request);

    // Save updated requests back to localStorage
    localStorage.setItem("requests", JSON.stringify(storedRequests));

    // Add new request to the table
    addRequestToTable(request);

    // Unhide the "Recent Requests" section
    recentRequestsSection.hidden = false;

    // Optionally, reset the form
    form.reset();
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const requestTableBody = document.querySelector("#requestList tbody");

  // Function to load data from localStorage into the table
  function loadRequests() {
    const storedRequests = JSON.parse(localStorage.getItem("requests")) || [];
    storedRequests.forEach(request => {
      addRequestToTable(request);
    });
  }

  // Function to add request data to the table
  function addRequestToTable(request) {
    const row = requestTableBody.insertRow();
    row.insertCell(0).textContent = request.recipientName;
    row.insertCell(1).textContent = request.bloodType;
    row.insertCell(2).textContent = request.unitsNeeded;

    const cellActions = row.insertCell(3);
    const approveButton = document.createElement("button");
    approveButton.textContent = "Approve";
    approveButton.classList.add("approve-btn");
    approveButton.addEventListener("click", function() {
      // Trigger approve action
      approveRequest(request, row);
    });

    const denyButton = document.createElement("button");
    denyButton.textContent = "Deny";
    denyButton.classList.add("deny-btn");
    denyButton.addEventListener("click", function() {
      // Trigger deny action
      denyRequest(request, row);
    });

    cellActions.appendChild(approveButton);
    cellActions.appendChild(denyButton);
  }

  // Function to approve request
  function approveRequest(request, row) {
    // Remove the request from the current table and add to the approved list
    row.remove();

    const approvedRequests = JSON.parse(localStorage.getItem("approvedRequests")) || [];
    approvedRequests.push(request);
    localStorage.setItem("approvedRequests", JSON.stringify(approvedRequests));

    // Update the approved requests table
    const approvedTableBody = document.querySelector("#approvedRequests tbody");
    const newRow = approvedTableBody.insertRow();
    newRow.insertCell(0).textContent = request.recipientName;
    newRow.insertCell(1).textContent = request.bloodType;
    newRow.insertCell(2).textContent = request.unitsNeeded;
  }

  // Function to deny request
  function denyRequest(request, row) {
    // Remove the request from the current table and add to the denied list
    row.remove();

    const deniedRequests = JSON.parse(localStorage.getItem("deniedRequests")) || [];
    deniedRequests.push(request);
    localStorage.setItem("deniedRequests", JSON.stringify(deniedRequests));

    // Update the denied requests table
    const deniedTableBody = document.querySelector("#deniedRequests tbody");
    const newRow = deniedTableBody.insertRow();
    newRow.insertCell(0).textContent = request.recipientName;
    newRow.insertCell(1).textContent = request.bloodType;
    newRow.insertCell(2).textContent = request.unitsNeeded;
  }

  // Load stored requests when the page is loaded
  loadRequests();
});
// Function to approve a request and move it to confirmed donations
function approveRequest(index) {
  const recentRequests = JSON.parse(localStorage.getItem("recentRequests")) || [];
  const confirmedRequests = JSON.parse(localStorage.getItem("confirmedRequests")) || [];
  
  const request = recentRequests[index];
  
  // Add the request to the confirmed list
  confirmedRequests.push(request);
  
  // Remove the request from recent requests
  recentRequests.splice(index, 1);
  
  // Update local storage with the new lists
  localStorage.setItem("recentRequests", JSON.stringify(recentRequests));
  localStorage.setItem("confirmedRequests", JSON.stringify(confirmedRequests));
  
  // Update the displayed tables
  displayRecentRequests();
  displayConfirmedRequests();
  alert("Request approved and moved to confirmed donations.");
}

// Function to display confirmed requests in a new table
function displayConfirmedRequests() {
  const confirmedRequests = JSON.parse(localStorage.getItem("confirmedRequests")) || [];
  const confirmedList = document.getElementById("confirmedList");

  confirmedList.innerHTML = "";

  if (confirmedRequests.length === 0) {
    confirmedList.innerHTML = '<tr><td colspan="4">No confirmed donations yet.</td></tr>';
  } else {
    confirmedRequests.forEach((request, index) => {
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

      const actionsCell = document.createElement("td");

      // Optionally, you can add a button for further actions here
      actionsCell.innerHTML = "<button>Action</button>";

      row.appendChild(actionsCell);
      confirmedList.appendChild(row);
    });
  }
}

// Call the function to display confirmed requests when the page loads
window.onload = function() {
  displayRecentRequests();
  displayConfirmedRequests();
};
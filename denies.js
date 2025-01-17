// Function to deny a request
function denyRequest(index) {
    // Get recent requests from localStorage
    let recentRequests = JSON.parse(localStorage.getItem("recentRequests")) || [];
    let deniedRequests = JSON.parse(localStorage.getItem("deniedRequests")) || [];

    // Remove the request from the recentRequests list
    const deniedRequest = recentRequests.splice(index, 1)[0];

    // Prompt the user to select the reason(s) for denying the request
    const denialReasons = [
        "Blood Type Incompatibility",
        "Insufficient Blood Supply",
        "Inadequate Testing or Documentation",
        "Risk of Transfusion Reactions",
        "Infection Concerns",
        "Medical Contraindications",
        "Alternative Treatments",
        "Ethical or Religious reasons",
        "Insurance /Finance Issues"
    ];

    // Create a checklist form for reasons
    let reasonChecklist = "";
    denialReasons.forEach((reason, i) => {
        reasonChecklist += `<input type="checkbox" id="reason${i}" value="${reason}"> ${reason}<br>`;
    });

    // Display the checklist in a modal
    const reasonPopup = `
        <div id="reasonPopup" class="popup">
            <div class="popup-content">
                <h3>Please select the reason(s) for denying this request:</h3>
                <div>${reasonChecklist}</div>
                <button onclick="confirmDenial(${index})">Confirm Denial</button>
                <button onclick="closeReasonPopup()">Cancel</button>
            </div>
        </div>
    `;
    
    // Append the popup to the body
    document.body.innerHTML += reasonPopup;
}

// Function to handle the confirmation of the denial
function confirmDenial(index) {
    // Get recent requests and denied requests from localStorage
    let recentRequests = JSON.parse(localStorage.getItem("recentRequests")) || [];
    let deniedRequests = JSON.parse(localStorage.getItem("deniedRequests")) || [];

    // Get the selected reasons
    const denialReasons = [
        "Blood Type Incompatibility",
        "Insufficient Blood Supply",
        "Inadequate Testing or Documentation",
        "Risk of Transfusion Reactions",
        "Infection Concerns",
        "Medical Contraindications",
        "Alternative Treatments",
        "Ethical or Religious reasons",
        "Insurance /Finance Issues"
    ];

    const selectedReasons = [];
    denialReasons.forEach((reason, i) => {
        const checkbox = document.getElementById(`reason${i}`);
        if (checkbox && checkbox.checked) {
            selectedReasons.push(reason);
        }
    });

    if (selectedReasons.length === 0) {
        alert("Please select at least one reason.");
        return;
    }

    // Add the selected reasons to the deniedRequest object
    deniedRequest.reason = selectedReasons.join(", ");

    // Add the denied request to the deniedRequests array
    deniedRequests.push(deniedRequest);

    // Save the updated lists back to localStorage
    localStorage.setItem("recentRequests", JSON.stringify(recentRequests));
    localStorage.setItem("deniedRequests", JSON.stringify(deniedRequests));

    // Update the tables
    displayRecentRequests();
    displayDeniedRequests();

    // Close the popup
    closeReasonPopup();
}

// Function to close the reason selection popup
function closeReasonPopup() {
    // Remove the popup from the DOM
    const reasonPopup = document.getElementById("reasonPopup");
    if (reasonPopup) reasonPopup.remove();
}

// Function to display denied requests in the table
function displayDeniedRequests() {
    // Get denied requests from localStorage
    let deniedRequests = JSON.parse(localStorage.getItem("deniedRequests")) || [];

    // Get the table body element
    const deniedList = document.getElementById("deniedList");

    // Clear the current list
    deniedList.innerHTML = "";

    // Loop through the denied requests and create rows for each
    deniedRequests.forEach((request) => {
        const row = document.createElement("tr");

        // Create table cells for denied request details
        const recipientCell = document.createElement("td");
        recipientCell.textContent = request.recipientName;
        row.appendChild(recipientCell);

        const bloodTypeCell = document.createElement("td");
        bloodTypeCell.textContent = request.bloodType;
        row.appendChild(bloodTypeCell);

        const unitsCell = document.createElement("td");
        unitsCell.textContent = request.units;
        row.appendChild(unitsCell);

        const reasonCell = document.createElement("td");
        reasonCell.textContent = request.reason;
        row.appendChild(reasonCell);

        // Append the row to the denied list table
        deniedList.appendChild(row);
    });
}

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
        <button class="deny-btn">Deny</button>
      </td>
    `;

    row.querySelector('.view-btn').addEventListener('click', () => showDetails(request));
    row.querySelector('.deny-btn').addEventListener('click', () => promptForDenyReason(request, row));

    requestList.appendChild(row);
  }

  function addDeniedRequestToTable(request) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${request.recipientName}</td>
      <td>${request.bloodType}</td>
      <td>${request.units}</td>
      <td>${request.denyReasons.join(', ')}</td>
      <td>${new Date(request.transactionDate).toLocaleString()}</td> <!-- Display transaction date -->
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

  function promptForDenyReason(request, row) {
    const reasons = [
      'Blood Type Incompatibility',
      'Insufficient Blood Supply',
      'Inadequate Testing or Documentation',
      'Risk of Transfusion Reactions',
      'Infection Concerns',
      'Medical Contraindications',
      'Alternative Treatments',
      'Ethical or Religious reasons',
      'Insurance / Finance Issues'
    ];

    // Create a modal dialog with a checklist
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Select Reason(s) for Denial</h3>
        <form id="denyForm">
          ${reasons
            .map(
              (reason) =>
                `<label>
                  <input type="checkbox" name="reasons" value="${reason}">
                  ${reason}
                </label><br>`
            )
            .join('')}
          <textarea id="customReason" placeholder="Other reason (optional)" rows="3"></textarea>
          <div class="modal-actions">
            <button type="button" id="confirmDeny">Confirm</button>
            <button type="button" id="cancelDeny">Cancel</button>
          </div>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('confirmDeny').addEventListener('click', () => {
      const selectedReasons = Array.from(
        document.querySelectorAll('input[name="reasons"]:checked')
      ).map((input) => input.value);

      const customReason = document.getElementById('customReason').value.trim();

      if (selectedReasons.length === 0 && !customReason) {
        alert('Please select at least one reason or provide a custom reason.');
        return;
      }

      request.denyReasons = [...selectedReasons];
      if (customReason) {
        request.denyReasons.push(customReason);
      }

      request.transactionDate = new Date().toISOString(); // Set transaction date as current timestamp
      moveRequestToDenied(request, row);
      modal.remove();
    });

    document.getElementById('cancelDeny').addEventListener('click', () => {
      modal.remove();
    });
  }

  function moveRequestToDenied(request, row) {
    const requests = getFromLocalStorage('bloodRequests');
    const updatedRequests = requests.filter((r) => r.date !== request.date);

    // Save the updated requests and move denied request to the "deniedRequests"
    saveToLocalStorage('bloodRequests', updatedRequests);
    addToLocalStorage('deniedRequests', request);

    row.remove();
    addDeniedRequestToTable(request);
    alert('Request has been moved to Denied Requests.');
  }

  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function addToLocalStorage(key, item) {
    const existingData = getFromLocalStorage(key);
    existingData.push(item);
    saveToLocalStorage(key, existingData);
  }

  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
});
document.addEventListener('DOMContentLoaded', () => {
  // Helper functions for localStorage
  const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  // Update Recent Requests Table
  function updateRecentRequests() {
    const recentRequestsList = document.querySelector('#recentRequestsList tbody');
    const recentRequests = getFromLocalStorage('bloodRequests');
    recentRequestsList.innerHTML = ''; // Clear the table

    recentRequests.forEach((request, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${request.recipientName}</td>
        <td>${request.bloodType}</td>
        <td>${request.units}</td>
        <td>
          <button class="view-btn" data-action="view">View</button>
          <button class="approve-btn" data-action="approve">Approve</button>
          <button class="onhold-btn" data-action="onhold">On Hold</button>
        </td>
      `;
      recentRequestsList.appendChild(row);
    });
  }

  // Update Approved Requests Table
  function updateApprovedRequests() {
    const approvedRequestsList = document.querySelector('#approvedRequestsList tbody');
    const approvedRequests = getFromLocalStorage('approvedRequests');
    approvedRequestsList.innerHTML = ''; // Clear the table

    approvedRequests.forEach((request, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${request.recipientName}</td>
        <td>${request.bloodType}</td>
        <td>${request.units}</td>
        <td>${request.priceType || ''}</td>
        <td>${request.anticipatedDate || ''}</td>
      `;
      approvedRequestsList.appendChild(row);
    });
  }

  // Update On-Hold Requests Table
  function updateOnHoldRequests() {
    const onHoldRequestsList = document.querySelector('#onholdRequestsList tbody');
    const onHoldRequests = getFromLocalStorage('onHoldRequests');
    onHoldRequestsList.innerHTML = ''; // Clear the table

    onHoldRequests.forEach((request, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${request.recipientName}</td>
        <td>${request.bloodType}</td>
        <td>${request.units}</td>
        <td>
          <button class="approve-btn" data-action="approve">Approve</button>
        </td>
      `;
      onHoldRequestsList.appendChild(row);
    });
  }

  // Update all tables
  function updateTables() {
    updateRecentRequests();
    updateApprovedRequests();
    updateOnHoldRequests();
  }

  // Run the updates on page load
  updateTables();
});
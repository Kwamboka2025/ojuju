document.addEventListener('DOMContentLoaded', () => {
  const releasedTableBody = document.querySelector('#releasedTable tbody');
  const clearedTableBody = document.querySelector('#clearedTable tbody');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  const pageInfo = document.getElementById('pageInfo');

  const itemsPerPage = 5;
  let currentPage = 1;
  let releasedDonations = [];
  let clearedInventory = [];

  function loadReleasedDonations() {
    releasedDonations = getFromLocalStorage('releasedDonations');
    clearedInventory = getFromLocalStorage('clearedInventory');
    renderReleasedTable();
    renderClearedTable();
  }

  function renderReleasedTable() {
    releasedTableBody.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = releasedDonations.slice(startIndex, endIndex);

    if (currentItems.length === 0) {
      releasedTableBody.innerHTML = '<tr><td colspan="8">No released donations available.</td></tr>';
    } else {
      currentItems.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${startIndex + index + 1}</td>
          <td>${donation.unitNumber}</td>
          <td>${donation.donationDate}</td>
          <td>${donation.componentType}</td>
          <td>${donation.bloodGroup} (${donation.rhFactor})</td>
          <td>${donation.recipientName}</td>
          <td>${donation.transactionDate}</td>
          <td><button class="thibitisha-btn" data-index="${startIndex + index}">Thibitisha</button></td>
        `;
        releasedTableBody.appendChild(row);
      });

      // Attach event listeners to "Thibitisha" buttons
      document.querySelectorAll('.thibitisha-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
          const index = parseInt(e.target.getAttribute('data-index'), 10);
          thibitishaAction(index);
        });
      });
    }

    updatePagination();
  }

  function renderClearedTable() {
    clearedTableBody.innerHTML = '';

    if (clearedInventory.length === 0) {
      clearedTableBody.innerHTML = '<tr><td colspan="8">No cleared donations yet.</td></tr>';
    } else {
      clearedInventory.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donation.unitNumber}</td>
          <td>${donation.donationDate}</td>
          <td>${donation.componentType}</td>
          <td>${donation.bloodGroup} (${donation.rhFactor})</td>
          <td>${donation.recipientName}</td>
          <td>${donation.transactionDate}</td>
        `;
        clearedTableBody.appendChild(row);
      });
    }
  }

  function thibitishaAction(index) {
    const donation = releasedDonations[index];

    // Add donation to cleared inventory
    clearedInventory.push(donation);
    saveToLocalStorage('clearedInventory', clearedInventory);

    // Remove donation from released donations
    releasedDonations.splice(index, 1);
    saveToLocalStorage('releasedDonations', releasedDonations);

    alert(`Donation with Unit Number: ${donation.unitNumber} has been cleared from inventory.`);

    // Refresh the tables
    renderReleasedTable();
    renderClearedTable();
  }

  function updatePagination() {
    const totalPages = Math.ceil(releasedDonations.length / itemsPerPage);

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages || totalPages === 0;

    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  }

  prevPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderReleasedTable();
    }
  });

  nextPageButton.addEventListener('click', () => {
    const totalPages = Math.ceil(releasedDonations.length / itemsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderReleasedTable();
    }
  });

  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }

  loadReleasedDonations();
});
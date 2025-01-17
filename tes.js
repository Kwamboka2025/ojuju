document.addEventListener('DOMContentLoaded', () => {
  const confirmedDonationsTable = document.querySelector('#confirmedTable tbody');
  const releasedTable = document.querySelector('#releasedTable tbody');

  displayConfirmedDonations();
  displayReleasedDonations();

  // Display confirmed donations
  function displayConfirmedDonations() {
    const confirmedDonations = getFromLocalStorage('confirmedDonations');
    confirmedDonationsTable.innerHTML = '';

    if (confirmedDonations.length === 0) {
      confirmedDonationsTable.innerHTML = '<tr><td colspan="8">No confirmed donations yet.</td></tr>';
    } else {
      confirmedDonations.forEach((donation, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${donation.unitNumber}</td>
          <td>${donation.donationDate}</td>
          <td>${donation.componentType}</td>
          <td>${donation.bloodGroup} (${donation.rhFactor})</td>
          <td>
            HIV: ${donation.testResults.hiv}, HBsAg: ${donation.testResults.hbsAg}, 
            HCV: ${donation.testResults.hcv}, TPHA: ${donation.testResults.syphilis}, 
            Other: ${donation.testResults.otherTests}
          </td>
          <td>
            <button class="haki-btn" data-index="${index}">Haki</button>
          </td>
        `;
        confirmedDonationsTable.appendChild(row);
      });

      // Attach event listeners to all "Haki" buttons
      document.querySelectorAll('.haki-btn').forEach((button) => {
        button.addEventListener('click', (e) => {
          const index = e.target.getAttribute('data-index');
          hakiAction(index);
        });
      });
    }
  }

  // Display released donations
  function displayReleasedDonations() {
    const releasedDonations = getFromLocalStorage('releasedDonations');
    releasedTable.innerHTML = '';

    if (releasedDonations.length === 0) {
      releasedTable.innerHTML = '<tr><td colspan="6">No donations released yet.</td></tr>';
    } else {
      releasedDonations.forEach((donation, index) => {
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
        releasedTable.appendChild(row);
      });
    }
  }

  // Handle the "Haki" action
  function hakiAction(index) {
    const confirmedDonations = getFromLocalStorage('confirmedDonations');
    const donation = confirmedDonations[index];
    const bloodRequests = getFromLocalStorage('bloodRequests');

    if (bloodRequests.length === 0) {
      alert('No blood requests available to associate this donation.');
      return;
    }

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup-content">
        <h3>Select a Recipient</h3>
        <form id="recipientForm">
          ${bloodRequests
            .map(
              (request, i) => `
              <label>
                <input type="radio" name="recipient" value="${i}">
                ${request.recipientName} - ${request.bloodType} (${request.units} unit(s))
              </label><br>
            `
            )
            .join('')}
        </form>
        <button id="confirmRecipient">Confirm</button>
        <button id="cancelRecipient">Cancel</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('confirmRecipient').addEventListener('click', () => {
      const selected = document.querySelector('input[name="recipient"]:checked');

      if (!selected) {
        alert('Please select a recipient.');
        return;
      }

      const selectedIndex = parseInt(selected.value, 10);
      const selectedRecipient = bloodRequests[selectedIndex];

      const confirmAction = confirm(
        `Do you want to associate this donation with:\nRecipient: ${selectedRecipient.recipientName}\nBlood Group: ${selectedRecipient.bloodType}\nUnits Needed: ${selectedRecipient.units}`
      );

      if (confirmAction) {
        // Deduct from confirmed donations
        confirmedDonations.splice(index, 1);
        saveToLocalStorage('confirmedDonations', confirmedDonations);

        // Deduct units from blood requests or remove request if fulfilled
        selectedRecipient.units -= 1;
        if (selectedRecipient.units <= 0) {
          bloodRequests.splice(selectedIndex, 1);
        }
        saveToLocalStorage('bloodRequests', bloodRequests);

        // Add to released donations
        const transactionDate = new Date().toLocaleString();
        const releasedDonations = getFromLocalStorage('releasedDonations');
        releasedDonations.push({
          ...donation,
          recipientName: selectedRecipient.recipientName,
          transactionDate,
        });
        saveToLocalStorage('releasedDonations', releasedDonations);

        // Update tables
        displayConfirmedDonations();
        displayReleasedDonations();

        document.body.removeChild(popup);
      }
    });

    document.getElementById('cancelRecipient').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  }

  // Helper functions
  function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  function getFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
  }
});
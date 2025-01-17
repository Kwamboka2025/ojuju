document.addEventListener('DOMContentLoaded', () => {
  // Get donor data from localStorage or initialize with an empty array
  const donors = JSON.parse(localStorage.getItem('donors')) || [];

  // Get the donor list container
  const donorListContainer = document.querySelector('#donorList');

  // Function to populate the donor list
  const populateDonorList = () => {
    donorListContainer.innerHTML = ''; // Clear the container
    if (donors.length === 0) {
      donorListContainer.innerHTML = '<p>No donors available. Please register donors.</p>';
      return;
    }
    donors.forEach((donor, index) => {
      // Create donor list item
      const donorItem = document.createElement('li');
      donorItem.classList.add('donor-card');
      donorItem.innerHTML = `
        <div class="donor-number">${index + 1}</div>
        <div class="donor-info">
          <p class="donor-name">${donor.firstName || 'N/A'} ${donor.lastName || 'N/A'}</p>
          <p class="donor-phone"><i class="fas fa-phone"></i> ${donor.phone || 'N/A'}</p>
          <p class="donor-blood-group"><i class="fas fa-tint"></i> ${donor.bloodGroup || 'N/A'}</p>
          <p class="donor-age"><i class="fas fa-calendar"></i> ${donor.age || 'N/A'} years</p>
        </div>
        <button class="details-btn" data-index="${index}"><i class="fas fa-info-circle"></i> Details</button>
        <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i> Delete</button>
      `;
      donorListContainer.appendChild(donorItem);
    });
  };

  // Function to show donor details in a popup
  const showDonorDetails = (donorIndex) => {
    const donorDetails = donors[donorIndex];
    const popup = document.querySelector('#donorPopup');

    // Generate formatted details dynamically
    const detailsHTML = Object.entries(donorDetails)
      .map(([key, value]) => {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
          .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
        return `<p><strong>${formattedKey}:</strong> ${value || 'N/A'}</p>`;
      })
      .join('');

    // Populate popup content
    popup.innerHTML = `
      <h3>${donorDetails.firstName || 'N/A'} ${donorDetails.lastName || 'N/A'}</h3>
      ${detailsHTML}
      <button id="closePopup">Close</button>
    `;

    // Show the popup
    popup.style.display = 'block';
  };

  // Function to close the popup
  const closePopup = () => {
    const popup = document.querySelector('#donorPopup');
    popup.style.display = 'none';
  };

  // Function to delete a donor
  const deleteDonor = (donorIndex) => {
    if (confirm('Are you sure you want to delete this donor?')) {
      donors.splice(donorIndex, 1); // Remove donor from the array
      localStorage.setItem('donors', JSON.stringify(donors)); // Update localStorage
      populateDonorList(); // Re-populate the list after deletion
    }
  };

  // Event listener for showing details
  donorListContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('details-btn') || e.target.closest('.details-btn')) {
      const donorIndex = e.target.closest('.details-btn').getAttribute('data-index');
      showDonorDetails(donorIndex);
    }

    if (e.target.classList.contains('delete-btn') || e.target.closest('.delete-btn')) {
      const donorIndex = e.target.closest('.delete-btn').getAttribute('data-index');
      deleteDonor(donorIndex);
    }
  });

  // Event listener for closing the popup
  document.addEventListener('click', (e) => {
    if (e.target.id === 'closePopup') {
      closePopup();
    }
  });

  // Populate the donor list on page load
  populateDonorList();
});
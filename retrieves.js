// Function to generate reports
function generateReport(period) {
  const unprocessedDonations = JSON.parse(localStorage.getItem('unprocessedDonations')) || [];
  const now = new Date();
  const reportData = { volunteer: 0, replacement: 0 };

  // Filter unprocessed donations based on the selected period
  unprocessedDonations.forEach((donation) => {
    const donationDate = new Date(donation.donationDateTime);
    const timeDiff = now - donationDate;

    if (isWithinPeriod(period, timeDiff)) {
      if (donation.donorType === 'volunteer') {
        reportData.volunteer++;
      } else if (donation.donorType === 'replacement') {
        reportData.replacement++;
      }
    }
  });

  // Display the report
  displayReport(period, reportData);
}

// Helper function to check if a donation falls within the selected period
function isWithinPeriod(period, timeDiff) {
  const dayInMs = 24 * 60 * 60 * 1000;

  switch (period) {
    case 'daily':
      return timeDiff <= dayInMs;
    case 'weekly':
      return timeDiff <= 7 * dayInMs;
    case 'monthly':
      return timeDiff <= 30 * dayInMs;
    case 'quarterly':
      return timeDiff <= 90 * dayInMs;
    case 'yearly':
      return timeDiff <= 365 * dayInMs;
    default:
      return false;
  }
}

// Function to display the report
function displayReport(period, data) {
  // Create a popup for the report
  const reportContainer = document.createElement('div');
  reportContainer.classList.add('popup');
  reportContainer.id = 'reportPopup'; // Assign an ID for printing
  reportContainer.innerHTML = `
    <div class="popup-content">
      <h2>${capitalize(period)} Report</h2>
      <p><strong>Volunteer Donors:</strong> ${data.volunteer}</p>
      <p><strong>Replacement Donors:</strong> ${data.replacement}</p>
      <button onclick="printReport()">Print Report</button>
      <button onclick="closePopup()">Close</button>
    </div>
  `;

  document.body.appendChild(reportContainer);
}

// Function to capitalize the first letter of a word
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Function to print the report
function printReport() {
  const reportContent = document.getElementById('reportPopup').innerHTML;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <html>
      <head>
        <title>Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
          }
          h2 {
            text-align: center;
          }
          p {
            font-size: 16px;
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        ${reportContent}
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// Function to close the popup
function closePopup() {
  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

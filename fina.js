document.addEventListener('DOMContentLoaded', () => {
  // Utility Functions
  const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];
  const saveToLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  // Initialize Listeners
  const summaryTypeSelect = document.getElementById('summaryTypeSelect');
  const bloodSummaryTable = document.getElementById('bloodSummaryTable').getElementsByTagName('tbody')[0];
  const printSection = document.getElementById('printSection');
  const printSummaryButton = document.getElementById('printSummaryButton');
  const summaryContent = document.getElementById('summaryContent');

  // Load and Filter Blood Requests Based on Selected Summary Period
  summaryTypeSelect.addEventListener('change', updateSummary);

  // Initial Summary Load
  updateSummary();

  // Update Summary Based on Selected Period
  function updateSummary() {
    const summaryType = summaryTypeSelect.value;
    const requests = getFromLocalStorage('approvedRequests');

    if (!requests || requests.length === 0) {
      summaryContent.innerHTML = '<h3>No approved requests found.</h3>';
      return;
    }

    // Filter requests based on the selected summary type
    let filteredRequests = filterRequestsByDate(requests, summaryType);
    generateSummaryTable(filteredRequests);
  }

  // Filter Requests by Date
  function filterRequestsByDate(requests, summaryType) {
    const filteredRequests = [];
    const currentDate = new Date();

    requests.forEach(request => {
      const approvedDate = new Date(request.approvedDate);
      const differenceInTime = currentDate - approvedDate;

      switch (summaryType) {
        case 'daily':
          if (differenceInTime <= 24 * 60 * 60 * 1000) {
            filteredRequests.push(request);
          }
          break;
        case 'weekly':
          if (differenceInTime <= 7 * 24 * 60 * 60 * 1000) {
            filteredRequests.push(request);
          }
          break;
        case 'monthly':
          if (differenceInTime <= 30 * 24 * 60 * 60 * 1000) {
            filteredRequests.push(request);
          }
          break;
        case 'quarterly':
          if (differenceInTime <= 90 * 24 * 60 * 60 * 1000) {
            filteredRequests.push(request);
          }
          break;
        case 'yearly':
          if (differenceInTime <= 365 * 24 * 60 * 60 * 1000) {
            filteredRequests.push(request);
          }
          break;
      }
    });

    // Sort requests based on approved date
    filteredRequests.sort((a, b) => new Date(b.approvedDate) - new Date(a.approvedDate));
    return filteredRequests;
  }

  // Generate Summary Table Based on Filtered Requests
  function generateSummaryTable(filteredRequests) {
    bloodSummaryTable.innerHTML = ''; // Clear previous table content

    let bloodTypes = {};

    filteredRequests.forEach(request => {
      const approvedDate = new Date(request.approvedDate);
      const dateFormatted = `${approvedDate.getDate()}/${approvedDate.getMonth() + 1}/${approvedDate.getFullYear()}`;

      if (!bloodTypes[request.bloodType]) {
        bloodTypes[request.bloodType] = { units: 0, priceType: {}, dates: [] };
      }

      bloodTypes[request.bloodType].units += request.units;
      const priceType = request.priceType || 'Unknown';
      if (!bloodTypes[request.bloodType].priceType[priceType]) {
        bloodTypes[request.bloodType].priceType[priceType] = 0;
      }
      bloodTypes[request.bloodType].priceType[priceType] += request.units;

      // Store the approval date for this blood type
      bloodTypes[request.bloodType].dates.push(dateFormatted);
    });

    // Populate Table with Data
    for (const [bloodType, data] of Object.entries(bloodTypes)) {
      const row = bloodSummaryTable.insertRow();
      const cellBloodType = row.insertCell(0);
      const cellUnitsNeeded = row.insertCell(1);
      const cellPriceType = row.insertCell(2);
      const cellApprovalDates = row.insertCell(3);

      // Set the blood type and corresponding colors
      cellBloodType.textContent = bloodType;
      row.classList.add(`blood-type-${bloodType}`);

      // Set Units Needed
      cellUnitsNeeded.textContent = data.units;

      // Set Price Type
      let priceTypeText = '';
      for (const [priceType, units] of Object.entries(data.priceType)) {
        priceTypeText += `${priceType}: ${units} units, `;
      }
      priceTypeText = priceTypeText.slice(0, -2); // Remove trailing comma
      cellPriceType.textContent = priceTypeText;

      // Set Approval Dates
      cellApprovalDates.textContent = data.dates.join(', ');
    }

    // Display Print Section
    printSection.style.display = 'block';
  }

  // Print Summary
  printSummaryButton.addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Blood Donation Summary</title></head><body>');
    printWindow.document.write('<h1>Pamoja Dokita® 2025 - Blood Donation Summary</h1>');
    printWindow.document.write(summaryContent.innerHTML); // Include summary content
    printWindow.document.write('<br><br><h2>Blood Donation Data:</h2>');
    printWindow.document.write(bloodSummaryTable.outerHTML); // Include table content
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  });
});
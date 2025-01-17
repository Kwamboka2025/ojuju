document.addEventListener('DOMContentLoaded', () => {
  const dbName = "BloodRequestDB";
  let db;

  // Open the database
  const openDB = () => {
    const request = indexedDB.open(dbName, 1);

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Database opened successfully!");
      loadClearedRequests(); // Load cleared requests on page load
    };

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
    };
  };

  // Load cleared requests
  const loadClearedRequests = () => {
    const transaction = db.transaction('clearedRequests', 'readonly');
    const store = transaction.objectStore('clearedRequests');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const requests = event.target.result;
      populateFilters(requests);
      displayClearedRequests(requests);
    };
  };

  // Populate blood type filter options dynamically
  const populateFilters = (requests) => {
    const bloodTypeFilter = document.getElementById('bloodTypeFilter');
    const bloodTypes = [...new Set(requests.map((req) => req.bloodType))];
    bloodTypeFilter.innerHTML = '<option value="">All Blood Types</option>';
    bloodTypes.forEach((type) => {
      const option = document.createElement('option');
      option.value = type;
      option.textContent = type;
      bloodTypeFilter.appendChild(option);
    });
  };

  // Display cleared requests with optional filtering
  const displayClearedRequests = (requests, filter = {}) => {
    const tbody = document.getElementById('clearedRequestsList');
    tbody.innerHTML = '';

    const filteredRequests = requests.filter((req) => {
      const matchBloodType = filter.bloodType ? req.bloodType === filter.bloodType : true;
      const matchDate = filter.dateRange ? filter.dateRange(req.timestamp) : true;
      return matchBloodType && matchDate;
    });

    filteredRequests.forEach((req) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${req.recipientName}</td>
        <td>${req.bloodType}</td>
        <td>${req.units}</td>
        <td>${req.timestamp.split('T')[0]}</td>
      `;
      tbody.appendChild(row);
    });
  };

  // Summarize data (daily, weekly, monthly)
  const summarizeData = (requests, range) => {
    const now = new Date();
    const rangeFilter = {
      daily: (date) => new Date(date).toDateString() === now.toDateString(),
      weekly: (date) => {
        const d = new Date(date);
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        return d >= weekStart && d <= weekEnd;
      },
      monthly: (date) => new Date(date).getMonth() === now.getMonth() && new Date(date).getFullYear() === now.getFullYear(),
    };

    const filtered = requests.filter((req) => rangeFilter[range](req.timestamp));
    return filtered.reduce((summary, req) => {
      summary[req.bloodType] = (summary[req.bloodType] || 0) + req.units;
      return summary;
    }, {});
  };

  // Generate and display summaries
  const generateSummary = (requests, range) => {
    const summary = summarizeData(requests, range);
    const summaryDiv = document.getElementById('summary');
    summaryDiv.innerHTML = `<h3>${range.charAt(0).toUpperCase() + range.slice(1)} Summary</h3>`;
    const ul = document.createElement('ul');
    Object.keys(summary).forEach((bloodType) => {
      const li = document.createElement('li');
      li.textContent = `${bloodType}: ${summary[bloodType]} units`;
      ul.appendChild(li);
    });
    summaryDiv.appendChild(ul);
  };

  // Handle filter changes
  const handleFilterChange = () => {
    const bloodType = document.getElementById('bloodTypeFilter').value;
    const dateRange = document.getElementById('dateRange').value;

    const rangeFilter = {
      daily: (date) => new Date(date).toDateString() === new Date().toDateString(),
      weekly: (date) => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        const d = new Date(date);
        return d >= weekStart && d <= weekEnd;
      },
      monthly: (date) => new Date(date).getMonth() === new Date().getMonth(),
    };

    loadClearedRequests();
    const filter = {
      bloodType,
      dateRange: rangeFilter[dateRange] || null,
    };

    const transaction = db.transaction('clearedRequests', 'readonly');
    const store = transaction.objectStore('clearedRequests');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const requests = event.target.result;
      displayClearedRequests(requests, filter);
    };
  };

  // Print summary
  const printSummary = () => {
    window.print();
  };

  // Event listeners
  document.getElementById('filterForm').addEventListener('change', handleFilterChange);
  document.getElementById('printSummary').addEventListener('click', printSummary);

  // Initialize database and load data
  openDB();
});
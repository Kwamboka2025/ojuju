document.addEventListener('DOMContentLoaded', () => {
  const dbName = "BloodRequestDB";
  let db;

  // Open the database
  const openDB = () => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains('approvedRequests')) {
        db.createObjectStore('approvedRequests', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('completedRequests')) {
        db.createObjectStore('completedRequests', { keyPath: 'id', autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      console.log("Database opened successfully!");
      loadApprovedRequests();
    };

    request.onerror = (event) => {
      console.error("Database error:", event.target.errorCode);
    };
  };

  // Load approved requests
  const loadApprovedRequests = () => {
    const transaction = db.transaction('approvedRequests', 'readonly');
    const store = transaction.objectStore('approvedRequests');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const requests = event.target.result;
      const tbody = document.getElementById('approvedRequestsList');

      tbody.innerHTML = '';
      requests.forEach((req) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${req.recipientName}</td>
          <td>${req.bloodType}</td>
          <td>${req.units}</td>
          <td>${req.urgency}</td>
          <td>
            <button class="complete-btn" data-id="${req.id}">Move to Completed</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Ensure that buttons work after dynamically adding them
      document.querySelectorAll('.complete-btn').forEach((btn) =>
        btn.addEventListener('click', moveToCompleted)
      );
    };
  };

  // Handle moving a request to completed
  const moveToCompleted = (event) => {
    const id = Number(event.target.dataset.id);
    const transaction = db.transaction(['approvedRequests', 'completedRequests'], 'readwrite');
    const approvedStore = transaction.objectStore('approvedRequests');
    const completedStore = transaction.objectStore('completedRequests');

    const getRequest = approvedStore.get(id);

    getRequest.onsuccess = (event) => {
      const data = event.target.result;
      completedStore.add(data);
      approvedStore.delete(id);
      loadApprovedRequests();
      loadCompletedRequests();
    };
  };

  // Load completed requests
  const loadCompletedRequests = () => {
    const transaction = db.transaction('completedRequests', 'readonly');
    const store = transaction.objectStore('completedRequests');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const requests = event.target.result;
      const tbody = document.getElementById('completedRequestsList');

      tbody.innerHTML = '';
      requests.forEach((req) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${req.recipientName}</td>
          <td>${req.bloodType}</td>
          <td>${req.units}</td>
          <td>${req.urgency}</td>
        `;
        tbody.appendChild(row);
      });
    };
  };

  // Initialize the database and load data
  openDB();
});
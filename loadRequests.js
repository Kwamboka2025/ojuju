document.addEventListener('DOMContentLoaded', () => {
  const dbName = "BloodRequestDB";
  let db;

  // Open IndexedDB
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Create object stores if they don't exist
    if (!db.objectStoreNames.contains('requests')) {
      db.createObjectStore('requests', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('approvedRequests')) {
      db.createObjectStore('approvedRequests', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('deniedRequests')) {
      db.createObjectStore('deniedRequests', { keyPath: 'id', autoIncrement: true });
    }
    if (!db.objectStoreNames.contains('clearedRequests')) {
      db.createObjectStore('clearedRequests', { keyPath: 'id', autoIncrement: true });
    }
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully!");
    loadRequests(); // Load requests into the table
  };

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.errorCode);
  };

  // Function to load requests into the table
  const loadRequests = () => {
    const transaction = db.transaction('requests', 'readonly');
    const store = transaction.objectStore('requests');
    const request = store.getAll();

    request.onsuccess = (event) => {
      const requests = event.target.result;
      const tbody = document.querySelector('#requestList tbody');

      // Clear any existing rows
      tbody.innerHTML = '';

      // Populate table with data
      requests.forEach((request) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${request.recipientName}</td>
          <td>${request.bloodType}</td>
          <td>${request.units}</td>
          <td>${request.urgency}</td>
          <td>
            <button class="view-btn" data-id="${request.id}"><i class="fa fa-eye"></i> View</button>
            <button class="approve-btn" data-id="${request.id}"><i class="fa fa-check"></i> Approve</button>
            <button class="deny-btn" data-id="${request.id}"><i class="fa fa-times"></i> Deny</button>
            <button class="clear-btn" data-id="${request.id}"><i class="fa fa-archive"></i> Clear</button>
          </td>
        `;
        tbody.appendChild(row);
      });

      // Add event listeners for buttons
      document.querySelectorAll('.view-btn').forEach((btn) =>
        btn.addEventListener('click', handleView)
      );
      document.querySelectorAll('.approve-btn').forEach((btn) =>
        btn.addEventListener('click', handleApprove)
      );
      document.querySelectorAll('.deny-btn').forEach((btn) =>
        btn.addEventListener('click', handleDeny)
      );
      document.querySelectorAll('.clear-btn').forEach((btn) =>
        btn.addEventListener('click', handleClear)
      );
    };

    request.onerror = (event) => {
      console.error("Error loading requests:", event.target.errorCode);
    };
  };

  // Function to handle viewing a request
  const handleView = (event) => {
    const id = Number(event.target.dataset.id);

    const transaction = db.transaction('requests', 'readonly');
    const store = transaction.objectStore('requests');
    const getRequest = store.get(id);

    getRequest.onsuccess = (event) => {
      const data = event.target.result;
      if (data) {
        showViewModal(data);
      } else {
        console.error("Request data not found for ID:", id);
      }
    };

    getRequest.onerror = (event) => {
      console.error("Error retrieving request data:", event.target.errorCode);
    };
  };

  // Function to display the View Modal
  const showViewModal = (data) => {
    const modal = document.getElementById('viewModal');
    if (!modal) {
      console.error("View modal not found!");
      return;
    }

    // Populate modal with data
    document.getElementById('viewRecipientName').textContent = data.recipientName || 'N/A';
    document.getElementById('viewBloodType').textContent = data.bloodType || 'N/A';
    document.getElementById('viewUnits').textContent = data.units || 'N/A';
    document.getElementById('viewUrgency').textContent = data.urgency || 'N/A';
    document.getElementById('viewReason').textContent = data.reasons || 'Not Provided';

    modal.style.display = 'block'; // Show the modal

    // Close button functionality
    document.getElementById('closeViewModal').onclick = () => {
      modal.style.display = 'none'; // Hide the modal
    };
  };

  // Function to handle approving a request
  const handleApprove = (event) => {
    const id = Number(event.target.dataset.id);
    moveRequest(id, 'requests', 'approvedRequests');
  };

  // Function to handle denying a request
  const handleDeny = (event) => {
    const id = Number(event.target.dataset.id);
    showDenyModal(id);
  };

  // Function to show deny modal
  const showDenyModal = (id) => {
    const modal = document.getElementById('denyModal');
    modal.style.display = 'block';

    // Confirm deny button click
    const confirmDeny = document.getElementById('confirmDeny');
    confirmDeny.onclick = () => {
      const selectedReasons = Array.from(document.getElementById('denyReason').selectedOptions)
        .map(option => option.value)
        .join(', ');

      if (selectedReasons) {
        moveRequestWithReason(id, 'requests', 'deniedRequests', { reasons: selectedReasons });
        modal.style.display = 'none';
      } else {
        alert('Please select at least one reason for denial.');
      }
    };

    // Cancel deny button click
    const cancelDeny = document.getElementById('cancelDeny');
    cancelDeny.onclick = () => {
      modal.style.display = 'none';
    };
  };

  // Function to handle clearing a request
  const handleClear = (event) => {
    const id = Number(event.target.dataset.id);
    moveRequest(id, 'requests', 'clearedRequests');
  };

  // Function to move a request
  const moveRequest = (id, sourceStore, targetStore) => {
    const transaction = db.transaction([sourceStore, targetStore], 'readwrite');
    const source = transaction.objectStore(sourceStore);
    const target = transaction.objectStore(targetStore);

    const getRequest = source.get(id);

    getRequest.onsuccess = (event) => {
      const data = event.target.result;
      if (data) {
        const addRequest = target.add(data);
        addRequest.onsuccess = () => {
          const deleteRequest = source.delete(id);
          deleteRequest.onsuccess = () => {
            loadRequests();
          };
        };
      }
    };

    getRequest.onerror = (event) => {
      console.error("Error moving request:", event.target.errorCode);
    };
  };

  // Function to move a request with additional data (e.g., reasons for denial)
  const moveRequestWithReason = (id, sourceStore, targetStore, additionalData) => {
    const transaction = db.transaction([sourceStore, targetStore], 'readwrite');
    const source = transaction.objectStore(sourceStore);
    const target = transaction.objectStore(targetStore);

    const getRequest = source.get(id);

    getRequest.onsuccess = (event) => {
      const data = { ...event.target.result, ...additionalData };
      const addRequest = target.add(data);
      addRequest.onsuccess = () => {
        const deleteRequest = source.delete(id);
        deleteRequest.onsuccess = () => {
          loadRequests();
        };
      };
    };

    getRequest.onerror = (event) => {
      console.error("Error moving request with reason:", event.target.errorCode);
    };
  };
});
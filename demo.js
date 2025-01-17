document.addEventListener('DOMContentLoaded', () => {
  const dbName = "BloodRequestDB";
  const dbVersion = 1;
  let db;

  // Open IndexedDB
  const request = indexedDB.open(dbName, dbVersion);

  // Handle database creation or upgrade
  request.onupgradeneeded = (event) => {
    db = event.target.result;

    // Create object stores if they don't already exist
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
    if (!db.objectStoreNames.contains('sumup')) {
      db.createObjectStore('sumup', { keyPath: 'id', autoIncrement: true });
    }
    console.log("Object stores created successfully!");
  };

  request.onsuccess = (event) => {
    db = event.target.result;
    console.log("Database opened successfully!");
  };

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.errorCode);
  };

  // Example function to add a request to the 'requests' store
  const addRequest = (data) => {
    const transaction = db.transaction('requests', 'readwrite');
    const store = transaction.objectStore('requests');
    const request = store.add(data);

    request.onsuccess = () => {
      console.log("Request added successfully!");
    };

    request.onerror = (event) => {
      console.error("Error adding request:", event.target.errorCode);
    };
  };

  const form = document.querySelector('form');
  const dobInput = form.querySelector('#dob'); // Reference to the DOB input
  const ageInput = form.querySelector('#age'); // Reference to the Age input

  // Function to calculate age from the Date of Birth
  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dobDate.getDate())) {
      age--; // If birthday hasn't occurred yet this year, subtract one year
    }
    return age;
  };

  // Event listener to update the age field when the DOB changes
  dobInput.addEventListener('change', (event) => {
    const dob = event.target.value;
    if (dob) {
      const calculatedAge = calculateAge(dob);
      ageInput.value = calculatedAge; // Set the calculated age in the input field
    } else {
      ageInput.value = ''; // If DOB is cleared, reset age
    }
  });

  // Form submission handler
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect form data
    const formData = {
      recipientName: form.recipientName.value,
      age: form.age.value,
      bloodType: form.bloodType.value,
      units: form.units.value,
      gender: form.gender.value,
      hospital: form.hospital.value,
      doctor: form.doctor.value,
      contactHospital: form.contactHospital.value,
      location: form.location.value,
      urgency: form.urgency.value,
      reason: form.reason.value,
      timestamp: new Date().toISOString(),
    };

    // Add the data to the 'requests' object store
    addRequest(formData);

    // Clear the form
    form.reset();
  });
});
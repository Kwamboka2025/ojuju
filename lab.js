document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById("bloodForm");
  const unitNumberField = document.getElementById("unitNumber");
  const successMessage = document.createElement("p");
  successMessage.style.color = "green";
  successMessage.style.display = "none";
  form.appendChild(successMessage);

  // Function to generate unit number (e.g., 202501050001)
  function generateUnitNumber() {
    const currentDate = new Date();
    const dateString = currentDate.getFullYear().toString() +
      (currentDate.getMonth() + 1).toString().padStart(2, "0") +
      currentDate.getDate().toString().padStart(2, "0");
    const existingEntries = JSON.parse(localStorage.getItem("bloodDonations")) || [];
    const todayEntries = existingEntries.filter(entry => entry.unitNumber.startsWith(dateString));
    const nextEntryNumber = todayEntries.length + 1;
    const unitNumber = dateString + nextEntryNumber.toString().padStart(4, "0");
    return unitNumber;
  }

  // Function to save form data to localStorage
  function saveToLocalStorage(formData) {
    const bloodDonations = JSON.parse(localStorage.getItem("bloodDonations")) || [];
    bloodDonations.push(formData);
    localStorage.setItem("bloodDonations", JSON.stringify(bloodDonations));
  }

  // Add placeholders as dummy data for guidance
  function addPlaceholders() {
    document.getElementById("donorID").placeholder = "e.g., DNR12345";
    document.getElementById("donationDate").placeholder = "YYYY-MM-DD";
    document.getElementById("componentType").placeholder = "e.g., Plasma";
    document.getElementById("bloodGroup").placeholder = "e.g., A, B, AB, O";
    document.getElementById("volume").placeholder = "e.g., 450";
    document.getElementById("otherTests").placeholder = "e.g., Malaria test";
    document.getElementById("plasmaFrozenDate").placeholder = "YYYY-MM-DD";
    document.getElementById("rbcProcessingDate").placeholder = "YYYY-MM-DD";
    document.getElementById("storageTemperature").placeholder = "e.g., -20°C";
    document.getElementById("expirationDate").placeholder = "YYYY-MM-DD";
    document.getElementById("storageLocation").placeholder = "e.g., Freezer A1";
    document.getElementById("releaseDate").placeholder = "YYYY-MM-DD";
    document.getElementById("recipientID").placeholder = "e.g., RCP67890";
    document.getElementById("compatibilityCheckBy").placeholder = "e.g., Dr. John Doe";
    document.getElementById("inspectedBy").placeholder = "e.g., Nurse Jane Doe";
    document.getElementById("remarks").placeholder = "e.g., All tests clear";
    document.getElementById("authorizedBy").placeholder = "e.g., Supervisor";
  }

  // Display success message after saving
  function displaySuccessMessage() {
    successMessage.textContent = "Data saved successfully!";
    successMessage.style.display = "block";

    // Hide the message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }

  // Handle form submission
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {
      donorID: document.getElementById("donorID").value,
      donationDate: document.getElementById("donationDate").value,
      donationType: document.querySelector('input[name="donationType"]:checked').value,
      componentType: document.getElementById("componentType").value,
      unitNumber: generateUnitNumber(),
      bloodGroup: document.getElementById("bloodGroup").value,
      rhFactor: document.querySelector('input[name="rhFactor"]:checked').value,
      volume: document.getElementById("volume").value,
      hiv: document.querySelector('input[name="hiv"]:checked').value,
      hepatitisB: document.querySelector('input[name="hepatitisB"]:checked').value,
      hepatitisC: document.querySelector('input[name="hepatitisC"]:checked').value,
      syphilis: document.querySelector('input[name="syphilis"]:checked').value,
      otherTests: document.getElementById("otherTests").value,
      plasmaFrozenDate: document.getElementById("plasmaFrozenDate").value,
      rbcProcessingDate: document.getElementById("rbcProcessingDate").value,
      storageTemperature: document.getElementById("storageTemperature").value,
      expirationDate: document.getElementById("expirationDate").value,
      storageLocation: document.getElementById("storageLocation").value,
      releaseDate: document.getElementById("releaseDate").value,
      recipientID: document.getElementById("recipientID").value,
      compatibilityCheckBy: document.getElementById("compatibilityCheckBy").value,
      inspectedBy: document.getElementById("inspectedBy").value,
      remarks: document.getElementById("remarks").value,
      authorizedBy: document.getElementById("authorizedBy").value
    };

    // Save data to localStorage
    saveToLocalStorage(formData);

    // Display success message
    displaySuccessMessage();

    // Clear the form fields
    form.reset();

    // Generate and display the new unit number
    unitNumberField.value = generateUnitNumber();
  });

  // Add placeholders when the page loads
  addPlaceholders();
});

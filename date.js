// Toggle "Other" entry fee input visibility
document.getElementById('entry-fee').addEventListener('change', function() {
  const otherFeeOption = document.getElementById('entry-fee').value === 'Other';
  const otherFeeContainer = document.getElementById('other-fee-container');

  // Show "Other" fee input field if selected
  if (otherFeeOption) {
    otherFeeContainer.style.display = 'block';
  } else {
    otherFeeContainer.style.display = 'none';
  }
});

// Event Form submission - Dynamic Event Addition with Local Storage
document.getElementById('add-event-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const eventName = document.getElementById('event-name').value;
  const eventDate = document.getElementById('event-date').value;
  const eventTime = document.getElementById('event-time').value;
  const eventLocation = document.getElementById('event-location').value;
  const eventDescription = document.getElementById('event-description').value;
  const eventType = document.getElementById('event-type').value;
  const eventSlots = document.getElementById('event-slots').value;
  const entryFee = document.getElementById('entry-fee').value === 'Other' ?
    document.getElementById('other-fee').value :
    document.getElementById('entry-fee').value;

  // Check if the mandatory fields are filled
  if (!eventName || !eventDate || !eventTime || !eventLocation || !eventDescription || !eventSlots || !entryFee) {
    alert("Please fill in all required fields!");
    return;
  }

  // Create event object
  const eventData = {
    name: eventName,
    date: eventDate,
    time: eventTime,
    location: eventLocation,
    description: eventDescription,
    type: eventType,
    slots: eventSlots,
    fee: entryFee
  };

  // Save event to local storage
  let events = JSON.parse(localStorage.getItem('events')) || [];
  events.push(eventData);
  localStorage.setItem('events', JSON.stringify(events));

  // Update the events table with the new event
  displayEvents();

  // Reset form and hide "Other" fee input after submission
  document.getElementById('add-event-form').reset();
  document.getElementById('other-fee-container').style.display = 'none';
});

// Display Events from local storage
function displayEvents() {
  const events = JSON.parse(localStorage.getItem('events')) || [];
  const eventsTableBody = document.querySelector('#events-table tbody');
  eventsTableBody.innerHTML = ''; // Clear existing rows

  // Display events dynamically
  events.forEach(event => {
    const eventRow = document.createElement('tr');
    eventRow.innerHTML = `
      <td>${event.date}</td>
      <td>${event.name}</td>
      <td>${event.location}</td>
      <td>${event.time}</td>
      <td>${event.slots}</td>
      <td>Ksh ${event.fee}</td>
      <td><button onclick="showEventDetails(${JSON.stringify(event)})">View</button></td>
    `;
    eventsTableBody.appendChild(eventRow);
  });
}

// View Event Details Modal
function showEventDetails(event) {
  const modal = document.getElementById("event-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDate = document.getElementById("modal-date");
  const modalTime = document.getElementById("modal-time");
  const modalLocation = document.getElementById("modal-location");
  const modalDescription = document.getElementById("modal-description");
  const modalSlots = document.getElementById("modal-slots");
  const modalFee = document.getElementById("modal-fee");

  modalTitle.innerText = event.name;
  modalDate.innerText = event.date;
  modalTime.innerText = event.time;
  modalLocation.innerText = event.location;
  modalDescription.innerText = event.description;
  modalSlots.innerText = event.slots;
  modalFee.innerText = event.fee;

  modal.style.display = "block";
}

// Close the modal when the close button is clicked
document.getElementsByClassName("close-btn")[0].onclick = function() {
  document.getElementById("event-modal").style.display = "none";
}

// Close the modal when clicked outside
window.onclick = function(event) {
  if (event.target === document.getElementById("event-modal")) {
    document.getElementById("event-modal").style.display = "none";
  }
}

// Donation Progress Bar Update with Local Storage
document.getElementById('progress-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get donation progress input value
  const donationCount = parseInt(document.getElementById('donations').value);
  let currentProgress = parseInt(localStorage.getItem('progress')) || 0;

  // Calculate the new progress (each donation adds 5% progress)
  const newProgress = currentProgress + (donationCount * 5);
  currentProgress = newProgress > 100 ? 100 : newProgress;

  // Save updated progress to local storage
  localStorage.setItem('progress', currentProgress);

  // Update progress bar visually
  document.getElementById('progress-bar').style.width = `${currentProgress}%`;

  // Clear the donation input field
  document.getElementById('donations').value = '';
});

// Initialize progress bar and events from local storage
document.addEventListener('DOMContentLoaded', function() {
  // Display stored progress bar value
  const progress = parseInt(localStorage.getItem('progress')) || 0;
  document.getElementById('progress-bar').style.width = `${progress}%`;

  // Display stored events in the events table
  displayEvents();
});
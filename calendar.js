// Initialize variables
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

// Function to display the calendar with events
function createCalendar(month, year) {
  const calendarContainer = document.getElementById('calendar-container');
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const monthName = monthNames[month];

  // Update calendar header
  document.getElementById('month-name').textContent = `${monthName} ${year}`;

  // Clear previous calendar days
  calendarContainer.innerHTML = '';

  // Calculate the first day of the month
  const firstDay = new Date(year, month, 1);
  const firstDayIndex = firstDay.getDay();

  // Get the number of days in the month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Create empty slots for the first day of the month
  for (let i = 0; i < firstDayIndex; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.classList.add('calendar-day');
    calendarContainer.appendChild(emptyCell);
  }

  // Add day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement('div');
    dayCell.classList.add('calendar-day');
    dayCell.textContent = day;
    dayCell.id = `day-${year}-${month + 1}-${day}`;
    dayCell.setAttribute('data-date', `${year}-${month + 1}-${day}`);

    // Check if there's an event on this day and highlight it
    if (hasEvent(year, month + 1, day)) {
      dayCell.classList.add('event');
      dayCell.addEventListener('click', function() {
        showEventDetails(year, month + 1, day);
      });
    }

    calendarContainer.appendChild(dayCell);
  }
}

// Event storage
function getEvents() {
  return JSON.parse(localStorage.getItem('events')) || [];
}

// Check if there is an event on a given date
function hasEvent(year, month, day) {
  const events = getEvents();
  return events.some(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month && eventDate.getDate() === day;
  });
}

// Show event details in modal
function showEventDetails(year, month, day) {
  const events = getEvents();
  const event = events.find(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() + 1 === month && eventDate.getDate() === day;
  });

  if (event) {
    const modal = document.getElementById("event-modal");
    document.getElementById("modal-title").innerText = event.name;
    document.getElementById("modal-date").innerText = event.date;
    document.getElementById("modal-time").innerText = event.time;
    document.getElementById("modal-location").innerText = event.location;
    document.getElementById("modal-description").innerText = event.description;
    document.getElementById("modal-slots").innerText = event.slots;
    document.getElementById("modal-fee").innerText = event.fee;

    modal.style.display = "block";
  }
}

// Close modal
document.getElementsByClassName("close-btn")[0].onclick = function() {
  document.getElementById("event-modal").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  if (event.target === document.getElementById("event-modal")) {
    document.getElementById("event-modal").style.display = "none";
  }
}

// Navigation buttons
document.getElementById('prev-month').addEventListener('click', function() {
  currentMonth = (currentMonth - 1 + 12) % 12;
  currentYear = currentMonth === 11 ? currentYear - 1 : currentYear;
  createCalendar(currentMonth, currentYear);
});

document.getElementById('next-month').addEventListener('click', function() {
  currentMonth = (currentMonth + 1) % 12;
  currentYear = currentMonth === 0 ? currentYear + 1 : currentYear;
  createCalendar(currentMonth, currentYear);
});

// Event form submission
document.getElementById('add-event-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const eventName = document.getElementById('event-name').value;
  const eventDate = document.getElementById('event-date').value;
  const eventTime = document.getElementById('event-time').value;
  const eventLocation = document.getElementById('event-location').value;
  const eventDescription = document.getElementById('event-description').value;
  const eventSlots = document.getElementById('event-slots').value;
  const entryFee = document.getElementById('entry-fee').value;

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
    slots: eventSlots,
    fee: entryFee
  };

  // Save event to local storage
  let events = getEvents();
  events.push(eventData);
  localStorage.setItem('events', JSON.stringify(events));

  // Update calendar with new event
  createCalendar(currentMonth, currentYear);

  // Reset form
  document.getElementById('add-event-form').reset();
});

// Initialize the calendar
createCalendar(currentMonth, currentYear);
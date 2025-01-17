document.addEventListener('DOMContentLoaded', () => {
  // Get donor data from localStorage
  const donors = JSON.parse(localStorage.getItem('donors')) || [];

  // Calculate the total number of donors
  const totalDonors = donors.length;

  // Display the total number of donors in the "Today's Donations" section
  const todaysDonationsElement = document.querySelector('#todays-donations');
  if (todaysDonationsElement) {
    todaysDonationsElement.textContent = totalDonors;
  }
});
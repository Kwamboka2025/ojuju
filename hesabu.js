document.addEventListener('DOMContentLoaded', function () {
  function updatePendingRequestsCount() {
    // Retrieve the requests from localStorage
    const requests = JSON.parse(localStorage.getItem('bloodRequests')) || [];
    
    // Update the pending requests count dynamically
    document.getElementById('pending-requests-count').textContent = requests.length;
  }

  // Call the function on page load
  updatePendingRequestsCount();
});
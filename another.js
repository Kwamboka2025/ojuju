document.addEventListener('DOMContentLoaded', () => {
  // Utility function to get data from Local Storage
  const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

  // Update Counters for Recent and Approved Requests
  function updateRequestCounters() {
    const recentRequests = getFromLocalStorage('bloodRequests');
    const approvedRequests = getFromLocalStorage('approvedRequests');

    // Update the count of recent and approved requests in the DOM
    document.getElementById('recentCount').textContent = `Recent Requests: ${recentRequests.length}`;
    document.getElementById('approvedCount').textContent = `Approved Requests: ${approvedRequests.length}`;
  }

  // Call the updateRequestCounters function to set the initial counts
  updateRequestCounters();
});
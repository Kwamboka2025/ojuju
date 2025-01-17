// Function to count the number of records in the processing list
function countProcessingRecords() {
  const processingList = JSON.parse(localStorage.getItem('processingList')) || [];
  return processingList.length;
}

// Example usage of counting records and displaying it
function displayProcessingRecordCount() {
  const recordCount = countProcessingRecords();
  document.getElementById('recordCountDisplay').textContent = `Number of processed donations: ${recordCount}`;
}

// Call the display function when the page is loaded or updated
window.onload = function() {
  updateDonorDropdown();
  displayProcessingList();
  displayProcessingRecordCount(); // Display the record count on page load

  document.getElementById('processButton').addEventListener('click', startProcessing);
  document.getElementById('saveProcessingDetails').addEventListener('click', saveProcessingDetails);
};
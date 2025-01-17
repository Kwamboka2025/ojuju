// Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", function() {
  // Get the form element
  const donorForm = document.getElementById('donorForm');

  // Listen for form submission
  donorForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting traditionally

    // Create an object to hold form data
    const formData = {};

    // Collect data from text inputs
    formData.lastName = document.getElementById('lastName').value;
    formData.firstName = document.getElementById('firstName').value;
    formData.phone = document.getElementById('phone').value;
    formData.dob = document.getElementById('dob').value;
    formData.age = document.getElementById('age').value;
    formData.residence = document.getElementById('residence').value;
    formData.donorType = document.getElementById('donorType').value;

    // Collect data from radio buttons
    formData.medicalProblems = document.querySelector('input[name="medicalProblems"]:checked') ? document.querySelector('input[name="medicalProblems"]:checked').value : '';
    formData.pregnancy = document.querySelector('input[name="pregnancy"]:checked') ? document.querySelector('input[name="pregnancy"]:checked').value : '';
    formData.cancerTreatment = document.querySelector('input[name="cancerTreatment"]:checked') ? document.querySelector('input[name="cancerTreatment"]:checked').value : '';
    formData.allergies = document.querySelector('input[name="allergies"]:checked') ? document.querySelector('input[name="allergies"]:checked').value : '';
    formData.chronicConditions = document.querySelector('input[name="chronicConditions"]:checked') ? document.querySelector('input[name="chronicConditions"]:checked').value : '';
    formData.recentSurgeries = document.querySelector('input[name="recentSurgeries"]:checked') ? document.querySelector('input[name="recentSurgeries"]:checked').value : '';
    formData.bloodDisorders = document.querySelector('input[name="bloodDisorders"]:checked') ? document.querySelector('input[name="bloodDisorders"]:checked').value : '';
    formData.currentMedications = document.querySelector('input[name="currentMedications"]:checked') ? document.querySelector('input[name="currentMedications"]:checked').value : '';
    formData.organTransplant = document.querySelector('input[name="organTransplant"]:checked') ? document.querySelector('input[name="organTransplant"]:checked').value : '';
    formData.pregnantBreastfeeding = document.querySelector('input[name="pregnantBreastfeeding"]:checked') ? document.querySelector('input[name="pregnantBreastfeeding"]:checked').value : '';

    // Collect text area data
    formData.medicalProblemsDetails = document.getElementById('medicalProblemsDetails').value;
    formData.allergiesDetails = document.getElementById('allergiesDetails').value;
    formData.chronicConditionsDetails = document.getElementById('chronicConditionsDetails').value;
    formData.recentSurgeriesDetails = document.getElementById('recentSurgeriesDetails').value;
    formData.currentMedicationsDetails = document.getElementById('currentMedicationsDetails').value;
    formData.recentVaccinationsDetails = document.getElementById('recentVaccinationsDetails').value;
    formData.hivHepatitisDetails = document.getElementById('hivHepatitisDetails').value;
    formData.donationReactionsDetails = document.getElementById('donationReactionsDetails').value;

    // Collect donation data
    formData.previousDonation = document.querySelector('input[name="previousDonation"]:checked') ? document.querySelector('input[name="previousDonation"]:checked').value : '';
    formData.donationReactions = document.querySelector('input[name="donationReactions"]:checked') ? document.querySelector('input[name="donationReactions"]:checked').value : '';
    formData.currentHealthStatus = document.querySelector('input[name="currentHealthStatus"]:checked') ? document.querySelector('input[name="currentHealthStatus"]:checked').value : '';
    formData.voluntaryDonation = document.querySelector('input[name="voluntaryDonation"]:checked') ? document.querySelector('input[name="voluntaryDonation"]:checked').value : '';
    formData.accuracyConfirmation = document.querySelector('input[name="accuracyConfirmation"]:checked') ? document.querySelector('input[name="accuracyConfirmation"]:checked').value : '';

    // Log the collected data (or send it to a server)
    console.log(formData);

    // Optional: Show an alert with the captured data
    alert("Thank you for submitting your information. Please check the console for details.");
  });
});
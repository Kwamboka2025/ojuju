document.addEventListener('DOMContentLoaded', () => {
  const approvedBlood = JSON.parse(localStorage.getItem('approvedBlood')) || [];

  // Function to calculate units per blood group
  const calculateBloodUnits = () => {
    const bloodUnits = {
      'A+': 0,
      'A-': 0,
      'B+': 0,
      'B-': 0,
      'O+': 0,
      'O-': 0,
      'AB+': 0,
      'AB-': 0,
    };

    // Loop through approved donations and calculate total units for each blood group
    approvedBlood.forEach(donation => {
      if (donation.bloodGroup in bloodUnits) {
        bloodUnits[donation.bloodGroup] += parseInt(donation.units, 10); // Adding units
      }
    });

    return bloodUnits;
  };

  // Function to update the blood availability display
  const updateBloodAvailability = () => {
    const bloodUnits = calculateBloodUnits();

    // Update the displayed values for each blood type
    document.getElementById('A-plus-units').textContent = bloodUnits['A+'];
    document.getElementById('A-minus-units').textContent = bloodUnits['A-'];
    document.getElementById('B-plus-units').textContent = bloodUnits['B+'];
    document.getElementById('B-minus-units').textContent = bloodUnits['B-'];
    document.getElementById('O-plus-units').textContent = bloodUnits['O+'];
    document.getElementById('O-minus-units').textContent = bloodUnits['O-'];
    document.getElementById('AB-plus-units').textContent = bloodUnits['AB+'];
    document.getElementById('AB-minus-units').textContent = bloodUnits['AB-'];
  };

  // Call the function to update the blood availability when the page loads
  updateBloodAvailability();
});
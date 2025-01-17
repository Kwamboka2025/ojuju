document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');

    // Define form fields
    const fields = {
        lastName: main.querySelector('#lastName'),
        firstName: main.querySelector('#firstName'),
        phone: main.querySelector('#phone'),
        dob: main.querySelector('#dob'),
        age: main.querySelector('#age'),
        residence: main.querySelector('#residence'),
        donorType: main.querySelector('#donorType'),
        medicalProblems: main.querySelector('#medicalProblemsYes'),
        medicalProblemsDetails: main.querySelector('#medicalProblemsDetails'),
        pregnancy: main.querySelector('#pregnancyYes'),
        cancerTreatment: main.querySelector('#cancerTreatmentYes'),
        allergies: main.querySelector('#allergiesYes'),
        allergiesDetails: main.querySelector('#allergiesDetails'),
        chronicConditions: main.querySelector('#chronicConditionsYes'),
        chronicConditionsDetails: main.querySelector('#chronicConditionsDetails'),
        recentSurgeries: main.querySelector('#recentSurgeriesYes'),
        recentSurgeriesDetails: main.querySelector('#recentSurgeriesDetails'),
        bloodDisorders: main.querySelector('#bloodDisordersYes'),
        bloodDisordersDetails: main.querySelector('#bloodDisordersDetails'),
        currentMedications: main.querySelector('#currentMedicationsYes'),
        currentMedicationsDetails: main.querySelector('#currentMedicationsDetails'),
        organTransplant: main.querySelector('#organTransplantYes'),
        pregnantBreastfeeding: main.querySelector('#pregnantBreastfeedingYes'),
        recentVaccinations: main.querySelector('#recentVaccinationsYes'),
        recentVaccinationsDetails: main.querySelector('#recentVaccinationsDetails'),
        hivHepatitis: main.querySelector('#hivHepatitisYes'),
        hivHepatitisDetails: main.querySelector('#hivHepatitisDetails'),
        sexualContact: main.querySelector('#sexualContactYes'),
        illicitDrugs: main.querySelector('#illicitDrugsYes'),
        contagiousContact: main.querySelector('#contagiousContactYes'),
        previousDonation: main.querySelector('#previousDonationYes'),
        lastDonationDate: main.querySelector('#lastDonationDate'),
        donationReactions: main.querySelector('#donationReactionsYes'),
        donationReactionsDetails: main.querySelector('#donationReactionsDetails'),
        currentHealthStatus: main.querySelector('#currentHealthStatusYes'),
        voluntaryDonation: main.querySelector('#voluntaryDonationYes'),
        accuracyConfirmation: main.querySelector('#accuracyConfirmationYes'),
        signatureInput: main.querySelector('#signatureInput'),
        dateInput: main.querySelector('#dateInput'),
        submitButton: main.querySelector('button[type="submit"]'),
    };

    // Validation to ensure all required fields are completed
    const validateForm = () => {
        if (!fields.firstName.value.trim() || !fields.lastName.value.trim()) {
            alert("First and last names are required.");
            return false;
        }
        return true;
    };

    // Save donor data to localStorage
    const saveDonorData = () => {
        const donorData = {};
        for (const key in fields) {
            if (fields[key].type === "radio" || fields[key].type === "checkbox") {
                donorData[key] = fields[key].checked ? fields[key].value : null;
            } else {
                donorData[key] = fields[key].value || null;
            }
        }

        // Retrieve the existing donors list or initialize it
        const donors = JSON.parse(localStorage.getItem('donors')) || [];

        // Add new donor to the list
        donors.push(donorData);

        // Save the updated list back to localStorage
        localStorage.setItem('donors', JSON.stringify(donors));
        alert("Donor details saved successfully!");
    };

    // Event listener for form submission
    fields.submitButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (validateForm()) {
            if (confirm("Are you sure you want to save the donor details?")) {
                saveDonorData();
            }
        }
    });
});

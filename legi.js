document.addEventListener("DOMContentLoaded", function () {
    const bloodTable = document.createElement("table");
    bloodTable.classList.add("blood-table");
    document.body.appendChild(bloodTable);

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

    // Function to display saved data
    function displaySavedData() {
        const bloodDonations = JSON.parse(localStorage.getItem("bloodDonations")) || [];
        if (bloodDonations.length === 0) {
            bloodTable.innerHTML = "<p>No donations recorded yet.</p>";
            return;
        }

        // Clear the table before displaying new data
        bloodTable.innerHTML = "";

        // Create table header
        const tableHeader = document.createElement("tr");
        tableHeader.innerHTML = `
            <th>Unit Number</th>
            <th>Donor ID</th>
            <th>Donation Date</th>
            <th>Blood Type</th>
            <th>Component Type</th>
            <th>Volume (mL)</th>
            <th>Actions</th>
        `;
        bloodTable.appendChild(tableHeader);

        // Create rows for each saved donation
        bloodDonations.forEach(donation => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${donation.unitNumber}</td>
                <td>${donation.donorID}</td>
                <td>${donation.donationDate}</td>
                <td>${donation.bloodGroup}</td>
                <td>${donation.componentType}</td>
                <td>${donation.volume}</td>
                <td>
                    <button class="view-btn" onclick="viewDonation('${donation.unitNumber}')">View</button>
                    <button class="delete-btn" onclick="deleteDonation('${donation.unitNumber}')">Delete</button>
                </td>
            `;
            bloodTable.appendChild(row);
        });
    }

    // Function to view a single donation record
    window.viewDonation = function (unitNumber) {
        const bloodDonations = JSON.parse(localStorage.getItem("bloodDonations")) || [];
        const donation = bloodDonations.find(item => item.unitNumber === unitNumber);

        if (!donation) {
            alert("Donation not found.");
            return;
        }

        // Create a popup to display the donation details
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Donation Details</h2>
                <p><strong>Unit Number:</strong> ${donation.unitNumber}</p>
                <p><strong>Donor ID:</strong> ${donation.donorID}</p>
                <p><strong>Donation Date:</strong> ${donation.donationDate}</p>
                <p><strong>Donation Type:</strong> ${donation.donationType}</p>
                <p><strong>Component Type:</strong> ${donation.componentType}</p>
                <p><strong>Blood Group:</strong> ${donation.bloodGroup}</p>
                <p><strong>Rh Factor:</strong> ${donation.rhFactor}</p>
                <p><strong>Volume Collected:</strong> ${donation.volume} mL</p>
                <p><strong>HIV Status:</strong> ${donation.hiv}</p>
                <p><strong>Hepatitis B (HBsAg) Status:</strong> ${donation.hepatitisB}</p>
                <p><strong>Hepatitis C (HCV) Status:</strong> ${donation.hepatitisC}</p>
                <p><strong>Syphilis (TPHA) Status:</strong> ${donation.syphilis}</p>
                <p><strong>Other Tests:</strong> ${donation.otherTests}</p>
                <p><strong>Plasma Frozen Date:</strong> ${donation.plasmaFrozenDate}</p>
                <p><strong>RBC Processing Date:</strong> ${donation.rbcProcessingDate}</p>
                <p><strong>Storage Temperature:</strong> ${donation.storageTemperature} °C</p>
                <p><strong>Expiration Date:</strong> ${donation.expirationDate}</p>
                <p><strong>Storage Location:</strong> ${donation.storageLocation}</p>
                <p><strong>Release Date:</strong> ${donation.releaseDate}</p>
                <p><strong>Recipient ID:</strong> ${donation.recipientID}</p>
                <p><strong>Compatibility Check By:</strong> ${donation.compatibilityCheckBy}</p>
                <p><strong>Inspected By:</strong> ${donation.inspectedBy}</p>
                <p><strong>Remarks:</strong> ${donation.remarks}</p>
                <p><strong>Authorized By:</strong> ${donation.authorizedBy}</p>
                <button class="close-btn" onclick="closePopup()">Close</button>
            </div>
        `;
        document.body.appendChild(popup);
    };

    // Function to close the popup
    window.closePopup = function () {
        const popup = document.querySelector(".popup");
        if (popup) {
            popup.remove();
        }
    };

    // Function to delete a donation record
    window.deleteDonation = function (unitNumber) {
        const bloodDonations = JSON.parse(localStorage.getItem("bloodDonations")) || [];
        const updatedDonations = bloodDonations.filter(donation => donation.unitNumber !== unitNumber);
        localStorage.setItem("bloodDonations", JSON.stringify(updatedDonations));

        // Refresh the display
        displaySavedData();
    };

    // Initially display saved data
    displaySavedData();
});
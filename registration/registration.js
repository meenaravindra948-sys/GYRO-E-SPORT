document.addEventListener("DOMContentLoaded", () => {
    
    const registrationForm = document.getElementById("registrationForm");
    
    // Inputs
    const fullName = document.getElementById("fullName");
    const gamingUid = document.getElementById("gamingUid");
    const inGameName = document.getElementById("inGameName");
    const mobileNumber = document.getElementById("mobileNumber");
    const tournamentSelect = document.getElementById("tournamentSelect");
    const transactionId = document.getElementById("transactionId");
    
    // Error spans
    const nameError = document.getElementById("nameError");
    const gamingUidError = document.getElementById("gamingUidError");
    const ignError = document.getElementById("ignError");
    const mobileError = document.getElementById("mobileError");
    const tournamentError = document.getElementById("tournamentError");
    const transactionError = document.getElementById("transactionError");

    // Modal
    const successModal = document.getElementById("successModal");
    const closeModal = document.getElementById("closeModal");
    
    // Copy UPI functionality
    const copyUpiBtn = document.getElementById("copyUpi");
    copyUpiBtn.addEventListener("click", () => {
        navigator.clipboard.writeText("GYRORISHABH@AXL").then(() => {
            copyUpiBtn.classList.remove("fa-copy");
            copyUpiBtn.classList.add("fa-check");
            copyUpiBtn.style.color = "var(--success-color)";
            
            setTimeout(() => {
                copyUpiBtn.classList.add("fa-copy");
                copyUpiBtn.classList.remove("fa-check");
                copyUpiBtn.style.color = "inherit";
            }, 2000);
        });
    });

    // Close Modal
    closeModal.addEventListener("click", () => {
        successModal.classList.add("hidden");
        registrationForm.reset();
        window.location.href = "index.html";
    });

    // Form Submit Handler
    registrationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear all previous errors
        document.querySelectorAll(".error-text").forEach(el => el.textContent = "");

        if (fullName.value.trim() === "") {
            nameError.textContent = "Full Name is required.";
            isValid = false;
        }

        if (gamingUid.value.trim() === "") {
            gamingUidError.textContent = "Gaming UID is required.";
            isValid = false;
        }

        if (inGameName.value.trim() === "") {
            ignError.textContent = "In-Game Name is required.";
            isValid = false;
        }

        const mobileRegex = /^[0-9]{10}$/;
        if (!mobileRegex.test(mobileNumber.value.trim())) {
            mobileError.textContent = "Please enter a valid 10-digit mobile number.";
            isValid = false;
        }

        if (tournamentSelect.value === "") {
            tournamentError.textContent = "Please select a tournament.";
            isValid = false;
        }

        if (transactionId.value.trim() === "") {
            transactionError.textContent = "Transaction ID is required to verify payment.";
            isValid = false;
        }

        if (isValid) {
            successModal.classList.remove("hidden");
        }
    });
});
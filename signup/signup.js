document.addEventListener("DOMContentLoaded", () => {
    
    const signupForm = document.getElementById("signupForm");
    const togglePwdBtns = document.querySelectorAll(".toggle-pwd");
    const passwordInput = document.getElementById("password");
    const pwdStrengthBars = document.querySelectorAll("#pwdStrength .bar");

    // Toggle Show/Hide Password
    togglePwdBtns.forEach(btn => {
        btn.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const targetInput = document.getElementById(targetId);
            
            const type = targetInput.getAttribute("type") === "password" ? "text" : "password";
            targetInput.setAttribute("type", type);
            
            this.classList.toggle("fa-eye");
            this.classList.toggle("fa-eye-slash");
        });
    });

    // Password Strength Indicator
    passwordInput.addEventListener("input", function() {
        const val = this.value;
        let strength = 0;

        if (val.length >= 6) strength += 1;
        if (val.match(/[A-Z]/) && val.match(/[0-9]/)) strength += 1;
        if (val.match(/[^a-zA-Z0-9]/)) strength += 1;

        pwdStrengthBars.forEach((bar, index) => {
            bar.style.background = "rgba(255, 255, 255, 0.1)";
            bar.style.boxShadow = "none";
        });

        if (strength >= 1) {
            pwdStrengthBars[0].style.background = "var(--error-color)";
            pwdStrengthBars[0].style.boxShadow = "0 0 5px var(--error-color)";
        }
        if (strength >= 2) {
            pwdStrengthBars[0].style.background = "var(--warning-color)";
            pwdStrengthBars[1].style.background = "var(--warning-color)";
            pwdStrengthBars[0].style.boxShadow = "0 0 5px var(--warning-color)";
            pwdStrengthBars[1].style.boxShadow = "0 0 5px var(--warning-color)";
        }
        if (strength >= 3) {
            pwdStrengthBars.forEach(bar => {
                bar.style.background = "var(--success-color)";
                bar.style.boxShadow = "0 0 5px var(--success-color)";
            });
        }
    });

    // Email Validation Regex
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // Form Submit Handler
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Clear all previous errors
        document.querySelectorAll(".error-text").forEach(el => el.textContent = "");

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const terms = document.getElementById("terms").checked;
        const password = passwordInput.value;

        if (username === "") {
            document.getElementById("usernameError").textContent = "Username is required.";
            isValid = false;
        }

        if (email === "") {
            document.getElementById("emailError").textContent = "Email is required.";
            isValid = false;
        } else if (!validateEmail(email)) {
            document.getElementById("emailError").textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "Password must be at least 6 characters.";
            isValid = false;
        }

        if (confirmPassword !== password) {
            document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
            isValid = false;
        }

        if (!terms) {
            document.getElementById("termsError").textContent = "You must agree to the Terms & Conditions.";
            isValid = false;
        }

        if (isValid) {
            // Future Firebase Integration Point
            alert("Registration Successful! Welcome to GYRO E SPORT.");
            signupForm.reset();
            pwdStrengthBars.forEach(bar => bar.style.background = "rgba(255, 255, 255, 0.1)");
        }
    });
});
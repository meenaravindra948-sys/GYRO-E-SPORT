import { auth } from "../firebase-config.js";
import { 
    signInWithEmailAndPassword, 
    GoogleAuthProvider, 
    FacebookAuthProvider, 
    signInWithPopup 
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const loginForm = document.getElementById("loginForm");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");

    const loadingOverlay = document.getElementById("loadingOverlay");
    const btnGoogleLogin = document.getElementById("btnGoogleLogin");
    const btnFacebookLogin = document.getElementById("btnFacebookLogin");

    // Show/Hide Password functionality
    togglePassword.addEventListener("click", function () {
        const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
        passwordInput.setAttribute("type", type);
        
        // Toggle icon classes
        this.classList.toggle("fa-eye");
        this.classList.toggle("fa-eye-slash");
    });

    // Simple Email Validation Regex
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    // Helper function to show/hide loading animation
    const setLoading = (isLoading) => {
        if (isLoading) {
            loadingOverlay.classList.remove("hidden");
        } else {
            loadingOverlay.classList.add("hidden");
        }
    };

    // Form Submit Handler (Email & Password)
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        let isValid = true;
        emailError.textContent = "";
        passwordError.textContent = "";

        const emailVal = emailInput.value.trim();
        const passwordVal = passwordInput.value.trim();

        // Validate Email/Username
        if (emailVal === "") {
            emailError.textContent = "Email or Username is required.";
            isValid = false;
        } else if (emailVal.includes('@') && !validateEmail(emailVal)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        // Validate Password
        if (passwordVal === "") {
            passwordError.textContent = "Password is required.";
            isValid = false;
        } else if (passwordVal.length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            isValid = false;
        }

        // Success state
        if (isValid) {
            setLoading(true);
            try {
                await signInWithEmailAndPassword(auth, emailVal, passwordVal);
                window.location.href = "../webside/index.html";
            } catch (error) {
                setLoading(false);
                passwordError.textContent = "Authentication failed: " + error.message;
            }
        }
    });

    // Google Authentication
    btnGoogleLogin.addEventListener("click", async () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            window.location.href = "../webside/index.html";
        } catch (error) {
            setLoading(false);
            if (error.code !== "auth/popup-closed-by-user") {
                alert("Google Sign-In Error: " + error.message);
            }
        }
    });

    // Facebook Authentication
    btnFacebookLogin.addEventListener("click", async () => {
        const provider = new FacebookAuthProvider();
        setLoading(true);
        try {
            await signInWithPopup(auth, provider);
            window.location.href = "../webside/index.html";
        } catch (error) {
            setLoading(false);
            if (error.code === "auth/account-exists-with-different-credential") {
                alert("An account already exists with the same email address but different sign-in credentials.");
            } else if (error.code !== "auth/popup-closed-by-user") {
                alert("Facebook Sign-In Error: " + error.message);
            }
        }
    });

});
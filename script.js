const passwordInput = document.querySelector(".pass-field input"); // Move the declaration to the top

passwordInput.addEventListener("keyup", (e) => {
    const requirements = [
        { regex: /.{8,}/, index: 0 },
        { regex: /[0-9]/, index: 1 },
        { regex: /[a-z]/, index: 2 },
        { regex: /[^A-Za-z0-9]/, index: 3 },
        { regex: /[A-Z]/, index: 4 },
    ];
  
    const requirementList = document.querySelectorAll(".requirement-list li");
    const suggestionMessage = document.querySelector(".suggestion-message");

    requirements.forEach(item => {
        const isValid = item.regex.test(e.target.value);
        const requirementItem = requirementList[item.index];
        
        if (isValid) {
            requirementItem.classList.add("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-check";
        } else {
            requirementItem.classList.remove("valid");
            requirementItem.firstElementChild.className = "fa-solid fa-circle";
        }
    });
    
    const strength = getPasswordStrength(e.target.value);
    updateProgressBar(strength); 
    suggestionMessage.textContent = `Password Strength: ${strength}`;
  
    const suggestion = generatePasswordSuggestion();
    suggestionMessage.textContent += ` (Suggested: ${suggestion})`;
    
    updateProgressBar(strength);
});

function updateProgressBar(strength) {
    const progressBar = document.getElementById("progress-bar");
    let color;
    if (strength < 3) {
        color = "#FF6347"; 
    } else if (strength < 5) {
        color = "#FFD700"; 
    } else {
        color = "#7CFC00"; 
    }
    progressBar.style.width = `${strength * 20}%`;
    progressBar.style.backgroundColor = color;
}

function getPasswordStrength(password) {
    let strength = 0;
    const requirements = [
        /.{8,}/,
        /[0-9]/,
        /[a-z]/,
        /[^A-Za-z0-9]/,
        /[A-Z]/,
    ];
    requirements.forEach(regex => {
        if (regex.test(password)) {
            strength++;
        }
    });
    return strength;
}

function generatePasswordSuggestion() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+';
    const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
    let password = '';
    for (let i = 0; i < 12; i++) { 
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return password;
}

const saveButton = document.getElementById("save-button");

// Event listener for password input
passwordInput.addEventListener("keyup", (e) => {
    // Your existing logic for password validation and strength calculation
    const isValidPassword = checkPasswordValidity(e.target.value);
    saveButton.disabled = !isValidPassword;
});

// Existing event listener for save button
saveButton.addEventListener("click", () => {
    // Add functionality to save password
    const password = passwordInput.value;
    alert("Password saved: " + password);
});

// Existing functions for password validation and strength calculation
function checkPasswordValidity(password) {
    // Define criteria for a valid password
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()-_=+]/.test(password);

    // Check if the password meets all the criteria
    return password.length >= minLength &&
           hasUppercase &&
           hasLowercase &&
           hasNumber &&
           hasSpecialChar;
}

function getPasswordStrength(password) {
    let strength = 0;
    // Add strength based on password criteria
    strength += Math.min(2, password.length / 4);
    strength += /[A-Z]/.test(password) ? 1 : 0;
    strength += /[a-z]/.test(password) ? 1 : 0;
    strength += /\d/.test(password) ? 1 : 0;
    strength += /[!@#$%^&*()-_=+]/.test(password) ? 1 : 0;
    return Math.min(5, strength);
}

function generatePasswordSuggestion() {
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-_=+';
    const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;
    let password = '';
    const passwordLength = 12;
    for (let i = 0; i < passwordLength; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return password;
}
const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.getElementById("eye-icon");

eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    eyeIcon.className = passwordInput.type === "password" ? "fa-solid fa-eye" : "fa-solid fa-eye-slash";
});

// Now, continue with your existing code...

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
    updateProgressBar(strength); // Update progress bar based on password strength
    suggestionMessage.textContent = `Password Strength: ${strength}`;

    const suggestion = generatePasswordSuggestion();
    suggestionMessage.textContent += ` (Suggested: ${suggestion})`;
});

function updateProgressBar(strength) {
    const progressBar = document.getElementById("progress-bar");
    let color;
    if (strength < 3) {
        color = "#FF6347"; // Red for weak password
    } else if (strength < 5) {
        color = "#FFD700"; // Yellow for medium password
    } else {
        color = "#7CFC00"; // Green for strong password
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


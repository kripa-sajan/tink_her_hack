const passwordInput = document.querySelector(".pass-field input");
const eyeIcon = document.querySelector(".pass-field i");
const requirementList = document.querySelectorAll(".requirement-list li");
const suggestionMessage = document.querySelector(".suggestion-message");
const progressBar = document.querySelector(".progress-bar");

const requirements = [
    { regex: /.{8,}/, index: 0 }, 
    { regex: /[0-9]/, index: 1 }, 
    { regex: /[a-z]/, index: 2 }, 
    { regex: /[^A-Za-z0-9]/, index: 3 }, 
    { regex: /[A-Z]/, index: 4 }, 
];

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

passwordInput.addEventListener("keyup", (e) => {
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
    suggestionMessage.textContent = `Password Strength: ${strength}`;
   
    const suggestion = generatePasswordSuggestion();
    suggestionMessage.textContent += ` (Suggested: ${suggestion})`;
    
    updateProgressBar(strength);
});

eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});

function getPasswordStrength(password) {
    let strength = 0;
    requirements.forEach(item => {
        if (item.regex.test(password)) {
            strength++;
        }
    });
    return strength;
}
const progressBarWeak = document.querySelector(".progress-bar.weak");
const progressBarMedium = document.querySelector(".progress-bar.medium");
const progressBarStrong = document.querySelector(".progress-bar.strong");

function updateProgressBar(password) {
    let strength = getPasswordStrength(password);
    const totalRequirements = requirements.length;
    const segmentWidth = 100 / totalRequirements;

    // Calculate the width of each segment based on password strength
    let weakWidth = 0;
    let mediumWidth = 0;
    let strongWidth = 0;

    if (strength > 0 && strength <= totalRequirements / 2) {
        weakWidth = segmentWidth;
    } else if (strength > totalRequirements / 2 && strength < totalRequirements) {
        mediumWidth = segmentWidth;
    } else if (strength === totalRequirements) {
        strongWidth = segmentWidth;
    }

    // Set the width of each segment accordingly
    progressBarWeak.style.width = `${weakWidth}%`;
    progressBarMedium.style.width = `${mediumWidth}%`;
    progressBarStrong.style.width = `${strongWidth}%`;
}
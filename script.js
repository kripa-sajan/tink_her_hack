<<<<<<< HEAD
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
=======
const passwordInput = document.querySelector(".pass-field input"); // Move the declaration to the top
>>>>>>> 8cbca5bbba662f4d239a8d0fa16bdb2bee260f32

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
<<<<<<< HEAD
=======
        
>>>>>>> 8cbca5bbba662f4d239a8d0fa16bdb2bee260f32
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
<<<<<<< HEAD
   
=======
  
>>>>>>> 8cbca5bbba662f4d239a8d0fa16bdb2bee260f32
    const suggestion = generatePasswordSuggestion();
    suggestionMessage.textContent += ` (Suggested: ${suggestion})`;
    
    updateProgressBar(strength);
});

<<<<<<< HEAD
eyeIcon.addEventListener("click", () => {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
    eyeIcon.className = `fa-solid fa-eye${passwordInput.type === "password" ? "" : "-slash"}`;
});
=======
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
>>>>>>> 8cbca5bbba662f4d239a8d0fa16bdb2bee260f32

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
<<<<<<< HEAD
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
=======

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
>>>>>>> 8cbca5bbba662f4d239a8d0fa16bdb2bee260f32

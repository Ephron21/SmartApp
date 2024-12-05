// Updated speakSection function
function speakSection(sectionId) {
    const text = translations[currentLanguage][sectionId];
    if (!text) return; // Ensure text exists for the given section

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(text);

    // Set the language for the speech
    switch (currentLanguage) {
        case "en":
            speech.lang = "en-US";
            break;
        case "rw":
            speech.lang = "rw-RW"; // Note: Limited support for Kinyarwanda
            break;
    
    }

    // Speak the text
    window.speechSynthesis.speak(speech);
}

// Add event listeners for hover, click, and mouseleave
document.querySelectorAll('.nav-links a').forEach(link => {
    // Speak on hover
    link.addEventListener('mouseenter', () => {
        const sectionId = link.getAttribute('href').substring(1); // Extract the section ID
        speakSection(sectionId);
    });

    // Stop speaking on mouseleave
    link.addEventListener('mouseleave', () => {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
    });

    // Speak on click
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation for demo purposes
        const sectionId = link.getAttribute('href').substring(1);
        speakSection(sectionId);
    });
});
// Show/Hide Signup Form
function showSignup() {
    document.getElementById("signup-section").classList.remove("hidden");
    document.getElementById("login-section").classList.add("hidden");
}

// Show/Hide Login Form
function showLogin() {
    document.getElementById("signup-section").classList.add("hidden");
    document.getElementById("login-section").classList.remove("hidden");
}

// Validate Signup Form
function validateSignupForm() {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;

    if (!passwordRegex.test(password)) {
        alert("Password must be at least 8 characters long and include a number, a character, and a symbol.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return false;
    }

    alert("Signup successful!");
    return true;
}

const slider = document.querySelector('.slider');
slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY * 2; // Adjust scroll speed
});
function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent the default anchor behavior
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}
// Hide both forms
function hideForms() {
    document.getElementById('signup-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
}

// Example: Add this to other buttons like "Learn More"
document.querySelector('.btn:not(.btn-primary)').addEventListener('click', hideForms);
// Add an event listener for the scroll event
window.addEventListener('scroll', function() {
    const heroSection = document.getElementById('home');
    const heroPosition = heroSection.getBoundingClientRect().top;

    // When the user scrolls to the hero section, add an animation class
    if (heroPosition < window.innerHeight / 1.2) {
        heroSection.classList.add('animate-fade');
    }
});

// Toggle Dark Mode
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    // Toggle the dark-theme class
    body.classList.toggle("dark-theme");

    // Change icon based on the theme
    if (body.classList.contains("dark-theme")) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark"); // Save preference
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light"); // Save preference
    }
}

// Load theme on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    const body = document.body;
    const icon = document.getElementById("theme-icon");

    if (savedTheme === "dark") {
        body.classList.add("dark-theme");
        icon.classList.replace("fa-moon", "fa-sun");
    } else {
        body.classList.remove("dark-theme");
        icon.classList.replace("fa-sun", "fa-moon");
    }
});
// Function to show the Signup form
function showSignup() {
    document.getElementById('signup-section').classList.remove('hidden');
    document.getElementById('login-section').classList.add('hidden');
}

// Function to show the Login form
function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('signup-section').classList.add('hidden');
}

// Placeholder function for signup (connect to backend later)
function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (name && email && password) {
        alert(`Welcome, ${name}! You have successfully signed up.`);
        showLogin(); // Show login form after signup
    } else {
        alert('Please fill in all fields.');
    }
}

// Placeholder function for login (connect to backend later)
function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email && password) {
        alert('Login successful!'); // Replace with backend authentication
    } else {
        alert('Please enter your email and password.');
    }
}

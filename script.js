// Check Web Speech API support
if (!('speechSynthesis' in window)) {
    alert('Sorry, your browser does not support speech synthesis!');
}

// Translations for navbar links
const translations = {
    en: {
        home: "Welcome to the Home section.",
        about: "Learn more about us in the About section.",
        services: "Explore our Services.",
        opportunities: "Discover Opportunities.",
        contact: "Get in touch with us in the Contact section."
    },
    rw: {
        home: "Murakaza neza muri Agace ka mbere.",
        about: "Menya byinshi kuri twe mu Gice cya About.",
        services: "Reba serivisi zacu.",
        opportunities: "Menya amahirwe ahari.",
        contact: "Twandikire mu gice cy'Itumanaho."
    }
};

// Set the current language (default to English)
let currentLanguage = "en";

// Function to speak a section
function speakSection(sectionId) {
    console.log(`Attempting to speak section: ${sectionId}`); // Debugging log

    const text = translations[currentLanguage][sectionId];
    if (!text) {
        console.warn(`No translation found for section: ${sectionId}`);
        return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Create a new utterance
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = currentLanguage === "rw" ? "rw-RW" : "en-US";
    console.log(`Speaking text: "${text}" in language: ${speech.lang}`);

    // Speak the text
    window.speechSynthesis.speak(speech);
}

// Add event listeners to navbar links
document.querySelectorAll('.nav-links a').forEach(link => {
    const sectionId = link.getAttribute('href').substring(1); // Extract section ID

    // Speak on hover
    link.addEventListener('mouseenter', () => {
        speakSection(sectionId);
    });

    // Stop speaking on mouseleave
    link.addEventListener('mouseleave', () => {
        window.speechSynthesis.cancel();
    });

    // Speak on click
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default navigation
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

// Slider scrolling
document.querySelector('.slider').addEventListener('wheel', (e) => {
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY * 2; // Adjust scroll speed
});

// Smooth scrolling to sections
function scrollToSection(event, sectionId) {
    event.preventDefault(); // Prevent the default anchor behavior
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Hide forms
function hideForms() {
    document.getElementById('signup-section').classList.add('hidden');
    document.getElementById('login-section').classList.add('hidden');
}

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

// Voice Input
function listenToVoice(inputId) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.start();

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.getElementById(inputId).value = text;
    };

    recognition.onerror = (event) => {
        alert('Voice recognition failed. Please try again.');
    };
}

// Signup Function
function signup() {
    alert('Signup function triggered!');
}

// Login Function
function login() {
    alert('Login function triggered!');
}

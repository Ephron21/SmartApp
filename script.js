  // Dark Mode Toggle
  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const icon = themeToggle.querySelector('i');
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
  });

  // Scroll to Top Button
  const scrollTopButton = document.querySelector('.scroll-top');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
          scrollTopButton.style.display = 'block';
      } else {
          scrollTopButton.style.display = 'none';
      }
  });

  function scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Show Sign Up Form
function showSignup() {
document.getElementById('signup-form').style.display = 'block'; // Show signup form
document.getElementById('login-form').style.display = 'none';  // Hide login form
document.getElementById('auth-header').innerText = 'Sign Up';  // Update header text
}

// Show Login Form
function showLogin() {
document.getElementById('signup-form').style.display = 'none'; // Hide signup form
document.getElementById('login-form').style.display = 'block'; // Show login form
document.getElementById('auth-header').innerText = 'Login';    // Update header text
}

// Show the Authentication Section
function showAuthSection() {
document.getElementById('auth-section').style.display = 'block'; // Display auth section
}

// Hide the Authentication Section When Clicking Outside
document.addEventListener('click', (event) => {
const authSection = document.getElementById('auth-section'); // Reference to auth section
const target = event.target; // The clicked element

// Check if the clicked element is not inside the auth section and is not a 'Get Started' button
if (
  target.tagName === 'BUTTON' &&               // Ensure it's a button
  !authSection.contains(target) &&            // Exclude clicks inside auth section
  !target.classList.contains('btn-primary')   // Exclude 'Get Started' button
) {
  authSection.style.display = 'none';         // Hide the auth section
}
});

// Show Learn More Section
function showLearnMore() {
const learnMoreSection = document.getElementById('learn-more-section');
const otherActionSection = document.getElementById('other-action-section');
const slider = document.getElementById('slider');

learnMoreSection.style.display = 'block';
otherActionSection.style.display = 'none';
slider.style.display = 'block';

learnMoreSection.scrollIntoView({ behavior: 'smooth' });
}

// Show Other Action Section
function showOtherAction() {
const otherActionSection = document.getElementById('other-action-section');
const learnMoreSection = document.getElementById('learn-more-section');
const slider = document.getElementById('slider');

otherActionSection.style.display = 'block';
learnMoreSection.style.display = 'none';
slider.style.display = 'none';

otherActionSection.scrollIntoView({ behavior: 'smooth' });
}

// Image Slider Functionality
let currentSlide = 0;
const sliderImages = document.getElementById('slider-images');
const totalSlides = sliderImages.children.length;

document.getElementById('prev-btn').addEventListener('click', () => {
currentSlide = (currentSlide === 0) ? totalSlides - 1 : currentSlide - 1;
sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
});

document.getElementById('next-btn').addEventListener('click', () => {
currentSlide = (currentSlide === totalSlides - 1) ? 0 : currentSlide + 1;
sliderImages.style.transform = `translateX(-${currentSlide * 100}%)`;
});

// Simulate user role (set to true for Admin, false for User)
const isAdmin = true;

// Resource Data
const resources = []; // Array to store uploaded resources
const pendingRequests = []; // Array to track pending user download requests

// Initialize Section
document.addEventListener('DOMContentLoaded', () => {
if (isAdmin) {
  document.getElementById('admin-controls').style.display = 'block';
}
renderResources();
});

// Upload File (Admin Function)
function uploadFile() {
const fileTitle = document.getElementById('file-title').value;
const fileInput = document.getElementById('file-upload');
const file = fileInput.files[0];

if (!fileTitle || !file) {
  alert('Please provide a title and select a file.');
  return;
}

// Add resource to the list
const resource = {
  title: fileTitle,
  file: URL.createObjectURL(file),
  isApproved: false, // Not downloadable until approved
};

resources.push(resource);
renderResources();
alert('File uploaded successfully!');
document.getElementById('upload-form').reset();
}

// Render Resources (User View)
function renderResources() {
const resourceList = document.getElementById('resource-items');
resourceList.innerHTML = '';

resources.forEach((resource, index) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
      <span>${resource.title}</span>
      ${resource.isApproved ? `<a href="${resource.file}" download>Download</a>` : ''}
  `;
  resourceList.appendChild(listItem);
});

// Render Admin Dashboard Files
renderAdminFiles();
}

// Render Admin Uploaded Files
function renderAdminFiles() {
const adminFilesList = document.getElementById('admin-uploaded-files');
adminFilesList.innerHTML = '';

resources.forEach((resource, index) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
      <span>${resource.title}</span>
      ${resource.isApproved ? 'Approved for download' : 'Pending approval'}
      ${!resource.isApproved ? `<button onclick="approveResource(${index})">Approve</button>` : ''}
  `;
  adminFilesList.appendChild(listItem);
});
}

// Request Download Access (User)
function requestDownload(resourceIndex) {
const resource = resources[resourceIndex];
if (resource.isApproved) {
  alert('This resource is already approved for download.');
  return;
}

alert(`Your request to download "${resource.title}" has been submitted.`);
pendingRequests.push({ resourceIndex, user: 'User1', status: 'Pending' });
updatePendingRequests();
}

// Update Pending Requests (Admin)
function updatePendingRequests() {
const pendingRequestsList = document.getElementById('pending-requests');
pendingRequestsList.innerHTML = '';

pendingRequests.forEach((request, index) => {
  const resource = resources[request.resourceIndex];
  const listItem = document.createElement('li');
  listItem.textContent = `${request.user} requested access to "${resource.title}".`;

  // Approve Button
  const approveBtn = document.createElement('button');
  approveBtn.textContent = 'Approve';
  approveBtn.style.marginLeft = '10px';
  approveBtn.onclick = () => approveRequest(index);

  // Deny Button
  const denyBtn = document.createElement('button');
  denyBtn.textContent = 'Deny';
  denyBtn.style.marginLeft = '10px';
  denyBtn.onclick = () => denyRequest(index);

  listItem.appendChild(approveBtn);
  listItem.appendChild(denyBtn);
  pendingRequestsList.appendChild(listItem);
});
}

// Approve Resource (Admin)
function approveResource(index) {
resources[index].isApproved = true;
renderResources();
alert('Resource approved successfully.');
}

// Approve Download Request
function approveRequest(index) {
const request = pendingRequests[index];
resources[request.resourceIndex].isApproved = true;
pendingRequests.splice(index, 1);
updatePendingRequests();
renderResources();
alert('Download access granted.');
}

// Deny Download Request
function denyRequest(index) {
pendingRequests.splice(index, 1);
updatePendingRequests();
alert('Download access denied.');
}


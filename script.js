// DOM elements
const homeLink = document.getElementById('homeLink');
const adminLink = document.getElementById('adminLink');
const patientForm = document.getElementById('patientForm');
const healthForm = document.getElementById('healthForm');
const response = document.getElementById('response');
const assistantResponse = document.getElementById('assistantResponse');
const adminLogin = document.getElementById('adminLogin');
const adminForm = document.getElementById('adminForm');
const adminPanel = document.getElementById('adminPanel');
const patientData = document.getElementById('patientData');
const newConsultation = document.getElementById('newConsultation');

// Form steps
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.next-step');
const prevButtons = document.querySelectorAll('.prev-step');

let currentStep = 0;

// Navigation
homeLink.addEventListener('click', showHome);
adminLink.addEventListener('click', showAdminLogin);
newConsultation.addEventListener('click', showHome);

// Form submissions
healthForm.addEventListener('submit', handleHealthForm);
adminForm.addEventListener('submit', handleAdminLogin);

// Form step navigation
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep < formSteps.length - 1) {
            formSteps[currentStep].classList.remove('active');
            currentStep++;
            formSteps[currentStep].classList.add('active');
        }
    });
});

prevButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentStep > 0) {
            formSteps[currentStep].classList.remove('active');
            currentStep--;
            formSteps[currentStep].classList.add('active');
        }
    });
});

function showHome() {
    patientForm.style.display = 'block';
    response.style.display = 'none';
    adminLogin.style.display = 'none';
    adminPanel.style.display = 'none';
    currentStep = 0;
    formSteps.forEach((step, index) => {
        step.classList.toggle('active', index === 0);
    });
}

function showAdminLogin() {
    patientForm.style.display = 'none';
    response.style.display = 'none';
    adminLogin.style.display = 'block';
    adminPanel.style.display = 'none';
}

function handleHealthForm(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const problem = document.getElementById('problem').value;

    // Store data in local storage
    const patientInfo = { name, age, problem, date: new Date().toLocaleString() };
    let patients = JSON.parse(localStorage.getItem('patients')) || [];
    patients.push(patientInfo);
    localStorage.setItem('patients', JSON.stringify(patients));

    // Generate a mock response
    const mockResponse = generateMockResponse(problem);
    assistantResponse.textContent = mockResponse;

    patientForm.style.display = 'none';
    response.style.display = 'block';
}

function handleAdminLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;

    if (password === 'backquad') {
        adminLogin.style.display = 'none';
        adminPanel.style.display = 'block';
        displayPatientData();
    } else {
        alert('Incorrect password. Please try again.');
    }
}

function displayPatientData() {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    patientData.innerHTML = '<h3>Patient Submissions</h3>';

    if (patients.length === 0) {
        patientData.innerHTML += '<p>No patient data available.</p>';
    } else {
        patients.forEach((patient, index) => {
            patientData.innerHTML += `
                <div class="patient-entry">
                    <h4>Patient ${index + 1}</h4>
                    <p><strong>Name:</strong> ${patient.name}</p>
                    <p><strong>Age:</strong> ${patient.age}</p>
                    <p><strong>Problem:</strong> ${patient.problem}</p>
                    <p><strong>Submission Date:</strong> ${patient.date}</p>
                </div>
            `;
        });
    }
}

function generateMockResponse(problem) {
    const responses = [
        "Based on your description, it's recommended to schedule an appointment with your primary care physician for a thorough evaluation.",
        "Your symptoms suggest a common condition. Rest, hydration, and over-the-counter pain relievers may help. If symptoms persist, please consult a doctor.",
        "This could be a sign of a more serious condition. Please seek immediate medical attention or visit your nearest emergency room.",
        "Your described symptoms are common and usually resolve on their own. If they persist for more than a few days, consult with a healthcare professional.",
        "It's difficult to determine the exact cause without a proper examination. We recommend scheduling an appointment with a specialist in this area."
    ];

    return responses[Math.floor(Math.random() * responses.length)];
}

// Initial setup
showHome();
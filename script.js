// Get form elements
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

// Validation patterns
const patterns = {
    firstName: /^[a-zA-Z\s]{2,}$/,
    lastName: /^[a-zA-Z\s]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\d\s\-\+\(\)]{10,}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Validation messages
const messages = {
    firstName: 'First name must be at least 2 characters and contain only letters',
    lastName: 'Last name must be at least 2 characters and contain only letters',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    password: 'Password must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character',
    confirmPassword: 'Passwords do not match',
    terms: 'You must agree to the terms and conditions'
};

// Form submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (validateForm()) {
        showSuccessMessage();
        registrationForm.reset();
    }
});

// Validate entire form
function validateForm() {
    let isValid = true;
    
    // Validate first name
    if (!validateField('firstName')) {
        isValid = false;
    }
    
    // Validate last name
    if (!validateField('lastName')) {
        isValid = false;
    }
    
    // Validate email
    if (!validateField('email')) {
        isValid = false;
    }
    
    // Validate phone (optional but if filled, must be valid)
    const phoneInput = document.getElementById('phone');
    if (phoneInput.value && !validateField('phone')) {
        isValid = false;
    }
    
    // Validate password
    if (!validateField('password')) {
        isValid = false;
    }
    
    // Validate confirm password
    if (!validatePasswordMatch()) {
        isValid = false;
    }
    
    // Validate terms
    if (!validateField('terms')) {
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    let isValid = false;
    
    if (fieldName === 'terms') {
        isValid = field.checked;
    } else if (patterns[fieldName]) {
        isValid = patterns[fieldName].test(field.value.trim());
    } else {
        isValid = field.value.trim() !== '';
    }
    
    if (!isValid) {
        errorElement.textContent = messages[fieldName];
        errorElement.classList.add('show');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    return isValid;
}

// Validate password match
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorElement = document.getElementById('confirmPasswordError');
    
    const isValid = password === confirmPassword && password !== '';
    
    if (!isValid) {
        errorElement.textContent = messages.confirmPassword;
        errorElement.classList.add('show');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    return isValid;
}

// Show success message
function showSuccessMessage() {
    registrationForm.style.display = 'none';
    successMessage.style.display = 'block';
}

// Reset form
function resetForm() {
    registrationForm.style.display = 'flex';
    successMessage.style.display = 'none';
    registrationForm.reset();
    
    // Clear all error messages
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
}

// Real-time validation on input
document.getElementById('firstName').addEventListener('blur', () => validateField('firstName'));
document.getElementById('lastName').addEventListener('blur', () => validateField('lastName'));
document.getElementById('email').addEventListener('blur', () => validateField('email'));
document.getElementById('phone').addEventListener('blur', function() {
    if (this.value) validateField('phone');
});
document.getElementById('password').addEventListener('blur', () => validateField('password'));
document.getElementById('confirmPassword').addEventListener('blur', validatePasswordMatch);
document.getElementById('terms').addEventListener('change', () => validateField('terms'));

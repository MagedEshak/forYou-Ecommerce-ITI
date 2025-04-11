   // Import authentication functions from auth.js
import { loginUser, isUserLoggedIn, getUserProfile, getCurrentUserId,setCookie,getCookie } from "./auth.js";

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
     checkAuthState();

    // Get the sign-in form
    const signInForm = document.getElementById('signInForm');
    if (!signInForm) {
        console.error('Sign-in form not found.');
        return;
    }

    // Add submit event listener to the form
    signInForm.addEventListener('submit', handleSignIn);

});

// Function to check if user is already logged in
async function checkAuthState() {
    try {
        // Check if user is already logged in
        console.log('Checking authentication state...');
        
        const isLoggedIn = await isUserLoggedIn();
        if (isLoggedIn) {
            // Get the current user ID first
            const userId = await getCurrentUserId();
            if (userId) {
                // Now get the user profile with the user ID
                const userProfile = await getUserProfile(userId);
                // Check if user is admin (could be in different properties)
                const isAdmin = userProfile && (userProfile.isAdmin || userProfile.role === 'admin');

                // if user is admin redirect to admin page
                if (isAdmin) {
                    window.location.href = '../AdminPages/admin-home.html';
                }
                // if user is customer redirect to home page
                else {
                    window.location.href = '../index.html';
                }
            } else {
                // If no user ID, just redirect to home page
                window.location.href = '../index.html';
            }
        }
    } catch (error) {
        console.error('Error checking authentication state:', error);
    }
}

// Function to handle sign in form submission
async function handleSignIn(event) {
    event.preventDefault();

    // Get form elements
    const emailInput = document.getElementById('email_id');
    const passwordInput = document.getElementById('password_id');
    const errorMessage = document.getElementById('errorMessage');

    console.log('Email:', emailInput.value);
    console.log('Password:', passwordInput.value);

    // Clear previous error messages
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.classList.add('d-none');
    }

    // Validate form inputs
    if (!validateForm(emailInput, passwordInput)) {
        return;
    }

    try {
        // Show loading state
        const submitButton = document.querySelector('input[type="submit"]');
        if (submitButton) {
            submitButton.value = 'Signing In...';
            submitButton.disabled = true;
        }

        // Attempt to login
        const userId = await loginUser(emailInput.value, passwordInput.value);

        // If successful, redirect to home page or profile page
        if (userId) {
            try {
                const userProfile = await getUserProfile(userId);

                // Check if user is admin (could be in different properties)
                const isAdmin = userProfile && (userProfile.isAdmin || userProfile.role === 'admin');

                // crate cookie
                setCookie("userId", userId, 30);
                setCookie("userName", userProfile.Username, 30);
                setCookie("userEmail", emailInput.value, 30);
                setCookie("isAdmin", isAdmin?"true":"false", 30);


                // if user is admin redirect to admin page
                if (isAdmin) {
                    window.location.href = '../AdminPages/admin-home.html';
                }
                // if user is customer redirect to home page
                else {
                    window.location.href = '../index.html';
                }
            } catch (error) {
                console.error('Error getting user profile:', error);
                // If error getting profile, just redirect to home page
                window.location.href = '../index.html';
            }
        }
    } catch (error) {
        // Handle login errors
        console.error('Login error:', error);

        if (errorMessage) {
            errorMessage.textContent = getErrorMessage(error);
            errorMessage.classList.remove('d-none');
        }

        // Reset submit button
        const submitButton = document.querySelector('input[type="submit"]');
        if (submitButton) {
            submitButton.value = 'Sign In';
            submitButton.disabled = false;
        }
    }
}


// Function to validate form inputs
function validateForm(emailInput, passwordInput) {
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    // Validate password
    if (!passwordInput.value) {
        showError(passwordInput, 'Password is required');
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    return isValid;
}

// Function to show error message for an input
function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('text-danger')) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('d-none');
    }
}

// Function to hide error message for an input
function hideError(input) {
    const errorSpans = input.parentElement.querySelectorAll('.text-danger');
    errorSpans.forEach(span => span.classList.add('d-none'));
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


// Function to get user-friendly error message
function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-email':
            return 'Invalid email address format.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many failed login attempts. Please try again later.';
        default:
            return 'An error occurred during sign in. Please try again.';
    }
}




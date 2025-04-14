import {
    deleteAllCookies,
    getCurrentUserId,
    getUserProfile,
    setCookie,
    updateUserProfile
} from "./auth.js";

// Form elements
const editProfileForm = document.getElementById('editProfileForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const countryInput = document.getElementById('country');
const cityInput = document.getElementById('city');
const cancelBtn = document.getElementById('cancelBtn');

// Load user data when page loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const userId = await getCurrentUserId();
        if (!userId) {
            window.location.href = './signin.html';
            return;
        }

        const userData = await getUserProfile(userId);
        if (userData) {
            // Populate form with user data
            fullNameInput.value = userData.Username || '';
            emailInput.value = userData.email || '';
            phoneInput.value = userData.phone || '';
            countryInput.value = userData.address?.[0] || '';
            cityInput.value = userData.address?.[1] || '';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        alert('Failed to load user data. Please try again.');
    }
});

// Handle form submission
editProfileForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const userId = await getCurrentUserId();
        if (!userId) {
            throw new Error('No user logged in');
        }

        // Prepare updated user data
        const updatedData = {
            Username: fullNameInput.value.trim(),
            phone: phoneInput.value.trim(),
            address: [
                countryInput.value.trim(),
                cityInput.value.trim()
            ]
        };

        // Validate data
        if (!updatedData.Username || !updatedData.phone || !updatedData.address[0] || !updatedData.address[1]) {
            alert('Please fill in all required fields');
            return;
        }

        // Update profile
        await updateUserProfile(userId, updatedData);
        // deleteCookes
        await deleteAllCookies();
        setCookie("userId", userId, 30);
        setCookie("userName", updatedData.Username, 30);
        setCookie("email", emailInput.value, 30);
        setCookie("isAdmin", false, 30);
        setCookie("phone", updatedData.phone, 30);
        setCookie("address", updatedData.address, 30);

        alert('Profile updated successfully!');
        window.location.href = './profile.html';

    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
    }
});

// Handle cancel button
cancelBtn.addEventListener('click', () => {
    window.location.href = './profile.html';
});
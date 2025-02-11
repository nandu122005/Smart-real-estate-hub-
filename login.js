document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form"); // Assuming your login form has an ID of "login-form"
    const emailInput = document.getElementById("email"); // Assuming you have an email input field
    const passwordInput = document.getElementById("password"); // Assuming you have a password input field

    // This is just a placeholder authentication check
    const validUsers = {
        "john.doe@example.com": "john123",
        "jane.smith@example.com": "jane123",
        "mike.jones@example.com": "mike123",
        "emily.davis@example.com": "emily123"
    };
    

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        const email = emailInput.value;
        const password = passwordInput.value;

        // Check if the user exists and the password matches
        if (validUsers[email] && validUsers[email] === password) {
            // Store the logged-in user's email in localStorage
            localStorage.setItem("loggedInUser", email);

            // Redirect the user to their profile or dashboard after login
            window.location.href = "profile.html"; // Or wherever you want to redirect after successful login
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});

// Mock database for simplicity
const users = []; // Replace with backend API in real applications

document.getElementById("register-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if email already exists
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        alert("An account with this email already exists. Please log in.");
        window.location.href = "dashboard.html";
    } else {
        // Save the new user (simulating with a mock array)
        users.push({ email, password });
        alert("Account created successfully! Redirecting to login...");
        window.location.href = "dashboard.html";
    }
});

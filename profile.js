document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser"); // Get the logged-in user's email

    if (!loggedInUser) {
        alert("Please log in to access your profile.");
        window.location.href = "login.html"; // Redirect to login page if not logged in
        return;
    }

    // Retrieve user details from localStorage, or set default if not found
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const userDetails = users[loggedInUser] || {
        name: "",
        age: "",
        profession: "",
        contact: "",
        address: "",
    };

    const profileDetailsContainer = document.getElementById("profile-details");
    const editProfileBtn = document.getElementById("edit-profile-btn");
    const editProfileSection = document.getElementById("edit-profile-section");
    const editProfileForm = document.getElementById("edit-profile-form");
    const cancelEditBtn = document.getElementById("cancel-edit-btn");
    const userPropertiesContainer = document.getElementById("user-properties-container");

    // Function to display profile details
    function displayUserProfile() {
        if (!userDetails.name) {
            profileDetailsContainer.innerHTML = `<p>No details available. Please update your profile.</p>`;
            editProfileSection.style.display = "block";
            editProfileBtn.style.display = "none";
        } else {
            profileDetailsContainer.innerHTML = `
                <p><strong>Name:</strong> ${userDetails.name}</p>
                <p><strong>Age:</strong> ${userDetails.age}</p>
                <p><strong>Profession:</strong> ${userDetails.profession}</p>
                <p><strong>Contact:</strong> ${userDetails.contact}</p>
                <p><strong>Address:</strong> ${userDetails.address}</p>
                <p><strong>Email:</strong> ${loggedInUser}</p>
            `;
            editProfileBtn.style.display = "block";
        }
    }

    // Function to display user properties
    function displayUserProperties() {
        // Get all properties from localStorage
        const properties = JSON.parse(localStorage.getItem("properties")) || [];

        // Filter properties that belong to the logged-in user
        const userProperties = properties.filter(property => property.userEmail === loggedInUser);

        if (userProperties.length === 0) {
            userPropertiesContainer.innerHTML = `<p>No properties listed yet.</p>`;
        } else {
            userPropertiesContainer.innerHTML = ""; // Clear the container before displaying
            userProperties.forEach(property => {
                const propertyCard = document.createElement("div");
                propertyCard.classList.add("property-card");
                propertyCard.innerHTML = `
                    <h3>${property.title}</h3>
                    <p><strong>Type:</strong> ${property.type}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p><strong>Description:</strong> ${property.description}</p>
                `;
                userPropertiesContainer.appendChild(propertyCard);
            });
        }
    }

    // Display initial profile and properties
    displayUserProfile();
    displayUserProperties();

    // Show edit form with pre-filled values
    editProfileBtn.addEventListener("click", function () {
        document.getElementById("name").value = userDetails.name;
        document.getElementById("age").value = userDetails.age;
        document.getElementById("profession").value = userDetails.profession;
        document.getElementById("contact").value = userDetails.contact;
        document.getElementById("address").value = userDetails.address;

        editProfileSection.style.display = "block";
        editProfileBtn.style.display = "none";
    });

    // Hide edit form and show profile
    cancelEditBtn.addEventListener("click", function () {
        editProfileSection.style.display = "none";
        editProfileBtn.style.display = "block";
    });

    // Save profile changes
    editProfileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const updatedDetails = {
            name: document.getElementById("name").value,
            age: document.getElementById("age").value,
            profession: document.getElementById("profession").value,
            contact: document.getElementById("contact").value,
            address: document.getElementById("address").value,
        };

        // Update the user details in the users object and save to localStorage
        users[loggedInUser] = updatedDetails;
        localStorage.setItem("users", JSON.stringify(users));

        alert("Profile updated successfully!");
        Object.assign(userDetails, updatedDetails); // Update userDetails in memory

        displayUserProfile();
        editProfileSection.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || {};
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    
    const addPropertyBtn = document.getElementById("add-property-btn");
    const addPropertyFormSection = document.getElementById("add-property-form-section");
    const addPropertyForm = document.getElementById("add-property-form");
    const cancelAddPropertyBtn = document.getElementById("cancel-add-property");
    const propertiesContainer = document.getElementById("properties-container");

    // Show the Add Property form
    addPropertyBtn.addEventListener("click", function () {
        addPropertyFormSection.style.display = "block";
    });

    // Hide the Add Property form
    cancelAddPropertyBtn.addEventListener("click", function () {
        addPropertyFormSection.style.display = "none";
    });

    // Handle Add Property form submission
    addPropertyForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Collect form data
        const newProperty = {
            id: Date.now().toString(), // Unique ID
            userEmail: loggedInUser,
            title: document.getElementById("title").value,
            type: document.getElementById("type").value,
            price: document.getElementById("price").value,
            location: document.getElementById("location").value,
            description: document.getElementById("description").value,
            status: "available" // Default status
        };

        // Save property to localStorage
        properties.push(newProperty);
        localStorage.setItem("properties", JSON.stringify(properties));

        alert("Property added successfully!");
        addPropertyForm.reset();
        addPropertyFormSection.style.display = "none";

        // Refresh property listings
        displayUserProperties();
    });

    // Display properties listed by the logged-in user
    function displayUserProperties() {
        const userProperties = properties.filter(property => property.userEmail === loggedInUser);

        if (userProperties.length === 0) {
            propertiesContainer.innerHTML = "<p>No properties listed yet.</p>";
        } else {
            propertiesContainer.innerHTML = ""; // Clear existing content
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

                propertiesContainer.appendChild(propertyCard);
            });
        }
    }

    // Initial display of user properties
    displayUserProperties();
});

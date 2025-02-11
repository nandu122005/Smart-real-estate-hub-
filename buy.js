document.addEventListener("DOMContentLoaded", function () {
    const loggedInUser = localStorage.getItem("loggedInUser"); // Get the logged-in user's email
    if (!loggedInUser) {
        alert("Please log in to view properties.");
        window.location.href = "login.html"; // Redirect to login page if not logged in
        return;
    }

    const propertiesContainer = document.getElementById("properties-container");
    const messageModal = document.getElementById("message-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const sendMessageBtn = document.getElementById("send-message-btn");
    const messageInput = document.getElementById("message-input");
    const propertyDetails = document.getElementById("property-details");

    // Retrieve the properties for sale from localStorage
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    const propertiesForSale = properties.filter(property => property.type === "sell");

    // Display properties for sale
    function displayProperties(propertiesForSale) {
        if (propertiesForSale.length === 0) {
            propertiesContainer.innerHTML = "<p>No properties for sale.</p>";
        } else {
            propertiesContainer.innerHTML = ""; // Clear loading message
            propertiesForSale.forEach(property => {
                const propertyCard = document.createElement("div");
                propertyCard.classList.add("property-card");
                propertyCard.innerHTML = `
                    <h3>${property.title}</h3>
                    <p><strong>Location:</strong> ${property.location}</p>
                    <p><strong>Price:</strong> ${property.price}</p>
                    <p><strong>Description:</strong> ${property.description}</p>
                    <button class="message-btn" data-property-id="${property.id}">Message Seller</button>
                `;
                propertiesContainer.appendChild(propertyCard);
            });
        }
    }

    // Event listener for message buttons
    propertiesContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("message-btn")) {
            const propertyId = event.target.getAttribute("data-property-id");
            const property = properties.find(p => p.id === propertyId);

            if (property) {
                // Show the message modal with the property details
                propertyDetails.textContent = `Interested in: ${property.title} at ${property.location}. Price: ${property.price}`;
                messageModal.style.display = "block";
            }
        }
    });

    // Close message modal
    closeModalBtn.addEventListener("click", function () {
        messageModal.style.display = "none";
    });

    // Send message
    sendMessageBtn.addEventListener("click", function () {
        const message = messageInput.value.trim();
        if (!message) {
            alert("Please enter a message.");
            return;
        }

        const newMessage = {
            sender: loggedInUser,
            receiver: "propertyOwnerEmail", // Replace with property owner email
            message: message,
            timestamp: new Date().toISOString(),
        };

        // Save the message to localStorage
        const messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(newMessage);
        localStorage.setItem("messages", JSON.stringify(messages));

        alert("Message sent successfully!");
        messageModal.style.display = "none";
        messageInput.value = ""; // Clear message input
    });

    // Initial load of properties for sale
    displayProperties(propertiesForSale);
});

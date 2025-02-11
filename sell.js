document.addEventListener("DOMContentLoaded", function () {
      const propertiesContainer = document.getElementById("properties-container");
      const loggedInUser = localStorage.getItem("loggedInUser");
  
      if (!loggedInUser) {
          alert("Please log in to access your properties.");
          window.location.href = "login.html"; // Redirect to login page
          return;
      }
  
      // Retrieve properties from localStorage
      const properties = JSON.parse(localStorage.getItem("properties")) || [];
      const userProperties = properties.filter(property => property.userEmail === loggedInUser);
  
      if (userProperties.length === 0) {
          propertiesContainer.innerHTML = "<p>No properties listed yet.</p>";
      } else {
          userProperties.forEach(property => {
              // Create a card to display each property
              const propertyCard = document.createElement("div");
              propertyCard.classList.add("property-card");
              propertyCard.innerHTML = `
                  <h3>${property.title}</h3>
                  <p><strong>Price:</strong> ${property.price}</p>
                  <p><strong>Location:</strong> ${property.location}</p>
                  <p><strong>Description:</strong> ${property.description}</p>
                  <p><strong>Status:</strong> ${property.status || "Not listed yet"}</p>
                  <button class="sell-btn" data-property-id="${property.id}">Sell</button>
                  <button class="rent-btn" data-property-id="${property.id}">Rent</button>
              `;
              propertiesContainer.appendChild(propertyCard);
          });
      }
  
      // Event listeners for sell/rent buttons
      propertiesContainer.addEventListener("click", function (event) {
          const propertyId = event.target.getAttribute("data-property-id");
          const action = event.target.className;
  
          if (propertyId && (action === "sell-btn" || action === "rent-btn")) {
              handlePropertyAction(propertyId, action);
          }
      });
  
      // Function to handle the action (Sell or Rent)
      function handlePropertyAction(propertyId, action) {
          // Retrieve properties from localStorage
          const properties = JSON.parse(localStorage.getItem("properties")) || [];
          const updatedProperties = properties.map(property => {
              if (property.id === propertyId) {
                  // Update the property status
                  if (action === "sell-btn") {
                      property.status = "Up for Sale";
                      property.type = "sell"; // Add a property type to indicate if it's for sell
                  } else if (action === "rent-btn") {
                      property.status = "Up for Rent";
                      property.type = "rent"; // Add a property type to indicate if it's for rent
                  }
              }
              return property;
          });
  
          // Save the updated properties list back to localStorage
          localStorage.setItem("properties", JSON.stringify(updatedProperties));
  
          // Display success message
          alert(`Property marked as ${action === "sell-btn" ? "Up for Sale" : "Up for Rent"}!`);
  
          // Refresh the page to reflect changes
          window.location.reload();
      }
  });
  
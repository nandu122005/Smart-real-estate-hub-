document.addEventListener("DOMContentLoaded", function () {
      const loggedInUser = localStorage.getItem("loggedInUser"); // Get the logged-in user's email
      const propertyId = new URLSearchParams(window.location.search).get("propertyId"); // Get property ID from URL
      
      if (!loggedInUser || !propertyId) {
          alert("Invalid access. Please log in and select a property.");
          window.location.href = "login.html"; // Redirect to login if not logged in
          return;
      }
  
      const messageContainer = document.getElementById("message-container");
      const messageInput = document.getElementById("message-input");
      const sendMessageBtn = document.getElementById("send-message-btn");
  
      // Retrieve property details from localStorage
      const properties = JSON.parse(localStorage.getItem("properties")) || [];
      const property = properties.find(prop => prop.id === propertyId);
      
      if (property) {
          document.getElementById("property-title").textContent = property.title;
          document.getElementById("property-location").textContent = property.location;
          document.getElementById("property-price").textContent = property.price;
      }
  
      // Retrieve messages from localStorage
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      const propertyMessages = messages.filter(msg => msg.propertyId === propertyId);
  
      // Display existing messages
      propertyMessages.forEach(message => {
          const messageElement = document.createElement("p");
          messageElement.textContent = `${message.sender}: ${message.message}`;
          messageContainer.appendChild(messageElement);
      });
  
      // Function to send a message
      sendMessageBtn.addEventListener("click", function () {
          const message = messageInput.value.trim();
          if (!message) {
              alert("Please type a message.");
              return;
          }
  
          const newMessage = {
              sender: loggedInUser,
              receiver: property.userEmail, // The owner of the property
              message: message,
              timestamp: new Date().toISOString(),
              propertyId: propertyId,
              propertyType: property.type // Store whether it's 'rent' or 'sell'
          };
  
          // Store message in localStorage
          messages.push(newMessage);
          localStorage.setItem("messages", JSON.stringify(messages));
  
          // Display the message
          const messageElement = document.createElement("p");
          messageElement.textContent = `${newMessage.sender}: ${newMessage.message}`;
          messageContainer.appendChild(messageElement);
  
          // Check for "agree" based on property type (rent or sell)
          checkAgreement(propertyId, property.type);
  
          // Clear the input field
          messageInput.value = "";
      });
  
      // Check if both parties have agreed
      function checkAgreement(propertyId, propertyType) {
          const messages = JSON.parse(localStorage.getItem("messages")) || [];
          const propertyMessages = messages.filter(msg => msg.propertyId === propertyId);
          
          const renterMessage = propertyMessages.find(msg => msg.sender === loggedInUser && msg.message.toLowerCase() === "agree");
          const ownerMessage = propertyMessages.find(msg => msg.receiver === loggedInUser && msg.message.toLowerCase() === "agree");
  
          if (propertyType === "rent" && renterMessage && ownerMessage) {
              updatePropertyStatus(propertyId, "Rented");
          } else if (propertyType === "sell" && renterMessage && ownerMessage) {
              updatePropertyStatus(propertyId, "Sold");
          }
      }
  
      // Update property status to "Rented" or "Sold"
      function updatePropertyStatus(propertyId, status) {
          const properties = JSON.parse(localStorage.getItem("properties")) || [];
          const updatedProperties = properties.map(property => {
              if (property.id === propertyId) {
                  property.status = status;
              }
              return property;
          });
  
          // Save updated properties back to localStorage
          localStorage.setItem("properties", JSON.stringify(updatedProperties));
  
          alert(`The property has been successfully ${status.toLowerCase()}!`);
          window.location.href = "dashboard.html"; // Redirect to dashboard
      }
  });
  
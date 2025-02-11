document.addEventListener("DOMContentLoaded", () => {
      const loggedInUser = localStorage.getItem("loggedInUser");
      const messages = JSON.parse(localStorage.getItem("messages")) || [];
      const property = JSON.parse(localStorage.getItem("currentProperty")) || {};
      const otherUser = property.ownerEmail === loggedInUser 
          ? property.buyerEmail 
          : property.ownerEmail;
  
      // Populate property details
      document.getElementById("property-title").textContent = property.title;
      document.getElementById("property-type").textContent = property.type;
      document.getElementById("property-price").textContent = property.price;
      document.getElementById("property-location").textContent = property.location;
      document.getElementById("property-description").textContent = property.description;
  
      // Populate user details
      const users = JSON.parse(localStorage.getItem("users")) || {};
      const otherUserDetails = users[otherUser];
      document.getElementById("user-name").textContent = otherUserDetails?.name || "Unknown";
      document.getElementById("user-email").textContent = otherUser || "Unknown";
      document.getElementById("user-contact").textContent = otherUserDetails?.contact || "N/A";
  
      // Load and display conversation
      const conversationContainer = document.getElementById("conversation-container");
      function renderMessages() {
          const conversation = messages.filter(
              (msg) => (msg.from === loggedInUser && msg.to === otherUser) || 
                       (msg.from === otherUser && msg.to === loggedInUser)
          );
          conversationContainer.innerHTML = conversation
              .map(
                  (msg) => `
                      <div class="message ${msg.from === loggedInUser ? "sent" : "received"}">
                          <p>${msg.content}</p>
                      </div>
                  `
              )
              .join("");
      }
      renderMessages();
  
      // Handle message submission
      document.getElementById("message-form").addEventListener("submit", (e) => {
          e.preventDefault();
          const messageInput = document.getElementById("message-input");
          const newMessage = {
              from: loggedInUser,
              to: otherUser,
              content: messageInput.value.trim(),
              timestamp: new Date().toISOString(),
          };
          messages.push(newMessage);
          localStorage.setItem("messages", JSON.stringify(messages));
          messageInput.value = "";
          renderMessages();
      });
  });
  
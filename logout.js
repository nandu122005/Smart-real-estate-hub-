document.addEventListener("DOMContentLoaded", function () {
      // Clear the logged-in user's session data
      localStorage.removeItem("loggedInUser");
  
      // Redirect to home page or login page after logout
      window.location.href = "index.html"; // Change this to your preferred page
  });
  
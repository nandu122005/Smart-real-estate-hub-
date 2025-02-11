// Retrieve all properties from localStorage
function getProperties() {
      const properties = localStorage.getItem("properties");
      return properties ? JSON.parse(properties) : [];
  }
  
  // Save properties back to localStorage
  function saveProperties(properties) {
      localStorage.setItem("properties", JSON.stringify(properties));
  }
  
  // Add a new property to localStorage
  function addProperty(property) {
      const properties = getProperties();
      properties.push(property);
      saveProperties(properties);
  }
  
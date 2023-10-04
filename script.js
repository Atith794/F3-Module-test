
// Function to fetch the user's IP address and display it on the page
function getUserIP() {
    fetch("https://ipinfo.io/json")
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip;
        // Display the IP address on the page
        document.getElementById("ip-address").textContent = `Your IP Address: ${ipAddress}`;
      })
      .catch(error => {
        console.error("Error fetching IP address:", error);
      });
  }


  function getAdditionalInfo() {
    fetch("https://ipinfo.io/json")
      .then(response => response.json())
      .then(data => {
        // Handle the additional information from the API as needed
        console.log("Additional information:", data);
        const [latitude, longitude] = data.loc.split(",");
      
      // Initialize the map
        const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        zoom: 12 // You can adjust the zoom level as needed
      });
      
      // Create a marker for the user's location
      const marker = new google.maps.Marker({
        position: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
        map: map,
        title: "Your Location"

        


      });

      })
      .catch(error => {
        console.error("Error fetching additional information:", error);
      });


  }


// window.addEventListener("load", getUserIP);
  
  // Call the function to get and display the IP address when the page loads
  window.addEventListener("load", getUserIP);
  
  document.getElementById("btngs").addEventListener("click", getAdditionalInfo);
  document.getElementById("btngs").addEventListener("click", () => {
    // Open the map.html page in a new browser tab/window
    window.open("map.html", "_blank");
  });

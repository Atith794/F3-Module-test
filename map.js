
  
function getUserIP() {
    fetch("https://ipinfo.io/json")
      .then(response => response.json())
      .then(data => {
        const ipAddress = data.ip;
        // Display the IP address on the page
        document.getElementById("ip-address").textContent = `${ipAddress}`;
      })
      .catch(error => {
        console.error("Error fetching IP address:", error);
      });
  }





// Function to get additional information from the API and show on Google Map
function getAdditionalInfo() {
    fetch("https://ipinfo.io/json")
      .then(response => response.json())
      .then(data => {
        // Handle the additional information from the API
        console.log("Additional information:", data);
  
        // Extract latitude, longitude, and timezone
        const [latitude, longitude] = data.loc.split(",");
        const timeZone = data.timezone;
        const pincode = data.postal; // Assuming the pincode property exists in your JSON response
  
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
  
        // Display the local time
        const localTime = new Date().toLocaleString('en-US', { timeZone });
        document.getElementById('local-time').textContent = `Local Time: ${localTime}`;
  
        // Send a GET request to the postalpincode.in API using the pincode
        fetch(`https://api.postalpincode.in/pincode/${pincode}`)
          .then(response => response.json())
          .then(pincodeData => {
            // Handle the data from the second API
            console.log("Postal Code Information:", pincodeData);
  
            // Check if the API response is an array
            if (Array.isArray(pincodeData)) {
              const postOffices = pincodeData[0].PostOffice;
  
              // Display the list of post offices
              const postOfficesList = document.getElementById('postOfficesList');
              postOfficesList.innerHTML = '';
  
              // Create an array to store markers for post offices
              const markers = [];
  
              // Iterate through post offices and display them
              postOffices.forEach(office => {
                const officeName = office.Name;
                const branchName = office.BranchType;
  
                // Create a list item for each post office
                const listItem = document.createElement('div');
                listItem.textContent = `${officeName} - ${branchName}`;
  
                // Append the list item to the postOfficesList
                postOfficesList.appendChild(listItem);
  
                // Create a marker for each post office and add it to the map
                const officeLat = parseFloat(office.Latitude);
                const officeLng = parseFloat(office.Longitude);
  
                const officeMarker = new google.maps.Marker({
                  position: { lat: officeLat, lng: officeLng },
                  map: map,
                  title: `${officeName} - ${branchName}`
                });
  
                // Push the marker to the markers array
                markers.push(officeMarker);
              });
  
              // Add a search box to filter post offices by name or branch office
              const searchBox = document.getElementById('searchBox');
              searchBox.addEventListener('input', () => {
                const query = searchBox.value.toLowerCase();
  
                markers.forEach(marker => {
                  const markerTitle = marker.getTitle().toLowerCase();
                  const shouldShow = markerTitle.includes(query);
  
                  marker.setVisible(shouldShow);
                });
              });
            }
          })
          .catch(error => {
            console.error("Error fetching postal code information:", error);
          });
      })
      .catch(error => {
        console.error("Error fetching additional information:", error);
      });
  }
  
 
  window.addEventListener("load", getAdditionalInfo);
  

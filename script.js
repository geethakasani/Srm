let map;
let marker;

// Initialize the map
function initMap() {
  map = L.map('map').setView([20, 0], 2);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

// Initialize map when the page loads
window.onload = initMap;

// Handle all select changes
document.querySelectorAll('select').forEach(select => {
  select.addEventListener('change', (e) => {
    const selectedOption = e.target.selectedOptions[0];
    const lat = parseFloat(selectedOption.dataset.lat);
    const lng = parseFloat(selectedOption.dataset.lng);
    
    if (lat && lng) {
      // Remove existing marker if any
      if (marker) {
        map.removeLayer(marker);
      }
      
      // Add new marker
      marker = L.marker([lat, lng])
        .addTo(map)
        .bindPopup(selectedOption.text)
        .openPopup();
      
      // Center map on selection
      map.setView([lat, lng], 10);
      
      // Update other dropdowns based on category
      updateRelatedLocations(e.target.id, selectedOption.value);
      
      // Update weather link with location
      updateWeatherLink(selectedOption.text);
    }
  });
});

// Function to update weather link
function updateWeatherLink(location) {
  const weatherLink = document.getElementById('weather-link');
  weatherLink.href = `/page2.html?location=${encodeURIComponent(location)}`;
  weatherLink.classList.remove('disabled');
}

// Function to update related locations
function updateRelatedLocations(selectedId, value) {
  const locations = {
    'wheat': {
      plot: 'rainfed',
      location: 'ukraine'
    },
    'rice': {
      plot: 'irrigated',
      location: 'punjab'
    },
    'corn': {
      plot: 'irrigated',
      location: 'california'
    },
    'cotton': {
      plot: 'rainfed',
      location: 'brazil'
    },
    'irrigated': {
      crops: 'rice',
      location: 'punjab'
    },
    'rainfed': {
      crops: 'wheat',
      location: 'ukraine'
    },
    'greenhouse': {
      crops: 'corn',
      location: 'california'
    },
    'organic': {
      crops: 'cotton',
      location: 'brazil'
    },
    'california': {
      crops: 'corn',
      plot: 'greenhouse'
    },
    'punjab': {
      crops: 'rice',
      plot: 'irrigated'
    },
    'brazil': {
      crops: 'cotton',
      plot: 'organic'
    },
    'ukraine': {
      crops: 'wheat',
      plot: 'rainfed'
    }
  };

  if (locations[value]) {
    Object.entries(locations[value]).forEach(([category, locationValue]) => {
      const selectId = `${category}-select`;
      if (selectId !== selectedId) {
        document.getElementById(selectId).value = locationValue;
      }
    });
  }
}
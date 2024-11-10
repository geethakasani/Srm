document.addEventListener('DOMContentLoaded', async () => {
  const API_KEY = '979bb5de3fcd94e2648b19a9909c3235';
  const currentDetails = document.getElementById('current-details');
  const forecastContainer = document.getElementById('forecast-container');
  const locationInput = document.getElementById('location-input');
  const searchBtn = document.getElementById('search-btn');

  const getWeatherData = async (city) => {
    try {
      // Fetch current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      const currentResponse = await fetch(currentUrl);
      if (!currentResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const currentData = await currentResponse.json();

      // Fetch 5-day forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      const forecastData = await forecastResponse.json();

      displayCurrentWeather(currentData);
      displayForecast(forecastData);
    } catch (error) {
      console.error('Error:', error.message);
      showError(error.message);
    }
  };

  function displayCurrentWeather(data) {
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    currentDetails.innerHTML = `
      <h2>${data.name}</h2>
      <p class="date">${date}</p>
      <div class="weather-icon">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
      </div>
      <div class="temp">${Math.round(data.main.temp)}°C</div>
      <div class="description">${data.weather[0].description}</div>
      <div class="details">
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>Feels like: ${Math.round(data.main.feels_like)}°C</p>
      </div>
    `;
  }

  function displayForecast(data) {
    const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);
    
    forecastContainer.innerHTML = dailyForecasts.map(day => {
      const date = new Date(day.dt * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      });

      return `
        <div class="forecast-day">
          <div class="date">${date}</div>
          <div class="icon">
            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
          </div>
          <div class="temp-high">${Math.round(day.main.temp_max)}°C</div>
          <div class="temp-low">${Math.round(day.main.temp_min)}°C</div>
          <div class="description">${day.weather[0].description}</div>
        </div>
      `;
    }).join('');
  }

  function showError(message) {
    currentDetails.innerHTML = `
      <div class="error">
        <p>Error: ${message}</p>
        <p>Please try again with a valid city name.</p>
      </div>
    `;
    forecastContainer.innerHTML = '';
  }

  // Event Listeners
  searchBtn.addEventListener('click', () => {
    const city = locationInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  });

  locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const city = locationInput.value.trim();
      if (city) {
        getWeatherData(city);
      }
    }
  });

  
});
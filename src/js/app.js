import { fetchCurrentWeather, fetchForecast } from './api.js';
import { displayCurrentWeather, displayForecast, showError } from './ui.js';

export function initWeatherApp() {
  const currentDetails = document.getElementById('current-details');
  const forecastContainer = document.getElementById('forecast-container');
  const locationInput = document.getElementById('location-input');
  const searchBtn = document.getElementById('search-btn');

  async function getWeatherData(city) {
    try {
      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);

      displayCurrentWeather(currentData, currentDetails);
      displayForecast(forecastData, forecastContainer);
    } catch (error) {
      console.error('Error:', error.message);
      showError(error.message, currentDetails, forecastContainer);
    }
  }

  function handleSearch() {
    const city = locationInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }

  // Event Listeners
  searchBtn.addEventListener('click', handleSearch);
  locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  
}
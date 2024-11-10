import { formatDate, roundTemp, getWeatherIconUrl } from './utils.js';

export function displayCurrentWeather(data, container) {
  const date = formatDate(Date.now(), {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  container.innerHTML = `
    <h2>${data.name}</h2>
    <p class="date">${date}</p>
    <div class="weather-icon">
      <img src="${getWeatherIconUrl(data.weather[0].icon, true)}" alt="${data.weather[0].description}">
    </div>
    <div class="temp">${roundTemp(data.main.temp)}°C</div>
    <div class="description">${data.weather[0].description}</div>
    <div class="details">
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind: ${data.wind.speed} m/s</p>
      <p>Feels like: ${roundTemp(data.main.feels_like)}°C</p>
    </div>
  `;
}

export function displayForecast(data, container) {
  const dailyForecasts = data.list.filter((item, index) => index % 8 === 0);
  
  container.innerHTML = dailyForecasts.map(day => {
    const date = formatDate(day.dt * 1000, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });

    return `
      <div class="forecast-day">
        <div class="date">${date}</div>
        <div class="icon">
          <img src="${getWeatherIconUrl(day.weather[0].icon)}" alt="${day.weather[0].description}">
        </div>
        <div class="temp-high">${roundTemp(day.main.temp_max)}°C</div>
        <div class="temp-low">${roundTemp(day.main.temp_min)}°C</div>
        <div class="description">${day.weather[0].description}</div>
      </div>
    `;
  }).join('');
}

export function showError(message, currentContainer, forecastContainer) {
  currentContainer.innerHTML = `
    <div class="error">
      <p>Error: ${message}</p>
      <p>Please try again with a valid city name.</p>
    </div>
  `;
  forecastContainer.innerHTML = '';
}
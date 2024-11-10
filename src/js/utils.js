export function formatDate(timestamp, options = {}) {
  return new Date(timestamp).toLocaleDateString('en-US', options);
}

export function roundTemp(temp) {
  return Math.round(temp);
}

export function getWeatherIconUrl(iconCode, large = false) {
  const size = large ? '@2x' : '';
  return `https://openweathermap.org/img/wn/${iconCode}${size}.png`;
}
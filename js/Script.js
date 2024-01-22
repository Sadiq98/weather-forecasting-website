
// Function to get weather data from OpenWeatherMap API
function getWeather(cityName) {
    const apiKey = '8f105a824b89534d37c375a8b88905b6';

    // Make API call
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Extract and convert relevant data
            const feels = data.main.feels_like;
            const tempKelvin = data.main.temp;
            const maxTemp = data.main.temp_max;
            const minTemp = data.main.temp_min;

          
            // Update city name dynamically
            const city_name = document.getElementById('city_name');
            city_name.innerText = cityName; 
            
              // Display weather information
              feels_like.innerHTML = Math.floor(feels - 273.15);
            country.innerHTML = data.sys.country;
            temCelsius.innerHTML = Math.floor(tempKelvin - 273.15);
            max_temp.innerHTML = Math.floor(maxTemp - 273.15);
            min_temp.innerHTML = Math.floor(minTemp - 273.15);
            wind_speed.innerHTML = data.wind.speed;
            humidity.innerHTML = data.main.humidity;
            weather_desc.innerHTML = data.weather[0].description;
            visibility.innerHTML = data.visibility;

            // Convert and display timezone
            const timezoneOffsetSeconds = data.timezone;
            const timezoneOffsetMinutes = Math.abs(timezoneOffsetSeconds) / 60;
            const timezoneSign = timezoneOffsetSeconds >= 0 ? '+' : '-';
            const timezoneFormatted = `${timezoneSign}${String(timezoneOffsetMinutes / 60).padStart(2, '0')}:${String(timezoneOffsetMinutes % 60).padStart(2, '0')}`;
            timeZone.innerHTML = `UTC ${timezoneFormatted}`;

            // Display weather icon
            const iconCode = data.weather[0].icon;
            const iconMapping = {
                '01d': 'clear-sky.png',
                '03d': 'few-clouds.png',
                '50d': 'smoke.png',
                '04n': 'default-icon.png'
            };

            const iconFilename = iconCode === '' ? 'default-icon.png' : iconMapping[iconCode] || 'default-icon.png';
            const iconUrl = `./icons/${iconFilename}`;
            weather_type.innerHTML = `<img src="${iconUrl}" style="width:50px; height:50px;" alt="Weather Icon">`;


            // Display sunrise and sunset times
            const sunriseTimestamp = data.sys.sunrise;
            const sunsetTimestamp = data.sys.sunset;
            sunrise.innerHTML = convertUnixTimestampToTime(sunriseTimestamp);
            sunset.innerHTML = convertUnixTimestampToTime(sunsetTimestamp);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to convert Unix timestamp to formatted time
function convertUnixTimestampToTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    return hours + ':' + minutes.substr(-2);
}

// Function to show Mumbai weather on page load
function showMumbaiWeather() {
    getWeather('Mumbai');
}

// Event listener for page load
window.addEventListener('load', showMumbaiWeather);

// Event listener for input change
document.getElementById('city').addEventListener('input', function () {
    const inputCityName = document.getElementById('city').value;
    getWeather(inputCityName);
});

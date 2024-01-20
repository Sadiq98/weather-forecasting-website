const getWeatherForecast = (city) => {
    cityName.innerHTML = city;
    const apiUrl = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather';
    const apiKey = '1f588b3eb9msh691a9c49301815ap166889jsn1af37d54f419';

    const params = new URLSearchParams({
        city: city,
    });

    const url = `${apiUrl}?${params.toString()}`;

    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    };

    return fetch(url, { method: 'GET', headers });
};

getWeatherForecast('Kalyan') // Default city value, you can replace it with the initial city you want to display
    .then(response => response.json())
    .then(data => {
        console.log(data);

        cloud_pct.innerHTML = data.cloud_pct;
        temp.innerHTML = data.temp;
        feels_like.innerHTML = data.feels_like;
        humidity.innerHTML = data.humidity;
        min_temp.innerHTML = data.min_temp;
        max_temp.innerHTML = data.max_temp;
        wind_speed.innerHTML = data.wind_speed;
        wind_degrees.innerHTML = data.wind_degrees;
        sunrise.innerHTML = data.sunrise;
        sunset.innerHTML = data.sunset;
    })
    .catch(error => {
        console.error('Error fetching weather data:', error);
    });

submit.addEventListener("click", (e) => {
    e.preventDefault();
    const inputCity = city.value;
    getWeatherForecast(inputCity)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            cloud_pct.innerHTML = data.cloud_pct;
            temp.innerHTML = data.temp;
            feels_like.innerHTML = data.feels_like;
            humidity.innerHTML = data.humidity;
            min_temp.innerHTML = data.min_temp;
            max_temp.innerHTML = data.max_temp;
            wind_speed.innerHTML = data.wind_speed;
            wind_degrees.innerHTML = data.wind_degrees;
            sunrise.innerHTML = data.sunrise;
            sunset.innerHTML = data.sunset;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});

const API_KEY = "3c8c359564af834856f809bbed8a379e"; // Replace with your actual OpenWeatherMap API key

// Function to fetch weather data by city name
async function getWeather() {
    const city = document.getElementById("city").value.trim();

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    fetchWeatherData(url);
}

// Function to fetch weather data by user's current location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

                fetchWeatherData(url);
            },
            (error) => {
                alert("Location access denied. Please enter a city manually.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Function to fetch data from API and display it
async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

            document.getElementById("weatherResult").innerHTML = `
                <p>📍 Location: <strong>${data.name}, ${data.sys.country}</strong></p>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>🌡️ Temperature: <strong>${data.main.temp}°C</strong></p>
                <p>🌥️ Condition: <strong>${data.weather[0].description}</strong></p>
                <p>💨 Wind Speed: <strong>${data.wind.speed} m/s</strong></p>
                <p>💧 Humidity: <strong>${data.main.humidity}%</strong></p>
            `;
        } else {
            document.getElementById("weatherResult").innerHTML = `<p>⚠️ City not found</p>`;
        }
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p>⚠️ Error fetching data</p>`;
    }
}

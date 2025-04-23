const apiKey = "d2ea159620293dace9600f7f768cba1e"; 


function getWeather(city = "") {
    if (!city) {
        city = document.getElementById("city").value;
    }
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                document.getElementById("city-name").textContent = `Weather in ${data.name}`;
                document.getElementById("temperature").textContent = `${data.main.temp}°C`;
                document.getElementById("description").textContent = data.weather[0].description;
                document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            } else {
                alert("City not found!");
            }
        })
        .catch(error => console.log("Error fetching weather data:", error));
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    document.getElementById("city-name").textContent = `Weather in ${data.name}`;
                    document.getElementById("temperature").textContent = `${data.main.temp}°C`;
                    document.getElementById("description").textContent = data.weather[0].description;
                    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
                    document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                })
                .catch(error => console.log("Error fetching location weather:", error));
        });
    }
}

window.onload = getUserLocation;

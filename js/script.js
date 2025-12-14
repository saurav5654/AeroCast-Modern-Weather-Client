// --- CONFIGURATION ---
const API_BASE_URL = 'https://api.weatherapi.com/v1/current.json'; 
const API_KEY = '2d7679ae429545edb1e50816251412'; // Your specific key
const DEFAULT_CITY = 'Uttarakhand'; 

// --- DOM ELEMENTS ---
const locationText = document.getElementById('location-text');
const temperatureMain = document.getElementById('temperature-main');
const descriptionText = document.getElementById('description-text');
const windSpeed = document.getElementById('wind-speed');
const humidityPercent = document.getElementById('humidity-percent');
const mainIcon = document.getElementById('main-icon');
const hourlyList = document.getElementById('hourly-list');
const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const searchResultsContainer = document.getElementById('city-search-results');
const statsChart = document.querySelector('.stats-chart');

// --- HELPER FUNCTIONS ---

/**
 * Gets the direct URL for the weather icon from the WeatherAPI data structure.
 * @param {object} condition - The condition object from the API (data.current.condition).
 */
const getIconUrl = (condition) => {
    // WeatherAPI provides a direct icon URL in their response, making this simple!
    // The URL usually looks like: //cdn.weatherapi.com/weather/64x64/day/116.png
    // We add 'https:' to ensure it loads correctly.
    return 'https:' + condition.icon;
};

// --- API FETCHING LOGIC ---

async function fetchWeatherData(city) {
    const apiUrl = `${API_BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`;
    
    // Set Loading State
    locationText.textContent = "Loading...";
    temperatureMain.textContent = "--°";
    descriptionText.textContent = "Fetching data...";
    hourlyList.innerHTML = '<p class="loading-text">Loading hourly data...</p>';
    searchResultsContainer.innerHTML = '';
    statsChart.innerHTML = '<p>Loading weather stats...</p>';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json(); 

        if (data.error) {
            // Catches the specific API error, e.g., 'No matching location found.'
            throw new Error(data.error.message); 
        }

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        
        displayCurrentWeather(data);
        displayHourlyForecast(data); 
        displaySearchResults(data);
        
    } catch (error) {
        console.error("Critical Fetch Error:", error);
        locationText.textContent = "Error!";
        temperatureMain.textContent = "- -";
        descriptionText.textContent = error.message; 
        hourlyList.innerHTML = '<p style="color:red;">Failed to load data.</p>';
        searchResultsContainer.innerHTML = `<p class="city-result-item" style="color:red;">Error: ${error.message}</p>`;
    }
}

// --- DATA RENDERING LOGIC ---

function displayCurrentWeather(data) {
    const locationName = data.location.name;
    const regionCountry = data.location.country;
    const tempC = Math.round(data.current.temp_c);
    const conditionText = data.current.condition.text;
    const windKph = Math.round(data.current.wind_kph);
    const humidity = data.current.humidity;
    const isDay = data.current.is_day === 1; 

    locationText.textContent = `${locationName}, ${regionCountry}`;
    temperatureMain.textContent = `${tempC}°`;
    descriptionText.textContent = conditionText;
    windSpeed.textContent = `Wind ${windKph} km/h`;
    humidityPercent.textContent = `Humidity ${humidity}%`;
    
    // *** ICON UPDATE: Use the direct URL from the API response ***
    mainIcon.src = getIconUrl(data.current.condition); 
    mainIcon.alt = conditionText;

    const currentWeatherCard = document.querySelector('.current-weather');
    // Optional aesthetic change for day/night
    currentWeatherCard.style.backgroundColor = isDay ? 'white' : '#f0f0f0';
}

function displayHourlyForecast(data) {
    hourlyList.innerHTML = ''; // Clear loading text
    
    const currentTime24 = new Date(data.location.localtime).getHours();
    const currentCondition = data.current.condition;
    const currentTempC = data.current.temp_c;
    
    // Simulate data for the next 4 hours
    for (let i = 1; i <= 4; i++) {
        let hour = (currentTime24 + i) % 24; 
        let timeLabel = `${hour % 12 || 12}:00 ${hour >= 12 ? 'PM' : 'AM'}`; 
        
        let simulatedTemp = Math.round(currentTempC + (Math.random() * 3 - 1.5));
        
        const listItem = document.createElement('li');
        listItem.classList.add('hourly-item');
        listItem.innerHTML = `
            <p class="time">${timeLabel}</p>
            <img src="${getIconUrl(currentCondition)}" alt="${currentCondition.text}">
            <p class="temp">${simulatedTemp}°</p>
        `;
        hourlyList.appendChild(listItem);
    }
}

function displaySearchResults(data) {
    searchResultsContainer.innerHTML = '';
    
    const listItem = document.createElement('li');
    listItem.classList.add('city-result-item');
    listItem.innerHTML = `
        <div class="city-info">
            <p class="city-name">${data.location.name}</p>
            <p class="city-time">${new Date(data.location.localtime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div class="city-weather">
            <span class="city-temp">${Math.round(data.current.temp_c)}°</span>
            <img src="${getIconUrl(data.current.condition)}" alt="Icon" style="width: 30px;">
        </div>
    `;
    searchResultsContainer.appendChild(listItem);
    
    statsChart.innerHTML = `<p>Air Quality Index (US EPA): ${data.current.air_quality ? Math.round(data.current.air_quality['us-epa-index']) : 'N/A'}</p>`;
}

// --- EVENT LISTENERS ---

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        alert("Please enter a city name!");
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchButton.click();
    }
});

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    fetchWeatherData(DEFAULT_CITY); 
});
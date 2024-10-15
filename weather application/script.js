document.addEventListener("DOMContentLoaded",()=>{
    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const weatherInfo = document.getElementById('weather-info');

    const API_KEY = "a5c476598c4fcb337c1daf3aea9290da";

    getWeatherBtn.addEventListener('click',async ()=>{
        const city = cityInput.value.trim();
        if(!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
        
    })

    async function fetchWeatherData(city){
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

        const response = await fetch(url);
        console.log("Response",response);
        console.log( typeof response);


        if(!response.ok){
            throw new Error(" City Not Found")
        }

        const data = await response.json();
        return data;

    }
    
    function displayWeatherData(data){
        console.log(data);
        const {name , main , weather} = data;
        cityName.textContent = name;

        
        temperature.textContent = `Temperature : ${main.temp}`;
        description.textContent = `Weather : ${weather[0].description}`;

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');

    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

})
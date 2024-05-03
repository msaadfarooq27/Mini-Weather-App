
async function GetWeather(city){
    if(city=== '' || city.trim()=== ''){
        alert('Enter the city name to proceed');
        return;
    }
    else{
        const hitResponse = 
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=979e1cbd21f094391c1ed9e968cfb804&units=metric`);
        if(!hitResponse.ok){
            const err_Message = document.querySelector('.error');
            err_Message.style.display = "block";
        }
        const data = await hitResponse.json();
        if(data.error_message){
            throw new Error(data.error_message);
        }
        return data;
    }
}


class WeatherData {
    constructor(){
        this.searchBtn = document.getElementById('city-search-btn');
        this.searchBtn.addEventListener('click', this.SearchButtontnHandler);
    }   

    async SearchButtontnHandler(){
        try{
            const input = document.getElementById('city-name');
            input.addEventListener('click', ()=>{
                document.querySelector('.error').style.display = "none";
            });
            const inputValue = document.getElementById('city-name').value;
            const responseData =  await GetWeather(inputValue);
            input.value = '';
            const weatherData = {
                city: responseData.name,
                temp: Math.ceil(responseData.main.temp),
                humidity: responseData.main.humidity,
                wind: Math.round(responseData.wind.speed),
                weather: responseData.weather[0]
            }
            new CardUpdate(weatherData);
        } catch(err){
            console.log(err.message);
        }
}
}

class CardUpdate {
constructor(info){
this.details = info;
this.tempPlace = document.querySelector('.temp');
this.cityPlace = document.querySelector('.city');
this.humidPlace = document.querySelector('.humidity');
this.windPlace =  document.querySelector('.wind');
this.weatherIcon = document.querySelector('.Weather-icon');
// this.visualUpdate();
this.Update();
}

Update(){
        this.visualUpdate();
        this.contentUpdate(); 
}

contentUpdate(){
        this.tempPlace.textContent = `${this.details.temp}°C`;
        this.cityPlace.textContent = this.details.city;
        this.humidPlace.textContent = `${this.details.humidity}%`;
        this.windPlace.textContent = `${this.details.wind}Km/h`;
}
visualUpdate(){
        const condition = this.details.weather.description;

        if (condition.includes('clear')){
        this.weatherIcon.src = "images/clear.png";
        }
        else if(condition.includes('light')){
            this.weatherIcon.src = "images/drizzle.png";
        }
        else if(condition.includes('rain') && !condition.includes('light')){
            this.weatherIcon.src = "images/rain.png";
        }
        else if(condition.includes('clouds')){
            this.weatherIcon.src = "images/clouds.png";
        }
        else if(condition.includes('snow')){
            this.weatherIcon.src = "images/snow.png";
        }
        else{
            this.weatherIcon.src = "images/mist.png";
        }
        document.querySelector('.Weather').style.display = 'block';
}
}

new WeatherData();
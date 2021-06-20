var weatherInfo = document.getElementById('weatherInfo');
var pollutionInfo = document.getElementById('pollutionInfo');
var switchAqi = document.getElementById('switchAqi');
var swithWeather = document.getElementById('switchWeather')

// Sider
var pointer = document.getElementById('aqiPointer');

// Input
var inputTxt = document.getElementById('inputTxt');
var inputBtn = document.getElementById('inputBtn');

const getDate = (timestamp, offset) => {
    const date = new Date((timestamp+offset) * 1000);
    var utcString = date.toUTCString();
    const finalDate = utcString.slice(0, -4);
    document.getElementById('time').innerHTML = finalDate;
    document.getElementById('time1').innerHTML = finalDate;
}

const adjustSlider = (aqi) => {
    const value= document.getElementById('aqi');
    switch(aqi) {
        case 1:
            pointer.setAttribute('style', 'left: 10%');
            value.innerHTML = 'Good';
            break;
        case 2:
            pointer.setAttribute('style', 'left: 30%');
            value.innerHTML = 'Fair';
            break;
        case 3:
            pointer.setAttribute('style', 'left: 50%');
            value.innerHTML = 'Moderate';
            break;
        case 4:
            pointer.setAttribute('style', 'left: 70%');
            value.innerHTML = 'Poor';
            break;
        case 5:
            pointer.setAttribute('style', 'left: 90%');
            value.innerHTML = 'Very Poor';
            break;
    }
}

const getLocation = async (lat, lon) => {
    try {
        const response = await fetch(`https://js-bcknd.herokuapp.com/geolocation/lat/${lat}/lon/${lon}`);
        const location = await response.json();
        const name = location[0].name;
        const country = location[0].country;
        document.getElementById('location').innerHTML = `${name}, ${country}`;
        document.getElementById('location1').innerHTML = `${name}, ${country}`;
        getWeatherDetails(lat, lon);
    } catch (error) {
        console.log(error);
    }
}

const getLocationByLoc = async (loc) => {
    try {
        let res = [];
        const response = await fetch(`https://js-bcknd.herokuapp.com/geolocation/${loc}`);
        const location = await response.json();
        res.push(location[0].lat);
        res.push(location[0].lon);
        res.push(location[0].name + ', ' + location[0].country);
        document.getElementById('location').innerHTML = res[2];
        document.getElementById('location1').innerHTML = res[2];
        getWeatherDetails(res[0], res[1]);
    } catch (error) {
        console.log(error);
    }
}

const getWeatherDetails = async (lat, lon) => {
    try {
        const response = await fetch(`https://js-bcknd.herokuapp.com/weather/lat/${lat}/lon/${lon}`);
        const weather = await response.json();
        getDate(weather.current.dt, weather.timezone_offset);
        document.getElementById('temp').innerHTML = `${weather.current.temp}°C`;
        document.getElementById('temp2').innerHTML = `${weather.current.temp}°C`;
        document.getElementById('highLow').innerHTML = `${weather.daily[0].temp.max}°C / ${weather.daily[0].temp.min}°C`;
        let iconUrl = `http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`;
        document.getElementById('weatherIcon').setAttribute('src', iconUrl);
        document.getElementById('weatherDescription').innerHTML = `${weather.current.weather[0].main} (${weather.current.weather[0].description})`;
        document.getElementById('humidity').innerHTML = `${weather.current.humidity}%`;
        document.getElementById('wind').innerHTML = `${weather.current.wind_speed}km/h`;
        getPollutionDetails(lat, lon);
    } catch (error) {
        console.log(error);
        
    }
}

const getPollutionDetails = async (lat, lon) => {
    try {
        const response = await fetch(`https://js-bcknd.herokuapp.com/pollution/lat/${lat}/lon/${lon}`);
        const pollution =  await response.json();
        adjustSlider(pollution.list[0].main.aqi);
        document.getElementById('co').innerHTML = pollution.list[0].components.co;
        document.getElementById('no').innerHTML = pollution.list[0].components.no;
        document.getElementById('no2').innerHTML = pollution.list[0].components.no2;
        document.getElementById('o3').innerHTML = pollution.list[0].components.o3;
        document.getElementById('so2').innerHTML = pollution.list[0].components.so2;
        document.getElementById('pm2.5').innerHTML = pollution.list[0].components.pm2_5;
        document.getElementById('pm10').innerHTML = pollution.list[0].components.pm10;
        document.getElementById('nh3').innerHTML = pollution.list[0].components.nh3;
    } catch (error) {
        console.log(error);
        
    }
}

const populateApp = (input) => {
    if(typeof input === 'string') {
        getLocationByLoc(input);
    } else {
        getLocation(input[0], input[1]);
    }
}

// Switching weather and pollution info
switchAqi.addEventListener('click', () => {
    weatherInfo.setAttribute('style', 'display:none');
    pollutionInfo.setAttribute('style', 'display:flex');
});

switchWeather.addEventListener('click', () => {
    weatherInfo.setAttribute('style', 'display:flex');
    pollutionInfo.setAttribute('style', 'display:none');
});

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            let target = [];
            target.push(pos.coords.latitude); 
            target.push(pos.coords.longitude);   
            populateApp(target);
        })
    }
});

inputBtn.addEventListener('click', () => {
    populateApp(inputTxt.value);
    inputTxt.value = '';
});
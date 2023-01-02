//Variables
const txtSearch = document.querySelector('.txtSearch'),
weatherCon = document.querySelector('.weather-con');
form = document.querySelector('.form'),
weekday = document.querySelector('.weekday'),
date = document.querySelector('.date'),
city = document.querySelector('.city'),
temperture = document.querySelector('.temperture h1'),
weatherStaus = document.querySelector('.weather-staus h2'),
icon = document.querySelector('.icon'),
Tmax = document.querySelector('.t-max'),
Tmin = document.querySelector('.t-min'),
humidity = document.querySelector('.humidity'),
windSpeed = document.querySelector('.wind-speed'),
windDeg = document.querySelector('.wind-deg'),
pressure = document.querySelector('.pressure');


//EventListeners
form.addEventListener('submit' , showData)


//Functions
function showData(e){
    if(txtSearch.value != ''){
        e.preventDefault()
        
        
        let apiKey = '98f9d3c0cc63e0b6689d74759cf58240'
        let query = txtSearch.value
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`)
        .then((response) => response.json())
        .then((data) => GetData(data));
        weatherCon.style.opacity = '1'
    }

}
function GetData(data){

    let d = String(new Date()).split(' ')
    date.innerHTML = `${d[2]} ${d[1]} ${d[3]}`

    let weekdays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    let w = new Date().getDay()
    weekday.innerHTML = weekdays[w]

    city.innerHTML = `${data.name} ${data.sys.country}`

    temperture.innerHTML = `${data.main.temp} °C`

    weatherStaus.innerHTML = data.weather[0].description
    
    let img;

    if(data.weather[0].main == 'Haze' || data.weather[0].main == 'Mist'){
        img = `
        <img src="./images/water_white_24dp.svg" alt="">
        `
        icon.innerHTML = img
    }

    if(data.weather[0].main == 'Clear'){
        let time = new Date().getHours()
        if(time >= 18){
            img = `
            <img src="./images/nightlight_white_24dp.svg" alt="">
            `
        }else{
            img = `
            <img src="./images/sunny_white_24dp.svg" alt="">
            `
        }
        icon.innerHTML = img
    }

    if(data.weather[0].main == 'Clouds'){
        img = `
        <img src="./images/cloud_white_24dp.svg" alt="">
        `
        icon.innerHTML = img
    }

    if(data.weather[0].main == 'Snow'){
        img = `
        <img src="./images/cloudy_snowing_white_24dp.svg" alt="">
        `
        icon.innerHTML = img
    }
    
    if(data.weather[0].main == 'Rain'){
        img = `
        <img src="./images/rainy-day-svgrepo-com.svg" alt="">
        `
        icon.innerHTML = img
    }

    Tmax.innerHTML = `${data.main.temp_max} °C`
    Tmin.innerHTML = `${data.main.temp_min} °C`
    humidity.innerHTML = `${data.main.humidity} %`
    windSpeed.innerHTML = `${data.wind.speed} Km/h`
    windDeg.innerHTML = `${data.wind.deg}°`
    pressure.innerHTML = `${data.main.pressure}`
}

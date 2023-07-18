const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "aacb5e27f7ef9340ee7c9bde322ac2d8"

  

const baseUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?"
let UrlForcast = baseUrlForcast + "appId=" + apiKey +"&q="  /* +  city */



const form = document.querySelector(".search-box")
const input = document.querySelector(".input")
const inputCity = document.querySelector(".city")
form.addEventListener("submit",(e) => {
    main(e)


})


function main(foam) {
    foam.preventDefault()
    let value = validateName(input.value)
    SendRequest(value)
    
}



function validateName(value) {
    let cityName = value.trim()
    cityName = cityName.toLowerCase()
    return cityName
}

function SendRequest(cityName) {
    let url = baseUrl + "appId=" + apiKey + "&q=" + cityName;

    fetch(url) 
    .then(response => {
        if (response.status === 404) {
            throw new Error('City not found');
        }
        return response.json();
    })
    .then(data => {
        updataScreen(data)
       
    })
    .catch(e => {
       console.log(e)
    });
}



function updataScreen(data) {
    const tempText = document.querySelector(".temp-text")
    const feelslikeText = document.querySelector(".fellsLike")
    const tempMinMax = document.querySelector(".tempMinMax")
    const humidityText = document.querySelector(".Humidity")
    const pressureText = document.querySelector(".pressure")
    const vissibilityText = document.querySelector(".visibililty")
    const windSpeedText = document.querySelector(".windSpeed")
    const sunriseText = document.querySelector(".sunrise")
    const sunsetText = document.querySelector(".sunset")
    const cityText = document.querySelector(".city")

    
    cityText.textContent =  data.name + " " +data.sys["country"]


    cloudsShow(data.weather[0]["description"])

    const temperature   =  kelvinToCelcius(data.main["temp"])
    tempText.textContent = temperature + " Celsius"

    feelslikeText.textContent =  "Feels like : "  +kelvinToCelcius(data.main["feels_like"]) + " Celsius"

    const minTemp = "Min " + kelvinToCelcius(data.main["temp_min"]) + "C"
    const maxTemp = "Max " + kelvinToCelcius(data.main["temp_max"]) + "C"
    tempMinMax.textContent = minTemp + "  " + maxTemp

    humidityText.textContent = "Humidity : " + data.main["humidity"] + "%"

    pressureText.textContent = "Pressure : " + data.main["pressure"] + "hpa"

    vissibilityText.textContent = " Visibility : " + data.visibility / 1000 + "km"

    windSpeedText.textContent = "Wind Speed : "  + data.wind["speed"] + "m/s"

    const sunriseData = convertTimeStamptoDate(data.sys["sunrise"])
    const sunsetData = convertTimeStamptoDate(data.sys["sunset"]) 
    sunriseText.textContent = "Sunrise: " + sunriseData[0] + " " + "Date" + sunriseData[1]
    sunsetText.textContent = "Sunset :" + sunsetData[0] + " " + "Date" + sunsetData[1]

}



function kelvinToCelcius(kelvin) {
    return  Math.round(kelvin - 273.15)
}



function cloudsShow(weather) {
    const lightModerateRain = `<i class="fa-solid fa-cloud-sun-rain"></i>`
    const heavyRain = `<i class="fa-solid fa-cloud-showers-heavy"></i>`
    const fewScatredClouds = `<i class="fa-solid fa-cloud-sun"></i>`
    const clearSky = `<i class="fa-solid fa-sun">`
    const cloud = document.querySelector(".cloud")
    const cloudText = document.querySelector(".cloud-text")


    if (weather === "light rain" || weather === "moderate rain") {
        cloud.innerHTML = lightModerateRain
        cloudText.textContent = weather

    } else if (weather === "heavy intensity rain") {
        cloud.innerHTML = heavyRain
        cloudText.textContent = weather
    } else if (weather === "clear sky") {
        cloud.innerHTML = clearSky
        cloudText.textContent = weather
    } else {
        cloud.innerHTML = fewScatredClouds
        cloudText.textContent = weather
    }
}






 function convertTimeStamptoDate(timpeStamp){
    const date = new Date(timpeStamp * 1000);
    const time = date.toLocaleTimeString([], { timeStyle: 'short' });
    const dateString = date.toLocaleDateString();
    return  [time , dateString]
} 


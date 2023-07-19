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
    sendForcastRequest(value)
    
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

    sunriseText.textContent = "Sunrise: chould not find solution "  
    sunsetText.textContent = "Sunset : chould not find solution"   

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


function sendForcastRequest(cityName) {
    let UrlForcast = baseUrlForcast + "appId=" + apiKey +"&q=" + cityName

    fetch(UrlForcast)
    .then(request =>  {
        if (request.status === 404) {
            throw new Error('City not found');
        }
        return request.json()
    })
    .then(data => {
        updataForcastScreen(data)
    })
    .catch(e => {
        console.log(e)
     });
}


function updataForcastScreen(data) {
    createForcastCards()
    let AllCards = document.querySelectorAll(".card")
    AllCards = Array.from(AllCards)
    
    
    const datalist = data.list
    let trackCards = 0;
     for (let i = 0; i < datalist.length;i = i + 4) {
        const dateText = AllCards[trackCards].querySelector(".forcastDate")
        const tempText = AllCards[trackCards].querySelector(".forcastTemp")
        const minMAxText = AllCards[trackCards].querySelector(".forcastMinMax")
        const windText = AllCards[trackCards].querySelector(".forcastWind")
        const humidityText = AllCards[trackCards].querySelector(".forcastHumidity")
        const cloudText = AllCards[trackCards].querySelector(".forcastCloud")

        dateText.textContent = "Date " + datalist[i].dt_txt

        tempText.textContent =  kelvinToCelcius(datalist[i].main["temp"]) + " Celsius"

        const minTemp = "Min " + kelvinToCelcius(datalist[i].main["temp_min"]) + "C"
        const maxTemp = "Max " + kelvinToCelcius(datalist[i].main["temp_max"]) + "C"
        minMAxText.textContent = minTemp + "  " + maxTemp

        cloudText.textContent = "Weather "  + datalist[i].weather[0]["description"]

        windText.textContent = "Wind Speed : "  + datalist[i].wind["speed"] + "m/s"

        humidityText.textContent = "Humidity : " + datalist[i].main["humidity"] + "%"
        trackCards++
        if (trackCards === 10) {
            break
        }
     }
}

function createForcastCards() {
    const cardsInHtml = document.querySelectorAll(".card")
    if (cardsInHtml.length >= 10)  {
        return
    } else  {
    const container = document.querySelector(".cards")
    const element = document.createElement("div")
    element.classList.add("card")
    
    let j = 40
    let array = []

    for (let i = 0; i < j;i++) {
        array.push(i)
    }

    for (let i = 0; i < array.length ; i= i + 4) {
        const element = document.createElement("div")
        element.classList.add("card")
        element.innerHTML = `   
    <div class="time flex2">
        <h4 class="day"><i class="fa-solid fa-calendar-days" style="font-size: 1.8rem;"></i></h4>
        <h4 class="date forcastDate"></h4>
    </div>

    <div class="forcast-temp flex2">
        <span class="icon"><iconify-icon icon="carbon:temperature-hot" style="font-size: 1.8rem;"></iconify-icon> </span>
        <div class="text forcastTemp"></div>
    </div>

    <div class="forcast-temp flex2">
        <span class="icon"><i class="fa-sharp fa-solid fa-temperature-three-quarters"></i></span>
        <div class="text forcastMinMax"></div>
    </div>

    <div class="flex2">
        <span class="icon"><i class="fa-solid fa-cloud-sun"></i></span>
        <span class="text forcastCloud"></span>
    </div>

    <div class="flex2">
        <span class="icon"><iconify-icon icon="wi:humidity" style="font-size: 1.8rem;"></iconify-icon></span>
        <span class="text forcastHumidity"></span>
    </div>

    <div class="flex2">
        <span class="icon"><i class="fa-solid fa-wind"></i></span>
        <span class="text forcastWind"></span>
    </div>

   `
    container.appendChild(element)
    }

    }


    
}
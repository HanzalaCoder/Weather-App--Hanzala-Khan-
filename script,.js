/*  const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const apiKey = "aacb5e27f7ef9340ee7c9bde322ac2d8"
let city = "London"
let  url = baseUrl + "appId=" + apiKey + "&q=" + city
  

const baseUrlForcast = "https://api.openweathermap.org/data/2.5/forecast?"


let UrlForcast = baseUrlForcast + "appId=" + apiKey +"&q=" + city
fetch(url) 
    .then(data => data.json())
    .then(allData => {
        console.log(allData)

    })
 
   */
const form = document.querySelector(".search-box")
const input = document.querySelector(".input")
const inputCity = document.querySelector(".city")
form.addEventListener("submit",(e) => {
    main(e)


})


function main(foam) {
    foam.preventDefault()
    let value = validateName(input.value)
    inputCity.textContent= "Weather in " + value
    console.log("h")
}



function validateName(value) {
    let cityName = value.trim()
    cityName = cityName.toLowerCase()
    return cityName
}


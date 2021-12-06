// console.log('Client side js file loaded')
// const location = require('../../src/utils/geocode')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('#weather-form')
const searchInput = document.querySelector('#location')
const errorMessage = document.querySelector('#error')
const weatherMessage = document.querySelector('#weatherInfo') 

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(weatherForm)
    console.log(errorMessage)
    console.log(`weatherMessage: ${weatherMessage}`)
    console.log(`SearchInput: ${searchInput.value}`)

    errorMessage.textContent = 'Loading...'
    weatherMessage.textContent = ''

    fetch(`http://localhost:3000/weather?address=${searchInput.value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                errorMessage.textContent = data.error
            } else {
                errorMessage.textContent = ''
                weatherMessage.textContent = `in ${data.locationName} the weahter is ${data.weatherDescription.toLowerCase()}. The current temperature is ${data.currentTemperature}, this feels like ${data.feeltTemperature}`
            }
        })
    })
})
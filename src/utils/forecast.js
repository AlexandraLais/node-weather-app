const request = require('request')

const currentWeather = (longitude, latitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=6cba8830ec8d59f79d2b7c1bdb9e4f54&query=${latitude},${longitude}&units=m`
    console.log('I am at the current weather')

    request({ url: weatherUrl, json: true}, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weatherstack API. ${error.info}`, undefined)
        } else if (body.error) {
            callback(`Request failed due to. ${body.error.info}`, undefined)
        } else {
            callback(undefined, {
                locationName: body.location.name,
                weatherIcon: body.current.weather_icons[0],
                weatherDescription: body.current.weather_descriptions[0],
                currentTemperature: body.current.temperature,
                feeltTemperature: body.current.feelslike
            })
        }
    })
}


module.exports = {
    currentWeather
}
const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=816c3862a5dc732a22794039e7672d34&query=${latitude},${longitude}`
    request(url, { "json": true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.current.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const { weather_descriptions, temperature, feelslike, humidity } = body.current
            const location = body.location.name
            callback(undefined, {
                forecast: `The weather in ${location} is ${weather_descriptions[0]}. The temperature is about ${temperature} degrees and it feels like ${feelslike}. Humidity: ${humidity}%.`,
                location
            })
        }
    })
}

module.exports = forecast
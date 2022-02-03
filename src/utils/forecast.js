const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=816c3862a5dc732a22794039e7672d34&query=${latitude},${longitude}`
    request(url, { "json": true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if (body.current.length === 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const { weather_descriptions, temperature, feelslike } = body.current
            const location = body.location.name
            callback(undefined, {
                location,
                description: weather_descriptions[0],
                temperature,
                feelslike
            })
        }
    })
}

module.exports = forecast
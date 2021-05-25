const request = require('request')



const weather = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0840c4bf95c59192258116f10d5ce93b&query=' + encodeURIComponent(lat) + ','+ encodeURIComponent(lon)

    request({url, json: true} , (error, {body} = {}) => {
        if(error) {
            callback('Unable to connect to weather services.' , undefined)
        } else if(body.error) {
            callback('No proper location has been specified' , undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. Current temperature is ' +body.current.temperature+ '. And it feels like ' + body.current.feelslike)
        }
    })
}

module.exports = weather
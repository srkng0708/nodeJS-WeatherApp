const request = require('request')

const geocode = (address , callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic3JrbmcwNzA4IiwiYSI6ImNrcDFqcW8wbzE1OGQydm54N211NHF6MmoifQ.gj8EaH_-gAb4hg60E0FZsg&limit=1'

    request({url, json: true} , (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services.' , undefined)
        } else if(body.features.length === 0) {
            callback('No proper location has been specified' , undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geocode
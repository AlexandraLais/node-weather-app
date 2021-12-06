const request = require('request')


const geocode = (address, callback) => {
    console.log(`geocode-address: ${address}`)
    const mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiYXdhLWVuZHJlc3MiLCJhIjoiY2tvNDd4azRlMWd1dTJwcGdqcjkxNGRybCJ9.6UPNWuIpZgC4LnZEg1JhpA&limit=1`

    request({url: mapBoxUrl, json: true}, (error, { body }) =>{
        if (error) {
            callback('unable to connect to Mapbox API', undefined)
        } else if (body.features.length === 0) {
            callback('No location found, try another search', undefined)
        } else {
            console.log(`location search: ${body.features[0].place_name}`)
            callback(undefined, {
                placeName: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
            })
        }
    })
}

module.exports = {
    geocode
}
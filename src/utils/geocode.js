const request = require('request')

const geocode = (address, callback) => {

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW5hbmRwYWwiLCJhIjoiY2tieDh3azZ4MGwyajJybXNhazI4d2IzcSJ9.mFJUScq-TZ9mRY9N5dPtLg&limit=1"
    
    request({url: url,json:true}, (error, {body})=>{

        if(error){
            callback('Unable to connect to loaction services',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
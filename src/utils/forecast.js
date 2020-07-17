const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=74c46ca8b05e742f47a5ade5d8458a36&query=' + latitude + ',' + longitude

    request({url: url, json:true},(error, { body }) => {

        if(error){
            callback('Unable to connect to weather service',undefined)
        }
        else if(body.error)
        {
            callback('Unable to find loaction',undefined)
        }
        else{
            callback(undefined,
               'It is currently '+body.current.temperature+' degrees out there.It feels like '+ body.current.feelslike + ' degree out.'
                )
        }

    })
}

module.exports = forecast
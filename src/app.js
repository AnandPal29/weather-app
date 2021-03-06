const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Anand'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Anand'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
    msg: 'How may I help you?',
    title: 'Help',
    name: 'Anand'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Please Provide Address'
        })
    }
    const address = req.query.address
    geocode(address,(error, {longitude,latitude,location} = {})=>{
        
        if(error){
            return res.send({
                error
            })
        }
        
        forecast(longitude,latitude, (error, forecastData) =>{  
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })

    
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Anand',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title:'404',
        name:'Anand',
        errorMessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is on')
})
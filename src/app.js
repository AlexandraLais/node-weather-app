const forecast = require('./utils/forecast.js')
const location = require('./utils/geocode.js')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app =  express()

// define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, resp) => {
    resp.render('', {
        title: 'Welcome To The Weather Report',
        name: 'Alexandra'
    })
})

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About',
        imgSrc: '/img/LittleGirl.jpg',
        name: 'Alexandra'
    })
})

app.get('/help', (req, resp) => {
    resp.render('help', {
        title: 'How to solve the Problem',
        problem: 'I get no sleep',
        solution: 'do a workout',
        name: 'Alexandra'
    })
})

app.get('/products', (req, resp) => {
    if (!req.query.search) {
        return resp.send({ error: 'you must provide a search term'})
    }
    console.log(req.query.search)
    resp.send({ product: []})
})

// app.com/wather
app.get('/weather', (req, resp) => {
    console.log(req.query)
    if (!req.query.address) {
        return resp.send({ error: 'No address provided'})
    }

    console.log(`url address parameter: ${req.query.address}`)
    location.geocode(req.query.address, (error, {longitude, latitude, placeName} = {}) => {
        if (error) {
            return resp.send({error})
        }
        forecast.currentWeather(longitude, latitude, (error, {weatherDescription, currentTemperature, feeltTemperature} = {}) => {
            if (error) {
                return resp.send({error})
            }

            resp.send({
                title: 'Weather',
                locationName: placeName, // body.location.name,
                weatherDescription,// body.current.weather_descriptions[0],
                currentTemperature, //body.current.temperature,
                feeltTemperature //body.current.feelslike
            })

        })
    })
})

app.get('/help/*',(req, resp) => {
    resp.render('404', {
        title: '404',
        errorMessage: 'Help articel not found',
        name: 'Alexandra'
    })
})

app.get('*',(req, resp) => {
    resp.render('404', {
        title: '404',
        errorMessage: 'Page could not be found',
        name: 'Alexandra'
    })
})

app.listen(3000, () => {
    console.log('Server is up an running on port 3000')
})
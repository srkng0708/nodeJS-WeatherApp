// IMPORTING
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

// USING EXPRESS 
const app= express()

// CREATING PATHS 
const pathToPublicDirectory = path.join(__dirname , '../public')
const pathToViews = path.join(__dirname , '../tempelates/views')
const pathToHbsPartials = path.join(__dirname , '../tempelates/partials')

// SETTING HBS AND VIEWS 
app.set('views' , pathToViews)
app.set('view engine' , 'hbs')
hbs.registerPartials(pathToHbsPartials)  

// USING STATIC DIRECTORY 
app.use(express.static(pathToPublicDirectory))

// RUNNING HOME PAGE 
app.get('' , (req, res) => {
    res.render('index' , {
        title: 'Weather App',
        name: 'Saransh Kanungo'
    })
})

// RUNNING ABOUT PAGE 
app.get('/about' , (req, res) => {
    res.render('about' , {
        title: 'About Me',
        name: 'Saransh Kanungo'
    })
})

// RUNNING HELP PAGE 
app.get('/help' , (req, res) => {
    res.render('help' , {
        error_code: 404,
        error_msg: 'Page not found',
        name: 'Saransh kanungo'
    })
})

// RUNNING WEATHER PAGE 
app.get('/weather' ,(req, res) => { 

    if(!req.query.address) {
        return res.send({error:'Please give a location to find'})
    }
    geocode(req.query.address , (error, {latitude, longitude, location} = {} ) => {
        if(error) {
            return res.send({error})
        }
        weather( latitude, longitude,  (error, forecastData) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location: location,
                weather: forecastData
            })
        })
    })
})

app.get('/help/*' , (req, res) => {
    res.send('Help article was not found')
})

app.get('*' , (req, res) => {
    res.send('My 404 page')
})

// OPENING THE PORT 
app.listen(3000 , () => {
    console.log("Server is running on port 3000")
})
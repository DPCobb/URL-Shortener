/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

// require express and body-parser
var express = require('express')
var body_parser = require('body-parser')
// instantiate express
var app = express()

// set up app to use body-parser
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended:true
}))

// set up the route prefixed with /api/v1
app.use('/api/v1/', require('./routes/app.js')(express))

// listen on port 3000
app.listen(3000, () => {
    console.log('Hello World.')
})

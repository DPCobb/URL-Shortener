/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

var express = require('express')
var body_parser = require('body-parser')
var app = express()

app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended:true
}))

app.use('/api/v1/', require('../routes/app.js')(express))

app.listen(3000, () => {
    console.log('Hello World.')
})

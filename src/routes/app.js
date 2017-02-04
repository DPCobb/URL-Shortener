/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

// require shortener - creates alphanumeric string
const short = require('../modules/shortener.js')
// require lastUrl model
const url = require('../models/url.js')
// export the router
module.exports = (express)=>{
    // call router method
    let router = express.Router()
    // get /api/v1/urls returns all urls created
    router.get('/urls', (req, res)=>{
        // get all urls
        url.findAll((data)=>{
            //return the json info for the last url
            res.json(data)
        })
    })
    // post /api/v1/urls creates a new shortened link
    router.post('/urls',(req, res)=>{
        // send the req, res to shortener
        res.send(short(req, res))
    })
    // return the router
    return router
}

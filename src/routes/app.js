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
const lastUrl = require('../models/lastUrl.js')
// export the router
module.exports = (express)=>{
    // call router method
    let router = express.Router()
    // get /api/v1/urls returns the last url created
    router.get('/urls', (req, res)=>{
        // find the last url created
        lastUrl.findOne((url)=>{
            //return the json info for the last url
            res.json(url)
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

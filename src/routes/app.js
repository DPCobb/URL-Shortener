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
    // get url by id
    router.get('/urls/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by ud
        url.findOne(req.body,(data)=>{
            //return the json info for the requested url
            res.json(data)
        })
    })
    // post /api/v1/urls creates a new shortened link
    router.post('/urls',(req, res)=>{
        let shortUrl = short(req)
        res.json(shortUrl)
        url.create(shortUrl)
    })

    router.post('/urls/:id',(req, res)=>{
        req.body.id = req.param.id
        // send the req, res to shortener
        res.send(short(req, res))
    })
    // return the router
    return router
}

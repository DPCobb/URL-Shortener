/**
 *
 * Daniel Cobb
 * 2-4-2017
 * Assignment 2: Dynamic API
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
            res.status(200).json(data)
        }), (err) =>{
            res.status(500).json(data)
        }
    })
    // get url by id
    router.get('/urls/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by ud
        url.findOne(req.body,(data)=>{
            //return the json info for the requested url
            res.status(200).json(data)
        }), (err) =>{
            res.status(500).json(data)
        }
    })
    router.delete('/urls/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by ud
        url.destroy(req.body,(data)=>{
            //return the json info for the requested url
            res.status(200).json(data)
        }), (err) =>{
            res.status(500).json(data)
        }
    })
    // post /api/v1/urls creates a new shortened link
    router.post('/urls',(req, res)=>{
        // get the shortened url
        let shortUrl = short(req)
        // display new url
        res.status(200).json(shortUrl)
        // add to db
        url.create(shortUrl)
    })

    // update url by ID
    router.post('/urls/:id',(req, res)=>{
        // get the id
        req.body.id = req.params.id
        // update and display info or error
        url.update(req.body, (err)=>{
            res.status(500).json(err)
        }, (data)=>{
            res.status(200).json(data)
        })
    })

    router.post('/create',(req, res)=>{
        let user =  req.body.email
        let pass = req.body.pass
        let key = user + pass
        const crypto = require('crypto');
        // create the hash to build alphanumeric string
        const keyHash = crypto.createHmac('sha256', key).digest('hex');
        let data = {
            "email": user,
            "pass": pass,
            "key": keyHash
        }
        let shortKeyHash = keyHash.substr(0,10)
        // add to db
        url.createUser(data,(success)=>{
            res.status(200).json(data)
        })
    })
    // return the router
    return router
}

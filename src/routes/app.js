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
module.exports = (express, log)=>{
    // call router method
    let router = express.Router()

    // get /api/v1/urls returns all urls created
    router.get('/urls', (req, res)=>{
        // get all urls
        url.findAll((data)=>{
            //return the json info for the last url
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Returned all URL's",
                "location" : "app.js line 19",
                "data":{
                    data
                }
            })
        }, (err) =>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 19",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })
    // get url by id
    router.get('/urls/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by ud
        url.findOne(req.body,(data)=>{
            //return the json info for the requested url
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Returned URL based on ID",
                "location" : "app.js line 48",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        }, (err) => {
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 48",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })
    // get url by user key
    router.get('/urls/user/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by user key
        url.findOneUser(req.body,(data)=>{
            //return the json info for the requested key
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Returned URL's based on User Key",
                "location" : "app.js line 81",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        }, (err) =>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 81",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })
    router.delete('/urls/:id', (req, res)=>{
        req.body.id = req.params.id
        // get one url back by ud
        url.destroy(req.body,(data)=>{
            //return the json info for the requested url
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Deleted URL based on ID",
                "location" : "app.js line 113",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        }, (err) =>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 113",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })
    // post /api/v1/urls creates a new shortened link
    router.post('/urls',(req, res)=>{
        // get the shortened url
        let shortUrl = short(req)
        // add to db
        url.create(shortUrl, (data)=>{
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Created short URL",
                "location" : "app.js line 146",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        }, (err)=>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 146",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })

    // update url by ID
    router.post('/urls/:id',(req, res)=>{
        // get the id
        req.body.id = req.params.id
        // update and display info or error
        url.update(req.body, (err)=>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 180",
                "data":err,
                "request":{
                    body
                }
            })
        }, (data)=>{
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Updated short URL by ID",
                "location" : "app.js line 180",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        })
    })

    router.post('/create',(req, res)=>{
        // get variables from req
        let user =  req.body.email
        let pass = req.body.pass
        let key = user + pass
        // set up hash
        const crypto = require('crypto');
        // create the hash to build alphanumeric string for user key
        const keyHash = crypto.createHmac('sha256', key).digest('hex');
        // shorten hash
        let shortKeyHash = keyHash.substr(0,10)
        // set data
        let data = {
            "email": user,
            "pass": pass,
            "key": shortKeyHash
        }
        // add to db
        url.createUser(data,(success)=>{
            res.status(200).json(data)
            let body = req.body
            log.debug({
                "type": "success",
                "msg": "Created new User Key",
                "location" : "app.js line 213",
                "data":{
                    data
                },
                "request":{
                    body
                }
            })
        }, (err) =>{
            res.status(500).json(err)
            let body = req.body
            log.debug({
                "type": "error",
                "msg": "Could not update short URL by ID",
                "location" : "app.js line 213",
                "data":err,
                "request":{
                    body
                }
            })
        })
    })
    // return the router
    return router
}

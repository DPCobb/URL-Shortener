/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

const url = require('../models/url.js')
module.exports = (express)=>{
    // call router method
    let router = express.Router()
    router.get('/:id', (req, res)=>{
        // get all urls
        req.body.id = req.params.id
        // get one url back by ud
        url.findOne(req.body,(data)=>{
            //return the json info for the requested url
            let target = data.url
            if(target.includes('http') || target.includes('https')){
                res.redirect(target)
            }
            else{
                res.redirect('http://'+target)
            }
        })
    })
    return router
}

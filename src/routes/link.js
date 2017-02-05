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

    // redirect based on short url
    router.get('/:url', (req, res)=>{
        // get the url param
        req.body.id = req.params.url
        // get one url back by short url value
        url.findOneUrl(req.body,(data)=>{
            //set the redirect target
            let target = data.url
            // if the url has http:// or https://
            if(target.includes('http') || target.includes('https')){
                // redirect to target
                res.redirect(target)
            }
            // if not add http and redirect
            else{
                res.redirect('http://'+target)
            }
        })
    })
    return router
}

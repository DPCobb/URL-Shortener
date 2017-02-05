/**
 *
 * Daniel Cobb
 * 2-4-2017
 * Assignment 2: Dynamic API
 *
 */

const url = require('../models/url.js')
module.exports = (express)=>{
    // call router method
    let router = express.Router()

    // redirect based on id
    router.get('/:id', (req, res)=>{
        // get the url param
        req.body.id = req.params.id
        // get one url back by id
        url.findOne(req.body,(data)=>{
            // set the target
            let target = data.url
            // if the target url has http or https
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

    // redirect based on short url
    router.get('/:prefix/:url', (req, res)=>{
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

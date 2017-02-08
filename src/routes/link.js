/**
 *
 * Daniel Cobb
 * 2-4-2017
 * Assignment 2: Dynamic API
 *
 */

const url = require('../models/url.js')
let log = require('../modules/debug.js')
module.exports = (express)=>{
    // call router method
    let router = express.Router()

    // redirect based on short url, used to redirect for tyny.io/URL
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
                log.debug({
                    "type": "success",
                    "msg": "Redirected User to external URL",
                    "location" : "link.js line 15",
                    "request":{
                        target
                    }
                })
            }
            // if not add http and redirect
            else{
                res.redirect('http://'+target)
                log.debug({
                    "type": "success",
                    "msg": "Redirected User to external URL",
                    "location" : "link.js line 15",
                    "request":{
                        target
                    }
                })
            }
        }, (err)=>{
            log.debug({
                "type": "error",
                "msg": "Redirect User to external URL failed",
                "location" : "link.js line 15",
                "data":err,
                "request":{
                    target
                }
            })
        })
    })
    return router
}

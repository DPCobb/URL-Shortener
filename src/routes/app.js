/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

const short = require('../modules/shortener.js')

module.exports = (express)=>{
    var lastUrl = "You haven't created any URLs yet.";
    var router = express.Router()
    router.get('/urls', (req, res)=>{
        res.json({lastCreated: lastUrl})
    })

    router.post('/urls',(req, res)=>{
        res.send(short(req, res))
    })
    return router
}

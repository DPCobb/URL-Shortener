/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

const short = require('../modules/shortener.js')
const lastUrl = require('../models/lastUrl.js')
module.exports = (express)=>{
    var router = express.Router()
    router.get('/urls', (req, res)=>{
        lastUrl.findOne((url)=>{
            res.json(url)
        })
        //res.json({lastCreated: lastUrl})
    })

    router.post('/urls',(req, res)=>{
        res.send(short(req, res))
    })
    return router
}

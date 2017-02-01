/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */
module.exports = (express)=>{
    var router = express.Router()
    router.get('/', (req, res)=>{
        res.json({hello:'world'})
    })

    router.post('/',(req, res)=>{
        res.send(req.body)
    })
    return router
}

/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */
module.exports = function(express){
    var router = express.Router()
    router.get('/', function(req, res){
        res.json({hello:'world'})
    })
    return router
}

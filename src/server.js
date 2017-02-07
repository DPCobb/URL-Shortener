/**
 *
 * Daniel Cobb
 * 2-4-2017
 * Assignment 2: Dynamic API
 *
 */

// require debug tool, express, and body-parser
let log = require('./modules/debug.js')
// Show debug warning
log.debugWarn()
let express = require('express')
let body_parser = require('body-parser')
// instantiate express
let app = express()

// set up app to use body-parser
app.use(body_parser.json())
app.use(body_parser.urlencoded({
    extended:true
}))

// set up the route prefixed with /api/v1
app.use('/api/v1/', require('./routes/app.js')(express, log))
// set up /go/ route
app.use('/go/', require('./routes/go.js')(express, log))
// set up direct route for redirect to link
app.use('/', require('./routes/link.js')(express, log))

// listen on port 3000
app.listen(3000, () => {
    //console.log('Hello World.')
    log.debug({
        "type": "success",
        "msg": "Listening to Server on Port 3000",
        "location" : "server.js line 34",
    })
    log.msg('Hello World from log.msg')
})

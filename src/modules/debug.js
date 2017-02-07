/**
 *
 * Daniel Cobb
 * 2-7-2017
 * Assignment 3: Logging Tool
 *
 */

const fs = require('fs')
require('dotenv').config()
module.exports = {
    getDate() {
        let dateObj = new Date
        let month = dateObj.getMonth()
        let day = dateObj.getDay()
        let year = dateObj.getFullYear()
        let date = year + '_' + month + '_' + day
        return date
    },
    getTime() {
        let dateObj = new Date
        let h = dateObj.getHours()
        let m = dateObj.getMinutes()
        let s = dateObj.getSeconds()
        let time = h + ':' + m + ':' + s
        return time
    },
    debugWarn() {
        let debug = process.env.DEBUG
        if(debug === 'true'){
            console.warn('******************** \n Debugging Mode is Active!\n********************\n')
        }
    },
    // debug takes json data, logs to console and to log file
    debug(data) {
        let debug = process.env.DEBUG
        if (debug === 'true'){
            let date = this.getDate()
            let time = this.getTime()
            let parseData = JSON.stringify(data)
            let logMsg = "\n**********\nEvent at " + time + " @ "+data.location+"\n" + data.type.toUpperCase() + "\n" + data.msg
            if(data.data){
                logMsg += "\nReturned Data: \n-- "+JSON.stringify(data.data).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            if(data.request){
                logMsg += "\nData Passed: \n-- "+JSON.stringify(data.request).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            fs.appendFile('./logs/debug_log_'+date+'.log', '\n' + logMsg, (err) => {
                if (err) throw err;
                console.log(logMsg)
         })
     }

        else{

        }
    },
    // Msg acts like a standard console.log if debug is true, and doesn't append to log file
    msg(data) {
        let debug = process.env.DEBUG
        if (debug === 'true'){
            console.log(data)
        }
    }
 }

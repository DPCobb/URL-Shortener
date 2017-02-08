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
        let dateObj = new Date()
        let month = dateObj.getMonth() + 1
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        let date = year + '_' + month + '_' + day
        return date
    },
    getTime() {
        let dateObj = new Date
        let h = dateObj.getHours()
        let m = dateObj.getMinutes()
        if(m < 10){
            m = `${0}` + m
        }
        let s = dateObj.getSeconds()
        let time = h + ':' + m + ':' + s
        return time
    },
    debugWarn() {
        let debug = process.env.DEBUG
        if(debug === 'true'){
            console.warn('**************************************** \n Debugging Mode is Active!\n\n****************************************\n')
        }
    },
    // debug takes json data, logs to console and to log file
    debug(data) {
        let debug = process.env.DEBUG
        if (debug === 'true'){
            let logData = ''
            let logReq = ''
            let date = this.getDate()
            let time = this.getTime()
            let resetColor = '\x1b[0m'
            let successColor = '\x1b[32m'
            let errorColor = '\x1b[31m'
            let defaultColor = '\x1b[33m'
            let type = defaultColor + data.type.toUpperCase() + resetColor
            if(data.type === 'success'){
                type = successColor + data.type.toUpperCase() + resetColor
            }
            else if(data.type === 'error'){
                type = errorColor + data.type.toUpperCase() + resetColor
            }
            else{
                type = defaultColor + data.type.toUpperCase() + resetColor
            }
            let logMsg = "\n**********\nEvent at " + time + " @ "+data.location+"\n" + type + "\n" + data.msg
            // logFile doesn't print color but will print after \x1b ex [32mSUCCESS[0m will print
            let logFile = "\n**********\nEvent at " + time + " @ "+data.location+"\n" + data.type.toUpperCase() + "\n" + data.msg
            if(data.data){
                logData = "\nReturned Data: \n-- "+JSON.stringify(data.data).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            if(data.request){
                logReq = "\nRequested Data: \n-- "+JSON.stringify(data.request).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            logMsg += logData
            logMsg += logReq
            logFile += logData
            logFile += logReq

            fs.appendFile('./logs/debug_log_'+date+'.log', '\n' + logFile, (err) => {
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
            console.log("MSG: " + data)
        }
    }
 }

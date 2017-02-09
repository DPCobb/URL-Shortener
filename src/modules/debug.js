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
    // Create a date for log files
    getDate() {
        // set date object
        let dateObj = new Date()
        // get date
        let month = dateObj.getMonth() + 1
        let day = dateObj.getDate()
        let year = dateObj.getFullYear()
        // format date
        let date = year + '_' + month + '_' + day
        // return date
        return date
    },
    // get a time for log events
    getTime() {
        // set date obj
        let dateObj = new Date
        // get time
        let h = dateObj.getHours()
        let m = dateObj.getMinutes()
        // if m is less than 9 add 0
        if(m < 10){
            m = `${0}` + m
        }
        // get seconds
        let s = dateObj.getSeconds()
        // format time
        let time = h + ':' + m + ':' + s
        // return time
        return time
    },
    // send warning that debugging is active
    debugWarn() {
        // if debug is true, send warning msg
        let debug = process.env.DEBUG
        if(debug === 'true'){
            console.warn('**************************************** \n Debugging Mode is Active!\n\n****************************************\n')
        }
    },
    // debug takes json data, logs to console and to log file
    debug(data) {
        let debug = process.env.DEBUG
        // if debug is true
        if (debug === 'true'){
            // set up variables
            let logData = ''
            let logReq = ''
            // get date and time
            let date = this.getDate()
            let time = this.getTime()
            // set console colors
            let resetColor = '\x1b[0m'
            let successColor = '\x1b[32m'
            let errorColor = '\x1b[31m'
            let defaultColor = '\x1b[33m'
            // set up type title : error, success, warning
            let type = defaultColor + data.type.toUpperCase() + resetColor
            // check to see if there is data, if data isn't null and if the type is not error
            if(data.data && !data.data.data && data.type != 'error'){
                // if you get here the type changes to warning
                data.type = "warning - request returned null"
            }
            // if type is success set the success title
            if(data.type === 'success'){
                type = successColor + data.type.toUpperCase() + resetColor
            }
            // if error set error title
            else if(data.type === 'error'){
                type = errorColor + data.type.toUpperCase() + resetColor
            }
            // set default
            else{
                type = defaultColor + data.type.toUpperCase() + resetColor
            }
            //header for actual console display
            let logMsg = "\n**********\nEvent at " + time + " @ "+data.location+"\n" + type + "\n" + data.msg
            // logFile doesn't print color but will print after \x1b ex [32mSUCCESS[0m will print
            let logFile = "\n**********\nEvent at " + time + " @ "+data.location+"\n" + data.type.toUpperCase() + "\n" + data.msg
            // if not an error display returned data from json
            if(data.data && data.type != 'error'){
                logData = "\nReturned Data: \n-- "+JSON.stringify(data.data).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            // if it is an error return the error string
            if(data.type === "error"){
                logData = "\nReturned Data: \n "+ data.data
            }
            // if request info is sent display the request info
            if(data.request){
                logReq = "\nRequested Data: \n-- "+JSON.stringify(data.request).split(",").join("\n    ").replace(/[{}"]/g , " ")
            }
            // create the log console and log file
            logMsg += logData
            logMsg += logReq
            logFile += logData
            logFile += logReq

            // append the file to todays log and console.log the message
            fs.appendFile('./logs/debug_log_'+date+'.log', '\n' + logFile, (err) => {
                if (err) throw err;
                let consoleDebug = process.env.DEBUG_CONSOLE
                if (consoleDebug === 'true'){
                    console.log(logMsg)
                }
         })
     }

        else{

        }
    },
    // Msg acts like a standard console.log if debug is true and debug_console is true, and doesn't append to log file
    msg(data, loc) {
        if(loc === undefined){
            loc = 'No Location Info'
        }
        let debug = process.env.DEBUG
        let consoleDebug = process.env.DEBUG_CONSOLE
        if (debug === 'true' && consoleDebug === 'true'){
            console.log("\x1b[37mMSG:\x1b[0m " + data + '\n-- @ ' + loc)
        }
        this.saveMsg(data, loc)
    },
    // saves msg method to a seperate log
    saveMsg(data, loc) {
        // get variables
        let debug = process.env.DEBUG
        let msgSave = process.env.DEBUG_MSG_LOG
        // get date and time
        let date = this.getDate()
        let time = this.getTime()
        // if no location information was sent
        if(loc === undefined){
            loc = 'No Location Info'
        }
        // if both debug and msgSave are true
        if(debug === 'true' && msgSave === 'true') {
            // create the entry
            msgLog = '-- MSG @ ' + time + ' ('+ loc + '): ' + data + '\n'
            // append entry to todays log
            fs.appendFile('./logs/debug_MSG_'+date+'.log', msgLog, (err) => {
                if (err) throw err;
            })
        }
    }
 }

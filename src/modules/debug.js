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
    debugWarn() {
        let debug = process.env.DEBUG
        if(debug === 'true'){
            console.warn('******************** \n Debugging Mode is Active!\n********************\n')
        }
    },
    debug(data) {
        let debug = process.env.DEBUG
        if (debug === 'true'){
            let date = this.getDate()
            fs.appendFile('./logs/debug_log_'+date+'.log', '\n' + data, (err) => {
                if (err) throw err;
                console.log(data)
         })
     }

        else{

        }
    }
 }

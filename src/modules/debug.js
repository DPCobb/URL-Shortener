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
     debug : (data)=>{
         let debug = process.env.DEBUG
         if (debug === 'true'){
             const fs = require('fs')
             fs.appendFile('./logs/log.txt', '\n' + data, (err) => {
                 if (err) throw err;
                 console.log(data)
             })
         }

         else{
             console.log('debug not on')
         }
     }
 }

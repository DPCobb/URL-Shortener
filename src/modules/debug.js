/**
 *
 * Daniel Cobb
 * 2-7-2017
 * Assignment 3: Logging Tool
 *
 */
const fs = require('fs')
module.exports = {
     debug : (data)=>{
         const fs = require('fs')
         fs.appendFile('./logs/log.txt', '\n' + data, (err) => {
             if (err) throw err;
             console.log(data)
         })
     }
 }

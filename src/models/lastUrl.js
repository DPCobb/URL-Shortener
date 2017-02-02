/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

// require the db file
const db = require('./db.js')

// create a new db entry in urls table
exports.create = (data) => {
    db.lastUrl.create(data)
}
// find the last entry in the urls table
exports.findOne = (data) => {
    // find by id desc. 
    db.lastUrl.findOne({order:'id DESC'}).then(data)
}

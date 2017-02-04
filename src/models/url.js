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
    db.url.create(data)
}
// find the last entry in the urls table
exports.findOne = (req, data) => {
    db.url.find({
        where:{
            id:req.id
        },
        include:[{
            all:true,
            nested:true
        }]
    }).then(data)
}

exports.findAll = (data) => {
    db.url.findAll().then(data)
}

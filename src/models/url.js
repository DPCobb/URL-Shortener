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
exports.create = (data, success, err) => {
    db.url.create(data).then(success).catch(err)
}
// find the last entry in the urls table
exports.findOne = (req, data, err) => {
    db.url.find({
        where:{
            id:req.id
        },
        include:[{
            all:true,
            nested:true
        }]
    }).then(data).catch(err)
}

// finds all urls
exports.findAll = (data, err) => {
    db.url.findAll().then(data).catch(err)
}

// deletes a url by id
exports.destroy = (req, data, err) => {
    db.url.destroy({
        where:{
            id:req.id
        },
        include:[{
            all:true,
            nested:true
        }]
    }).then(data).catch(err)
}

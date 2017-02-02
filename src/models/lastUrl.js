/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

const db = require('./db.js')

exports.create = (data) => {
    db.lastUrl.create(data)
}
exports.findOne = (data) => {
    db.lastUrl.findOne({order:'id DESC'}).then(data)
}

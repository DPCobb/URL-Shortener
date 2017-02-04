/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */
module.exports = (url, res) => {
    // require lastUrl model
    const saveUrl = require('../models/url.js')
    // setup the url prefix for shortened url
    let prefix = 'tyny.io/'
    // retrieve the url data
    let urlHash = url.body.url
    // require the crypto module
    const crypto = require('crypto');
    // create the hash to build alphanumeric string
    const hash = crypto.createHmac('sha256', urlHash).digest('hex');
    // shorten hash length to 7, creates > 8 billion possible urls
    urlHash = hash.substr(0,7)
    // create the shortened url to return
    let shortUrl = prefix + urlHash
    // create data to send to lastUrl model
    let data = {
        "url": url.body.url,
        "tynyUrl": shortUrl
    }
    // add the created url to the db
    saveUrl.create(data)
    // send a json response with the shortened url
    // Static output not dependant on DB
    res.json({shortUrl: shortUrl})
}

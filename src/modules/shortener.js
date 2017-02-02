/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */
module.exports = (url, res) => {
    const lastUrl = require('../models/lastUrl.js')
    var prefix = 'tyny.io/'
    var urlHash = url.body.url
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', urlHash).digest('hex');
    urlHash = hash.substr(0,7)
    var shortUrl = prefix + urlHash
    var data = {
        "url": url.body.url,
        "tynyUrl": shortUrl
    }
    lastUrl.create(data)
    res.json({shortUrl: shortUrl})
}

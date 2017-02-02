/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

module.exports = (url, res) => {
    var prefix = 'tyny.io/'
    var url = url.body.url
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', url).digest('hex');
    url = hash.substr(0,7)
    var shortUrl = prefix + url
    res.json({shortUrl: shortUrl})
}

/**
 *
 * Daniel Cobb
 * 2-1-2017
 * Assignment 1: Static API
 *
 */

module.exports = (url) => {
    var url = url.body.url
    console.log(url)
    return { url }
}

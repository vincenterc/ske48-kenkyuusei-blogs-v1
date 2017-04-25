const http = require('http')
const https = require('https')

/**
 *Simple request
 *
 *@param {String} url
 *@return {Promise.<String>}
 */
const simpleRequestPromise = url =>
  new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const request = lib.get(url, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error(`Failed to load page, status code ${response.statusCode}`))
      }
      const body = []
      response.on('data', chunk => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
    })
    request.on('error', err => reject(err))
  })

module.exports = simpleRequestPromise

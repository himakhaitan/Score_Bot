const request = require('request')
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET; 

const URL = `http://livescore-api.com/api-client/scores/live.json?key=${API_KEY}&secret=${API_SECRET}`

const api = (callback) => {
    request({url: URL, json:true}, (error, response) => {
        callback(response)
    })
}

module.exports = api;
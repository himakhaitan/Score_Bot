const request = require('request')
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const URL = `http://livescore-api.com/api-client/scores/live.json?key=${API_KEY}&secret=${API_SECRET}`

const getmatches = (callback) => {
    callback = callback || function(){};
   request({url: URL, json:true}, (error, response) => {
    var i;
    const matches = [];
    if (response.body.data.match.lenght !== 0) {
       
       for (i = 0; i < response.body.data.match.length; i++){
            matches.push(data = {
                team_one: response.body.data.match[i].home_name,
                team_two: response.body.data.match[i].away_name,
            })
       }
       callback(matches)
    }
    
    else {
        
    }
   })
     
}
module.exports = getmatches;
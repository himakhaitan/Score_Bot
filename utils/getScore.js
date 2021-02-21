const request = require('request')
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const getScore = (match_num, callback) => {
    const URL = `http://livescore-api.com/api-client/scores/live.json?key=${API_KEY}&secret=${API_SECRET}`

    request ({url: URL, json:true}, (error,response) => {
        if (response.body.data.match[0] !== undefined) {
            data = {
                location: response.body.data.match[match_num].location,
                status: response.body.data.match[match_num].status,
                score: response.body.data.match[match_num].score,
                team_one: response.body.data.match[match_num].home_name,
                team_two: response.body.data.match[match_num].away_name,
                comp_name: response.body.data.match[match_num].competition_name,
                error: false
            }
            console.log(match_num)
            
           callback({data})
        }
        else {
            data = {
                error: true
            }
            callback({data})
        }
    })
}

module.exports = getScore;
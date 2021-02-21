const request = require('request')
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;

const URL = `http://livescore-api.com/api-client/scores/live.json?key=${API_KEY}&secret=${API_SECRET}`

const subsMatch = (match_num, callback) => {
    request({url: URL, json: true}, (error, response) => {
        if (response.body.data.match[match_num].status === 'FINISHED') {
            callback('Match is Finished!')
        }
        else {
            const score_init = response.body.data.match[match_num].score
            const two_score = score_init.slice(2).split(/ + /);

            setTimeout(() => {
                if(two_score === response.body.data.match[match_num].score.slice(2).split(/ + /)) {
                    callback('No Goal was scored within 1 min!')
                }
                else if (score_init.startsWith(response.body.data.match[match_num].score.slice(0,1))){
                    callback('No Goal was scored within 1 min!')
                }
                else {
                    callback('A Team scored a Goal within 1 min')
                }
                
            }, 60000)
        }
    })
}

module.exports = subsMatch;

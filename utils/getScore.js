const api = require('./api');
const getScore = (match_num, callback) => {
    api((response) => {
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
        }})}
module.exports = getScore;
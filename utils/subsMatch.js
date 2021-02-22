const request = require('request');
const api = require('./api');

const subsMatch = (match_num, callback) => {
    
       api((response) => {
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

const api = require("./api");
const getmatches = (callback) => {
  callback = callback || function () {};
  api((response) => {
    var i;
    const matches = [];
    if (response.body.data.match.lenght !== 0) {
      for (i = 0; i < response.body.data.match.length; i++) {
        matches.push(
          (data = {
            team_one: response.body.data.match[i].home_name,
            team_two: response.body.data.match[i].away_name,
          })
        );
      }
      callback(matches);
    }
  });
};
module.exports = getmatches;

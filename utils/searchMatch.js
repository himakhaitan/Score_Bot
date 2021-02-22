const request = require("request");
const api = require("./api");


const searchMatch = (leauge_name, callback) => {
  
    api((response) => {
      const Matches = response.body.data.match;
      const filter = Matches.filter(function (er) {
        return er.competition_name.toLowerCase() == leauge_name.toLowerCase();
      });
      var i;
      const data = [];
  
      // var indices = [];
      // var array = response.body.data.match;
      // var element = leauge_name;
      // var idx = array.findIndex(element);
      // while (idx != -1) {
      //   indices.push(idx);
      //   idx = array.indexOf(element, idx + 1);
      // }
  
      // Command is ${indices[i]}
  
     
      for (i = 0; i < filter.length; i++) {
        data.push({
          name: `Match Number ${i}`,
          value: `${filter[i].away_name} vs ${filter[i].home_name}. Score is **__${filter[i].score}__*.`,
        });
      }
  
      callback(data);
    })
  
};

module.exports = searchMatch;

const api = require('../utils/api');

let events = [];
let handler = module.exports = {
  trigger(type){
    let args = [];

    for(let i = 1; i < arguments.length; i++){
      args.push(arguments[i]);
    }

    events
    .filter(e => e.type == type)
    .forEach(e => e.callback.apply(null, args));
  },
  on(type, callback){
    events.push({type, callback});
  }
};

api("GET", "map")
.then(data => {
  console.log("Map data loaded!");
  handler.trigger("map-data", data);
}).catch(e => {

});

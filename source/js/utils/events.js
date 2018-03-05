const api = require('../utils/api');

let events = [];
let app = module.exports = {
  data: {},
  user: null,
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
  },
  isLoggedIn(){
    return !!this.data.user.loggedIn;
  },
  signOut(){
    api("GET", "auth/signout")
    .then(data => {
      getUser();
    })
    .catch(e => {

    });
  },
  getMapData,
  getUser,
  init
};

function getMapData(){
  console.log("Getting map data!");
  api("GET", "map")
  .then(data => {
    console.log("Map data loaded!");
    app.data.map = data;
    app.trigger("map-data", data);
    app.trigger("ready", app.data);
  }).catch(e => {
    app.trigger("map-data", e);
  });
}

function getUser(){
  console.log("Getting user data!");
  api("GET", "auth/me")
  .then(data => {
    console.log("Logged in!");
    app.data.user = data;
    app.trigger("user", data);
  })
  .catch(data => {
    console.log("Not logged in!");
    app.data.user = {};
    app.trigger("user", data);
  });
}

function init(){
  console.log("App is initializing");
  getUser();
}


app.on("user", data => {
  getMapData();
});

app.on("ready", data => {
  console.log("App is ready!");
  console.log(data);
});

init();

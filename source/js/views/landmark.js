const app = require('../utils/events');
const jQuery = require('jquery');
const router = require("../utils/router");
const $video = jQuery("video#video-backdrop");
const setTitle = require('../utils/set-title');

let landmarkId;
let mapData;

app.on("map-data", data => {
  mapData = data;
  if(landmarkId){
    displayLandmark(landmarkId);
  }
});

module.exports = function viewLandmark(id){
  landmarkId = id;
  if(mapData != null){
    displayLandmark(id);
  }
};

function displayLandmark(id){
  let landmark = (mapData.landmarks || []).find(l => l.land_id == id);

  if(!landmark){
    router.navigate("map");
    return false;
  }

  setTitle(landmark.name);
  $video[0].src = landmark.backdrop
}

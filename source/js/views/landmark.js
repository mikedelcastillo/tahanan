const app = require('../utils/events');
const jQuery = require('jquery');
const router = require("../utils/router");
const $video = jQuery("video#video-backdrop");
const setTitle = require('../utils/set-title');
const api = require('../utils/api');

let landmarkId;
let mapData;
const $view = jQuery("#view-landmark");
const $btnMemories = $view.find("#btn-memories");
const $memories = $view.find("#landmark-memories");
const $btnNewMemory = jQuery(`<div class="memory btn-new"></div>`);
$btnNewMemory.html(`<div class="image-wrapper">
  <div class="sizer"></div>
  <div class="default">
    <div class="line line-1"></div>
    <div class="line line-2"></div>
  </div>
  <div class="hover">SUBMIT YOUR OWN MEMORY</div>
</div>
<div class="details-wrapper">

</div>`);

$btnMemories.click(e => {
  $view.addClass("show-memories")
});

app.on("map-data", data => {
  mapData = data;
  if(landmarkId){
    displayLandmark(landmarkId);
  }
});

module.exports = {
  view(id){
    landmarkId = id;
    if(mapData != null){
      displayLandmark(id);
    }
  }
}

function displayLandmark(id){
  let landmark = (mapData.landmarks || []).find(l => l.land_id == id);

  if(!landmark){
    router.navigate("map");
    return false;
  }

  setTitle(landmark.name);
  $video[0].src = landmark.backdrop;

  $memories.html('');
  $view.removeClass("show-memories");
  loadMemories();
}

function loadMemories(){
  api("GET", "memories/" + landmarkId).then(data => {
    $memories.html('');
    $memories.append($btnNewMemory);

    data.data.forEach(memory => {
      let $memory = jQuery(`<div class="memory"></div>`);
      let limit = 100;
      let content = memory.content.length > limit ? memory.content.substr(0, limit) + "..." : memory.content;
      $memory.html(`<div class="image-wrapper">
        <div class="sizer"></div>
        <div class="image"></div>
        <div class="content">${content}</div>
      </div>
      <div class="details-wrapper">
        <div class="detail likes">
          <div class="icon"></div>
          <div class="text">${memory.likes || 0}</div>
        </div>
        <div class="detail comments">
          <div class="icon"></div>
          <div class="text">${memory.comments || 0}</div>
        </div>
      </div>`);
      $memories.append($memory);
    });
  }).catch(console.log);
}

const app = require('../utils/events');
const jQuery = require('jquery');
const router = require("../utils/router");
const $video = jQuery("video#video-backdrop");
const setTitle = require('../utils/set-title');
const api = require('../utils/api');
const memoryTemplate = require('../utils/memory-template');

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


const modalViewMemory = require('../modals/view-memory');
const modalMakeMemory = require('../modals/make-memory');

$btnMemories.click(e => {
  $view.toggleClass("show-memories");
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

  modalMakeMemory.setLandmark(landmark);

  setTitle(landmark.name);
  $video[0].src = landmark.backdrop;

  $memories.html('');
  $view.removeClass("show-memories");
  loadMemories();
}

modalMakeMemory.on("make-memory", () => {
  loadMemories();
});

function loadMemories(){
  api("GET", `landmarks/${landmarkId}/memories`).then(data => {
    $memories.html('');
    $memories.append($btnNewMemory);

    $btnNewMemory.click(e => {
      modalMakeMemory.part("form");
      modalMakeMemory.show();
    });
    data.data.forEach(memory => {
      let $memory = memoryTemplate(memory);
      $memories.append($memory);

      $memory.find(".image-wrapper").click(e => {
        modalViewMemory.load(memory.mem_id);
        modalViewMemory.show();
        modalViewMemory.onclose = () => {
          loadMemories();
        };
      });
    });
  }).catch(e => {
    alert("Something went wrong! Reloading...");
    console.log(e);
    // window.location.reload();
  });
}

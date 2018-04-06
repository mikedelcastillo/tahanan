const jQuery = require('jquery');
const api = require('../utils/api');
const memoryTemplate = require('../utils/memory-template');
const modalViewMemory = require('../modals/view-memory');

const $view = jQuery("#view-featured");
const $memories = $view.find(".memories-wrapper");

let mode = 0;
const $toggle = $view.find(".btn-toggle");
console.log("ok", $toggle);

$toggle.on("click", e => {
  mode = mode == 0 ? 1 : 0;
  updateToggle();
});

function updateToggle(){
  if(mode == 0){
    $toggle.removeClass("toggled");
  } else{
    $toggle.addClass("toggled");
  }

  load();
}

module.exports = {
  load
}

function load(){
  api("GET", "memories/featured?sortby=" + (
    mode == 0 ? 'likes' : 'time'
  )).then(data => {
    $memories.html('');

    data.data.forEach(memory => {
      let $memory = memoryTemplate(memory);
      $memories.append($memory);

      $memory.find(".image-wrapper").click(e => {
        modalViewMemory.load(memory.mem_id);
        modalViewMemory.show();
        modalViewMemory.onclose = () => {
          load();
        };
      });
    });
  }).catch(console.log);
}

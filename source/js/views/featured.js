const jQuery = require('jquery');
const api = require('../utils/api');
const memoryTemplate = require('../utils/memory-template');
const modalViewMemory = require('../modals/view-memory');

const $memories = jQuery("#view-featured .memories-wrapper");

module.exports = {
  load
}

function load(){
  api("GET", "memories/featured").then(data => {
    $memories.html('');

    data.data.forEach(memory => {
      let $memory = memoryTemplate(memory);
      $memories.append($memory);

      $memory.click(e => {

      });
    });
  }).catch(console.log);
}

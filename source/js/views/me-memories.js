const jQuery = require('jquery');
const api = require('../utils/api');
const memoryTemplate = require('../utils/memory-template');
const modalViewMemory = require('../modals/view-memory');
const app = require('../utils/events');

const $memories = jQuery("#view-me-memories .memories-wrapper");

module.exports = {
  load
}

function load() {
  api("GET", `users/${app.data.user.userId}/memories`).then(data => {
    $memories.html('');

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
  }).catch(console.log);
}

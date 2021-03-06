const jQuery = require('jquery');
const api = require('../utils/api');
const memoryTemplate = require('../utils/memory-template');
const modalEditProfile = require('../modals/edit-profile');
const modalViewMemory = require('../modals/view-memory');
const app = require('../utils/events');

const $wrapper = jQuery("#view-user");
const $memories =  $wrapper.find(".memories-wrapper");
const $image =  $wrapper.find(".image");
const $name =  $wrapper.find(".name");
const $bio =  $wrapper.find(".bio");

const setTitle = require('../utils/set-title');
const setView = require('../utils/set-view');

module.exports = {
  load
}

function load(userId) {
  setTitle("Viewing profile...");
  setView("");

  api("GET", `users/${userId}`).then(data => {
    let user = data.data;
    $image.css("background-image", `url(${user.image_url || "/img/user-pic.jpg"})`);
    $name.html(user.user_name);
    $bio.html(user.bio);

    if(userId == app.data.user.userId){
      let $editBut = jQuery(`<span class="delete-icon"></span>`);

      $editBut.on("click", e => {
        modalEditProfile.open();
        e.preventDefault();
      });

      $name.append($editBut);
    }

    api("GET", `users/${userId}/memories`).then(data => {
      $memories.html('');

      let memories = data.data;

      if(memories.length == 0){

        $memories.html(`<div class="empty-message">No memories posted yet!</div>`);

      } else{

        data.data.forEach(memory => {
          let $memory = memoryTemplate(memory);
          $memories.append($memory);

          $memory.find(".image-wrapper").click(e => {
            modalViewMemory.load(memory.mem_id);
            modalViewMemory.show();
            modalViewMemory.onclose = () => {
              load(userId);
            };
          });
        });

      }

      setView("user")
      setTitle(user.name);
    }).catch(console.log);
  }).catch(console.log);
}

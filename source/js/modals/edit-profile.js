const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("edit-profile");

modal.$form = modal.$wrapper.find("form");
const $icon = modal.$form.find('.btn-icon');
const $file = modal.$form.find('input[type=file]');

let user;

$file.on("change", e => {
  let element = e.target;

  if(!!element.files){
    let file = element.files[0];
    var reader = new FileReader();
    reader.onload = function(ev){
      $icon.css("background-image", `url(${ev.target.result})`);
    }
    reader.readAsDataURL(file);
  }
});

modal.open = function(){
  modal.part("loading");
  modal.show();

  user = app.data.user;

  api("GET", `users/${app.data.user.userId}`)
  .then(data => {
    let user = data.data;

    modal.$form.find('input[name=first_name]').val(user.first_name);
    modal.$form.find('input[name=last_name]').val(user.last_name);
    $icon.css("background-image", `url(${user.image_url})`);
    modal.$form.find('textarea[name=bio]').val(user.bio || "");

    modal.part("form");
  })
  .catch(e => {
    alert("Oops! Could not get your profile. Please try again!");
    modal.close();
  });
};

modal.$form.find("button").click(e => {
  let data = new FormData(modal.$form[0]);
  modal.part("loading");

  api("POST", `users/${user.userId}`, data)
  .then(data => {
    // modal.open();
    app.getUser();
  })
  .catch(e => {
    console.log(e);
  });

  e.preventDefault();
});

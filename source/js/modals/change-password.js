const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("change-password");

modal.$form = modal.$wrapper.find("form");
const $icon = modal.$form.find('.btn-icon');
const $file = modal.$form.find('input[type=file]');

let user;

modal.open = function(){
  user = app.data.user;
  modal.part("form");
  modal.show();
};

modal.$form.find("button").click(e => {
  let data = new FormData(modal.$form[0]);
  modal.part("loading");

  api("POST", `users/${user.userId}/password`, data)
  .then(data => {
    // modal.open()
    modal.close();
  })
  .catch(e => {
    console.log(e);
  });

  e.preventDefault();
  return false;
});

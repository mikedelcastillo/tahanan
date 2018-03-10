const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("edit-profile");

modal.$form = modal.$wrapper.find("form");

modal.open = function(){
  modal.part("loading");
  modal.show();

  api("GET", "auth/me")
  .then(data => {
    modal.part("form");
  })
  .catch(e => {
    alert("Oops! Could not get your profile. Please try again!");
    modal.close();
  });
};

modal.$form.find("button").click(e => {
  let data = new FormData(modal.$form[0]);



  e.preventDefault();
});

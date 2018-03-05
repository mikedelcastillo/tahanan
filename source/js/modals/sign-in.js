const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("sign-in");

modal.$form = modal.$wrapper.find("#form-sign-in");

modal.$form.find("button").click(e => {

  api('POST', 'auth/login', new FormData(modal.$form[0]))
  .then(data => {
    app.getUser();
  })
  .catch(e => {
    alert("We could not sign you in! Please check your credentials again.");
  });

  e.preventDefault();
});

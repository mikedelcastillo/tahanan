const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("sign-up");

modal.$form = modal.$wrapper.find("#form-sign-up");

modal.$form.find("button").click(e => {

  api('POST', 'auth/signup', new FormData(modal.$form[0]))
  .then(data => {
    app.getUser();
  })
  .catch(e => {
    alert("We could not create an account for you! Please check your details again.");
  });

  e.preventDefault();
});

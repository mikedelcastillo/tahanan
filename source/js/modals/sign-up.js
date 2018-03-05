const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("sign-up");

modal.$form = modal.$wrapper.find("#form-sign-up");

modal.$form.find("button").click(e => {
  modal.part("loading");

  api('POST', 'auth/signup', new FormData(modal.$form[0]))
  .then(data => {
    if(!data.loggedIn) modal.part("form");
    app.getUser();
  })
  .catch(e => {
    modal.part("form");
    alert("We could not create an account for you! Please check your details again.");
  });

  e.preventDefault();
});

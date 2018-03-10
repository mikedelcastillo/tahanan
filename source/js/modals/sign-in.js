const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("sign-in");

modal.$form = modal.$wrapper.find("#form-sign-in");

modal.on("show", () => {
  modal.$form.find("input").each((i, elem) => {
    elem.value = "";
  });
});

modal.$form.find("button").click(e => {
  modal.part("loading");

  api('POST', 'auth/login', new FormData(modal.$form[0]))
  .then(data => {
    modal.part("form");
    app.getUser();
  })
  .catch(e => {
    modal.part("form");
    alert("We could not sign you in! Please check your credentials again.");
  });

  e.preventDefault();
});

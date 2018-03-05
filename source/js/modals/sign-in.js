const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("sign-in");

modal.$form = modal.$wrapper.find("#form-sign-in");

modal.$form.find("button").click(e => {

  api('POST', 'auth/login', modal.$form.serialize())
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log("SHIT");
  });

  e.preventDefault();
});

console.log(modal);

const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("sign-up");

modal.$form = modal.$wrapper.find("#form-sign-up");

modal.$form.find("button").click(e => {

  api('POST', 'auth/signup', modal.$form.serialize())
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log("SHIT");
  });

  e.preventDefault();
});

console.log(modal);

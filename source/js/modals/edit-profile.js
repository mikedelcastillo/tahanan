const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("edit-profile");

modal.$form = modal.$wrapper.find("form");

modal.$form.find("button").click(e => {
  let data = modal.$form.serialize();
  console.log(data);
  e.preventDefault();
});

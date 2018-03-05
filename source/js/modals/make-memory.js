const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("make-memory");

modal.$form = modal.$wrapper.find("form");

modal.setLandmark = function(landmark){
  this.landmark = landmark;
  console.log(this.landmark);
  modal.$form.find("input[name=landmarkId]").attr("value", landmark.land_id)
  modal.$form.find("input[name=userId]").attr("value", app.data.user.userId);
  console.log(modal.$form.find(".landmark"));
  modal.$form.find(".landmark").html(landmark.name);
  modal.$form.find(".author").html(app.data.user.name);
}

modal.$form.find("button").click(e => {
  let data = new FormData(modal.$form[0]);
  console.log(data);
  api('POST', 'memories/' + modal.landmark.land_id, data)
  .then(data => {
    console.log(data);
  })
  .catch(e => {
    console.log("SHIT");
  });

  e.preventDefault();
});

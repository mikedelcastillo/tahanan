const Modal = require('../utils/modal');
const api = require('../utils/api');
const app = require('../utils/events');

const modal = module.exports = new Modal("make-memory");

modal.$form = modal.$wrapper.find("form");

let $landmarkId = modal.$form.find("input[name=landmarkId]");
let $userId = modal.$form.find("input[name=userId]");
let $landmarkName = modal.$form.find(".landmark");
let $author = modal.$form.find(".author");
let $content = modal.$form.find("textarea[name=description]");

modal.on("show", () => {
  $content.val("");
  modal.$form.find("input[type=file]").val("");
});

modal.setLandmark = function(landmark){
  this.landmark = landmark;
  console.log(this.landmark);
  $landmarkId.val(landmark.land_id)
  $userId.val(app.data.user.userId);
  console.log(modal.$form.find(".landmark"));
  $landmarkName.html(landmark.name);
  $author.html(app.data.user.name);
  modal.part("form");
}

modal.$form.find("button").click(e => {
  modal.part("loading");
  let data = new FormData(modal.$form[0]);
  console.log(data);
  api('POST', `landmarks/${modal.landmark.land_id}/memories`, data)
  .then(data => {
    modal.close();
    modal.trigger("make-memory");
  })
  .catch(e => {
    modal.part("form");
    alert("Something went wrong! Try again!");
    console.log(e);
  });

  e.preventDefault();
});

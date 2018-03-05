const Modal = require('../utils/modal');
const api = require('../utils/api');
const generalError = require('../utils/general-error');

const modal = module.exports = new Modal("view-memory");

modal.setMemoryId = function(id){
  modal.memoryId = id;
}

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Descember"
];

modal.load = function(id){
  if(id) modal.setMemoryId(id);

  modal.part("loading");
  api("GET", `memories/${modal.memoryId}`)
  .then(memory => {
    modal.part("content");
    modal.$wrapper.find(".author").html(memory.user_name);
    modal.$wrapper.find(".landmark").html(memory.land_name);
    modal.$wrapper.find(".body").html(memory.content);
    modal.$wrapper.find(".likes .text").html(`${memory.likes} people like this`);
    let date = new Date(memory.date);
    modal.$wrapper.find(".date .text").html(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
    let image = !!memory.image ? `<img src="${memory.image}" />` : "";
    modal.$wrapper.find(".image-wrapper").html(image);
  })
  .catch(e => {
    alert("Something went wrong!");
    modal.close();
  });
}

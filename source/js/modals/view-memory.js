const Modal = require('../utils/modal');
const api = require('../utils/api');

const modal = module.exports = new Modal("view-memory");

modal.setMemoryId = function(id){
  this.memoryId = id;
}

modal.load = function(){

}

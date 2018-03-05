const jQuery = require('jquery');

module.exports = class{
  constructor(id){
    this.id = id;
    this.wrapper = document.querySelector(`.modal-wrapper#modal-${id}`);
    this.$wrapper = jQuery(this.wrapper);
    this.$btnClose = this.$wrapper.find("#btn-close");

    this.$btnClose.on("click", e => {
      this.close();
    });
  }

  show(){
    this.$wrapper.addClass("visible");
    this.$wrapper.removeClass("hidden");
  }

  close(){
    this.$wrapper.removeClass("visible");
    this.$wrapper.addClass("hidden");
  }
}

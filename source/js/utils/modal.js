const jQuery = require('jquery');

module.exports = class{
  constructor(id){
    this.events = [];
    this.id = id;
    this.wrapper = document.querySelector(`.modal-wrapper#modal-${id}`);
    this.$wrapper = jQuery(this.wrapper);
    this.$btnClose = this.$wrapper.find("#btn-close");

    this.$btnClose.on("click", e => {
      this.close();
    });
  }

  trigger(type){
    let args = [];

    for(let i = 1; i < arguments.length; i++){
      args.push(arguments[i]);
    }

    this.events
    .filter(e => e.type == type)
    .forEach(e => e.callback.apply(null, args));
  }

  on(type, callback){
    this.events.push({type, callback});
  }

  part(id){
    this.$wrapper.find(".modal-part").each((i, element) => {
      let $element = jQuery(element);
      if($element.hasClass(`modal-part-${id}`)){
        $element.addClass("visible");
        $element.removeClass("hidden");
      } else{
        $element.addClass("hidden");
        $element.removeClass("visible");
      }
    });
  }

  show(){
    this.trigger("show");

    this.$wrapper.addClass("visible");
    this.$wrapper.removeClass("hidden");
  }

  close(){
    this.trigger("close");

    this.$wrapper.removeClass("visible");
    this.$wrapper.addClass("hidden");

    if(this.onclose) this.onclose();
  }
}

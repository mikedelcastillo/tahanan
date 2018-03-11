const jQuery = require('jquery');
const Modal = require('../utils/modal');

class Tutorial{
  constructor($wrapper){
    this.index = 0;

    this.$wrapper = $wrapper;

    this.$screens = this.$wrapper.find(".screen");
    this.length = this.$screens.length;
    this.$left = this.$wrapper.find(".btn-left");
    this.$right = this.$wrapper.find(".btn-right");    this.$info = this.$wrapper.find(".info-wrapper");

    this.$left.on("click", e => {
      this.previous();
    });

    this.$right.on("click", e => {
      this.next();
    });

    this.show(0);
  }

  show(index = 0){
    this.index = index;

    this.$screens.each((i, element) => {
      let $e = jQuery(element);

      if(i == index){
        $e.removeClass("hidden");
      } else{
        $e.addClass("hidden");
      }
    });

    if(this.index == 0){
      this.$left.html("");
    } else{
      this.$left.html("Previous");
    }

    if(this.index == this.length - 1){
      this.$right.html("Close");
    } else{
      this.$right.html("Next");
    }

    if(this.length == 1){
      this.$info.html(``);
    } else{
      this.$info.html(`${this.index + 1} of ${this.length}`);
    }
  }

  previous(){
    this.show(Math.max(0, this.index - 1));
  }

  next(){
    let index = this.index + 1;

    if(index == this.length){
      modal.close();
      return false;
    }

    this.show(index);
  }
}

const modal = module.exports = new Modal("tutorial");

modal.showTutorial = function(id){
  modal.show();
  modal.part(id);
}

let tutorials = [];

modal.on("show", () => {
  tutorials.forEach(tutorial => {
    tutorial.show(0);
  });
});

tutorials.push(new Tutorial(modal.$wrapper.find("#tutorial-map")));
tutorials.push(new Tutorial(modal.$wrapper.find("#tutorial-featured")));
tutorials.push(new Tutorial(modal.$wrapper.find("#tutorial-construction")));
tutorials.push(new Tutorial(modal.$wrapper.find("#tutorial-edit-profile")));

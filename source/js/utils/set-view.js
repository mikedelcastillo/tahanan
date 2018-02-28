const jQuery = require('jquery');

module.exports = function setView(id){
  jQuery('.view-wrapper').each((index, element) => {
    let $element = jQuery(element);

    if(element.id == `view-${id}`){
      $element.removeClass("hidden");
      $element.addClass("visible");
    } else{
      $element.addClass("hidden");
      $element.removeClass("visible");
    }
  });
};

const jQuery = require('jquery');

module.exports = function displayContent(id){
  jQuery('.section').each((index, element) => {
    let $element = jQuery(element);

    if(element.id == `section-${id}`){
      $element.removeClass("hidden");
    } else{
      $element.addClass("hidden");
    }
  });
};

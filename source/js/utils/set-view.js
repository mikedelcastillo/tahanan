const jQuery = require('jquery');

module.exports = function setView(id){
  jQuery('.view-wrapper').each((index, element) => {
    let $element = jQuery(element);
    let cid = `view-${id}`;
    console.log("Setting view to " + cid);

    let $body = jQuery(document.body);
    $body.attr("class", $body.attr("class").replace(/(view-[^ ]*)/gmi, ""));
    $body.addClass(cid.split("-").splice(0, 2).join("-"));

    if(element.id == cid){
      $element.removeClass("hidden");
      $element.addClass("visible");
    } else{
      $element.addClass("hidden");
      $element.removeClass("visible");
    }
  });
};

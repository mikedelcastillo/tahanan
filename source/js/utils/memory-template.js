const jQuery = require('jquery');

module.exports = function(memory){
  let $memory = jQuery(`<div class="memory"></div>`);
  let limit = 100;
  let content = memory.content.length > limit ? memory.content.substr(0, limit) + "..." : memory.content;
  $memory.html(`<div class="image-wrapper">
    <div class="sizer"></div>
    <div class="image" style="background-image:url(${memory.image})"></div>
    <div class="content">${content}</div>
  </div>
  <div class="details-wrapper">
    <div class="detail likes">
      <div class="icon"></div>
      <div class="text">${memory.likes || 0}</div>
    </div>
    <div class="detail comments">
      <div class="icon"></div>
      <div class="text">${memory.comments || 0}</div>
    </div>
  </div>`);

  return $memory;
};

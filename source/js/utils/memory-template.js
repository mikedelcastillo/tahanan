const jQuery = require('jquery');
const api = require('./api');
const app = require('./events');

module.exports = function(memory){
  let $memory = jQuery(`<div class="memory"></div>`);
  let limit = 100;
  let content = `“${memory.content}”`;
  content = content.length > limit ? content.substr(0, limit) + "..." : content;

  $memory.addClass([
    "texture-a",
    "texture-b",
    "texture-c"
  ][Math.floor(Math.random() * 3)]);

  $memory.addClass(`font-${Math.floor(Math.random() * 4)}`);

  let liked = !!memory.liked;
  let likes = memory.likes || 0;

  let style = memory.image != "none" ?
    `style="background-image:url(${memory.image})"` :
    `style="background-image:url(${memory.default_image})"`;

  $memory.html(`<div class="image-wrapper">
    <div class="sizer"></div>
    <div class="image" ${style}></div>
    <div class="content">${content}</div>
  </div>
  <div class="details-wrapper">
    <div class="detail likes">
      <div class="icon"></div>
      <div class="text"></div>
    </div>
    <div class="detail comments">
      <div class="icon"></div>
      <div class="text">${memory.comment_count || 0}</div>
    </div>
  </div>`);

  let $likes = $memory.find(".detail.likes");
  let $likesText = $likes.find(".text");

  function updateLikes(){
    $likesText.text(likes);

    if(liked){
      $likes.addClass("liked");
    } else{
      $likes.removeClass("liked");
    }
  }

  updateLikes();

  $likes.on("click", e => {
    if(liked){
      likes--;
    } else{
      likes++;
    }
    liked = !liked;
    updateLikes();

    api("POST", `memories/${memory.mem_id}/likes`, {
      userId: app.data.user.userId
    }, true)
    .then(data => {
      updateLikes();
    })
    .catch(data => {});
  });

  return $memory;
};

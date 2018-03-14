const Modal = require('../utils/modal');
const api = require('../utils/api');
const generalError = require('../utils/general-error');
const app = require('../utils/events');
const router = require('../utils/router');
const reload = require('../utils/reload');
const jQuery = require('jquery');

const modal = module.exports = new Modal("view-memory");

modal.setMemoryId = function(id){
  modal.memoryId = id;
};

modal.$form = modal.$wrapper.find("form");

let $userId = modal.$form.find("input[name=userId]");
let $content = modal.$form.find("textarea[name=description]");
let $comments = modal.$wrapper.find(".comments");
let $landmarkName = modal.$wrapper.find(".landmark");
let $author = modal.$wrapper.find(".author");
let $details = modal.$wrapper.find(".details-bottom");

let $profileImage = modal.$wrapper.find(".horizontal .left .icon");

let $delete = jQuery(`<div class="detail delete">
  <div class="icon"></div>
  <div class="text">Detele memory</div>
</div>`);

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
  "December"
];

modal.delete = function(id){
  if(confirm("Are you sure you want to delete this memory?")){
    modal.part("loading");
    api("POST", `memories/${modal.memoryId}/delete`)
    .then(data => {
      modal.close();
    })
    .catch(data => {
      modal.close();
    });
  }
};

modal.load = function(id){
  if(id) modal.setMemoryId(id);

  $delete.remove();

  modal.part("loading");
  api("GET", `memories/${modal.memoryId}`)
  .then(memory => {
    modal.part("content");
    modal.$wrapper.find("input[name=userId]").val(app.data.user.userId);
    modal.$wrapper.find("input[name=message]").val("");
    $comments.html("");
    $landmarkName.html(memory.land_name);
    $landmarkName.attr("href", "#/landmarks/" + memory.land_id);
    $landmarkName.off("click");
    $landmarkName.on("click", e => {
      router.navigate("/landmarks/" + memory.land_id);
      modal.close();
    });
    $author.html(memory.user_name);
    $author.attr("href", "#/users/" + memory.user_id);
    $author.off("click");
    $author.on("click", e => {
      router.navigate("/landmarks/" + memory.user_id);
      modal.close();
    });

    $profileImage.css("background-image", `url(${memory.profile_pic_url})`);

    modal.$wrapper.find(".body").html(memory.content);
    let date = new Date(memory.date);
    modal.$wrapper.find(".date .text").html(`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`);
    let image = memory.image != "none" ? `<img src="${memory.image}" />` : "";
    modal.$wrapper.find(".image-wrapper").html(image);

    if(app.data.user.userId == memory.user_id){
      $details.append($delete);
      $delete.on("click", e => {
        modal.delete(id);
      });
    }

    //likes

    let liked = !!memory.liked;
    let likes = memory.likes || 0;

    let $likes = modal.$wrapper.find(".detail.likes");
    $likes.off("click");
    let $likesText = $likes.find(".text");

    function updateLikes(){
      $likesText.text(likes == 1 ? `${likes} person liked this` : `${likes} people liked this`);

      if(liked){
        $likes.removeClass("liked");
      } else{
        $likes.addClass("liked");
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

    //comments
    console.log($comments);

    memory.comments.forEach(comment => {
      console.log(comment);//href="#/users/${comment.user_id}"
      $comments.append(`<div class="comment">
        <div class="icon" style="background-image: url(${comment.profile_pic_url})"></div>
        <div class="text">
          <a class="author" >${comment.user_name}</a>
          <div class="message">${comment.message}</div>
        </div>
      </div>`);

      $comments.find(".author").on("click", e => {
        modal.close();
      });
    });
  })
  .catch(e => {
    alert("Something went wrong!");
    console.log(e);
    modal.close();
  });
}


modal.$form.find("button").click(e => {
  modal.part("loading");
  let data = new FormData(modal.$form[0]);
  console.log(data);
  api('POST', `memories/${modal.memoryId}/comments`, data)
  .then(data => {
    modal.load();
  })
  .catch(e => {
    modal.part("comtent");
    alert("Something went wrong! Try again!");
  });

  e.preventDefault();
});

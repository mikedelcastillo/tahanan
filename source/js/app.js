import './utils/events';
import './views/map';

const modalSignIn = require('./modals/sign-in');
const modalSignUp = require('./modals/sign-up');
const modalViewMemory = require('./modals/view-memory');
const modalMakeMemory = require('./modals/make-memory');
const modalEditProfile = require('./modals/edit-profile');
const modals = require('./modals/all');

const jQuery = require('jquery');
const setTitle = require('./utils/set-title');
const setView = require('./utils/set-view');
const landmark = require('./views/landmark');
const featured = require('./views/featured');
const meMemories = require('./views/me-memories');
const api = require('./utils/api');
const app = require('./utils/events');
let globals = {};

const $body = jQuery(document.body);

const router = require('./utils/router');

window.globals = globals = {
  router,
  api,
  jQuery,
  app
};

let setPaths = false;

app.on("ready", data => {
  console.log("Setting body class!");
  if(app.isLoggedIn()){
    $body.addClass("logged-in");
    $body.removeClass("logged-out");
  } else{
    $body.addClass("logged-out");
    $body.removeClass("logged-in");
  }

  modals.forEach(modal => modal.close());

  if(!setPaths){
    console.log("Set paths!");
    router.on({
      'about': (params) => {
        setTitle("About");
        setView("about");
      },
      'about/faq': (params) => {
        setTitle("About");
        setView("about-faq");
      },
      'about/content': (params) => {
        setTitle("About");
        setView("about-content");
      },
      'me': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        setTitle("My Profile");
        setView("me");
      },
      'me/memories': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        meMemories.load();
        setTitle("My Memories");
        setView("me-memories");
      },
      'map': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        setTitle("Map");
        setView("map");
      },
      'featured': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        featured.load();
        setTitle("Featured");
        setView("featured");
      },
      'landmarks/:id': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        landmark.view(params.id);
        setView("landmark");
      },
      'reload/:id': (params) =>{
        console.log(`Reloading... ${params.id}`);
      },
      '*': (params) => {
        if(app.isLoggedIn()){
          router.navigate("/map");
          return false;
        }
        setTitle("Home");
        setView("landing");
      }
    }).resolve();

    setPaths = true;
  }

  reload();
});

function reload(){
  console.log("Reloading route!");
  let h = (window.location.href.match(/\#.*$/gmi) || [""])[0];
  console.log("Coming from " + window.location.href);
  router.navigate('/reload/' + Math.floor(Math.random() * 100000));
  setTimeout(e => {
    router.navigate(h);
  }, 10);
}

jQuery(document).ready(e => {
  jQuery(".btn-sign-up").click(e => {
    modalSignUp.part("form");
    modalSignUp.show();
    e.preventDefault();
  });

  jQuery(".btn-sign-in").click(e => {
    modalSignIn.part("form");
    modalSignIn.show();
    e.preventDefault();
  });

  jQuery(".link-me-edit").click(e => {
    modalEditProfile.open();
    e.preventDefault();
  });

  jQuery(".link-sign-out").click(e => {
    app.signOut();
    modalSignIn.part("loading");
    modalSignIn.show();
    e.preventDefault();
  });
});

jQuery(window).on("load", function(){

});

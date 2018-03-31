import './utils/events';
import './views/map';

const modalSignIn = require('./modals/sign-in');
const modalSignUp = require('./modals/sign-up');
const modalViewMemory = require('./modals/view-memory');
const modalMakeMemory = require('./modals/make-memory');
const modalEditProfile = require('./modals/edit-profile');
const modalTutorial = require('./modals/tutorial');
const modals = require('./modals/all');

const jQuery = require('jquery');
const setTitle = require('./utils/set-title');
const setView = require('./utils/set-view');
const reload = require('./utils/reload');
const landmark = require('./views/landmark');
const featured = require('./views/featured');
const userView = require('./views/user');
const api = require('./utils/api');
const app = require('./utils/events');
let   globals = {};

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

  if(app.newUser == true){
    modalTutorial.showTutorial("map");
  }

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
      'me': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        router.navigate("/users/" + app.data.user.userId);
      },
      'users/:id': (params) => {
        if(!app.isLoggedIn()){
          router.navigate("/");
          return false;
        }
        userView.load(params.id);
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

  // jQuery(".link-about, .link-about-project, .link-about-faq").click(e => {
  //   modalTutorial.showTutorial("construction");
  //   e.preventDefault();
  // });

  jQuery(".link-about-contact").on("click", e => {
    modalTutorial.showTutorial("contact");
  });

  jQuery("#view-map .btn-help").on("click", e => {
    modalTutorial.showTutorial("map");
  });

  jQuery("#view-featured .btn-help").on("click", e => {
    modalTutorial.showTutorial("featured");
  });

  jQuery("#view-user .btn-help").on("click", e => {
    modalTutorial.showTutorial("edit-profile");
  });
});

jQuery(window).on("load", function(){

});

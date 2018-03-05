import './utils/events';
import './views/map';
import './modals/view-memory';

const modalSignIn = require('./modals/sign-in');
const modalSignUp = require('./modals/sign-up');

const jQuery = require('jquery');
const setTitle = require('./utils/set-title');
const setView = require('./utils/set-view');
const landmark = require('./views/landmark');
const api = require('./utils/api');
let globals = {};

const router = require('./utils/router');

window.globals = globals = {
  router,
  api,
  jQuery
};

jQuery(document).ready(e => {
  router.on({
    'about': (params) => {
      setTitle("About");
      setView("about");
    },
    'me': (params) => {
      setTitle("My Profile");
      setView("me");
    },
    'sign-in': (params) => {
      setTitle("Sign in");
      modalSignIn.show();
    },
    'sign-up': (params) => {
      setTitle("Sign up");
      modalSignUp.show();
    },
    'map': (params) => {
      setTitle("Map");
      setView("map");
    },
    'featured': (params) => {
      setTitle("Featured");
      setView("featured");
    },
    'landmarks/:id': (params) => {
      landmark.view(params.id);
      setView("landmark");
    },
    '*': (params) => {
      setTitle("Home");
      setView("landing");
    }
  }).resolve();

  jQuery(".btn-sign-up").click(() => {
    modalSignUp.show();
  });

  jQuery(".btn-sign-in").click(() => {
    modalSignIn.show();
  });
});

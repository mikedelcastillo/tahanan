import './utils/events';
import './views/map';

const jQuery = require('jquery');
const setTitle = require('./utils/set-title');
const setView = require('./utils/set-view');
const viewLandmark = require('./views/landmark');
const api = require('./utils/api');
let globals = {};

const router = require('./utils/router');

window.globals = globals = {
  router,
  api
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
      setView("sign-in");
    },
    'sign-up': (params) => {
      setTitle("Sign up");
      setView("sign-up");
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
      viewLandmark(params.id);
      setView("landmark");
    },
    '*': (params) => {
      setTitle("Home");
      setView("landing");
    }
  }).resolve();
});

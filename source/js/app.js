import './utils/events';
import './views/google-maps';

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
    'auth': (params) => {
      setTitle("Authenticate");
    },
    'map': (params) => {
      setTitle("Map");
      setView("map");
    },
    'landmarks/:id': (params) => {
      viewLandmark(params.id);
      setView("landmark");
    },
    '*': (params) => {
      setTitle("Home");
      setView("landing");
    }
  })
  .resolve();
});

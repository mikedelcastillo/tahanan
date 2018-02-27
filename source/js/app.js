import './views/google-maps';

const Navigo = require('navigo');
const jQuery = require('jquery');
const setTitle = require('./utils/set-title');
const setView = require('./utils/set-view');
const api = require('./utils/api');
let globals = {};

const router = new Navigo(null, true, "#");

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
    'landmark/:id': (params) => {
      setTitle(`Viewing "${params.id}"`);
      setView("landmark");
    },
    '*': (params) => {
      setTitle("Home");
      setView("landing");
    }
  })
  .resolve();
});

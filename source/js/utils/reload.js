const router = require('./router');

function reload(){
  console.log("Reloading route!");
  let h = (window.location.href.match(/\#.*$/gmi) || [""])[0];
  console.log("Coming from " + window.location.href);
  router.navigate('/reload/' + Math.floor(Math.random() * 100000));
  setTimeout(e => {
    router.navigate(h);
  }, 10);
}

module.exports = reload;

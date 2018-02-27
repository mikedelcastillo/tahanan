const jQuery = require("jquery");
const TESTING = true;
module.exports = function api(url, data){
  if(!TESTING){

  } else{
    if(url == "landmarks"){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(require('../tests/landmarks'));
        }, 500);
      });
    }
  }
};

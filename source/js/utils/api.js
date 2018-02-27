const jQuery = require("jquery");
const config = require('./config');
//我不要去课
module.exports = function api(method, endpoint, data = {}){
  return new Promise((resolve, reject) => {
    let url = `${config.domain}/api/${endpoint}`;
    jQuery.ajax(url, {
      data,
      method,
      dataType: "json",
      crossDomain: true,
      success(data){
        console.log(data)
      },
      error(a, b, c){

      }
    });
  });
};

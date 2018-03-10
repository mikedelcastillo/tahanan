const jQuery = require("jquery");
const config = require('./config');
//我不要去课
module.exports = function api(method, endpoint, data = {}, json = false){

  let toPass = {
    data,
    method,
    xhrFields: {
      withCredentials: true
    },
    dataType: "json",
    crossDomain: true
  };

  if(!json){
    toPass.processData = false;
    toPass.contentType = false;
  }

  console.log(`API REQUEST: ${endpoint}`);

  return new Promise((resolve, reject) => {
    let url = `${config.api}/${endpoint}`;

    toPass.success = (data) => {
      if((data.errors || []).length)
        reject(data.errors);
      else
        resolve(data);
    }

    toPass.error = (a, b, c) => {
      reject(a, b, c);
    }

    jQuery.ajax(url, toPass);
  });
};

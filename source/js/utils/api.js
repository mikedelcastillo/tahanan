const jQuery = require("jquery");
const config = require('./config');
//我不要去课
module.exports = function api(method, endpoint, data = {}){
  console.log(`API REQUEST: ${endpoint}`);
  return new Promise((resolve, reject) => {
    let url = `${config.api}/${endpoint}`;
    jQuery.ajax(url, {
      data,
      method,
      xhrFields: {
        withCredentials: true
      },
      dataType: "json",
      crossDomain: true,
      processData: false,
      contentType: false,
      success(data){
        if((data.errors || []).length)
          reject(data.errors);
        else
          resolve(data);
      },
      error(a, b, c){
        reject(a, b, c);
      }
    });
  });
};

'use strict';

const request = require('request');

const getResultByTerm = (term, callback) => {
  let options = {
    url: `https://itunes.apple.com/search?term=${term}`,
    headers: {
      'User-Agent': 'request',
    }
  };

  request.get(options, function(err, resp, body) {
    if(err){
      console.error('Could not be searched', error);
    }else if(!err && resp.statusCode == 200){
      var info = JSON.parse(body);
      console.log('Upload successful!  Server responded with:', info);
      callback(info);
    }
  });

}

module.exports.getResultByTerm = getResultByTerm;
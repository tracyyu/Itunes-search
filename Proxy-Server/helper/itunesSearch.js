'use strict';

const request = require('request');

const toCapitalize = (str) => {
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
}

// Media options: movie, podcast, music, musicVideo, audiobook, shortFilm, tvShow, software, ebook, all
const mediaOptions = ['All','Audiobook','eBook','Movie','Music','Music Video','Podcast','TV Show', 'Short Film', 'Software'];


const getMediaType = (str) => {
  if(str.indexOf(' ') === -1){
    return str.toLowerCase();
  }
  const strArr = str.split(' ');
  return `${strArr[0].toLowerCase()}${toCapitalize(strArr[1])}`;
}

const getKindType = (str) => {
  if(typeof str !== 'string'){
    return '';
  }

  if(str.indexOf(' ') !== -1){

  }

  if(str === 'tv'){
    return 'TV';
  } else if (str === 'feature'){
    return '';
  }

  if(str.indexOf('-') === -1){
    return capitalize(str);
  }
  const strArr = str.split('-');
  return `${getKindType(strArr[0])} ${toCapitalize(strArr[1])}`.trim();
}


const getResultByTerm = (term, callback) => {
  let options = {
    url: `https://itunes.apple.com/search?media=all&term=${term.split(' ').join('+')}`,
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
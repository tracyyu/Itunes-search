'use strict';

const fs = require('fs'); 

let categoryParser = (data) => {
    let results = {
        'book': [],
        'album': [],
        'coached-audio': [],
        'feature-movie': [],
        'interactive-booklet': [],
        'music-video': [],
        'pdf podcast': [],
        'software-package': [],
        'song': [],
        'tv-episode': [],
        'artist': [],
        'podcast': []
    };

    for(let i = 0; i < data.length; i++) {

        var kind = data[i].kind;

        if(results.hasOwnProperty(kind)){
            var obj = {
                'id': data[i].trackId,
                'name': data[i].trackName,
                'artwork': data[i].artworkUrl100,
                'genre': data[i].primaryGenreName,
                'url': data[i].trackViewUrl 
            };
            results[kind].push(obj);
        }
    }

    let filteredData = JSON.stringify(results);
    fs.writeFileSync('search-results.json', filteredData); 
    return results;
};


module.exports.categoryParser = categoryParser;
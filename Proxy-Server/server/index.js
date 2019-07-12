const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
const itunesAPI = require('../helper/itunesSearch');
const parser = require('../helper/parser');
//var routers = require('./router');

const server = express();
const port = process.env.PORT || 3000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended : true }));
server.use(morgan('dev'));

server.use(express.static(path.join(__dirname, '../dist')));

/*
 *  API that takes in a search term and uses that value to call the iTunes Search API 
 */

server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://3.84.145.74:3001/");
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.get('/itunes-search', (req, res) => {
    var { term } = req.query;
    itunesAPI.getResultByTerm(term, ({ results }) => {
        const data = parser.categoryParser(results);
        res.status(200).send(data);
    });
});


server.listen(port, () => `Listening for connections on port ${port}`);
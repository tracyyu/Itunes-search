const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const PORT = 3001;

const router = express.Router();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, '../public/')))

server.use(function(req, res, next) {
  var allowedOrigins = ['http://52.90.70.201:3000', 'http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(PORT, () => console.log(`listening to port: ${PORT} , great!`));

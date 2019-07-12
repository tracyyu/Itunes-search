const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const server = express();
const PORT = 3001;

const router = express.Router();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use('/', express.static(path.join(__dirname, '../public/')))

// server.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "ec2-52-90-70-201.compute-1.amazonaws.com:3000");
//   res.header('Access-Control-Allow-Methods', 'GET');
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.listen(PORT, () => console.log(`listening to port: ${PORT} , great!`));

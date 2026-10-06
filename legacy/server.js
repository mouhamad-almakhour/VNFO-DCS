var express = require("express");
var request = require('request');
const path = require('path')
const vnfd = require('./api_openstack/api_VNFDM_OS.js');
const vnf = require('./api_openstack/api_VNFM_OS.js');
const events = require('./api_openstack/api_EVNET_OS.js');
const createtoken = require('./api_openstack/api_CreateToken_OS.js');


var cors = require('cors')
const bodyParser = require('body-parser');
const { boolean } = require("webidl-conversions");

var app = express();

var metamaskaccount;

var port = 3000;
app.use(bodyParser.json());



app.use(cors())
app.use('/api', require("./routes/API.routes.js"))

app.use('/', express.static("./src"))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//Listne to port 3000
app.listen(port, () => console.info(`Listning to port ${port}`));





 
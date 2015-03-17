//process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//var config = require('./config/config.js'),
 //   mongoose = require('./config/mongoose.js'),
  //  express = require('./config/express.js');
//
//var //db = mongoose(),
  //  app = express();
//
//app.listen(config.port);
//
//module.exports = app;
//
//console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);
//


var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use('/api', require( './app/controllers/posts'));
app.use(require('./app/controllers/routes'));
app.use(require('./app/controllers/sessions'));
app.use(require('./app/controllers/user'));
app.use(require('./app/controllers/img-meta'));
app.use(express.static('./public'));

app.listen(3000, function () {
   console.log('Server is listening on port ', 3000) ;
});

module.exports = app;

var express = require('express');
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var app = express();


app.use(bodyParser.json());
app.use(busboy() );

app.use('/api', require( './app/controllers/posts'));


app.use(require('./app/controllers/routes'));
app.use(require('./app/controllers/sessions'));
app.use(require('./app/controllers/user'));
app.use(require('./app/controllers/image'));
app.use(require('./app/controllers/img-meta'));
app.use(express.static('./public'));

app.listen(3000, function () {
   console.log('Server is listening on port ', 3000) ;
});

module.exports = app;
 

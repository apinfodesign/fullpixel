var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use('/api', require( './app/controllers/posts'));
app.use(require('./app/controllers/routes'));
app.use(express.static('./public'));

app.listen(3000, function () {
   console.log('Server is listening on port ', 3000) ;
});

module.exports = app;
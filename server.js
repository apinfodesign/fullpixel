process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config.js'),
    mongoose = require('./config/mongoose.js'),
    express = require('./config/express.js');

var //db = mongoose(),
    app = express();

app.listen(config.port);

module.exports = app;

console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);




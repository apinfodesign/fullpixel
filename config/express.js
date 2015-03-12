var config       = require('./config'),
    express      = require('express'),
    path         = require('path'),
    favicon      = require('serve-favicon'),
    logger       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');



module.exports = function () {

	var app = express();



	// view engine setup
	app.set('views', './app/views');
	//app.set('view engine', 'jade');

	app.use(favicon('./public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser());
	app.use(express.static('./public'));
	//app.use('/', routes);



	/// catch 404 and forward to error handler
	app.use(function(req, res, next) {

	    // trying to get 404 to work

	    // res.status(404);

	    // // respond with html page
	    // if (req.accepts('html')) {
	    //     res.sendFile('/public/404.html');
	    //     return;
	    // }

	    // // respond with json
	    // if (req.accepts('json')) {
	    //     res.send({ error: 'Not found' });
	    //     return;
	    // }

	    // // default to plain-text. send()
	    // res.type('txt').send('Not found');

	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	    
	});



	/// error handlers



	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.send(err.message);
	    });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.send(err.message);
	});

	return app;

};
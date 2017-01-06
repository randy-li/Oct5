var express = require('express');

var app = express();

var handlebars = require('express-handlebars')
	.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var fortune = require('./lib/fortune.js');

app.use(function(req, res, next){
	res.locals.showTests = app.get('env') !== 'production' && 
		req.query.test === '1';
	next();
});

app.use(express.static(__dirname + '/public'));

app.get('/headers', function(req, res){
	res.set('Content-Type', 'text/plain');
	var s = '';
	for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
	res.send(s);
});

app.get('/tours/hood-river', function(req, res) {
	res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', function(req, res){
	res.render('tours/request-group-rate');
});

app.get('/', function(req, res){
	res.render('home');
});

app.get('/about', function(req, res){
	res.render('about', { 
		fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.use(function(req, res){
	res.status(404);
	res.render('404');
});

app.use(function(req, res){
	console.error(err.stack);
	res.type('text/plain');
	res.status(500);
	res.send('500 - Server Error');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + 
			app.get('port') + '; press Ctrl-C to terminate.' );
});

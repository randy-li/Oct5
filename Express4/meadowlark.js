var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({ 
	defaultLayout: 'main',
	extname: '.hbs',
	helpers: {
		section: function(name, options){
			if(! this._sections) this._sections = {};
			this._sections[name] = options.fn(this);
			return null;
		}
	}
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

var fortune = require('./lib/fortune.js');

function getWeatherData(){
	return{
		locations: [
		{
			name: 'Portland',
			forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
			weather: 'Overcast',
			temp: '54.1F(12.3C)',
		},
		{
			name: 'Bend',
			forecatUrl: 'http://www.wunderground.com/US/OR/Bend.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
			weather: 'Partly Cloudy',
			temp: '55.0F (12.8 C)',
		},
		{
			name: 'Manzanita',
			forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
			iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
			weather: 'Light Rain',
			temp: '55.0F (12.8 C)',
		},
		],
	};
}

app.use(function(req, res, next){
	if(!res.locals.partials) res.locals.partials = {};
	res.locals.partials.weatherContext= getWeatherData();
	next();
});

var tours = [
{ id: 0, name: 'Hood River', price: 99.99 },
{ id: 1, name: 'Oregon coast', price: 149.95 },
];

app.get('/api/tours', function(req, res){
	var toursXml = '<?xml version="1.0"?><tours>' + tours.map(function(p){
		return '<rour price="' + p.price + '" id="' + p.id + '">' + p.name + '</tour>';
	}).join('') + '</tours>';

	var toursText = tours.map(function(p){
		return p.id + ': ' + p.name + ' (' + p.price + ')';
				}).join('\n');
		res.format({
			'application/json': function(){
				res.json(tours);
			},
			'application/xml': function(){
				res.type('application/xml');
				res.send(toursXml);
			},
			'text/xml': function(){
				res.type('text/xml');
				res.send(toursXml);
			},
			'text/plain': function(){
				res.type('text/plain');
				res.send(toursXml);
			}
		});
		});

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

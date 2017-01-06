var express = require('express');
var app = express();

app.get('/about', function(req, res){
	res.render('about');
});

app.get('/error', function(req, res){
	res.status(500);
	res.render('error');
});

app.get('/error', function(req, res){
	res.status(500).render('error');
});

app.get('/greeting', function(req, res){
	res.render('about', {
		message: 'welcome', 
		style: req.query.styple,
		userid: req.cookie.userid,
		username: req.session.username,
	});
});

app.get('/no-layout', function(req, res){
	res.render('no-layout', { layout: null });
});

app.get('/custom-layouts', function(req, res){
	res.render('custom-layout', {layout: 'custom' });
});

app.get('/test', function(req, res){
	res.type('text/plain');
	res.send('this is a test');
});

app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500).render('error');
});

app.use(function(req, res){
	res.status(404).render('not-found');
});

app.post('/process-contact', function(req, res){
	console.log('Received contact from ' + req.body.name + ' <' + req.body.email + '> ');
	res.redirect(303, '/thank-you');
});

app.post('/process-contact', functioni(req, res){
	console.log('Received contact from ' + req.body.name + ' <' + req.body.email + '>');
	try {
		return res.xhr?
			res.render({ success: true }):
			res.redirect(303, '/thank-you');
	} catch(ex) {
		return res.xhr?
			res.json({ error: 'Database error.' }):
			res.redirect(303, '/database-error');
	}
});


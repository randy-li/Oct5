var express = require('express);
var app = express();

var tours = [
{ id: 0, name: 'Hood River', price: 99.99 },
{ id: 1, name: 'Oregon Coast', price: 149.95 },
];

app.get('api/tours', function(req, res){
	res.json(tours);
});

app.get('api/tours', function(req, res){
	var toursXml = "XML";
	var tourText = "Text";

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

app.put('api/tour/:id', function(req, res){
	var p = tours.some(function(p){	return p.id == req.params.id });
	if (p) {
		if (req.query.name) p.name = req.query.name;
		if (req.query.price) p.price = req.query.price;
		res.json({success: true});
	} else {
		res.json({error: 'No such tour exists.'});
	}
});

app.del('/api/tour/:id', function(req, res){
	var i;
	for ( var i=tours.length-1; i>=0; i-- )
		if (tours[i].id == req.params.id ) break;
	if (i>=0) {
		tours.splice(i, 1);
		res.json({success: true});
	} else {
		res.json({ error: 'No such tour exists.'});
	}
});


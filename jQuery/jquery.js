var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
	console.log('Express start on http://locahost:' + 
			app.get('port') + '; press Ctrl-C to terminate.');
});

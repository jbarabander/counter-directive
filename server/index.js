var express = require('express');
var path = require('path');
var app = express();

app.use(express.static('src'));
app.use(express.static('node_modules'));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname, '../index.html'));
})


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('app listening on port 3000');
})
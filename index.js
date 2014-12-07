var express = require('express');
var app = express();
var http = require('http').Server(app);

var inmo_template	= require('./inmo_template.js')(app);

// app.set("views", "./pong")
app.get("/", function(req, res) {
	app.set("view engine", "html");
	res.render(__dirname + "/chat/index.html", {});
});

app.get("/chat/scss/:file", function(req, res) {
	app.set("view engine", "scss");
	res.type("css");
	res.render(__dirname + "/chat/scss/" + req.params.file);
});

app.use('/assets', express.static(__dirname + '/assets/'));

http.listen(81, function() {
	console.log("listen to 81");
});
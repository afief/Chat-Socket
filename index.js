var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var md5 = require('MD5');

var inmo_template	= require('./inmo_template.js')(app);
var db	= require('./databases.js');

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
app.use('/chat', express.static(__dirname + '/chat/'));


/*Sockert Server*/
io.on('connection', function(socket){
	var user = {};
	
	socket.on("login", function(data) {
		if (data.username && data.password)
			db.cekLogin(data.username, md5(data.password), loginSuccess, loginError);
	});
	
	function loginSuccess(res) {
		if (res.length > 0) {
			console.log("send success");
			socket.emit("login_success", res);
		} else {
			socket.emit("login_fail", "Username / Password Salah");
		}
	}
	function loginError(err) {
		socket.emit("login_fail","Terjadi kesalahan pada server");
	}
});


http.listen(81, function() {
	console.log("listen to 81");
});
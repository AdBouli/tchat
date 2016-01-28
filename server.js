console.log("Start");

var http = require("http");

httpServer = http.createServer(function(req, res) {
	console.log("Server Create");
});

httpServer.listen(1337);

var io = require("socket.io").listen(httpServer);

var users = {};

io.sockets.on("connection", function(socket){
	
	console.log("New user");
	var me = false;

	for(var k in users){
		socket.emit("newUser", user[k]);
	}
	
	socket.on("login", function(user){
		me = user;
		me.id = user.mail.replace('@', '-').replace('.','-');
		socket.emit("logged");
		users[me.id] = me;
		io.sockets.emit("newUser", me);
	});

	socket.on("newMsg", function(message){
		message.user = me;
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		io.sockets.emit("newMsg", message);
	})

	socket.on("disconnect", function(){
		if(!me){
			return false;
		}
		delete users[me.id];
		io.sockets.emit('discUser', me);
	});


	
});
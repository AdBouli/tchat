console.log("Start");

var http = require("http");

httpServer = http.createServer(function(req, res) {
	console.log("Server Create");
});

httpServer.listen(1337);

var io = require("socket.io").listen(httpServer);

io.sockets.on("connection", function(socket){
	
	console.log("New user");
	
	socket.on("login", function(user){
		console.log(user);
	})
	
});
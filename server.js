console.log("Start");

var http = require("http");

var httpServer = http.createServer((req, res) => {
	res.end('ok');
	console.log("Server Create");
});

httpServer.listen(1337);

var io = require("socket.io").listen(httpServer);

var users = {};

io.sockets.on("connection", (socket) => {
	
	console.log("New user");
	var me = false;

	// Liste des users connectés
	for(var k in users){
		socket.emit("newUser", users[k]);
	}
	
	// L'utilisateur se connecte
	socket.on("login", (user) => {
		me = user;
		me.id = user.mail.replace('@', '-').replace('.','-');
		socket.emit("logged");
		users[me.id] = me;
		io.sockets.emit("newUser", me);
	});

	// L'utilisateur poste un nouveau message
	socket.on("postMsg", (message) => {
		console.log(message);
		message.user = me;
		date = new Date();
		message.h = date.getHours();
		message.m = date.getMinutes();
		message.s = date.getSeconds();
		io.sockets.emit("newMsg", message);
	});

	// L'utilisateur se déconnecte
	socket.on("disconnect", () => {
		if(!me){
			return false;
		}
		delete users[me.id];
		io.sockets.emit('discUser', me);
	});
	
});
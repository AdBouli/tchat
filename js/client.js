(($) => {

	var socket = io.connect("http://localhost:1337/");
	
	// A la connection de l'utilisateur
	$("#loginForm").submit((event) => {
		event.preventDefault();
		socket.emit("login", {
			username : $("#username").val(),
			mail     : $("#mail").val()
		})
	});

	// Quand l'utilisateur se connecte
	socket.on("logged", () => {
		$("#loginForm").fadeOut();
		$("#divTchat").show();
		$("#msg").focus();
	});

	// A l'envoie d'un message d'un utilisateur
	$("#msgForm").submit((event) => {
		event.preventDefault();
		socket.emit("postMsg", {message : $("#msg").val() });
		$("#msg").val("");
		$("#msg").focus();
	});

	// Quand un utilisateur poste un message
	socket.on("newMsg", (message) => {
		var idDiv = message.user.mail 
							+ message.h
							+ message.m
							+ message.s;
		$("#tchat").append(
			"<div class='aMsg' id='" + idDiv + "'>"
			+ "<div class='content'>"
			+ "<strong>" 
			+ message.user.username 
			+ " : </strong>"
			+ message.message
			+ "</div>"
			+ "<div class='time'>"
			+ message.h + ":" + message.m
			+ "</div>"
			+ "</div>"
		);
		$("#"+idDiv).scrollBottom();
	});

	// Quand un nouvel utilisateur se connecte
	socket.on("newUser", (user) => {
		$("#users").append(
			"<li id='" + user.id + "'>" 
			+ user.username 
			+ "</li>"
		);
	});

	// Quand un utilisateur se déconnecte
	socket.on("discUser", (user) => {
		$("#" + user.id).remove();
	});
	
})(jQuery);
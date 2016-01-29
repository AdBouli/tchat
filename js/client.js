(function ($){

	console.log('ok');
	
	var socket = io.connect("http://localhost:1337");
	
	// A la connection de l'utilisateur
	$("#loginForm").submit(function(event){
		event.preventDefault();
		socket.emit("login", {
			username : $("#username").val(),
			mail     : $("#mail").val()
		})
	});

	// Quand l'utilisateur se connecte
	socket.on("logged", function(){
		$("#loginForm").fadeOut();
		$("#msg").focus();
	})

	// A l'envoie d'un message d'un utilisateur
	$("#msgForm").submit(function(event){
		event.preventDefault();
		socket.emit("newMsg", {message : $("#msg").val() });
		$("#msg").val("");
		$("#msg").focus();
	})

	// Quand un utilisateur poste un message
	socket.on("newMsg", function(message){
		$("#tchat").append("<p><strong>" + message.user.username °+ " :</strong> " + message + "</p><br>");
	})

	// Quand un nouvel utilisateur se connecte
	socket.on("newUser", function(user){
		$("#users").append("<li id='" + user.id + "'>" + user.username + "</li>");
	});

	// Quand un utilisateur se déconnecte
	socket.on("discUser", function(user){
		$("#" + user.id).remove();
	});
	
})(jQuery);
(function ($){

	console.log('ok');
	
	var socket = io.connect("http://localhost:1337");
	
	$("#loginForm").submit(function(event){
		event.preventDefault();
		socket.emit("login", {
			username : $("#username").val(),
			mail     : $("#mail").val()
		})
	});

	socket.on("logged", function(){
		$("#loginForm").fadeOut();
		$("#msg").focus();
	})

	$("#msgForm").submit(function(event){
		event.preventDefault();
		socket.emit("newMsg", {message : $("#msg").val() });
		$("#msg").val("");
		$("#msg").focus();
	})

	socket.on("newMsg", function(message){
		$("#tchat").append("<p><strong>" + message.user.username °+ " :</strong> " + message + "</p><br>");
	})

	socket.on("newUser", function(user){
		$("#users").append("<li id='" + user.id + "'>" + user.username + "</li>");
	});

	socket.on("discUser", function(user){
		$("#" + user.id).remove();
	});
	
})(jQuery);
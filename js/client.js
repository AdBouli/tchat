(function ($){
	
	var socket = io.connect("http://localhost:1337");
	
	$("#loginForm").submit(funtion(event){
		event.preventDefault();
		socket.emit("login", {
			username : $("#username").val(),
			mail     : $("#mail").val()
		})
	})
	
})(jQuery);
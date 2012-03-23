$(function(){
	var user = {
			userId: 1,
			username: "Shawn"
	};
	var engine = new ChatsyEngine('http://localhost:14781', user);
	
	var room = new ChatsyRoom({
		roomId: 1,
		name: "C# Chat room"
	}, 
	{
		roomJoined: function(){
			console.log("room joined");
			this.sendMessage("hello");
		}
	}	);
	
	engine.joinRoom(room);
	$('body').click(function(){
		room.sendMessage("hello");
	});
});
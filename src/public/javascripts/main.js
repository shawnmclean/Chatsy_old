$(function(){
	var user = {
			userId: 1,
			username: "Shawn"
	};
	var engine = new ChatsyEngine('http://localhost:14781', user);
	
	var room = new ChatsyRoom(engine, {
		roomId: 1,
		name: "C# Chat room"
	}, null);
	
	$('body').click(function(){
		engine.rand();
	});
});
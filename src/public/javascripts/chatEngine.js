(function() {
  var server, socket;

  server = 'http://localhost:14124/';

  socket = io.connect(server);

  socket.emit("joinRoom", {
    username: 'Shawn',
    userId: 12,
    roomId: 1
  });

  socket.on("userJoined", function(data) {
    console.log(data);
    return socket.emit("message", {
      lol: 'test',
      msg: 'dgdgdfg'
    });
  });

  socket.on("joinRoom", function(data) {
    return console.log("user joined room");
  });

}).call(this);

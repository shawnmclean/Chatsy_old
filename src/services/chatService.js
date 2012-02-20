(function() {

  exports.ChatService = (function() {

    function ChatService(io) {
      this.io = io;
      this.io.sockets.on("connection", function(socket) {
        socket.on("joinRoom", function(data) {
          return socket.set('user', data.user, function() {
            socket.join(data.roomId);
            return socket.broadcast.to(data.roomId).emit("userJoined", {
              message: data
            });
          });
        });
        return socket.on("message", function(data) {
          return socket.get("user", function(err, user) {
            console.log("Chat message by ", user);
            return io.sockets["in"](data.roomId).emit("message", {
              message: data
            });
          });
        });
      });
    }

    return ChatService;

  })();

}).call(this);

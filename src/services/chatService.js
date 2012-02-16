(function() {

  exports.ChatService = (function() {

    function ChatService(io) {
      this.io = io;
      this.io.sockets.on("connection", function(socket) {
        socket.on("joinRoom", function(data) {
          socket.set('userId', data.userId, function() {});
          console.log("user joined room");
          return socket.emit("userJoined", {
            message: data
          });
        });
        return socket.on("message", function(from, data) {
          return console.log("user ", from, "is saying ", data);
        });
      });
    }

    return ChatService;

  })();

}).call(this);

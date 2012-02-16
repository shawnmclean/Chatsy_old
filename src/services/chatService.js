(function() {

  exports.ChatService = (function() {

    function ChatService(io) {
      this.io = io;
      this.io.sockets.on("connection", function(socket) {
        return socket.on("message", function(data) {
          return socket.broadcast.emit("message", {
            message: data
          });
        });
      });
    }

    return ChatService;

  })();

}).call(this);

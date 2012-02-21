(function() {

  exports.ChatService = (function() {

    ChatService.db;

    function ChatService(io) {
      var mongoose;
      this.io = io;
      mongoose = require('mongoose/');
      this.db = mongoose.connect("mongodb://localhost/test");
      this.io.sockets.on("connection", function(socket) {
        socket.on("joinRoom", function(data) {
          return socket.get("user", function(err, user) {
            if (user) {
              if (!user.rooms) {
                user.rooms = new Array(data.roomId);
              } else {
                user.rooms.add(data.roomId);
              }
            } else {
              user = data.user;
            }
            return socket.set('user', user, function() {
              socket.join(data.roomId);
              return socket.broadcast.to(data.roomId).emit("userJoined", {
                message: data
              });
            });
          });
        });
        socket.on("disconnect", function() {});
        return socket.on("message", function(data) {
          return socket.get("user", function(err, user) {
            data.user = user;
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

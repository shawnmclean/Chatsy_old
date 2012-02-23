(function() {

  exports.ChatService = (function() {

    ChatService.db;

    ChatService.Chat;

    function ChatService(io) {
      var chatInstance, mongoose;
      this.io = io;
      mongoose = require('mongoose/');
      this.db = mongoose.connect("mongodb://localhost/chat");
      this.Chat = this.db.model('Chat');
      chatInstance = this.Chat;
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
              var query;
              socket.join(data.roomId);
              query = chatInstance.find();
              query.limit(20);
              query.where("roomId", data.roomId);
              query.exec(function(err, data) {
                if (err) {
                  return console.log("Error: ", err);
                } else {
                  return io.sockets["in"](data.roomId).emit("prefill", {
                    message: data
                  });
                }
              });
              return socket.broadcast.to(data.roomId).emit("userJoined", {
                message: data
              });
            });
          });
        });
        socket.on("disconnect", function() {});
        return socket.on("message", function(data) {
          return socket.get("user", function(err, user) {
            var chat;
            chat = new chatInstance({
              message: data.message,
              userId: user.userId,
              friendlyName: user.friendlyName,
              roomId: data.roomId
            });
            chat.save(function(err) {
              if (err) {
                return console.log("Error: ", err);
              } else {
                return console.log("Message Saved");
              }
            });
            return io.sockets["in"](data.roomId).emit("message", {
              message: chat
            });
          });
        });
      });
    }

    return ChatService;

  })();

}).call(this);

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
            if (!user) user = data.user;
            if (!user.rooms) {
              user.rooms = new Array(data.roomId);
            } else {
              user.rooms.add(data.roomId);
            }
            console.log("User joined: ", user);
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
                  return socket.emit("prefill", {
                    message: data
                  });
                }
              });
              return socket.broadcast.to(data.roomId).emit("userJoined", {
                message: user
              });
            });
          });
        });
        socket.on("leaveRoom", function(data) {
          return socket.get("user", function(err, user) {
            var roomIndex;
            if (user.rooms) {
              roomIndex = user.rooms.indexOf(data.roomId);
              user.rooms.splice(roomIndex, 1);
            }
            return socket.set('user', user, function() {
              socket.leave(data.roomId);
              return socket.broadcast.to(data.roomId).emit("userLeave", {
                message: user
              });
            });
          });
        });
        socket.on("disconnect", function() {});
        return socket.on("message", function(data) {
          return socket.get("user", function(err, user) {
            var chat;
            if (user.rooms) {
              if (user.rooms.indexOf(data.roomId) > -1) {
                chat = new chatInstance({
                  message: data.message,
                  userId: user.userId,
                  friendlyName: user.friendlyName,
                  roomId: data.roomId
                });
                return chat.save(function(err) {
                  if (err) {
                    console.log("Error: ", err);
                  } else {
                    console.log("Message Saved");
                  }
                  return io.sockets["in"](data.roomId).emit("message", {
                    message: chat
                  });
                });
              }
            }
          });
        });
      });
    }

    return ChatService;

  })();

}).call(this);

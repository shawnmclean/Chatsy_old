class exports.ChatService
  constructor: (@io) ->
    @io.sockets.on "connection", (socket) ->
      socket.on "joinRoom", (data) ->
        socket.set 'user', data.user, () -> 
          socket.join data.roomId
          socket.broadcast.to(data.roomId).emit "userJoined",
            message: data
            
      socket.on "message", (data) ->
        socket.get "user", (err, user) ->
          console.log "Chat message by ", user
          io.sockets.in(data.roomId).emit "message",
            message: data
class exports.ChatService
  constructor: (@io) ->
    @io.sockets.on "connection", (socket) ->
      socket.on "message", (data) ->
        socket.broadcast.emit "message",
          message: data
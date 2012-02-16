class exports.ChatService
  constructor: (@io) ->
    @io.sockets.on "connection", (socket) ->
      socket.on "joinRoom", (data) ->
        socket.set 'userId', data.userId, () ->
        
        console.log "user joined room"
        socket.emit "userJoined",
          message: data

      socket.on "message", (from, data) ->
        console.log "user ", from, "is saying ", data

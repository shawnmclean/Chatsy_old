server = 'http://localhost:14124/'

socket = io.connect server

socket.emit "joinRoom",
  username: 'Shawn'
  userId: 12
  roomId: 1
    

socket.on "userJoined", (data) ->
  console.log data
  socket.emit "message",
    lol: 'test'
    msg: 'dgdgdfg'
    

socket.on "joinRoom", (data) ->
  console.log "user joined room"

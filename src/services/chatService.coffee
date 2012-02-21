class exports.ChatService
  @db
  constructor: (@io) ->
    mongoose = require('mongoose/')
    @db = mongoose.connect("mongodb://localhost/test")
    
    
    
    @io.sockets.on "connection", (socket) ->
      socket.on "joinRoom", (data) ->        
        socket.get "user", (err, user) ->
          #check if user already in the system and add to room
          if(user)
            #if user is in no room, create the array else just add the room
            if(!user.rooms)
              user.rooms = new Array(data.roomId)
            else
              user.rooms.add(data.roomId)
          else
            user = data.user
          
          #save the user to the system again    
          socket.set 'user', user, () ->
            #join the socket room         
            socket.join data.roomId
            socket.broadcast.to(data.roomId).emit "userJoined",
              message: data
      
      socket.on "disconnect", () ->
        
      
      socket.on "message", (data) ->
        socket.get "user", (err, user) ->
          data.user = user
          io.sockets.in(data.roomId).emit "message",
            message: data

